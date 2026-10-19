# Owner deployment priorities — 19 October 2026

This order supersedes Clinical Massage-first planning. Shared infrastructure essentials are prerequisites, not a change in product priority.

| Priority | Apps |
|---|---|
| 1 | Reign Services / StarseedCodex + M3d1t8 |
| 1.5 | ZeroPoint Cartel + TachyonEdge |
| 2 | TachyonOS |
| 2.5 | Startup Alchemist |
| 3 | Roadrunner |
| 4 | Venture Command |
| 5 | LaunchWorks |
| 6 | Segment[aI] |
| 7 | Whip.rip |
| 8 | TachyonBuilt OpX |
| 9 | Remaining apps deferred for owner review |

Priority-1 repository inventory: Reign candidate reignservices-frontend; StarseedCodex sacred-pathways-ascension-tracker. M3d1t8 has not yet been matched to a repository. Preserve dev/staging/main promotion controls. Do not run Starseed build directly against production: its current build script includes db:migrate.

Infrastructure last verified: txl-oci-app01 in Phoenix AD-1, 2 OCPU/12GB RAM/100GB, Ubuntu 24.04 ARM64. Six core containers running. Five private databases created, client isolation negative tests still pending. Encrypted backup copied to Starlight and restored into an isolated PostgreSQL container; all five databases present. Temporary restore container subsequently removed. Recurring backups, cloud network rules, DNS/TLS, alert delivery, Venture Command management API and application deployment acceptance remain pending.
