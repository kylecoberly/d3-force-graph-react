import { Simulation } from "d3"
import { Node, Group, RawGroup, CoordinatePair, Coordinate, RawLink } from "../types"

export default function addCoordinatesToGroup(simulation: Simulation<Node, RawLink>, groups: RawGroup[]): Group[] {
	const nodes = simulation.nodes()
	const groupCenters = getCentroids(nodes)

	return groups
		.map<Group>((group) => {
			const { id } = group

			return {
				...group,
				center: [
					groupCenters[id].x,
					groupCenters[id].y,
				],
				points: nodes
					.filter(({ group }) => group === id)
					.map<CoordinatePair>(({ x, y }: Node) => ([x, y])),
			}
		})
}

function getCentroids(nodes: Node[]) {
	const groupCoordinates = getGroupCoordinates(nodes)

	const centroids = Object
		.entries(groupCoordinates)
		.reduce<Record<string, Coordinate>>((centroids, [group, coordinates]) => {
			const count = coordinates.length;
			let tx = 0;
			let ty = 0;

			coordinates.forEach(([x, y]) => {
				tx += x;
				ty += y;
			})

			const cx = tx / count;
			const cy = ty / count;

			centroids[group] = { x: cx, y: cy }

			return centroids
		}, {})

	return centroids
}

function getGroupCoordinates(nodes: Node[]) {
	return nodes.reduce<Record<string, CoordinatePair[]>>((groupCoordinates, node) => {
		groupCoordinates[node.group] = groupCoordinates[node.group] || []
		groupCoordinates[node.group].push([node.x, node.y])

		return groupCoordinates
	}, {})
}
