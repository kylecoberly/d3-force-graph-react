import { Simulation } from 'd3-force';
import Arrow from './elements/Arrow';
import Circle from './elements/Circle';
import Node from './elements/Node';
import './Graph.scss';
import { Node as NodeType, RawLink, Group } from './types';

const options = {
	chart: {
		height: Math.ceil(window.innerHeight * 0.8),
		width: Math.ceil(window.innerWidth * 0.8),
		boundary: Math.ceil(window.innerWidth * 0.7),
		resetScalingFactor: 4,
		transitionRate: 250,
		hullPadding: 5,
		nodeDiameter: 4,
	},
	zoom: {
		minimum: 4,
		maximum: 30,
		defaultScale: 5,
		constraintFactor: 7,
	},
	focus: {
		duration: 500,
		scale: 18,
	},
} as const


type Props = {
	filter: string;
	simulation: Simulation<NodeType, RawLink>;
	groups: Group[];
	links: RawLink[];
}

// svg.call(resetZoom, zoom)
//
// window.addEventListener("resize", () => {
// 	resetZoom(select("#container svg"), zoom)
// })

// function attachResetFocus(svg) {
// 	svg.on("click", (event) => {
// 		if (event.target.tagName !== "use") {
// 			select("#container .details")
// 				.classed("open", false)
// 		}
// 	})
// }

function Graph({ filter, groups, links, simulation }: Props) {
	const nodes = simulation.nodes()

	return (
		<div className="Graph">
			<div id="container">
				<div className="details"></div>
				<svg
					viewBox={`
						${Math.round(options.chart.width / -2)},
						${Math.round(options.chart.height / -2)},
						${options.chart.width},
						${options.chart.height}
					`.replace(/\s/g, "")}
					preserveAspectRatio="xMinYMin meet"
				>
					<defs>
						<Circle />
						<Arrow />
					</defs>
					<g
						className="bounds"
						width={options.chart.width}
						height={options.chart.width}
					>
						{nodes.map((node) => (
							<Node
								key={node.id}
								node={node}
								links={links}
							/>
						))}
					</g>
				</svg>
			</div>
		</div >
	);
}

export default Graph;
