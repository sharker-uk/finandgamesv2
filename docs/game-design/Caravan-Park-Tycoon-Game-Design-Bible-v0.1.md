# Caravan Park Tycoon - Game Design Bible v0.1

**Studio:** Fin & Games  
**Status:** Early design / pre-vertical-slice  
**Audience:** Development reference

> **Important:** This document deliberately lives under `docs/`, not `src/`. It is a private development document and is **not part of the Astro content collections**. It must not appear on the public website.

## 1. Game Identity

**Pitch:** A cosy British holiday-park management game where the player turns an overgrown plot into a thriving park, balancing money, beauty, facilities and the personalities of the people who visit.

The target feel is **Stardew Valley-like charm with a distinctly British holiday-park setting**. It should be cosy, funny, characterful and relaxing while still presenting meaningful management decisions.

**Core principle:** The park should feel like a place, not a collection of buildings.

## 2. Player Fantasy

The player starts with a neglected piece of land and gradually creates their own holiday park. The important emotional progression is:

> "I started with this mess, and I built this place."

The final park should feel personal rather than simply optimised.

## 3. Core Gameplay Loop

1. Explore the park.
2. Identify problems and opportunities.
3. Clear and improve land.
4. Build pitches, facilities and infrastructure.
5. Attract guests.
6. Manage guest needs and park appeal.
7. Earn money.
8. Reinvest in the park.
9. Improve beauty, capacity and services.
10. Unlock new possibilities.

Whenever practical, decisions should have a visible effect on the physical park rather than existing only in menus.

## 4. Day 1

The player begins with an overgrown, unimpressive property, limited money and few usable facilities.

Likely opening sequence:

1. Clear a small area.
2. Cut trees/vegetation.
3. Sell or use recovered wood/materials.
4. Create the first pitch.
5. Provide basic utilities/services.
6. Attract the first guest.
7. Earn the first meaningful income.
8. Decide what to improve next.

The first minutes should establish that **small improvements compound into a real park**.

## 5. Land and Resources

Possible things to clear:

- Trees
- Bushes
- Long grass
- Fallen branches
- Old fencing
- Rubble
- Abandoned structures
- Discoverable objects

Initial resource loop:

**Cut tree -> obtain wood -> sell/use wood -> fund park improvements.**

Clearing must feel satisfying rather than becoming tedious micromanagement.

## 6. Building the Park

### Accommodation

- Tent pitches
- Caravan pitches
- Motorhome/RV pitches
- Future accommodation types

### Facilities

Potential facilities include toilets, showers, washing facilities, reception, shop, cafe/restaurant, play area, laundry, entertainment and waste facilities.

### Infrastructure

Potential systems include electricity, water, waste/sewerage, roads/paths, lighting and connectivity.

Not all belong in the first prototype. Infrastructure should create meaningful decisions as the park grows, not arbitrary building requirements.

## 7. Beauty and Park Appeal

Beauty is one of the game's defining management trade-offs.

**More accommodation can mean more income, but too much accommodation can reduce beauty and appeal.**

**Too little accommodation can produce a beautiful park that does not generate enough income.**

The central question is:

> **How much can I build before I ruin what makes the park attractive?**

Positive influences can include landscaping, trees, flowers, cleanliness, good paths, attractive facilities, spacing, decorations, views and well-maintained pitches.

Negative influences can include excessive vehicle density, rubbish, poor maintenance, ugly infrastructure, congestion, poor layout and overdevelopment.

Beauty should not become a single magic number that dictates everything. Guests should visibly react to the environment where practical.

## 8. Guests

Guests turn the park into a living place.

Potential needs:

- Cleanliness
- Toilet/shower access
- Food
- Entertainment
- Quiet
- Space
- Accessibility
- Value for money
- Beauty/atmosphere
- Convenience

Longer term, guests should have personalities and preferences rather than being identical economic units. Possible groups include families, couples, retired travellers, outdoor enthusiasts, budget campers and motorhome travellers.

Guest events should create small stories: complaints, discoveries, favourite pitches, recommendations and minor incidents.

## 9. Custom Caravans and Tents

Long-term customisation should let players make accommodation feel personal.

Potential options:

- Shape/type
- Colours
- Awnings
- Outdoor furniture
- Flags
- Bikes
- BBQs
- Garden ornaments
- Planting
- Other small decorations

Target player reaction:

> **"That's my caravan."**

Customisation should be visually meaningful without becoming an unnecessarily complex editor.

## 10. Bob the Mighty - King of the Seagulls

Bob is a recurring character and part of the game's identity. He is **not merely a decorative Easter egg**.

### Core concept

**Bob the Mighty is the King of the Seagulls.**

Bob remembers how the player treats him.

Positive behaviour might include feeding him appropriately, providing a safe perch, not chasing him away unnecessarily and discovering things he likes.

Negative behaviour might include repeatedly chasing him, harassing him, removing his favourite perch or creating hazards affecting him.

Possible positive outcomes:

- Bob warns the player about something.
- Bob leads the player to a discovery.
- Bob brings an unusual item.
- Bob influences other gulls.
- Bob triggers a special event.

Possible negative outcomes:

- More gull-related incidents.
- Food being stolen.
- Rubbish being disturbed.
- Guest complaints.
- Bob deliberately choosing inconvenient perches.
- Special nuisance events.

**Do not explain the full Bob system in the opening tutorial.** Players should gradually discover that he is important.

## 11. Supporter NPCs

The current website NPC Builder is a prototype for a future Patreon/Ko-fi supporter feature.

Possible supporter customisation:

