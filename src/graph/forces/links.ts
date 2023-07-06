import { forceLink } from "d3"
import { Link, Node } from "../../types"
import options from "../options"

const {
	forces: {
		link: {
			distance: linkDistance,
			strength: linkStrength,
		},
		group: {
			link: {
				strength: groupLinkStrength,
			},
		},
	},
} = options

export default function createLinkForce() {
	return forceLink<Node, Link>()
		.id(({ id }) => id)
		.distance(linkDistance.initial)
		.strength(({ source, target }) => (
			source === target
				? groupLinkStrength.initial
				: linkStrength.initial
		))
}
