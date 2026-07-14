using { StarWarsShow } from './show-service';
using { StarWarsFilm } from './film-service';

// Expose read-friendly services to MCP-capable agents (e.g. Claude Code).
// Auto-provides describe / query / call_action tools, integrated with CAP
// auth, constraints, and annotations.
//
// The @protocol annotation must include 'mcp' alongside the existing protocols
// (defined in show-service.cds / film-service.cds) so CAP's protocol adapter
// registry mounts the MCP endpoint. The '...' spread preserves existing entries.

annotate StarWarsShow with @protocol: [..., 'mcp'];
annotate StarWarsShow with @mcp;
annotate StarWarsShow with @mcp.instructions:
  'Star Wars shows, episodes, and media. Use describe to explore entities, then query to answer questions about shows, characters, planets, and their relationships.';

annotate StarWarsFilm with @protocol: [..., 'mcp'];
annotate StarWarsFilm with @mcp;
annotate StarWarsFilm with @mcp.instructions:
  'Star Wars films and their many-to-many links to people, planets, species, starships, and vehicles. Use query to answer questions like which planets appear in the most films.';
