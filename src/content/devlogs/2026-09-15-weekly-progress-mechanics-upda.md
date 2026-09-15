---
title: "Devlog #14: Soggy Chips, Godot Grid Systems, and Arcade Economics"
description: "A deep dive into our dynamic weather engine, utility grid architecture in Godot 4, and balancing British seaside nostalgia with hardcore park management."
pubDate: "2026-09-15"
author: "Fin & Games Team"
draft: false
tags: ["caravan-park-tycoon", "devlog", "simulation"]
---

Hello everyone! Welcome back to another weekly update from the Fin & Games team. 

If you've ever spent a bank holiday weekend sitting in a static caravan in Skegness listening to rain bounce off the aluminum roof while holding a lukewarm cup of tea, you know the exact vibe we’re capturing with *Caravan Park Tycoon*. This week, we’ve been hard at work turning that iconic British seaside atmosphere into concrete gameplay loops and robust game architecture in Godot 4.

Here is a look at what we built, broke, and refactored over the last seven days.

---

## 1. Rain, Bingo, and Ruined Barbecues: The Dynamic Weather Loop

In most park management games, rain is just a cosmetic particle effect with a light sales penalty. In *Caravan Park Tycoon*, British weather is an antagonist you must actively engineer against.

This week, we hooked up our dynamic weather state machine to guest behavior trees and park income streams:

* **The Sunny Day Loop:** Guests flock to outdoor pitch plots, barbecue zones, and the beach access paths. Trash generation spike near ice cream vans, and electricity demand drops because nobody is sitting indoors watching telly.
* **The Downpour Pivot:** When a sudden drizzle hits, outdoor satisfaction drops rapidly unless guests can find shelter. Caravanners retreat to their static vans or race toward indoor venues like the Clubhouse Arcade or the Bingo Hall.
* **Economic Cascades:** If your park lacks indoor entertainment during a 3-day downpour, holidaymaker happiness tanks, leading to lower refund-retention rates at check-out. However, if you built an oversized 2p penny-pusher arcade, rainy days become your most profitable hours of the week.

We implemented this using a global `WeatherManager` node that emits signal events (`on_weather_changed(new_state)`). Guest AI agents subscribe to these signals to recalculate their utility weightings—prioritizing indoor nodes over outdoor scenic spots when rain intensity crosses a set threshold.

---

## 2. Godot 4 Systems Architecture: Utility Grids & Modular Caravans

Building a modern simulation game in Godot 4 has been a fantastic experience, but simulation logic requires careful architecture to avoid performance bottlenecks when hundreds of holidaymakers and pitch plots interact.

This week, we completely overhauled our **Utility Hookup System** (Power, Water, and Sewage) using custom node graph processing in C#.

```
[ Power Plant / Main Mains ] ---> [ Sub-Station ] ---> [ Pitch Pedestal ] ---> [ Caravan ]
```

### How the Utility Architecture Works:

1. **TileMap Overlay Layer:** We use Godot 4's multi-layer `TileMap` features for invisible utility lines buried under pitch roads. Placing a pipe or cable updates an internal sparse 2D array managed by a singleton `GridNetwork` class.
2. **Breadth-First Graph Traversal:** When a player plugs a new static caravan into a pitch pedestal, the network runs a fast BFS (Breadth-First Search) back to the park’s main utility intake. If the path is valid and the central grid has surplus capacity, the plot is flagged as `IsServiced = true`.
3. **Data-Driven Caravan Configs:** Caravans themselves are built using Godot `Resource` files (`CaravanData.cs`). Each model (from the rusted 1980s *Sunseeker Classic* to the luxury double-wide *Kingfisher Executive*) defines its electricity draw, water consumption, prestige rating, and maintenance decay rate.

By keeping utility calculations out of `_Process()` loops and processing them strictly on placement or network modification events, we maintain a solid 60 FPS even with complex underground pipe topologies across large map sections.

---

## 3. Balancing Seaside Nostalgia with Hardcore Tycoon Depth

One of our biggest design challenges is striking a balance between cozy British seaside humor and high-stakes management simulation. We don't want the game to just be a parody; it needs to be a satisfying mechanical puzzle.

Here’s how we balanced two major features this week:

### Arcade 2p Penny Pushers
* **Nostalgia Element:** Authentic coin-clinking sound effects, flashing neon lights, and plush toy prize drops.
* **Tycoon Depth:** You set the machine payout rates and drop odds. Set the drop rate too low, and guest mood drops due to "Rigged Arcade" thoughts. Set it too high, and the machine operates at a loss. You also have to schedule mechanic staff to clear coin jams before machines break down during peak rainy hours.

### Noise Complaints vs. Clubhouse Revenue
* **Nostalgia Element:** Late-night cabaret acts, tribute bands, and family disco nights.
* **Tycoon Depth:** The Clubhouse generates massive bar profits past 9:00 PM, but emits a spherical "Noise Radius". If your luxury static pitches (which attract high-paying long-term residents) overlap with the Clubhouse noise radius, those guests will leave scathing online reviews. Players must carefully zone quiet residential plots far away from the rowdy entertainment strip.

---

## 4. What’s Next: Seagull AI and Closed Playtests

With the weather systems and utility grids stabilized, our focus for next week turns to one of the most requested features from our community: **Pest Control & Seagull Behavior.**

Our roadmap for the coming sprint includes:

* **Seagull Flocking Behavior:** Implementing a modified Boids algorithm in GDScript to simulate hungry gull flocks hovering over chip shops and snatching food directly from unsuspecting guests.
* **Maintenance & Waste Systems:** Adding bin emptying routes, dumpsters, and site warden patrol paths to combat overflowing trash.
* **UI/UX Polish:** Redesigning the park finances screen to display weekly breakdowns of pitch fees, arcade profits, utility bills, and staff wages.

We're getting closer to our first external playtest! If you want to help us catch bugs and test park balances early, keep an eye on our community channels for the upcoming closed playtest sign-up form.

Until next time—keep the kettle boiled and watch out for the seagulls!

*— The Fin & Games Team*