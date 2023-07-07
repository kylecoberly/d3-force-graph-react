import { RawLink, Node as NodeType } from "../types";
import classnames from "classnames";

type Props = {
	node: NodeType;
	links: RawLink[];
}

export default function Node({ node, links }: Props) {
	const nodeDiameter = 4
	const linkCounts = getLinkCounts(links)
	const { id, complete, in_progress, critical } = node

	const handleClick = () => {
		// Focus node
		//const svg = select("#container svg")
		//centerNode({ element: svg, zoom, x: d.x, y: d.y, settings })
		//showDetails(d)
	}

	return (
		<g
			className={classnames({
				node: true,
				Node: true,
				open: linkCounts[id]?.to === 0,
				closed: linkCounts[id]?.to !== 0,
				completed: complete,
				"in-progress": in_progress,
				critical: critical,
			})}
			onClick={handleClick}
		>
			<use
				width={nodeDiameter}
				height={nodeDiameter}
				href="#circle"
				x={node.x}
				y={node.y}
			/>
			<text
				className="label"
				textAnchor="middle"
				x={node.x}
				y={node.y}
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

/*
function centerNode({ element, zoom, x, y, settings }) {
	const { scale, duration } = settings
	const transform = zoomIdentity
		.scale(scale)
		.translate(-x, -y)

	element
		// Do this with CSS animations instead instead
		// A transition is just calling these with tweened values lots of times per second!
		// .transition()
		// .duration(duration)
		.call(zoom.transform, transform)
}

function showDetails({ id }) {
	select("#container .details")
		.classed("open", true)
		.html(`
			<h2>${id}</h2>
			<p>${id}</p>
		`)
}
*/
