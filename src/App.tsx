import { ChangeEvent, useState } from 'react';
import './App.scss';
import data from "./data.json"
import Graph from './Graph';

import runSimulation from "./graph/simulation"

const { nodes, links, groups } = data

function App() {
	const [currentFilter, setCurrentFilter] = useState("all")

	const resetFilter = () => {
		setCurrentFilter("all")
	}

	const changeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
		setCurrentFilter(event.target.value)
	}

	const simulation = runSimulation({
		nodes: deepClone(nodes),
		links: deepClone(links),
		groups: deepClone(groups),
		currentFilter,
	})

	return (
		<div className="App">
			<h1>Graph</h1>
			<form id="node-filters">
				<label htmlFor="node-filters-list">Filters:</label>
				<select id="node-filters-list" value={currentFilter} onInput={changeFilter}>
					{groups.map(({ id, label }) => (
						<option key={id} value={id}>{label}</option>
					))}
					<option value="all">All</option>
				</select>

				<button type="button" id="reset-filters" onClick={resetFilter}>Clear filters</button>
			</form>
			<Graph
				filter={currentFilter}
				nodes={nodes}
				links={links}
			/>
		</div>
	);
}

export default App;

/*
import render from "./chart/rendering/render.js"

renderFilters(groups)

let simulation
rerender("all")

function rerender(groupId) {

	simulation = runSimulation({
		simulation,
		nodes: deepClone(normalizedNodes),
		links: deepClone(normalizedLinks),
		groups: deepClone(groups),
		currentFilter: groupId,
	})

	render(simulation)
}

*/

function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T
}
