# Fin & Games Website

This branch is the studio-first redesign of the Fin & Games website.

## Structure

- `/` studio homepage
- `/games` game catalogue
- `/games/caravan-park-tycoon` Caravan Park Tycoon hub
- `/games/caravan-park-tycoon/development` game-specific devlogs
- `/games/caravan-park-tycoon/features` features
- `/games/caravan-park-tycoon/roadmap` roadmap
- `/games/caravan-park-tycoon/expansions` expansion area
- `/blog` studio-wide blog
- `/news` major announcements
- `/about` studio information
- `/support` support
- `/npc-builder` community/NPC prototype

The key rule is that Fin & Games is the parent studio. A game gets its own section and content history without taking over the studio site. Future games can be added under `/games/<slug>`.

## Content model

Game development logs belong in:

`src/content/games/<game-slug>/devlogs/`

Studio articles belong in:

`src/content/blog/`

Major announcements belong in:

`src/content/news/`

Drafts for the automated game-devlog pipeline belong in:

`src/content/drafts/games/<game-slug>/`

The old test devlogs were deliberately removed from this branch.

## Local development

Requires Node 22.12+.

```
npm ci
npm run dev
npm run build
```

The branch is intended for visual review before production changes are merged.
