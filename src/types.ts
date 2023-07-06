import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export type Group = {
	id: string;
	label: string;
	"background-color": string;
	"foreground-color": string;
}

export type Node = {
	id: string;
	group: string;
	critical?: boolean;
	complete?: boolean;
} & SimulationNodeDatum

export type Link = {
	source: string;
	target: string;
} & SimulationLinkDatum<Node>
