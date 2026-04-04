/**
 * Wrapper around widdershins that removes circular $refs before processing.
 * Widdershins' oas-schema-walker has no cycle detection when resolving $refs,
 * causing a stack overflow on OData-style OpenAPI output where entities
 * reference each other via navigation properties.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';

/** Remove $refs that would cause infinite recursion, replacing with {type:'object'} */
function breakCycles(doc) {
    const schemas = doc?.components?.schemas;
    if (!schemas) return doc;

    // Find all schema names that participate in a cycle
    function hasCycle(name, visited = new Set()) {
        if (visited.has(name)) return true;
        const schema = schemas[name];
        if (!schema) return false;
        visited.add(name);
        const refs = JSON.stringify(schema).match(/"#\/components\/schemas\/([^"]+)"/g) ?? [];
        for (const r of refs) {
            const ref = r.replace('"#/components/schemas/', '').replace('"', '');
            if (hasCycle(ref, new Set(visited))) return true;
        }
        return false;
    }

    const circular = new Set(Object.keys(schemas).filter(n => hasCycle(n)));

    /** Recursively replace $refs pointing to circular schemas with a plain stub */
    function stripRefs(obj, depth = 0) {
        if (depth > 50 || !obj || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(v => stripRefs(v, depth + 1));
        if (obj.$ref) {
            const name = obj.$ref.replace('#/components/schemas/', '');
            if (circular.has(name)) return { type: 'object', description: `See ${name}` };
        }
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, stripRefs(v, depth + 1)]));
    }

    return stripRefs(doc);
}

const inputs = [
    ['docs/DataService.openapi3.json', 'docs/DataService_readme.md'],
    ['docs/StarWarsFilm.openapi3.json', 'docs/StarWarsFilm_readme.md'],
];

for (const [input, output] of inputs) {
    const doc = JSON.parse(readFileSync(input, 'utf8'));
    const safe = breakCycles(doc);
    const tmp = join(tmpdir(), `swapi-${randomBytes(6).toString('hex')}.json`);
    writeFileSync(tmp, JSON.stringify(safe));
    try {
        execSync(`node node_modules/widdershins/widdershins.js --summary "${tmp}" -o "${output}"`, { stdio: 'inherit' });
        console.log(`Written: ${output}`);
    } finally {
        unlinkSync(tmp);
    }
}
