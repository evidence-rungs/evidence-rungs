<!-- SPDX-License-Identifier: CC-BY-4.0 -->
<!-- SPDX-FileCopyrightText: 2026 The evidence-rungs authors -->
# evidence-rungs

**0.1.0 — vollständige Portabilitätsabnahme offen. Begrenzte Prüfungen siehe unten.**

Eine Recherchehilfe für einen vorhandenen KI-Assistenten: kleine Budgets, zuerst Rechtsraum und Quellenrolle klären, persönliche Daten vor der Suche entfernen und Zugangslücken offen nennen. Keine neue Suchmaschine, kein Überlegenheitsversprechen, keine Rechts- oder Medizinberatung und keine Sandbox.

## Start und Entfernen

Den Ordner `skills/evidence-rungs/` samt Referenzen und Beispielen in das dokumentierte Projektverzeichnis kopieren, dazu `LICENSE`, `LICENSE-docs`, `LICENSING.md`, `NOTICE` und `NOTICE.md` aus dem Paket. Nie einen gleichnamigen Skill überschreiben. Pfade und Aufruf stehen im [englischen README](README.md). Claude Code 2.1.310 bestand drei begrenzte Strukturproben vom 2026-10-24. Kilo 7.8.15 wurde installiert und las den Skill; sein Suchverhalten ist ungeprüft. Codex, Cursor und OpenCode sind nicht geprüft. Das ist keine allgemeine Kompatibilitäts- oder Qualitätsfreigabe; vollständige Portabilitätsabnahme bleibt offen.

Beispielfrage: **„Erkläre mit evidence-rungs den Unterschied zwischen Holzschnitt und Kupferstich anhand von Museumsseiten. Welche Flächen der Druckform tragen die Farbe?“** Eine erfundene kunstgeschichtliche Lernaufgabe, keine Anleitung zur Restaurierung.

Deinstallation je nach gewählter Variante: `<workspace>/skills/evidence-rungs/` bei OpenClaw, `<project>/.claude/skills/evidence-rungs/` bei Claude Code oder die angehängte Skill-Datei im anderen Host entfernen. Diese Pfade bezeichnen ausschließlich die zuvor angelegte Paketkopie. Anschließend den Skill-Katalog in einer frischen Sitzung prüfen. Die Installationswege benötigen weder einen Eintrag in `AGENTS.md` oder `CLAUDE.md` noch einen Anbieterwechsel.

Suchanfragen gehen an den selbst konfigurierten Anbieter. **Niemals persönliche Daten in Suchanfragen oder URLs geben.** Der Modellanbieter kann die ursprüngliche Frage bereits gesehen haben. Kostenlose Suchdienste können drosseln; eine nicht erreichbare Seite bedeutet nicht, dass es etwas nicht gibt.

Österreich ist ein optionales Quellenpaket, kein Standardrechtsraum und kein geprüfter Expertenatlas. Neue Regionen über [TEMPLATE](skills/evidence-rungs/references/regions/TEMPLATE.md) und [Beitragsregeln](CONTRIBUTING.md): Herkunft, Datum, Rechtsraum und Reviewer angeben; nur Links und eigene Beschreibungen.

Das vollständige Exportpaket prüft `node --test tests/package.test.mjs` mit Node ab Version 22, ohne Netzwerk, Anbieter oder Installation. Geprüft werden Paketstruktur, Hashes, interne Links, Lizenzhinweise und ausgewählte Privatdatenmuster, nicht Recherchequalität. **Quelle geöffnet ≠ Aussage wahr.** Ein offener Übungssatz ist geplant; v0.1 enthält keine Leistungszahlen.

Eigener Code: MIT; eigene Texte und Quellenkarten: CC BY 4.0. Siehe [Lizenzumfang](LICENSING.md) und [Ideengeber](NOTICE).
