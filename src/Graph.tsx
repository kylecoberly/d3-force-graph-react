import './Graph.scss';

type Props = {
	filter: string;
	nodes: unknown[];
	links: unknown[];
}

function Graph({ filter }: Props) {
	return (
		<div className="Graph">
			<div id="container">
				<div className="details"></div>
			</div>
		</div>
	);
}

export default Graph;