- Name
- Appearance
- Clothing
- Personality
- Likes/dislikes
- Dialogue
- Caravan/tent details

A submission should never automatically enter the game.

Intended pipeline:

**Supporter -> NPC Builder -> Submission -> Moderation -> Approval -> Game database -> Game release/update**

This should be a participation/community feature rather than pay-to-win.

NPC data should be separated from final artwork so the system survives future art-direction changes. The current prototype graphics are not final game art.

## 12. Art Direction

Target:

**Stardew Valley-like charm with a distinctly British slant.**

Visual ingredients:

- Colourful 2D pixel/illustrated aesthetic
- Strong silhouettes
- Expressive characters
- British caravan-park architecture
- Hedges and fences
- Grassy/muddy paths
- Bins and utility objects
- Picnic tables
- British weather
- Seaside and holiday-park details
- Appropriate local shops/food

Do not spend heavily on final art before the core mechanics are proven. The vertical slice can use simple or placeholder assets.

## 13. Progression

Progression should come from several directions:

- More land
- More pitch types
- Better facilities
- Better utilities
- Higher guest expectations
- More customisation
- New guest types
- New park areas
- Reputation
- Financial capacity
- Discoveries and secrets

Prefer unlocks that change what the player can do over simple percentage increases.

## 14. Secrets and Easter Eggs

Potential categories:

- Bob-related discoveries
- British holiday-park references
- Strange objects found while clearing land
- Hidden areas
- Unusual guests
- Rare events
- Developer jokes
- British cultural references

The discussed famous British TV motorhome/RV idea remains a **future Easter-egg/homage concept**, not a committed feature or paid item. Any implementation should be legally distinct and should not assume permission to use third-party names, logos, characters or exact protected designs.

## 15. Economy

Likely income:

- Pitch bookings
- Facility usage
- Food/drink
- Shops
- Entertainment
- Other services

Likely costs:

- Construction
- Utilities
- Maintenance
- Staff, if introduced
- Land development
- Marketing
- Upgrades

The key economic tension is:

**capacity + income + guest satisfaction + beauty + running costs**

The goal is not simply to maximise the number of caravans.

## 16. Vertical Slice

The first serious playable milestone should prove the central fantasy, not the whole game.

It should contain:

- A small overgrown starting area
- Basic tree/vegetation clearing
- Resource collection/sale
- A small buildable area
- At least one tent/caravan pitch
- Basic utilities
- At least one guest type
- Basic guest satisfaction
- Income from guests
- A simple beauty system
- Visible before/after transformation
- A basic Bob interaction
- Save/load

The slice must answer:

1. Is clearing satisfying?
2. Is placing a pitch satisfying?
3. Is watching the first guest arrive satisfying?
4. Does the beauty/income trade-off create an interesting decision?
5. Does the park feel alive?
6. Does Bob feel like he belongs?
7. Does it already feel recognisably British?

If these do not work, add no major new content. Improve the core loop first.

## 17. Deliberately Undecided

Do not lock down these items until the prototype gives us evidence:

- Exact number of guest types
- Staff system
- Full utility simulation complexity
- Exact progression tree
- Multiplayer
- Mod support
- Campaign/endgame structure
- Pricing model
- Final supporter integration method
- Final NPC art pipeline
- Full weather simulation
- Exact map size
- Release date

Avoid solving problems the prototype has not created.

## 18. Design Guardrails

### The park comes first
Systems should make the physical park more interesting.

### Personality beats complexity
A few memorable systems are preferable to dozens of shallow mechanics.

### Let players discover things
Not every interesting mechanic needs a tutorial window.

### Avoid spreadsheet overload
Depth should come from meaningful choices, not excessive statistics.

### British flavour should be authentic
Use observation and humour rather than forcing stereotypes into every object.

### Player ownership matters
The park should feel like it belongs to the player.

### Bob is important, but don't overexpose him
Bob works best if players gradually realise he is more than a seagull.

### Prototype before polishing
Prove mechanics before investing heavily in final art, content or infrastructure.

## 19. Feature Priority

### Tier 1 - Core

- Land clearing
- Basic building
- Pitches
- Guest arrival
- Guest satisfaction
- Income
- Beauty
- Save/load

### Tier 2 - Identity

- Bob the Mighty
- British environmental details
- Basic customisation
- Simple guest personalities
- Small discoveries/events

### Tier 3 - Expansion

- More facilities
- More accommodation types
- More guest types
- More complex utilities
- Larger park areas
- Deeper economy
- Supporter-created NPCs

### Tier 4 - Later

- Large numbers of secrets
- Advanced customisation
- Complex staff simulation
- Extensive special events
- Large content expansions

## 20. Success Criteria

Before moving beyond the prototype, we should be able to answer:

- What does the player do in the first five minutes?
- What makes the first hour interesting?
- What makes this recognisably Caravan Park Tycoon rather than a generic tycoon game?
- What is the main meaningful trade-off?
- What makes the park feel alive?
- What makes the player care about individual guests or characters?
- What role does Bob play?
- What can safely be postponed?

The simplest test is whether the prototype makes the player think:

> **"I've got to make this place better."**

## 21. Next Design Pass

Turn this broad design into implementation-ready specifications for the vertical slice, in this order:

1. Day 1 player sequence
2. Exact clearing mechanics
3. First build menu
4. First pitch and utility requirements
5. Guest arrival and behaviour
6. First beauty calculation
7. First economy model
8. Bob's first interaction
9. Save/load requirements
10. Vertical-slice map layout

**v0.1 deliberately describes the game without prematurely locking down implementation details.**
