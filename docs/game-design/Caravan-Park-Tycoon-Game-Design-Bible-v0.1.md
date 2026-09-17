# Caravan Park Tycoon - Game Design Bible v0.1

**Studio:** Fin & Games  
**Status:** Early design / pre-vertical-slice  
**Audience:** Development reference

> **Important:** This document deliberately lives under `docs/`, not `src/`. It is a private development document and is **not part of the Astro content collections**. It must not appear on the public website.

## 1. Game Identity

**Pitch:** A cosy British holiday-park management game where the player turns an overgrown plot into a thriving park, balancing money, beauty, facilities, traffic, the local community and the personalities of the people who visit.

The game world is **100% fictional**. It is inspired by the feel, geography and character of a Norfolk coastal village, but does not use real business names, caravan-park names, branding or other protected identities. The fictional setting currently uses **LittleHampton-on-Sea**, with **Natwinch Road** as its main road and **HamptonVilla** as the player's holiday park.

The target feel is **Stardew Valley-like charm with a distinctly British holiday-park setting**. It should be cosy, funny, characterful and relaxing while still presenting meaningful management decisions.

**Core principle:** The park should feel like a place, not a collection of buildings.

## 2. Player Fantasy

The player starts with a neglected piece of land within the much larger HamptonVilla property and gradually creates their own holiday park. They do not initially control the whole site. Additional sections of the park must be purchased and developed over time.

The important emotional progression is:

> "I started with this mess, and I built this place."

The final park should feel personal rather than simply optimised.

## 3. Core Gameplay Loop

1. Explore the park and surrounding village.
2. Identify problems and opportunities.
3. Clear and improve land.
4. Build pitches, facilities and infrastructure.
5. Attract guests.
6. Manage guest needs and park appeal.
7. Earn money.
8. Reinvest in the park.
9. Buy additional park sections.
10. Improve beauty, capacity, services and access.
11. Manage the effect of the growing park on LittleHampton-on-Sea.
12. Unlock new possibilities.

Whenever practical, decisions should have a visible effect on the physical world rather than existing only in menus.

## 4. Day 1

The player begins with a small, overgrown section of the much larger HamptonVilla site, limited money and few usable facilities.

Likely opening sequence:

1. Clear a small area.
2. Cut trees/vegetation.
3. Collect recovered wood and other materials.
4. Take materials to the appropriate collection/sales point.
5. Create the first pitch.
6. Provide basic utilities/services.
7. Attract the first guest.
8. Earn the first meaningful income.
9. Decide what to improve or save towards next.

The first minutes should establish that **small improvements compound into a real park**.

## 5. World and Setting

### 5.1 LittleHampton-on-Sea

The game is set around the fictional Norfolk-style coastal village of **LittleHampton-on-Sea**.

The village should feel recognisably British without directly reproducing a real place. The broad layout is inspired by a compact coastal village, with **Natwinch Road** acting as a major route into and through the village before connecting towards the High Street and other local areas.

Potential world elements:

- Natwinch Road
- LittleHampton-on-Sea High Street
- Residential streets
- Small local businesses
- Bus stops
- Footpaths
- Coastal/seaside areas
- The HamptonVilla holiday park
- Surrounding countryside
- A fictional supermarket called **QuickStop**
- An initially empty commercial plot near the village entrance

The wider village is not merely scenery. It should become part of the player's economy, progression and the consequences of park growth.

### 5.2 HamptonVilla

**HamptonVilla** is the fictional holiday park operated by the player.

It is deliberately a fictional name and must not use real holiday-company branding.

The full HamptonVilla property is larger than the player's starting area. The player initially receives only a small section. Other sections are inaccessible or unavailable until purchased.

Park expansion should therefore be a major progression system:

**Starting parcel -> earn money -> purchase next parcel -> clear/develop it -> expand the park -> repeat.**

Different parcels can contain different opportunities and problems, including woodland, fruit trees, old structures, existing paths, awkward terrain, attractive views, utility infrastructure and other discoveries.

### 5.3 Fictionalisation rule

The final game should use fictional names, logos, businesses, characters and branding throughout.

Real places may inspire the broad geography, atmosphere, architecture and humour, but the game should not present itself as a recreation of a real village or holiday park.

When a real-world idea inspires a feature, create a legally distinct fictional implementation rather than copying names, logos, protected characters, distinctive branding or exact protected designs.

## 6. Land and Resources

Possible things to clear:

- Trees
- Fruit trees
- Bushes
- Long grass
- Fallen branches
- Old fencing
- Rubble
- Abandoned structures
- Discoverable objects

### 6.1 Wood

Normal trees produce wood when cleared.

Wood is **not sold directly from the player's inventory**.

Instead, the main entrance to HamptonVilla contains a physical **timber sales/collection box**. The player takes wood from their inventory to the box, where it visibly accumulates.

A buyer NPC periodically purchases wood from the box. The player cannot instantly sell the entire contents.

Example:

**Wood in box: 37**

The buyer removes a limited quantity over time, paying the player as the timber is collected:

