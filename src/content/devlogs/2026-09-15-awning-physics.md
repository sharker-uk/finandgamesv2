---
title: "Caravan Park Tycoon Devlog #14: Ballistics, Bins, and Horizontal Rain"
description: "In which awnings launch into the North Sea, campers develop a passion for municipal recycling, and weather states range from grey to very grey."
pubDate: "2026-09-15"
author: "Fin & Games Team"
draft: false
tags: ["caravan-park-tycoon", "devlog", "simulation", "gamedev"]
---

Welcome back to the development diary for *Caravan Park Tycoon*, the only management sim currently braving the damp, sodium-lit frontiers of the British seaside holiday resort. 

It’s been a week of intense simulation engineering here at Fin & Games headquarters—a setting currently rendered in realistic high-definition drizzle through our studio window. We’ve been knee-deep in Godot’s physics engine, wrestling with wind vectors, dynamic pathfinding, and the precise mechanical frustration of synthetic canvas. Here is a breakdown of what we’ve built, what we accidentally launched into orbit, and what’s next on the agenda.

### Ballistics Over Skegness: Awnings & Elasticity

The centerpiece of this update was meant to be a quiet, dignified implementation of touring caravan awnings. In the real world, erecting an awning is a beloved British holiday ritual involving missing pegs, confused stepfathers, and heated arguments over guy ropes while holding a lukewarm cup of PG Tips. We wanted to capture that precise tension.

Under the hood, touring caravans are `Node2D` scenes with anchor points where players can extend modular canvas structures. We built the guy ropes using Godot's `PinJoint2D` nodes connected to a series of lightweight `RigidBody2D` canvas segments, applying spring tension to give the fabric a nice, realistic flutter in seaside breezes.

```
[Caravan Node] ---> [PinJoint2D Anchor] ---> [RigidBody2D Awning Segment] ---> [Peg Anchor]
```

Or at least, that was the theory. 

During our initial testing of the Beaufort Wind Scale logic, we mistakenly inverted the friction coefficient on the rope nodes while setting tension values. Instead of stabilizing the fabric under high winds, the engine interpreted every gust as a compounding force vector. The moment a mild force-4 gale hit Pitch 12, the system loaded an astronomical amount of potential energy into the joint constraints. 

The result? The entire awning assembly decoupled from the caravan chassis, folded in on itself like a terrified squid, and launched off the top of the screen at roughly Mach 2. We watched in muted horror as family-of-four vacationers were left standing beside an empty patio frame, staring up into the cloud cover where their £600 Isabella Annex used to be.

We’ve since recalculated the spring damping on the `PinJoint2D` nodes and clamped maximum force values. Awnings now flap aggressively, leak slightly, and stay firmly attached to the ground as God intended.

### Microclimates of Misery: Implementing Weather States

A holiday park sim built in the UK lives or dies by its meteorology. You cannot simply have "sun" and "rain"; that lacks regional authenticity. We have now integrated a complete `WeatherController` autoload singleton that manages world atmosphere, lighting tint, particle density, and guest emotion curves.

We’ve established three distinct baseline atmospheric states:

1. **Seaside Drizzle:** Light `GPUParticles2D` precipitation on a flat, grey canvas shader. Guests carry on playing swingball, but their *Comfort* stat decays by 0.05 per second.
2. **Horizontal Mist:** Low visibility, achieved through a full-screen fragment shader adjusting ambient contrast and adding a subtle noise texture over the view distance. Outdoor arcade traffic drops by 40%.
3. **"Stay in the Club Lounge" Torrential Downpour:** High-density GPU rain particles paired with screen-shake on wind gusts and thunder audio triggers. 

```
func _update_guest_behavior(current_weather: WeatherState) -> void:
    match current_weather.severity:
        WeatherSeverity.TORRENTIAL:
            broadcast_event("SEEK_SHELTER_CLUB_LOUNGE")
            trigger_lukewarm_bitter_sales_spike()
```

When torrential rain strikes, the simulation engine shifts guest prioritization vectors via a global event bus. Campers immediately abandon lawn chairs, cancel their walk to the estuary, and flock toward the nearest covered brick structure. If your site’s Club Lounge isn’t stocked with enough low-grade draft lager and sticky carpets to handle the surge, guest satisfaction plummets faster than a seagull dropping a stolen chip.

### The Great Recycling Bin Blockade

Pathfinding fixes are rarely glamorous, but this week’s issue was too strangely poetic to ignore. We noticed a cluster of twenty-odd holidaymakers standing in an agitated tight circle behind the main waste disposal unit, slowly starving to death while refusing to move.

Our guest AI uses Godot’s `NavigationAgent2D` for real-time path planning across our tilemap grid. The issue stemmed from dynamic navigation obstacle baking: when municipal green wheelie bins were placed adjacent to a boundary hedge, the `NavigationServer2D` baked a navmesh polygon that created an infinitesimal gap between the bin collision shape and the map edge.

The pathfinding algorithm determined that this 4-pixel gap was technically an optimal shortcut to the bingo hall. Guests would queue up, attempt to navigate the microscopic corridor, get stuck in an endless velocity calculation loop inside the bin's collision margin, and stand there contemplating crisp packets until their needs meters went deep into the red.

We’ve recalculated the agent avoidance radius on the `NavigationAgent2D` node and adjusted the collision layer masks for park furniture. The guests have now discovered that they can simply walk *around* the recycling area, though several look disappointed by the loss of drama.

### The Horizon: Coin Pushers & Two-Fat-Ladies

With the canvas ballistics neutralized and the campers no longer worshiping the wheelie bins, our attention turns to the essential financial engine of any coastal resort: indoor entertainment.

Next sprint, we are building:
* **2p Coin Pusher Mechanics:** A physics-driven micro-game using dense overlapping `RigidBody2D` coins on a moving slide plate. We are currently trying to balance the exact sliding friction so that a plastic key ring sitting tantalizingly on the lip of the shelf refuses to drop for three consecutive hours.
* **The Bingo Caller State Machine:** A procedural audio system and guest mood driver for evening entertainment, complete with authentic localized caller vocal lines, cheap prize distribution, and dynamic crowd tension metrics.

Until next time, keep your guy ropes taut, your tea hot, and your eyes on the weather forecast.