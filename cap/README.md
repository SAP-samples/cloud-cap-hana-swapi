# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
--------- | ---------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).

## Learn More

Learn more at <https://cap.cloud.sap/docs/get-started/>.

## Runtime Profiles in This Project

- **Default / development**: SQLite (`db.sqlite`) with `db/sqlite` model extensions.
- **hybrid** (`npm run watch`): HANA + `db/hana` model extensions (preferred local integration profile).
- **pg** (`npm run pg`): PostgreSQL + `db/postgres` model extensions.
- **production**: HANA + `db/hana` model extensions.

## CDS Configuration Notes

- `cds.requires.queue: true` is intentional (persistent outbox queue).
- `cds.requires.middlewares: true` is intentional (CAP middleware chain enabled).
- PostgreSQL credentials are intentionally **not hardcoded** in `package.json`; provide them via `.env` (see `cap/.env`).

## Validation Commands

- Run full model tests: `npm run test`
- Run profile-scoping regression tests only: `npm run test:profile`
- CI tip: use `npm run test:profile` as a fast gate for profile-specific model/service exposure checks.

## Upgrade Notes

- **Breaking change**: legacy value-help helper endpoints were removed in favor of `*Values` entities.
- If your UI/integration code called legacy endpoints directly, update it using:
  - `docs/value-help-migration.md`
