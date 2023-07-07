import classnames from "classnames";
import { Node } from "../types";

type Props = {
	source: Node;
	target: Node;
}

export default function Link({ source, target }: Props) {
	return (
		<g
			className={classnames({
				link: true,
				Link: true,
			})}
		>
			<path
				id={`link-${generateLinkId({ source, target })}`}
				d={generateLinkPath({ source, target })}
			/>
			<use
				width="2"
				height="2"
				href="#arrow"
				className="ant"
			>
				<animateMotion
					dur="0.5s"
					repeatCount="indefinite"
				>
					<mpath href={`#link-${generateLinkId({ source, target })}`} />
				</animateMotion>
			</use>
		</g >
	)
}

export function generateLinkPath({ source, target }: { source: Node; target: Node; }) {
	return `M${source.x},${source.y} ${target.x},${target.y}`
}

function generateLinkId({ source, target }: { source: Node; target: Node; }) {
	return `${source.id}-${target.id}`.replaceAll(" ", "").trim()
}
