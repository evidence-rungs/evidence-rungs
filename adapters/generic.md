<!-- SPDX-License-Identifier: CC-BY-4.0 -->
<!-- SPDX-FileCopyrightText: 2026 The evidence-rungs authors -->
# Generic hosts — untested

Required: an assistant that follows text instructions and can read selected skill files. Current research additionally requires already authorized public search/fetch tools. No particular provider, model, endpoint, credential, binary, environment variable, persistence, or service is supplied.

## Install or attach

Use **one** of these non-invasive routes:
- Agent Skills host: copy the reviewed `skills/evidence-rungs/` folder into its documented local skill catalog, without overwriting another skill. Keep the leaf directory equal to frontmatter `name`. Copy project `LICENSE`, `LICENSE-docs`, `LICENSING.md`, `NOTICE`, and `NOTICE.md` into that installed folder as inert rights notices.
- Session-only host: attach `skills/evidence-rungs/SKILL.md` and only the references needed for a neutral question, preserving relative link context or resolving those files explicitly. Do not attach private profile files or the entire host workspace. If the host cannot read/resolve references, say so; do not claim the full skill works.

Retain the project's license/provenance notices with the reviewed session materials. They describe adopted rights, not permission to bypass your host's controls.

Do not edit an agent rule file or insert a persistent instruction pointer. Ask the host to use the selected skill this session. Name/description are for discovery; the full body must be read before use. No new permissions are granted by the metadata. Keep host-specific tool names out of the core.

Count searches, retries, API calls, fetches, and file reads against the first exhausted limit. Preserve jurisdiction and the distinction between failed access and a successful empty search. Generate coverage from observed actions. T4 needs an explicit user-authorized host workflow; no such service is supplied here.

## Uninstall

Detach the session attachment, or remove only the exact folder/catalog entry created for this skill, then start a fresh session. Do not delete another entry or edit user rules. Loaded conversation text/history may remain; removal is not historical erasure. This installation makes no rule edits, background jobs, dependencies, logs, or telemetry to clean up.

The package is not an OS/network sandbox or a model-compliance guarantee. Until independently tested with the actual host/version, installation, read uptake, failure behavior, and uninstall remain untested. See [COMPATIBILITY.md](../COMPATIBILITY.md).
