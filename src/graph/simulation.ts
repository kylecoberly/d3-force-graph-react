import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide, Simulation
} from "d3"
import addCoordinatesToGroup from "./add-coordinates-to-group"
import attractGroups from "./forces/attract-groups"
import shapeLinks from "./forces/shape-links"
import createLinkForce from "./forces/links"
import options from "./options"
import { Node, Link, RawNode, RawGroup, Group } from "../types"

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
	nodes: RawNode[];
	links: Link[];
	groups: RawGroup[];
	currentFilter: string;
}

export default function runSimulation({
	nodes,
	links,
	groups: rawGroups,
	currentFilter,
}: SimulationParameters) {
	const simulation = initializeSimulation()

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

	const linkForce = createLinkForce().links(links)
	simulation.restart()
	simulation
		.nodes(normalizedNodes)
		.force("link", linkForce)
		.stop()
	let count = tickCount
	simulation.alpha(1)

	// Casting to include coordinates from simulation
	const tickedSimulation = simulation as Simulation<Node, Link>
	const groups = addCoordinatesToGroup(tickedSimulation, rawGroups)

	while (count > 0) {
		simulation.tick()
		count--
		attractGroups(tickedSimulation, groups)
		shapeLinks(tickedSimulation)
	}

	return {
		simulation: simulation as Simulation<Node, Link>,
		groups,
	}
}

function initializeSimulation() {
	return forceSimulation<RawNode>()
		.force("charge", forceManyBody<RawNode>().strength(charge.initial))
		.force("x", forceX<RawNode>(positionalForce.x))
		.force("y", forceY<RawNode>(positionalForce.y))
		.force("collision", forceCollide<RawNode>(collision.initial))
}

function getUnique(array: unknown[]) {
	return Array.from((new Set(array)))
}

function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T
}
