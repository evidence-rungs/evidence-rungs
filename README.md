<!-- SPDX-License-Identifier: CC-BY-4.0 -->
<!-- SPDX-FileCopyrightText: 2026 The evidence-rungs authors -->
# evidence-rungs

A research method your existing AI assistant reads to open original sources, date them, choose the right country or version, and say what it could not verify.

A search result can look convincing while pointing to another country's rules or an older product version. This skill asks the assistant to check the original page before relying on it and keep missing evidence visible. The “rungs” are effort levels: use no search for stable calculations, and spend more only when the question needs it. No new service, key, hooks, or provider configuration is needed. [Deutsch](README.de.md).

## Before / after (invented example)

**Question:** “Can I return an online purchase in Country A?”

**Before:** “Yes, within 30 days.” The only support is an unopened search hit about Country B.

**With the method:** “Country A's consumer authority describes a 14-day period for the covered purchases (original page opened; updated 2026-10-01). I could not open the exceptions page, so I cannot verify whether your purchase qualifies.”

Every country, rule and date above is invented. This illustrates intended behavior, not a measured result. **Source opened ≠ claim true.** The claim still needs checking against the page's actual scope and wording.

**0.1.0 — full portability acceptance pending. See the limited checks below.**

All package review dates and timestamps use UTC. Date-only source/version labels retain their stated precision; no clock time is inferred for them.

## Who it is for

People who already use an assistant with approved search and page-reading tools, and want a repeatable way to answer a current fact question, compare options, or check a procedure. It asks the assistant to choose sources for their role rather than their ranking, open the evidence behind important claims, and stop when the evidence or budget runs out.

It does **not** establish that this method is better than plain search, another skill, or any commercial product. It is not legal or medical advice, a security sandbox, a privacy enforcement layer, an autonomous service, or a replacement for specialist judgment. Text instructions cannot guarantee model compliance.

## Install and try it

1. Review this package and your host's tool permissions. The actual skill folder is `skills/evidence-rungs/`; keep that directory name equal to `name: evidence-rungs` in its `SKILL.md`.
2. Choose **one** host below. From a reviewed package, copy `skills/evidence-rungs/` and all its references/examples to the listed project location. Copy the project's `LICENSE`, `LICENSE-docs`, `LICENSING.md`, `NOTICE`, and `NOTICE.md` into that installed folder too. Keep the notices with the skill; copying only `SKILL.md` is incomplete. Never overwrite a same-name skill. No installer is required.
3. Ask: **“Use evidence-rungs to explain the difference between woodcut and copperplate engraving, using a museum's educational collection pages. Identify which printing surfaces hold the ink.”** This is an invented art-history learning task, not conservation advice. The same topic appears in the German quick start and the synthetic source-navigation example.
4. Check that the full skill was actually loaded, relevant references were read, tool calls stayed within the budget, and a failed page fetch was reported as a gap. A discovered skill name alone is not proof of use.

| Host | Project location and invocation | Checked / not checked |
|---|---|---|
| Claude Code 2.1.310 | `.claude/skills/evidence-rungs/`; new session, then `/evidence-rungs` and your question. [Details](adapters/claude-code.md) | Checked: three limited structural smokes passed on 2026-10-24, including observed reads and source-opening/date checks where applicable. Not checked: broad research quality or full portability acceptance. |
| Kilo 7.8.15 | `.kilo/skills/evidence-rungs/`; reload or start a new session, then request the skill by name. | Checked: installed and skill read in an isolated project. Not checked: search behaviour; search/fetch were disabled in that check. |
| Codex | `.agents/skills/evidence-rungs/`; select `$evidence-rungs` or `/skills`, restart if discovery needs it. | Not checked: install, invocation, research behaviour and removal. Documentation-based route only. |
| Cursor | `.cursor/skills/evidence-rungs/`; select `/evidence-rungs` in a new session. | Not checked: install, invocation, research behaviour and removal. Local discovery does not establish cloud-agent support. |
| OpenCode | `.opencode/skills/evidence-rungs/`; current V2 documentation describes `@evidence-rungs`. | Not checked: install, invocation, research behaviour and removal. Syntax is version-sensitive. |

