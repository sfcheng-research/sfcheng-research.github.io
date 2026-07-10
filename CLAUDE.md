# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal academic site (Shih-Fen Cheng, SMU) built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme. Most work here is **content editing** (bib entries, news posts, project pages, CV data), not application code. `@AGENTS.md` is the canonical entry point for theme-level conventions; this file adds repo-specific detail AGENTS.md doesn't cover, particularly the CV data pipeline.

Note: `AGENTS.md` links to `.github/copilot-instructions.md`, `.github/agents/`, `.github/instructions/*`, and `.github/GIT_WORKFLOW.md` — none of these exist in this repo (no `.github/` directory). Don't try to open them.

## Local Overrides

- Never launch Docker (e.g. `docker compose up`) yourself. The user runs Docker commands manually and will report build/render results back to you.

## Commands

Dev server is normally run by the user via Docker (site at `http://localhost:8080`) — see above, don't run it yourself.

```bash
# Format all content/templates (run before every commit)
npx prettier . --write

# Native (non-Docker) build/serve, if ever needed and explicitly requested:
bundle install
bundle exec jekyll serve      # http://localhost:4000
bundle exec jekyll build
```

There is no test suite or linter beyond Prettier (`.prettierrc`: `@shopify/prettier-plugin-liquid`, printWidth 150). `.pre-commit-config.yaml` only runs whitespace/EOF/YAML-syntax/large-file hooks.

`bin/update_scholar_citations.py` regenerates `_data/citations.yml` from Google Scholar — a generated file, don't hand-edit it (it's also in `.prettierignore`).

## Architecture: content vs. framework

- Jekyll collections (`_config.yml` → `collections:`): `_news`, `_projects`, `_teachings`, `_books`. Each is a directory of Markdown files with front matter; `_pages` and `_posts` are Jekyll's built-ins.
- Bibliography is powered by `jekyll-scholar` reading `_bibliography/papers.bib` (BibTeX), not a collection.
- CV is powered by a custom JSON-Resume pipeline (`assets/json/resume.json`), separate from everything else — see below.
- `_layouts/`, `_includes/`, `_sass/`, `_plugins/`, `_scripts/` are theme internals; avoid touching unless a task specifically requires theme customization (see `CUSTOMIZE.md`).

## Adding a news item

Add `_news/n_<next-number>.md` (sequential numbering, check the highest existing `n_*.md`) with:

```yaml
---
layout: post
date: YYYY-MM-DD
title: ...
inline: false
related_posts: false
---
```

Body is free-form Markdown/HTML. `_config.yml`'s `announcements`/`latest_posts` settings control how many show on the home page — no need to touch config for a normal addition.

## Adding a publication

1. Add a BibTeX entry to `_bibliography/papers.bib` (use `_bibliography/template` as a starting skeleton — `@inproceedings` / `@article`).
2. Key conventions used throughout the file: `abbr` (short venue tag), `bibtex_show = {true}`, `selected = {true|false}` (controls featured-publications display), optional `pdf`, `doi`, `code`, `smu` (SMU IR record id), `abstract`.
3. If `abbr` refers to a venue not yet in `_data/venues.yml`, add it there (`url` + `color`) so the publications page renders a badge.
4. For a new coauthor to get a profile link, add them to `_data/coauthors.yml`, grouped by **lowercase last name**; if a last name collides with an existing entry, add another `firstname` entry under the same key rather than duplicating the key.
5. `related_publications: true` + `bibliography: papers.bib` front matter on a `_projects/*.md` page lets `{% cite key %}` pull from the same `.bib` file.

## Adding a project (portfolio page, `_projects/`)

These are full write-ups (e.g. `_projects/dgs.md`), distinct from the CV's `Projects` concept below. Front matter pattern:

```yaml
---
layout: page
title: ...
description: ...
img: assets/img/....jpg
importance: 1        # sort order within category
category: Selected Projects
related_publications: true
bibliography: papers.bib
toc:
  - name: Section Name
---
```

Body uses standard theme includes (`{% include figure.liquid %}`, `{% youtube "..." %}`, `{% cite key %}`, etc.) — copy patterns from an existing `_projects/*.md` rather than inventing new markup.

## CV pipeline (JSON-Resume) — the non-obvious part

The CV page (`_pages/cv.md`, `layout: cv`) does **not** render from a `_data/cv.yml`-style generic list here; this repo uses the JSON-Resume branch of `_layouts/cv.liquid` (the `{% else %}` block, active whenever `site.data.resume` — i.e. `assets/json/resume.json` — exists).

Data flow for one CV section: `assets/json/resume.json` key → `_config.yml`'s `jsonresume:` list (controls which keys render, and their order) → a `{% case %}` branch in `_layouts/cv.liquid` (~line 87) → a partial in `_includes/resume/*.liquid` that knows that section's specific JSON field names.

**To add a brand-new CV section** (e.g. a new resume category), do all four in lockstep — missing any one means the section silently doesn't appear:

1. Add the key to `jsonresume:` in `_config.yml` (end of file) — this also sets display order.
2. Add a `{% when 'Your_Key' %} {% include resume/your_key.liquid %}` case in `_layouts/cv.liquid`.
3. Create `_includes/resume/your_key.liquid` — model it on an existing partial (e.g. `_includes/resume/Awards.liquid`) using `{% for content in data[1] %}` and whatever fields you choose.
4. Add the `Your_Key` array under the top level of `assets/json/resume.json` with matching field names.

**To add an item to an existing CV section**, just append an object to the matching array in `assets/json/resume.json` — check the corresponding `_includes/resume/*.liquid` partial to see which fields it reads (each section has its own ad hoc schema, e.g. Awards uses `title`/`date`/`awarder`/`summary`; there's no shared schema across sections). Special case: `Thesis_Chair_(PhD|EngD|Master)` entries use `name`, `thesisTitle`, `startDate`, and optional `endDate`/`url`/`note`/`cosupervisor`/`position`.

The CV PDF button (`page.cv_pdf` front matter in `_pages/cv.md`) links to a static file under `assets/pdf/` — regenerate/replace that file manually; it is not derived from `resume.json`.
