function StationRadio({ stations }) {
	return stations.map((station) => (
		<label key={station.value}>
			<input
				type="radio"
				name="station"
				value={station.value}
				defaultChecked={station.value === '/front-desk'}
			/>
			{station.name}
		</label>
	));
}

export default StationRadio;
