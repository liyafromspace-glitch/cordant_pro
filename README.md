# Cordant Continuous Authority Assurance prototype

Run the prototype:

```bash
npm run dev
```

Then open `http://127.0.0.1:4317`.

The working flow includes incident investigation, authority lineage, timeline replay, evidence states, blast radius, remediation compilation, two-person approval, external execution, independent verification and portfolio coverage.

Keyboard controls:

- `R`: replay the incident reconstruction
- `E`: show or hide evidence labels
- `1`–`5`: move between workflow stages

Post-build UI evaluation:

```bash
npm run eval:ui
```

Then open `http://127.0.0.1:4317/evals/ui-evals.html`. The harness checks viewport overflow, card bounds, evidence-overlay collisions, focus tooltips, workflow navigation and approval invalidation.

Reusable UI foundations live in `src/tokens.css`, `src/components.css` and `src/ui-library.js`. See `DESIGN_SYSTEM.md` and `INTERACTIONS.md` for component and behavior specifications.
