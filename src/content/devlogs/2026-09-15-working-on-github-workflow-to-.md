---
title: "Soggy Chips & Automated CI/CD: Streamlining Our Devlog Pipeline"
description: "How we hooked up GitHub Actions to automate our devlog workflow, freeing up more time to fix leaky static caravan roofs in Godot."
pubDate: "2026-09-15"
author: "Fin & Games Team"
draft: false
tags: ["caravan-park-tycoon", "devlog", "simulation"]
---

## Less Time Writing Markdown, More Time Fixing Bingo Halls

When you're building a niche management sim set on the drizzly, wind-swept coast of North Wales, every minute spent manually formatting blog posts and copying static files across repositories is a minute *not* spent perfecting the AI for disappointed holidaymakers queuing for lukewarm tea. 

Up until this week, publishing a devlog meant manually drafting posts, building our site assets, validating frontmatter tags, and double-checking that image paths relative to the Godot engine repository were intact. It was clunky, error-prone, and distracting us from core development on *Caravan Park Tycoon*. 

To fix this, we spent the last few days building a dedicated GitHub Actions workflow to fully automate our update pipeline directly from our main game repo.

## The Systems Architecture: GitHub Actions Meets Static Publishing

Our new automation pipeline relies on a custom GitHub Action triggered whenever a release candidate is tagged or a specific PR label (`devlog-ready`) is merged into the `main` branch.

Here is a breakdown of how the workflow operates under the hood:

1. **Content Extraction & Parsing**: A custom Python script scans the target release branch for structured markdown files inside `docs/devlogs/`. It validates the YAML frontmatter against a strict schema (ensuring titles, publish dates, and tags match our website requirements).
2. **Asset Synchronization**: Game screenshots and UI previews captured directly from Godot's automated build tests are pulled, optimized via `optipng`/`webp` wrappers, and pushed to our public Web CDN bucket.
3. **Automated Site Trigger**: Upon successful validation, the workflow dispatches a `repository_dispatch` event to our public website repo, pushing the generated entry live without manual intervention.

```yaml
name: Deploy Devlog Entry
on:
  pull_request:
    types: [closed]
    paths:
      - 'docs/devlogs/**'

jobs:
  publish-devlog:
    if: github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'devlog-ready')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate Frontmatter & Publish
        run: |
          python .github/scripts/parse_devlog.py
```

## Design Decisions: Why Automate Engine-Adjacent Tools?

As a small indie team working with Godot, context switching is our biggest productivity killer. Switching between GDExtension C++ code, GdScript UI logic, and web deployment code disrupts momentum.

By moving our publication process directly into the source control system where we write game code, writing a devlog now feels like writing code documentation. We can draft updates alongside feature branches: when a developer finishes coding the dynamic arcade token economy system, they draft the corresponding devlog in the exact same branch. Once reviewed and merged, the post goes live automatically.

This keeps our patch notes grounded in actual code changes and ensures our updates stay consistent without taking time away from game design.

## What's Next for Caravan Park Tycoon

Now that our devlog pipeline is running smoothly on autopilot, we're diving right back into engine-land. Here is what we're tackling over the coming sprint:

* **Dynamic Weather & Awning Physics**: Fine-tuning how heavy gale-force coastal rain interacts with awning canvas physics built using Godot's 2D SoftBody nodes.
* **Guest Noise Complaint System**: Implementing spatial audio zones so late-night bingo callers in the main clubhouse don't disturb guests sleeping in the luxury static vans on Hilltop Avenue.
* **Arcade Cab Management**: Designing the layout tool for arranging penny pusher machines and crane games to maximize guest frustration—and profit.

Thanks for following along, and keep an eye out for our next automated devlog dropping very soon!