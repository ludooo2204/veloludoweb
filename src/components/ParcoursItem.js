import React from "react";
import SliderPosition from "./slider";
import LineChartVelo from "./lineChart";
import MapParcours from "./maps";
import Analyse from "./Analyse";
import { handleDataForChart, analyseData } from "../helpers/maths";
import { useEffect } from "react";
import { ajaxGet } from "../helpers/ajax";

const ParcoursItem = ({ dataListItem }) => {
	const [dataOnHover, setDataOnHover] = React.useState(null);
	const [sliderPosition, setSliderPosition] = React.useState(1);
	const [hoveredChart, setHoveredChart] = React.useState(null);
	const [dataAnalysées, setDatasAnalysées] = React.useState(null);
	const [data, setDatas] = React.useState(null);


	useEffect(() => {
		console.log("render from useEffect sliderPosition");
		if (data) {
			if ((hoveredChart == "BPM") & (data[0] != undefined)) {
				let pos = Math.round((data[0].length / data[1].length) * sliderPosition);
				let infoBPM = data[0][pos][1];
				let infoSpeed = Math.round(data[1][sliderPosition][4] * 3.6 * 10) / 10;
				let infoAltitude = data[1][sliderPosition][3];
				let infoTime = new Date(data[1][sliderPosition][0]).toLocaleTimeString("fr-FR");
				setDataOnHover({ infoSpeed, infoAltitude, infoBPM, infoTime });
			}
			if (hoveredChart == "Altitude") {
				let pos = Math.round((data[0].length / data[1].length) * sliderPosition);
				let infoBPM = data[0][pos][1];
				let infoSpeed = Math.round(data[1][sliderPosition][4] * 3.6 * 10) / 10;
				let infoAltitude = data[1][sliderPosition][3];
				let infoTime = new Date(data[1][sliderPosition][0]).toLocaleTimeString("fr-FR");
				setDataOnHover({ infoSpeed, infoAltitude, infoBPM, infoTime });
			}
			if (hoveredChart == "Speed") {
				let pos = Math.round((data[0].length / data[1].length) * sliderPosition);
				let infoBPM = data[0][pos][1];
				let infoSpeed = Math.round(data[1][sliderPosition][4] * 3.6 * 10) / 10;
				let infoAltitude = data[1][sliderPosition][3];
				let infoTime = new Date(data[1][sliderPosition][0]).toLocaleTimeString("fr-FR");
				setDataOnHover({ infoSpeed, infoAltitude, infoBPM, infoTime });
			}
		}
	}, [sliderPosition]);
	useEffect(() => {
        console.log("fetch ",dataListItem.url)
		ajaxGet(dataListItem.url, (reponse) => {
			const arrayData = JSON.parse(reponse);
			setDatas(arrayData);
			setDatasAnalysées(analyseData(arrayData));
		});
	}, [dataListItem]);

	const handleSlider = (pos) => {
		setSliderPosition(pos);
	};
	const handleHoverGraph = (e) => {
		if (e.activeLabel > 1) {
			setSliderPosition(e.activeLabel);
			setHoveredChart(e.name);
		}
	};
	return (
		<section className="section">
			<div className="titreParcours">Parcours du {dataListItem.date.split(" ")[0]}</div>
			<hr className="solid"></hr>
			{dataAnalysées && (
				<div>
					<Analyse data={dataAnalysées} />
					<hr className="solid"></hr>
					<div data-tip data-for="tip" className="chartsMapContainer">
						<div className="map">
							<MapParcours dataOnHover={dataOnHover} dataPosition={dataAnalysées.positionLongLat} markerPosition={sliderPosition} />
						</div>
						<div className="charts">
							<LineChartVelo datas={handleDataForChart(data)} positionSliderProps={sliderPosition} title="Ecart/appareil" color="#70CAD1" activeLabel={handleHoverGraph} />
						</div>
					</div>
					<SliderPosition arrayLength={data[1].length} sliderValue={handleSlider} sliderValueProps={sliderPosition} />
				</div>
			)}
		</section>
	);
};
export default ParcoursItem;
