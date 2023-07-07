import { RawLink, Node as NodeType, RawNode } from "../types";
import classnames from "classnames";
import { MouseEvent } from "react";
import "./Node.scss"

type Props = {
	node: NodeType;
	links: RawLink[];
	zoomTo: (node: RawNode) => void;
}

export default function Node({ node, links, zoomTo }: Props) {
	const nodeDiameter = 4
	const linkCounts = getLinkCounts(links)
	const { id, complete, in_progress, critical } = node
	const formattedId = id.replace(/\s/g, "-")

	const handleClick = (event: MouseEvent) => {
		zoomTo(node)
	}

	return (
		<g
			id={formattedId}
			className={classnames({
				Node: true,
				open: linkCounts[id]?.to === 0,
				closed: linkCounts[id]?.to !== 0,
				completed: complete,
				"in-progress": in_progress,
				critical: critical,
			})}
			onClickCapture={handleClick}
		>
			<use
				width={nodeDiameter}
				height={nodeDiameter}
				href="#circle"
				x={node.x - nodeDiameter / 2}
				y={node.y - nodeDiameter / 2}
			/>
			<text
				className="label"
				textAnchor="middle"
				x={node.x}
				y={node.y + 4}
			>{id}</text>
		</g >
	)
}

function getLinkCounts(links: RawLink[]) {
	return links.reduce<
		Record<
			string,
			{
				from: number;
				to: number;
			}
		>
	>((counts, link) => {
		counts[link.source] = counts[link.source] || { from: 0, to: 0 }
		counts[link.target] = counts[link.target] || { from: 0, to: 0 }
		counts[link.source].from = counts[link.source].from + 1
		counts[link.target].to = counts[link.target].to + 1
		return counts
	}, {})
}
