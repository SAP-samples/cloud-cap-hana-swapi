# Hands-on Labs

Five self-contained exercises that build on each other. Each lab has a **goal**, **steps**, and an **expected outcome** you can verify by running the tests.

| Lab | Title | Concepts | Time |
|-----|-------|---------|------|
| [Lab 01](lab-01-model/README.md) | Extend the Domain Model | Entities, types, associations | ~20 min |
| [Lab 02](lab-02-service/README.md) | Create a Service Projection | Service definitions, projections, @readonly | ~20 min |
| [Lab 03](lab-03-handler/README.md) | Add Handler Logic | before/on/after hooks, validation | ~30 min |
| [Lab 04](lab-04-auth/README.md) | Role-Based Authorization | @requires, @restrict, roles | ~20 min |
| [Lab 05](lab-05-testing/README.md) | Test by Layer | Model tests, handler tests, assertions | ~30 min |

## Prerequisites

- Node.js >= 20 installed
- `npm install` completed in `cap/`
- Basic familiarity with JavaScript and JSON

## How to use these labs

1. Read the lab README in full before starting.
2. Make changes to the files listed in the lab.
3. Run `npm run test` or the specific command given in the lab to verify.
4. If stuck, check the **Hints** section at the bottom of each lab.

## Starting fresh

Each lab builds on the existing codebase. If you want to experiment safely:

```bash
git stash          # save your changes
# ... work on the lab ...
git stash pop      # restore when done
```
