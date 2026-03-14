# Lab 04 — Role-Based Authorization

## Goal

Add role-based access control to the People service so Viewers can read, Editors can write, and only Admins can delete.

## Background

CAP authorization is entirely annotation-driven — no imperative `if (user.role === ...)` checks needed. Two annotations do the work:

| Annotation | What it controls |
|-----------|-----------------|
| `@requires` | Coarse gate — can the user access this service/entity/action at all? |
| `@restrict` | Fine-grained — which events (`READ`, `CREATE`, etc.) can each role perform? |

## Steps

### Step 1 — Understand the current state

Open `srv/services-auth.cds`. Currently it grants `@requires: 'any'` to all services — effectively public.

Find the `@restrict` block on `StarWarsPeople.People`. Read the comments explaining the three roles.

### Step 2 — Enable mock users for local testing

Open `cap/package.json`. Find the `cds` section and add a `[development]` profile block (or add to the existing one) with mock users:

```json
"[development]": {
    "requires": {
        "auth": {
            "kind": "mocked",
            "users": {
                "viewer@test.com": { "roles": ["Viewer"] },
                "editor@test.com": { "roles": ["Editor"] },
                "admin@test.com":  { "roles": ["Admin", "Editor"] }
            }
        }
    }
}
```

### Step 3 — Activate the @restrict annotation

In `srv/services-auth.cds`, the `@restrict` block on `StarWarsPeople.People` is present but the service-level annotation still uses `@requires: 'any'`. To enforce role-based access on People while keeping other services public:

Change:
```cds
annotate StarWarsPeople with @(requires: 'any');
```

To:
```cds
annotate StarWarsPeople with @(requires: 'authenticated-user');
```

> **Note:** This will require authentication for the entire People service. Other services remain public. Adjust in `services-auth.cds` carefully — see the comments there for the recommended approach.

### Step 4 — Test with curl or a REST client

Start the service:
```bash
npm run sqlite
```

Test as Viewer (read — should work):
```
GET http://localhost:4004/odata/v4/StarWarsPeople/People
Authorization: Basic viewer@test.com:
```

Test as Viewer (DELETE — should be rejected):
```
DELETE http://localhost:4004/odata/v4/StarWarsPeople/People(<ID>)
Authorization: Basic viewer@test.com:
```
You should get HTTP 403.

Test as Editor (CREATE — should work):
```http
POST http://localhost:4004/odata/v4/StarWarsPeople/People
Authorization: Basic editor@test.com:
Content-Type: application/json

{ "name": "Test Person" }
```

Test as Admin (DELETE — should work):
```
DELETE http://localhost:4004/odata/v4/StarWarsPeople/People(<ID>)
Authorization: Basic admin@test.com:
```

### Step 5 — Run tests

```bash
npm run test
```

> **Note:** The automated tests in `model.test.js` and `handler.test.js` run with `cds.env = 'sqlite'` and use technical principal bypass. They should still pass even with the new auth annotations.

## Expected Outcome

- Anonymous access to StarWarsPeople is rejected (401 or 403) when `requires: 'authenticated-user'`
- Viewer can READ but not CREATE/UPDATE/DELETE People
- Editor can READ and CREATE/UPDATE People but not DELETE
- Admin can perform all operations

## Hints

- `@requires: 'any'` means anyone including anonymous users. `@requires: 'authenticated-user'` means any logged-in user.
- In `@restrict`, a grant with no `to` clause means **any authenticated user** can perform it.
- `Basic <user>:` (empty password) works for mocked users in development.
- The CAP authorization docs: https://cap.cloud.sap/docs/guides/security/authorization

## Stretch Exercise

Add a `@restrict` annotation on the `rename` action in `people-service.cds`:
```cds
@requires: 'Editor'
action rename (newName : String not null) returns People;
```

Then verify that Viewer users cannot call `rename`.
