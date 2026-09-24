# Fin & Games Marketing Engine
## Initial Specification v0.1

**Status:** Initial architecture/specification  
**Branch:** `marketing-engine`  
**Repository:** `sharker-uk/finandgamesv2`

## 1. Purpose

The Marketing Engine turns Fin & Games development activity into reusable, platform-specific marketing campaigns.

The system must support the whole studio rather than being hard-coded to Caravan Park Tycoon. A campaign may originate from a game devlog, studio blog post, news item, release/update announcement, screenshot set, gameplay clip, or manually created campaign.

The first implementation should prioritise reliable content generation and human approval. Fully autonomous publishing is a later phase.

## 2. Goals

- Turn one source item into multiple useful marketing assets.
- Keep Fin & Games as the studio-level brand.
- Keep game-specific marketing associated with the correct game.
- Reuse the same engine for future games.
- Generate platform-appropriate copy rather than duplicating one post everywhere.
- Generate an auditable campaign record before publishing.
- Keep secrets/API credentials out of Git.
- Make platform integrations replaceable.
- Support human review and approval.
- Preserve links back to the Fin & Games website.

## 3. Non-goals for v0.1

- Fully autonomous public posting.
- Paid advertising.
- Social analytics optimisation.
- AI-generated fake gameplay presented as real gameplay.
- Automatic engagement/replies.
- Automatic following, liking, or commenting.
- Building a separate marketing website.
- Making the engine dependent on one social platform.

## 4. Source content model

Supported source types:

1. Game devlog
2. Studio blog
3. News/announcement
4. Game feature
5. Roadmap update
6. Screenshot/image collection
7. Gameplay video
8. Manual campaign brief

Each source should expose enough context for the engine to understand:
- studio
- game, if applicable
- title
- summary
- canonical URL
- publication status/date
- tags
- supplied media
- intended campaign objective

## 5. Campaign model

Each campaign should have a stable ID and contain:

- campaign metadata
- source reference
- game reference, optional
- objective
- target audience
- campaign theme
- key messages
- website destination
- generated assets
- platform variants
- approval state
- publication state
- publication timestamps
- external platform IDs where available
- errors/retry state

Suggested lifecycle:

`draft -> generated -> review -> approved -> queued -> published`

Alternative terminal states:

`rejected`, `failed`, `cancelled`

## 6. Content generation

For each campaign, generate platform-specific variants.

Initial text outputs:

- Bluesky post
- X post
- Discord announcement
- Pinterest title/description
- YouTube title/description
- TikTok caption
- optional Instagram/Facebook copy for future integration

The generator must:
- remain factually grounded in the source material
- never invent gameplay/features/releases
- retain the correct game and studio names
- avoid repetitive wording
- use platform-appropriate length and style
- include the canonical website destination where appropriate
- avoid claiming that AI-generated material is actual gameplay
- allow human editing before approval

## 7. Content series

The system should support reusable campaign templates/series, including examples such as:

- Park Progress
- Caravan of the Week
- From Field to Holiday Park
- Under the Bonnet
- Bug of the Week
- British Holiday Park Things
- Bob Watch

Series must be configuration, not hard-coded application logic.

## 8. Media

v0.1 should accept existing screenshots and video supplied by the developer.

Future media generation should support:
- platform-specific image crops
- thumbnails
- quote/feature cards
- short gameplay clips
- captions/subtitles
- simple before/after videos

The engine must distinguish:
- real game footage
- development/editor footage
- concept art
- generated promotional artwork

Generated promotional artwork must never be presented as real in-game footage.

## 9. Platform architecture

Use a provider/adaptor model.

Conceptually:

`Campaign -> Platform Adapter -> Platform API`

Initial planned adapters:

- Discord
- Bluesky
- Pinterest
- YouTube
- TikTok
- X

Adapters must expose a consistent internal interface while keeping platform-specific authentication and payload rules isolated.

Publishing should be disabled by default until a platform is explicitly enabled.

## 10. Approval

Human approval is mandatory for v0.1 public publishing.

The first useful workflow is:

1. source content detected
2. campaign generated
3. variants generated
4. campaign stored
5. user reviews/edits
6. user approves
7. platform adapters publish
8. results stored

The engine must never publish merely because content generation succeeded.

## 11. GitHub integration

The existing GitHub Actions workflow is the preferred trigger mechanism.

Potential triggers:
- new game devlog
- new studio blog post
- new news item
- manual workflow dispatch

The marketing workflow must not modify the production branch automatically.

Generated campaign files should be reviewable in GitHub.

## 12. Proposed repository structure

```
marketing/
├── README.md
├── campaigns/
├── templates/
├── prompts/
├── generated/
└── schemas/

scripts/
├── marketing/
│   ├── generate-campaign.mjs
│   ├── generate-platform-copy.mjs
│   ├── validate-campaign.mjs
│   └── publish-campaign.mjs
└── ...

.github/workflows/
└── marketing-campaign.yml
```

The exact implementation may change during development, but the separation between source content, campaign generation, platform adapters and publishing should remain.

## 13. Security

- API credentials must be stored as GitHub Actions secrets or equivalent secret storage.
- Never commit tokens.
- Never expose credentials to generated content.
- Platform publishing must fail safely if credentials or permissions are missing.
- Logs must not print access tokens.
- Each platform should be independently disableable.

## 14. Failure handling

Publishing one platform must not prevent other platforms from publishing.

Example:

`Bluesky success + Discord success + TikTok failure`

must leave the campaign partially published with TikTok marked failed and retryable.

Use:
- explicit status
- error message
- retry count
- last attempted timestamp

## 15. Idempotency

A campaign must not accidentally publish the same asset repeatedly.

Store external publication IDs where available.

Before publishing:
- check campaign/platform publication state
- refuse duplicate publication unless explicitly forced
- support safe retry after transient failures

## 16. Analytics

Analytics are not required for the first implementation, but the data model should allow:

- impressions
- views
- likes/reactions
- comments
- shares/reposts
- clicks
- follower growth
- campaign performance

Do not build optimisation logic until reliable analytics are available.

## 17. Roadmap

### Phase 1 - Foundation
- campaign schema
- campaign directory
- templates
- prompt/context system
- validation
- manual review artefact

### Phase 2 - First integrations
- Discord
- Bluesky
- Pinterest

### Phase 3 - Video platforms
- YouTube
- TikTok
- media processing

### Phase 4 - Additional platforms
- X
- Instagram/Facebook where practical

### Phase 5 - Dashboard
- campaign list
- preview
- edit
- approve
- publish
- publication history

### Phase 6 - Analytics
- platform metrics
- campaign comparison
- reporting
- evidence-based optimisation

## 18. Initial acceptance criteria

The first implementation is successful when:

1. A new game devlog can be identified as a marketing source.
2. The engine can generate a campaign record from it.
3. The campaign contains studio/game context.
4. At least Bluesky, X, Discord, Pinterest, YouTube and TikTok variants can be generated as text/metadata without publishing.
5. A human can review and edit the campaign.
6. No platform publishes without explicit approval.
7. No credentials are committed to Git.
8. The system works for Caravan Park Tycoon without making Caravan Park Tycoon a hard-coded assumption.
9. The same campaign model can represent a future Fin & Games game.
10. The campaign contains a canonical link back to the appropriate Fin & Games page.

## 19. Design principle

**Create once, adapt everywhere, approve once, publish safely.**

The Marketing Engine is a studio capability, not a Caravan Park Tycoon feature.
