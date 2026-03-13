# CAP Change Checklist

- [ ] Confirm scope and impacted files are listed
- [ ] CDS lookups/docs were resolved with cds-mcp when CDS/CAP API work was involved
- [ ] Layering respected (`db` vs `*-service.cds` vs `*-fiori.cds` vs JS handlers)
- [ ] Minimal diff with no unrelated formatting churn
- [ ] Rebuild run in `cap/` when CDS changed (`npm run build`)
- [ ] Basic endpoint/service behavior spot-checked
- [ ] Risks and follow-up notes captured