**37 -> 32 -> 27 -> 22 -> ... -> 0**

The exact collection rate and economics are to be balanced during prototyping.

This makes selling wood a physical activity and creates a visible sense of production rather than a simple inventory transaction.

### 6.2 Fruit trees

Some trees are fruit-bearing trees rather than ordinary timber trees.

Fruit trees create an important decision:

**Remove the tree:** gain wood/land immediately.

**Keep the tree:** preserve beauty and gain recurring fruit that can be harvested and sold.

Fruit should use a similar physical sales system to timber. Harvested produce is taken to a suitable collection/sales point and purchased progressively by an NPC rather than being converted into instant money from the inventory.

Fruit trees should therefore become both an economic resource and a landscaping decision.

Initial resource loop:

**Clear/use land -> obtain resources -> physically deliver resources -> buyer collects them over time -> receive money -> fund park improvements.**

Clearing must feel satisfying rather than becoming tedious micromanagement.

## 7. Building the Park

### Accommodation

- Tent pitches
- Caravan pitches
- Motorhome/RV pitches
- Future accommodation types

### Facilities

Potential facilities include toilets, showers, washing facilities, reception, shop, cafe/restaurant, play area, laundry, entertainment and waste facilities.

### Infrastructure

Potential systems include electricity, water, waste/sewerage, roads/paths, lighting and connectivity.

### Hard Compacted Paths

The farming tutorial's soil/hoe concept is being adapted into a park-specific **Hard Compacted Path** system.

Rough ground can be cleared and prepared, then converted into hard compacted paths. Paths should help connect pitches and facilities while creating a visual and gameplay trade-off: excessive hard surfacing can reduce natural beauty, while thoughtful landscaping can offset it.

Not all infrastructure belongs in the first prototype. Infrastructure should create meaningful decisions as the park grows, not arbitrary building requirements.

## 8. Beauty and Park Appeal

Beauty is one of the game's defining management trade-offs.

**More accommodation can mean more income, but too much accommodation can reduce beauty and appeal.**

**Too little accommodation can produce a beautiful park that does not generate enough income.**

The central question is:

> **How much can I build before I ruin what makes the park attractive?**

Positive influences can include landscaping, retained trees, fruit trees, flowers, cleanliness, good paths, attractive facilities, spacing, decorations, views and well-maintained pitches.

Negative influences can include excessive vehicle density, rubbish, poor maintenance, ugly infrastructure, hard-surface overdevelopment, congestion, poor layout and overdevelopment.

Beauty should not become a single magic number that dictates everything. Guests should visibly react to the environment where practical.

## 9. Guests and Village Impact

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

### 9.1 Traffic

As HamptonVilla grows, the number of guest vehicles travelling through LittleHampton-on-Sea should visibly increase.

Traffic should be represented physically where practical, rather than only through an abstract statistic.

A successful but poorly managed park may therefore create:

- More vehicles on Natwinch Road
- Congestion around the village
- Parking pressure
- Local complaints
- Guest frustration
- Additional pressure to develop a transport solution

The player should be able to see the consequences of park expansion in the village.

### 9.2 Local NPC reactions

Local residents can comment on the changing village and traffic. Reactions should be characterful and sometimes humorous rather than becoming a heavy political simulation.

Possible complaints include:

> "Can't get down Natwinch Road for all these caravanners."

> "Another holiday weekend. Brilliant."

> "You'd think they'd build somewhere for them to park."

These reactions can become part of the game's personality and provide feedback about the physical consequences of expansion.

## 10. QuickStop

**QuickStop** is the fictional local supermarket in LittleHampton-on-Sea.

It fills the gameplay role of a local discount supermarket without using a real-world supermarket's name or branding.

The player can physically visit QuickStop to purchase items needed for park development and maintenance.

Potential stock includes:

- Tools
- Gardening equipment
- Building supplies
- Cleaning products
- Park consumables
- Seeds/fruit-tree supplies
- Decorations
- Maintenance goods
- Later-game specialist equipment

The shop should become part of the normal gameplay loop rather than being only a menu:

**Need supplies -> travel to LittleHampton-on-Sea -> visit QuickStop -> purchase goods -> return to HamptonVilla -> use them.**

## 11. Village Entrance Car Park

Near the main entrance to LittleHampton-on-Sea is an initially empty commercial plot.

Early and mid game, the plot can remain empty or simply be marked as available for future development.

Later in the game, the player can potentially purchase the plot and develop it into a **secure visitor car park**.

The purpose is to intercept guest vehicles before they create excessive traffic through the village.

### 11.1 Shuttle transport

A shuttle service can connect the village car park to HamptonVilla.

The exact vehicle is undecided but possibilities include:

- Shuttle bus
- Small electric shuttle
- Tractor and passenger trailers
- Road train

A road train is currently an especially strong thematic option because it fits the British holiday-park setting.

Potential progression:

**Basic tractor/trailer -> improved shuttle -> electric shuttle/road train.**

The service can operate on a timetable and visibly transport guests between the village car park and HamptonVilla.

### 11.2 Management trade-off

