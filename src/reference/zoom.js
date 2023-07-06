import { zoomIdentity, zoom as Zoom, interpolate } from "d3"
import options from "./options.js"

const {
	chart: {
		width,
		height,
		resetScalingFactor,
	},
	zoom: {
		minimum,
		maximum,
		defaultScale,
		constraintFactor,
	},
} = options

export const zoom = Zoom()
	.interpolate(interpolate)
	.scaleExtent([minimum, maximum])
	.translateExtent([
		[width / -constraintFactor, height / -constraintFactor],
		[width / constraintFactor, height / constraintFactor]
	])

export function attachZoomListener(bounds, zoom) {
	zoom.on("zoom", ({ transform }) => {
		transform.x = Math.ceil(transform.x)
		transform.y = Math.ceil(transform.y)
		transform.k = Math.ceil(transform.k)
		bounds
			.attr("transform", transform)
	})
}

export function resetZoom(svg, zoom) {
	const widthRatio = window.innerWidth / width
	const newScale = widthRatio * resetScalingFactor
	const transform = zoomIdentity.scale(newScale)

	transform.x = Math.ceil(transform.x)
	transform.y = Math.ceil(transform.y)
	transform.k = Math.ceil(transform.k)

	svg.call(zoom.transform, transform)
	svg
		.select(".bounds")
		.attr("transform", transform)
}
