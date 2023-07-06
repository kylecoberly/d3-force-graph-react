import { Node, Group, RawGroup } from "../types"

export default function getGroupsCoordinates(nodes: Node[], groups: RawGroup[]) {
	return groups
		.map<Pick<Group, "x" | "y" | "points">>(group => {
			const groupCenters = getCentroids(nodes)
			const { id } = group

			return {
				x: groupCenters[id].x,
				y: groupCenters[id].y,
				points: nodes
					.filter(({ group }) => group === id)
					.map<[number, number]>(({ x, y }: Node) => ([x, y])),
			}
		})
}

function getCentroids(nodes: Node[]) {
	const groupCoordinates = getGroupCoordinates(nodes)

	const centroids = Object
		.entries(groupCoordinates)
		.reduce<Record<string, { x: number, y: number }>>((centroids, [group, coordinates]) => {
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
	return nodes.reduce<Record<string, [number, number][]>>((groupCoordinates, node) => {
		if (node.x && node.y) {
			groupCoordinates[node.group] = groupCoordinates[node.group] || []
			groupCoordinates[node.group].push([node.x, node.y])
		}
		return groupCoordinates
	}, {})
}
