---
title: "Devlog #14: Reversing Caravans & Avoided Puddles — Pitch Mechanics and Navigation"
description: "A deep dive into how we built dynamic pitch placement for static and touring caravans, and how Godot 4's NavigationServer keeps hundreds of British holidaymakers marching toward the seaside arcade."
pubDate: "2026-09-15"
author: "Fin & Games Team"
draft: false
tags: ["caravan-park-tycoon", "devlog", "simulation"]
---

Welcome back to the *Caravan Park Tycoon* devlog! If you’ve ever sat in a soggy deckchair watching a stressed holidaymaker try to reverse a twin-axle tourer onto a patch of wet grass while three kids yell for ice cream, you already understand the core gameplay loop we’re building. 

This month, we’ve been focusing on two intertwined systems that form the backbone of your park’s operational efficiency: **Pitch Placement Mechanics** (how land is allocated, powered, and cleared) and **Guest Pathfinding** (how flocking holidaymakers navigate from their berths to the chippy without stepping over lawnmowers or getting stuck behind windscreens).

Here’s a look under the hood at how we brought coastal logistical chaos to life in Godot 4.

---

## 1. Pitching Up: Modular Grid & Utility Infrastructure

In *Caravan Park Tycoon*, a pitch isn't just a rectangular box drawn on grass; it’s an active node network that determines park prestige, guest mood, and utility load. We wanted placing a new plot to feel responsive yet mechanically deep.

### Spatial Validation and Utility Hookups
When players drag a pitch footprint across the terrain, the system evaluates several layers before allowing construction:
* **Terrain Slope & Dampness:** Coastal soil varies from rocky headlands to boggy lower fields. Steeper slopes require expensive leveling concrete, while poorly drained grass increases the chance of guests' cars sinking into mud during autumn drizzle.
* **Awning & Slide-Out Clearances:** Every caravan model (from humble pop-ups to luxury double-wide statics) has dynamic side-clearances. If two pitches are placed too close, guests will complain about noise—or worse, fight over barbecue space.
* **Utility Node Distance:** Electric hookup posts, fresh water pipes, and greywater drains must link back to your central utility mains. 

```
[Main Supply] ---> [Sub-station] ---> [Pitch Hookup] ---> [Caravan Unit]
```

We implemented a custom spatial grid manager overlaid on Godot’s standard collision layers. When a pitch is placed, it registers its bounding region with the `ParkGridManager` singleton, broadcasting its utility demand to the local sub-station while invalidating overlapping build areas.

---

## 2. Dynamic Guest Pathfinding in Godot 4

Once your pitches are full of tourists, getting them to move around smoothly becomes the next technical hurdle. A park full of 300 guests, 80 dog walkers, and a fleet of maintenance buggies can easily turn into a pathfinding nightmare.

### Leveraging `NavigationServer3D`
We migrated our navigation stack to Godot 4’s `NavigationServer3D`. Instead of baking a massive, static navigation mesh across the entire map, we use dynamic navigation regions that bake asynchronously as players lay down gravel paths, tarmac roads, and flowerbeds.

* **Desirability Weighting:** Guests don’t always take the mathematically shortest path—they prefer scenic paths. Tarmac roads have a lower travel cost than wet grass, while gravel paths sit somewhere in between. Holidaymakers wearing flip-flops will actively reroute to avoid muddy patches unless their need for the toilet block hits critical levels!
* **Obstacle Avoidance with RVs & Towing Vehicles:** Vehicles towing tourers use custom steering vectors layered over navigation paths. Reversing into a pitch uses a localized kinematic solver that calculates the trailer angle relative to the hitch point, ensuring AI drivers realistically jackknife their rigs when attempting difficult maneuvers.

```gdscript
# Snippet concept for guest path cost evaluation
func _calculate_path_cost(surface_type: String, weather_condition: String) -> float:
	var base_cost = 1.0
	if surface_type == "wet_grass" and weather_condition == "rain":
		base_cost *= 2.5 # Flip-flop wearing guests will avoid this path
	elif surface_type == "tarmac":
		base_cost *= 0.8
	return base_cost
```

---

## 3. Balancing Chaos: Design Decisions Around Guest Frustration

Simulation games live and die by their micro-interactions. During playtesting, we noticed that if guests walked *too* efficiently, the park felt rigid and mechanical. British holiday parks are defined by small, quaint inconveniences.

To capture that authenticity, we introduced **Path Interruption Events**:
* **The Chatty Neighbor:** If two guests with high "Sociability" stats cross paths on a narrow walkway, there's a percentage chance they'll pause for a 15-second chat about the weather, creating a micro-bottleneck behind them.
* **Loose Dog Distractions:** Loose pets will briefly pull nearby guests off their navigation paths to offer pettings, altering foot traffic density near the dog-walking field.
* **Queue Overflow:** If the queue at the fish & chip van spills across a main tarmac road, incoming maintenance golf carts must wait or search for an alternate route through the tent fields.

These small emergent behaviors force players to think carefully about road layouts, main thoroughfares, and desire lines rather than simply spamming a single grid of asphalt.

---

## 4. What’s Next on the Horizon?

With pitch placement and pathing feeling solid, our attention turns to the essential facilities that keep a coastal park running:

1. **Ablution Blocks & Sullage Tanks:** Managing morning shower queues, boiler temperatures, and septic tank pump-outs before things get... unpleasant.
2. **Seagull Threat Vector:** Implementing AI behaviors for opportunistic coastal gulls attempting to steal chips straight from guests' hands.
3. **Steam Playtest Prep:** Refining the UI/UX for building placement and UI tooltips ahead of our upcoming closed playtest group.

Thanks for following along with development! Drop into our Discord or leave a comment on the Steam hub to let us know: what was your favorite memory (or disaster) from childhood caravan holidays?

*— The Fin & Games Team*