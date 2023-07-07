import './Graph.scss';
import { RawNode } from './types';

type Props = {
	node: RawNode;
}

function NodeDetails({ node }: Props) {
	const { id } = node

	return (
		<>
			<h2>{id}</h2>
			<p>{id}</p>
		</>
	);
}

export default NodeDetails;
