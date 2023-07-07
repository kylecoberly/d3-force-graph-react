import { forceLink } from "d3"
import { RawLink, Node } from "../../types"
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
	return forceLink<Node, RawLink>()
		.id(({ id }) => id)
		.distance(linkDistance.initial)
		.strength(({ source, target }) => (
			source === target
				? groupLinkStrength.initial
				: linkStrength.initial
		))
}
