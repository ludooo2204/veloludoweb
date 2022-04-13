import React from "react";
import { GeoJSON, MapContainer, TileLayer, Marker,  Tooltip } from "react-leaflet";

const MapParcours = ({ dataPosition, markerPosition, dataOnHover }) => {
	const data = {
		type: "Feature",
		id: "15",
		name: "test",
		properties: {},
		geometry: {
			type: "MultiLineString",
			coordinates: [dataPosition],
		},
	};
	const centerPosition = [(dataPosition[0][1] + dataPosition[Math.round(dataPosition.length / 2)][1]) / 2, (dataPosition[0][0] + dataPosition[Math.round(dataPosition.length / 2)][0]) / 2];

	return (
		<div style={{ margin: 10 }}>
			<MapContainer center={centerPosition} zoom={window.innerWidth < 700 ? 11 : 11} scrollWheelZoom={true}>
				<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{markerPosition && (
					<Marker position={[dataPosition[markerPosition][1], dataPosition[markerPosition][0]]}>
						<Tooltip permanent>
							{dataOnHover ? (
								<div className="tooltip-map">
									<div>Altitude {dataOnHover.infoAltitude} m</div>
									<div>Heure {dataOnHover.infoTime}</div>
									<div>Bpm {dataOnHover.infoBPM}</div>
									<div>Vitesse {dataOnHover.infoSpeed} km/h</div>
								</div>
							) : null}
						</Tooltip>
						<GeoJSON  color="black" data={data} />
					</Marker>
				)}
			</MapContainer>
		</div>
	);
};

export default MapParcours;
