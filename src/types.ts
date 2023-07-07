import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export type RawGroup = {
	id: string;
	label: string;
	"background-color": string;
	"foreground-color": string;
}

export type Group = RawGroup & Coordinate & {
	points: CoordinatePair[];
}

export type RawNode = {
	id: string;
	group: string;
	critical?: boolean;
	complete?: boolean;
	in_progress?: boolean;
} & SimulationNodeDatum

export type Node = RawNode & Coordinate & {
	groupCenter?: Coordinate;
} & SimulationNodeDatum

export type RawLink = {
	source: string;
	target: string;
} & SimulationLinkDatum<Node>

export type Link = {
	source: Node;
	target: Node;
} & SimulationLinkDatum<Node>

export type Coordinate = {
	x: number;
	y: number;
}

export type CoordinatePair = [number, number]