For OpenClaw and session-only attachment, see the [OpenClaw](adapters/openclaw.md) and [generic](adapters/generic.md) notes; those routes are untested. **Uninstall:** remove only the skill directory and notices you copied, detach any session attachment, then start a fresh session and check that the skill is no longer discovered. Removing files does not erase chat history or already loaded text.

No route edits `AGENTS.md`, `CLAUDE.md`, other user-authored rules, provider configuration, or permissions. Installation adds no executable hooks, dependency install, credential setup, telemetry, persistent log, or background job. Search/fetch must already be authorized and available. If your host requires a configuration change, review that separately. See [COMPATIBILITY.md](COMPATIBILITY.md) for dated evidence and the checks still missing.

Try the invented examples: [no search needed](skills/evidence-rungs/examples/01-stable-calculation.md), [original-source navigation](skills/evidence-rungs/examples/02-official-procedure.md), [version comparison](skills/evidence-rungs/examples/03-version-comparison.md), or [an honest access gap](skills/evidence-rungs/examples/04-incomplete-evidence.md).

## Privacy and access

Queries go to **whatever search provider you configure**; fetched URLs go to their destination hosts. Your assistant/model provider may already have received the original question. Local files and local execution do not mean that all processing stays local.

**Never put personal data in queries or URLs.** Remove private names, contact details, account identifiers, private paths, health/financial facts, and rare identifying combinations first. Ask a generic public question, then apply private constraints to results without transmitting them. Keep private documents local; this text-only skill does not inspect profiles or enforce network isolation.

Use only tools and access routes you are authorized to use. No login, CAPTCHA, paywall, quota, or access-control bypass. Free search tiers rate-limit and may change. A block, timeout, empty extraction, or unavailable provider is not evidence that something does not exist. State which sources were read, which were snippets only, and what could not be checked. [Dated public-source notes](skills/evidence-rungs/references/free-sources.md) are starting points, not service guarantees or redistribution licenses.

## Austria and other regions

The optional Austrian pack contains link-and-role references for law/administration, consumer rights, health, technology, science, purchases and community discovery. It is **not the default jurisdiction**, a complete atlas, an expert certification, or a measured benefit. The cards retain their earlier review dates; no independent reviewer is recorded for the inherited cards. Recheck current rules and access before relying on them.

To propose another region, start with [TEMPLATE](skills/evidence-rungs/references/regions/TEMPLATE.md) and [CONTRIBUTING.md](CONTRIBUTING.md). Supply provenance, date, jurisdiction, reviewer, and maintenance responsibility. Submit links and your own descriptions only; no copied articles, official logos, documents, forum exports, or paywall text.

## Evaluate it yourself

From the complete exported package, run `node --test tests/package.test.mjs` with Node 22 or newer. No install, network, provider, credentials or private helpers are needed. The suite checks the file inventory, manifest hashes, internal links, licence notices and selected private-content patterns, with negative controls. It cannot prove that every private detail is absent. The included `.github/workflows/test.yml` runs the same checks; no hosted run or green CI badge is claimed.

These are artifact checks, not host tests or a research-quality evaluation. **Source opened ≠ claim true.** Dates and successful access alone do not establish that a passage supports a claim.

**Open practice set: planned.** No tasks, scores, performance numbers, or benchmark claims are included in v0.1. The invented [examples](skills/evidence-rungs/examples/01-stable-calculation.md) illustrate expected process, not measured success. A future small, separately licensed public set should compare method on/off using the same model, tools, evidence version, and budgets, with failures and access gaps retained. It will not establish universal superiority or replace independent host testing.

## Licensing and acknowledgements

Original code is licensed under MIT; original prose, instructions, examples and source-card descriptions under CC BY 4.0. Copyright (c) 2026 The evidence-rungs authors. Linked third-party works and services retain their own rights. Executable files are offline artifact tests; the skill installs no executable hooks. No evaluation dataset is included. See [LICENSE](LICENSE), [LICENSE-docs](LICENSE-docs), and [NOTICE](NOTICE).

Ideas from Anthropic's cookbooks, STORM, NVIDIA AI-Q, Jina DeepResearch, Onyx, and K-Dense informed the method. They are not dependencies or endorsements. No third-party method text or code is copied; standard license wording is included as such. See [NOTICE](NOTICE) for exact component/license findings and [NOTICE.md](NOTICE.md) for acknowledgements. [Security/privacy reporting](SECURITY.md) and [changelog](CHANGELOG.md).