The car park should represent a substantial late-game investment rather than a mandatory early unlock.

Without it:

- Lower infrastructure cost
- More vehicles entering the village
- More congestion
- More local complaints
- Potentially poorer arrival experience

With it:

- Land purchase cost
- Construction cost
- Vehicle purchase cost
- Running/maintenance costs
- Reduced village traffic
- More organised guest arrival
- Potentially improved guest experience

The system should let the player experience the consequences of growth before deciding whether to invest in the solution.

## 12. Custom Caravans and Tents

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

## 13. Bob the Mighty - King of the Seagulls

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

## 14. Supporter NPCs

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

## 15. Art Direction

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

## 16. Progression

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
- Village transport solutions
- Discoveries and secrets

Prefer unlocks that change what the player can do over simple percentage increases.

## 17. Secrets and Easter Eggs

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

## 18. Economy

Likely income:

- Pitch bookings
- Facility usage
- Food/drink
- Shops
- Entertainment
- Timber sales
- Fruit/produce sales
- Other services

Likely costs:

- Construction
- Utilities
- Maintenance
- Staff, if introduced
- Land development
- Land purchases
- Village car-park development
- Shuttle/road-train purchase and operation
- Marketing
- Upgrades

The key economic tension is:

**capacity + income + guest satisfaction + beauty + running costs + impact on the surrounding village**

The goal is not simply to maximise the number of caravans.

## 19. Vertical Slice

The first serious playable milestone should prove the central fantasy, not the whole game.

It should contain:

- A small overgrown starting area within HamptonVilla
- Basic tree/vegetation clearing
- Normal trees and at least one fruit-tree concept
- Resource collection
- Physical timber sales box
- Basic progressive NPC purchasing of timber
- A small buildable area
- Hard Compacted Paths
- At least one tent/caravan pitch
- Basic utilities
- At least one guest type
- Basic guest satisfaction
- Income from guests
- A simple beauty system
- Visible before/after transformation
- A basic Bob interaction
- Save/load

The complete village, parcel-purchase system, QuickStop interior and late-game car park/shuttle system can be developed after the initial vertical slice, but the world architecture should be designed around them from the start.

The slice must answer:

1. Is clearing satisfying?
2. Is placing a pitch satisfying?
3. Is watching the first guest arrive satisfying?
4. Does the beauty/income trade-off create an interesting decision?
5. Does the park feel alive?
6. Does Bob feel like he belongs?
7. Does it already feel recognisably British?
8. Does the physical resource-selling loop feel better than an instant inventory sale?

If these do not work, add no major new content. Improve the core loop first.

## 20. Deliberately Undecided

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
- Exact final map size
- Exact names for remaining businesses and locations
- Exact shuttle vehicle
- Exact resource purchase/sale rates
- Release date

Avoid solving problems the prototype has not created.

## 21. Design Guardrails

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

### Fictional world, real inspiration
The setting can draw on observations of British coastal villages and holiday parks, but the final game uses fictional names, branding and businesses.

### Player ownership matters
The park should feel like it belongs to the player.

### Bob is important, but don't overexpose him
Bob works best if players gradually realise he is more than a seagull.

### Prototype before polishing
Prove mechanics before investing heavily in final art, content or infrastructure.

## 22. Feature Priority

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

- HamptonVilla fictional setting
- LittleHampton-on-Sea world
- Natwinch Road and village layout
- Bob the Mighty
- British environmental details
- Physical resource selling
- Fruit trees
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
- QuickStop shopping
- Village traffic simulation
- Additional park parcel purchases
- Supporter-created NPCs

### Tier 4 - Later

- Village entrance car park
- Shuttle/road-train system
- Large numbers of secrets
- Advanced customisation
- Complex staff simulation
- Extensive special events
- Large content expansions

## 23. Success Criteria

Before moving beyond the prototype, we should be able to answer:

- What does the player do in the first five minutes?
- What makes the first hour interesting?
- What makes this recognisably Caravan Park Tycoon rather than a generic tycoon game?
- What is the main meaningful trade-off?
- What makes the park feel alive?
- What makes the player care about individual guests or characters?
- What role does Bob play?
- What can safely be postponed?
- Does the surrounding village feel like part of the game rather than scenery?
- Do expansion and traffic create interesting consequences?

The simplest test is whether the prototype makes the player think:

> **"I've got to make this place better."**

## 24. Next Design Pass

Turn this broad design into implementation-ready specifications for the vertical slice, in this order:

1. Day 1 player sequence
2. Exact clearing mechanics
3. Resource inventory and physical sales-box mechanics
4. Fruit-tree lifecycle and produce sales
5. First build menu
6. Hard Compacted Path system
7. First pitch and utility requirements
8. Guest arrival and behaviour
9. First beauty calculation
10. First economy model
11. Bob's first interaction
12. HamptonVilla parcel/land system
13. LittleHampton-on-Sea map layout
14. Village traffic model
15. QuickStop shopping system
16. Save/load requirements
17. Vertical-slice map layout

**v0.1 deliberately describes the game without prematurely locking down implementation details.**
