import './App.css';

function App() {
	return (
		<div className="App">
			<h1>Graph</h1>
			<form id="node-filters">
				<label htmlFor="node-filters-list">Filters:</label>
				<select id="node-filters-list"></select>

				<button type="button" id="reset-filters">Clear filters</button>
			</form>
			<div id="container">
				<div className="details"></div>
			</div>
		</div>
	);
}

export default App;

/*
import data from "./data.json"
const { nodes, links, groups } = data
import runSimulation from "./chart/simulation/simulation.js"
import render from "./chart/rendering/render.js"

renderFilters(groups)

let simulation
rerender("all")

function rerender(groupId) {
	const currentNodeIds = nodes
		.filter(node => groupId === "all" || node.group === groupId)
		.map(({ id }) => id)

	const normalizedLinks = groupId === "all"
		? deepClone(links)
		: deepClone(links)
			.filter(({ source, target }) => {
				return [
					source,
					target,
				].some(node => currentNodeIds.includes(node))
			})

	const linkedNodeIds = normalizedLinks
		.flatMap(({ source, target }) => {
			return ([
				source,
				target,
			])
		})
	const normalizedNodes = getUnique(linkedNodeIds)
		.map(nodeId => nodes
			.find(({ id }) => id === nodeId)
		)

	simulation = runSimulation({
		simulation,
		nodes: deepClone(normalizedNodes),
		links: deepClone(normalizedLinks),
		groups: deepClone(groups),
		currentFilter: groupId,
	})

	render(simulation)
}

function renderFilters(groups) {
	const $nodeFiltersList = document.querySelector("#node-filters-list")

	const $allOption = document.createElement("option")
	$allOption.value = "all"
	$allOption.textContent = "All"
	$nodeFiltersList.append($allOption)

	groups
		.map(group => {
			const $option = document.createElement("option")
			$option.textContent = group.label
			$option.value = group.id
			return $option
		}).forEach($option => {
			$nodeFiltersList.append($option)
		})

	$nodeFiltersList
		.addEventListener("input", (event) => {
			rerender(event.target.value)
		})

	document
		.querySelector("#reset-filters")
		.addEventListener("click", () => {
			rerender("all")
		})

}

function getUnique(array) {
	return Array.from((new Set(array)))
}

function deepClone(object) {
	return JSON.parse(JSON.stringify(object))
}
*/
