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

## Studio blog editorial workflow

- Published studio articles live in `src/content/blog/`.
- Keep rough, unpublished drafts in `src/content/drafts/blog/`; this directory is outside the published content collection.
- Optional article cover images use `coverImage` and `coverAlt` in frontmatter. Store public images under `public/images/blog/` and reference them with paths such as `/images/blog/article-name/cover.jpg`.
- Inline JPG and PNG images can be embedded with standard Markdown image syntax. See `public/images/blog/README.md` and `public/images/devlogs/README.md`.
- The one-pass editorial helper is `scripts/polish-article.mjs`. Run it with Node 22.12+ and a Gemini API key:
  `GEMINI_API_KEY=... node scripts/polish-article.mjs src/content/drafts/blog/my-draft.md`
- The helper makes one text-generation call, preserves YAML frontmatter, and writes a separate `.edited.md` file without overwriting the source. Review all edits before moving an article into a published content collection.
- The editorial helper does not publish content, research facts, or generate images. Never commit API keys.
