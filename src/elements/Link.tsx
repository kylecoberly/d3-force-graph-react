import classNames from "classnames";
import { Node } from "../types";
import "./Link.scss"

type Props = {
	source: Node;
	target: Node;
}

function toDegrees(radians: number) {
	return radians * (180 / Math.PI)
}

export default function Link({ source, target }: Props) {
	const dx = target.x - source.x
	const dy = target.y - source.y

	const angle = toDegrees(Math.atan2(dy, dx))
	const offset = {
		x: -1,
		y: -1,
	}

	return (
		<g
			className={classNames({
				Link: true,
			})}
			transform="translate(2,2)"
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
				transform={`
					rotate(${angle})
					translate(${offset.x}, ${offset.y})
				`.replace(/\s/g, "")}
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
