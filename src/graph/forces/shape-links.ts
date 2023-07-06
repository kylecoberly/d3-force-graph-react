import { forceManyBody, forceLink, forceCollide, Simulation } from "d3"
import { Link, Node } from "../../types"
import simulationOptions from "../options"
const {
	simulation: {
		alphaCutoff,
	},
	forces: {
		charge,
		collision,
		link: {
			distance: linkDistance,
			strength: linkStrength,
		},
	},
} = simulationOptions

export default function shapeLinks(simulation: Simulation<Node, Link>) {
	const alpha = simulation.alpha()

	if (alpha < alphaCutoff) {
		simulation
			.force("charge", forceManyBody()
				.strength(charge.final)
			).force("link", forceLink<Node, Link>()
				.id(({ id }) => id)
				.distance(linkDistance.final)
				.strength(linkStrength.final)
			).force("collision", forceCollide(collision.final))
	}
}
