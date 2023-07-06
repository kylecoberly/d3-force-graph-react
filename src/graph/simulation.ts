import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide
} from "d3"
import getGroupsCoordinates from "./add-group-coordinates.js"
import attractGroups from "./forces/attract-groups.js"
import shapeLinks from "./forces/shape-links.js"
import createLinkForce from "./forces/links.js"
import options from "./options"
import { Node, Group, Link } from "../types.js"

const {
	simulation: {
		tickCount,
	},
	forces: {
		positional: positionalForce,
		charge,
		collision,
	},
} = options

type SimulationParameters = {
	nodes: Node[];
	links: Link[];
	groups: Group[];
	currentFilter: string;
}

const simulation = initializeSimulation()

const reference: {
	nodes?: Node[];
	links?: Link[];
	groups?: Group[];
	currentFilter?: string;
} = {}

export default function runSimulation({
	nodes,
	links,
	groups: rawGroups,
	currentFilter,
}: SimulationParameters) {
	const currentNodeIds = nodes
		.filter(node => currentFilter === "all" || node.group === currentFilter)
		.map(({ id }) => id)

	const normalizedLinks = currentFilter === "all"
		? deepClone<Link[]>(links)
		: deepClone<Link[]>(links)
			.filter(({ source, target }) => {
				return [
					source,
					target,
				].some(node => currentNodeIds.includes(node))
			})

	const linkedNodeIds = normalizedLinks
		.flatMap(({ source, target }) => {
			return ([
				source,
				target,
			])
		})
	const normalizedNodes = getUnique(linkedNodeIds)
		.map(nodeId => nodes
			.find(({ id }) => id === nodeId) || nodes[0]
		)
	reference.groups = rawGroups
	reference.currentFilter = currentFilter
	reference.links = links
	const linkForce = createLinkForce().links(links)
	simulation.restart()
	simulation
		.nodes(normalizedNodes)
		.force("link", linkForce)
		.stop()
	let count = tickCount
	simulation.alpha(1)

	while (count > 0) {
		simulation.tick()
		count--
		const groups = getGroupsCoordinates(nodes, rawGroups)
		[attractGroups, shapeLinks]
			.forEach(simulationUpdater => simulationUpdater(simulation, groups))
	}

	return simulation
}

function initializeSimulation() {
	return forceSimulation()
		.force("charge", forceManyBody().strength(charge.initial))
		.force("x", forceX(positionalForce.x))
		.force("y", forceY(positionalForce.y))
		.force("collision", forceCollide(collision.initial))
}

function getUnique(array: unknown[]) {
	return Array.from((new Set(array)))
}

function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T
}
