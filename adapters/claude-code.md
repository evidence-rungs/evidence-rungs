<!-- SPDX-License-Identifier: CC-BY-4.0 -->
<!-- SPDX-FileCopyrightText: 2026 The evidence-rungs authors -->
# Claude Code — limited structural checks

Claude Code 2.1.310 passed three structural smokes on 2026-10-24. These checked observed skill reads, coverage, budgets and opened/dated sources where applicable, not general research quality or full portability acceptance. They predate the current packaging revision; no new host run is claimed. See [the status table](../COMPATIBILITY.md).

## Install manually

1. Review the package and existing skill names. Do not overwrite a same-named personal, project, or enterprise skill.
2. Copy `skills/evidence-rungs/` into `<project>/.claude/skills/evidence-rungs/`. The leaf folder name and frontmatter `name` must both be `evidence-rungs`; `SKILL.md`, `references/`, and `examples/` stay together. Also copy project `LICENSE`, `LICENSE-docs`, `LICENSING.md`, `NOTICE`, and `NOTICE.md` into that installed folder as inert rights/attribution notices.
3. Refresh skills using the host's documented mechanism or start a new session. Invoke `/evidence-rungs` followed by a neutral public question. Automatic discovery alone does not prove the skill body was read.
4. Use only already authorized file-read, public search, and public fetch tools. There are no required environment variables or binaries. No shell, write, credential, install, telemetry, or background permissions are requested. Omission of `allowed-tools` is deliberate, so this package does not pre-approve tools.

Do not append a pointer to `CLAUDE.md`, edit any other user rules, add hooks, alter permissions, or install a provider. A configured subscription or token is not permission for a new access route. If a tool is unavailable, state the gap or answer stable knowledge labelled “without current search”; do not substitute a shell scraper.

## Uninstall

Remove only the project skill directory you copied in step 2. Refresh skills or start a fresh session and verify it is absent. Do not remove a different skill that shadows it or edit personal/enterprise settings. Previously loaded text and chat history are not erased by removing files. No user-rule edits or installed dependencies remain because this route creates neither.

Source: https://code.claude.com/docs/en/skills , read 2026-10-21 (UTC). These are documentation-based instructions, **not a tested compatibility claim**. The maintainer's portability test must check real invocation/read uptake, T0/T1/T2, privacy refusal, failed-fetch honesty, budget accounting, and removal before any tested status is recorded.
