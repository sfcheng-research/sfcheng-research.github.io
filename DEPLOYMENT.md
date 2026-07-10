# Setting up GitHub Actions to build and publish `sfcheng-research-src` → `sfcheng-research.github.io`

## 0. Prerequisites

- You have push access to both `sfcheng-research/sfcheng-research-src` and `sfcheng-research/sfcheng-research.github.io`.
- `sfcheng-research.github.io`'s GitHub Pages is configured under **Settings → Pages** to deploy from a branch (this guide assumes `main`).

## 1. Create a deploy credential

The default `GITHUB_TOKEN` in a workflow can only write to the repo the workflow runs in. Since you're pushing to a **different** repo, you need a token with write access to `sfcheng-research.github.io`.

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Set:
   - **Resource owner**: `sfcheng-research`
   - **Repository access**: "Only select repositories" → `sfcheng-research.github.io`
   - **Permissions**: Repository → **Contents: Read and write**
3. Set an expiration (e.g. 1 year) — you'll need to rotate it before it expires.
4. Copy the generated token now; you won't see it again.

## 2. Add the token as a secret in the source repo

1. In `sfcheng-research-src`: **Settings → Secrets and variables → Actions → New repository secret**.
2. Name: `PAGES_DEPLOY_TOKEN`
3. Value: the token from step 1.

## 3. Add the workflow file

Create `.github/workflows/deploy.yml` in `sfcheng-research-src`:

```yaml
name: Build and Deploy Jekyll Site

on:
  push:
    branches: [main]
  workflow_dispatch: {}

concurrency:
  group: pages-deploy
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Install system dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y imagemagick python3-pip
          pip3 install --break-system-packages nbconvert

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.3"
          bundler-cache: true

      - name: Build site
        env:
          JEKYLL_ENV: production
        run: bundle exec jekyll build

      - name: Deploy to sfcheng-research.github.io
        uses: peaceiris/actions-gh-pages@v4
        with:
          personal_token: ${{ secrets.PAGES_DEPLOY_TOKEN }}
          external_repository: sfcheng-research/sfcheng-research.github.io
          publish_branch: main
          publish_dir: ./_site
          user_name: "github-actions[bot]"
          user_email: "github-actions[bot]@users.noreply.github.com"
```

Notes on choices here, specific to this repo:

- `ruby-version: "3.3"` — the `Dockerfile` uses unpinned `ruby:slim`; `Gemfile.lock` doesn't pin a Ruby version either, only `bundler 4.0.4`. Pinning `3.3` here gives a stable, reproducible CI build; bump it if you deliberately upgrade Ruby later.
- `bundler-cache: true` lets `ruby/setup-ruby` run `bundle install` and cache gems automatically — this also handles the `jekyll-terser` gem, which is fetched from a git URL (git is preinstalled on `ubuntu-latest` runners, so no extra setup needed).
- `imagemagick` and `nbconvert` are installed explicitly because `jekyll-imagemagick` and `jekyll-jupyter-notebook` need them at build time — these come straight from the `Dockerfile`'s `apt-get`/`pip` lines.
- `peaceiris/actions-gh-pages` writes a `.nojekyll` file into the published output by default, so GitHub Pages serves the pre-rendered HTML as-is instead of re-running Jekyll on it.
- `publish_branch: main` — **verify this matches** whatever branch `sfcheng-research.github.io`'s Pages settings actually deploy from before running this for real.

## 4. Test before trusting it

1. Commit and push `.github/workflows/deploy.yml` to `sfcheng-research-src` on a **branch**, or push straight to `main` if you're comfortable — the first run's failure modes (missing gem, missing system lib) are cheap to iterate on.
2. Watch the run under `sfcheng-research-src` → **Actions** tab.
3. If it succeeds, check `sfcheng-research.github.io`'s commit history — you should see a new commit from `github-actions[bot]` with the rendered `_site` contents.
4. Visit `https://sfcheng-research.github.io` and confirm the change is live (GitHub Pages typically takes 1-2 minutes after the push to redeploy).

## 5. Retire the manual Docker-copy step

Once you trust the pipeline, you no longer need to manually copy `_site` and push it yourself — just push to `sfcheng-research-src`'s `main` and the workflow does it. You can still keep using `docker compose up` locally for **previewing** changes before you push (that part of the workflow doesn't need to change).

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `bundle install` fails on `jekyll-terser` | Git not available or network-restricted runner — shouldn't happen on standard `ubuntu-latest`, but check the Actions log for the exact git error |
| Build fails in `jekyll-imagemagick` / `jekyll-jupyter-notebook` step | The `apt-get install` or `pip3 install` step didn't run before the build step, or `pip3` needs `--break-system-packages` on newer Ubuntu images (already included above) |
| Push to `sfcheng-research.github.io` fails with 403/404 | PAT doesn't have access to that repo, wrong `external_repository` org/name, or the fine-grained token expired |
| Site deploys but CSS/JS/images 404 | `url`/`baseurl` mismatch in `_config.yml` — currently set correctly (`url: https://sfcheng-research.github.io`, `baseurl:` blank), so this shouldn't occur unless someone edits those |
| GitHub Pages still shows old content after a few minutes | Check Pages source branch in `sfcheng-research.github.io` settings actually matches `publish_branch` above |
