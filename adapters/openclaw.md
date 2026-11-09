<!-- SPDX-License-Identifier: CC-BY-4.0 -->
<!-- SPDX-FileCopyrightText: 2026 The evidence-rungs authors -->
# For OpenClaw — untested

Independent compatibility instructions, not an official product or endorsement. No runtime installation or portability test has been performed for this package. [Compatibility](../COMPATIBILITY.md).

## Install manually

1. Review the whole project. Verify that no `evidence-rungs` skill already exists in the chosen workspace or overrides it from another root; do not overwrite one.
2. Copy the **contents and directory** `skills/evidence-rungs/` into `<workspace>/skills/evidence-rungs/`. The result must be `<workspace>/skills/evidence-rungs/SKILL.md`, with sibling `references/` and `examples/`. Copy project `LICENSE`, `LICENSE-docs`, `LICENSING.md`, `NOTICE`, and `NOTICE.md` into that same installed folder so the rights status and acknowledgements travel with it. These are inert notices, not extra instructions or permissions. Do not install the project root as a skill.
3. Let normal skill discovery refresh, or start a new session. Ask for the discovered `evidence-rungs` skill explicitly; use the host's skill picker if offered. Check the actual full-skill read before research, not just its appearance in a catalog.
4. Existing authorized skill-file read, public search, and public fetch tools are sufficient. No environment variables, binaries, credentials, shell, write access, plugins, services, installer metadata, or extra permissions are required. No `allowed-tools` grant is requested; host permissions remain authoritative.

Do not edit your agent rules, tool allowlists, provider settings, or shared state to install this text. Preserve higher-priority safety rules and explicit extended-research triggers. Missing tools mean a stated limitation, not an automatic setup task. A user-owned restrictive skill allowlist may prevent discovery; changing it requires separate review and is not part of these instructions.

## Uninstall

Remove only `<workspace>/skills/evidence-rungs/` that you installed in step 2. Do not remove a pre-existing or differently owned folder. Start a fresh session: text already loaded into a conversation may remain in its history. Because installation never edits user rules or configuration, there is no rule edit to undo. Confirm the skill no longer appears in the new session. No persistent service, tracking data, or background job is created by this package.

Format and discovery references, read 2026-10-21: https://agentskills.io/specification ; https://docs.openclaw.ai/tools/skills ; https://docs.openclaw.ai/clawhub/publishing . Registry validation and automated security checks are not proof of research quality; no registry action is part of this installation.
