using { StarWarsFilm } from './film-service';
using { StarWarsPeople } from './people-service';
using { StarWarsPlanet } from './planet-service';
using { StarWarsSpecies } from './species-service';
using { StarWarsStarship } from './starship-service';
using { StarWarsVehicle } from './vehicle-service';

// ─── Showcase: Service-Level Access ──────────────────────────────────────────
// All services are currently public (@requires: 'any') — no login required.
//
// To restrict access, change 'any' to:
//   'authenticated-user'        → any logged-in user
//   'Viewer'                    → only users with the Viewer role
//   ['Viewer', 'Editor']        → any user with at least one matching role
//
// Mock users for local development (add to package.json cds.[development].requires.auth):
//
//   "auth": {
//     "kind": "mocked",
//     "users": {
//       "viewer@test.com": { "roles": ["Viewer"] },
//       "editor@test.com": { "roles": ["Editor"] },
//       "admin@test.com":  { "roles": ["Admin", "Editor"] }
//     }
//   }
//
// Role matrix for this showcase:
//   Viewer  → read-only access to all services
//   Editor  → read + create/update People (the only writable entity)
//   Admin   → full access: read, create, update, and delete across all services
// ─────────────────────────────────────────────────────────────────────────────

annotate StarWarsFilm with @(requires: 'any');
annotate StarWarsPeople with @(requires: 'any');
annotate StarWarsPlanet with @(requires: 'any');
annotate StarWarsSpecies with @(requires: 'any');
annotate StarWarsStarship with @(requires: 'any');
annotate StarWarsVehicle with @(requires: 'any');

// ─── Showcase: Entity-Level Role Restrictions ─────────────────────────────────
// People is the only writable entity in this showcase (all others are @readonly).
//
// The @restrict annotation declares granular privileges per OData event.
// When the service above uses @requires: 'any', these become effective only for
// authenticated sessions. To fully enforce, change the service-level @requires
// to 'authenticated-user' (see comment above).
//
// To activate role-based access on People, uncomment the block below
// AND change StarWarsPeople @requires to 'authenticated-user':
//
//   annotate StarWarsPeople.People with @(restrict: [
//     { grant: 'READ' },                                        // Viewer: any user can read
//     { grant: ['CREATE', 'UPDATE'], to: ['Editor', 'Admin'] }, // Editor+Admin can write
//     { grant: 'DELETE', to: 'Admin' }                          // Admin-only deletes
//   ]);
//
// Instance-level restriction example (users can only modify their own records):
//   annotate StarWarsPeople.People with @(restrict: [
//     { grant: 'READ' },
//     { grant: ['UPDATE'], where: 'CreatedBy = $user' },
//     { grant: ['CREATE', 'DELETE'], to: 'Admin' }
//   ]);
