import { forceManyBody, forceCollide, Simulation, ForceLink } from "d3"
import { HydratedLink, Link, Node, RawNode } from "../../types"

// Normal state after alpha cutoff
const alphaCutoff = 0.3
const charge = -30 // Repel [-100,100] Attract
const collision = 0

export default function shapeLinks(
	simulation: Simulation<Node, Link>,
	linkForce: ForceLink<RawNode, HydratedLink>,
	links: HydratedLink[],
) {
	const alpha = simulation.alpha()

	if (alpha < alphaCutoff) {
		simulation
			.force("charge", forceManyBody()
				.strength(charge)
			).force("link", linkForce)
			.force("collision", forceCollide(collision))
	}
}
