import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export type RawGroup = {
	id: string;
	label: string;
	"background-color": string;
	"foreground-color": string;
}

export type Group = RawGroup & {
	x: number;
	y: number;
	points: [number, number][];
}

export type RawNode = {
	id: string;
	group: string;
	critical?: boolean;
	complete?: boolean;
} & SimulationNodeDatum

export type Node = RawNode & {
	x: number;
	y: number;
} & SimulationNodeDatum

export type Link = {
	source: string;
	target: string;
} & SimulationLinkDatum<Node>
