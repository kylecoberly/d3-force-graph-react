import { Simulation } from 'd3-force';
import './Graph.scss';
import { Node, Link, Group } from './types';

type Props = {
	filter: string;
	simulation: Simulation<Node, Link> & { groups: Group[] }
}

function Graph({ filter, simulation }: Props) {
	const nodes = simulation.nodes()
	const groups = simulation.groups

	return (
		<div className="Graph">
			<div id="container">
				<div className="details"></div>
				<svg viewBox="-50,-50,100,100">
					{nodes.map(({ id, x, y }) => (
						<circle key={id} cx={x} cy={y} r="0.1" stroke="blue" />
					))}
				</svg>
			</div>
		</div>
	);
}

export default Graph;
