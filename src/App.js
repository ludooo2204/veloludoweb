import React from "react";
import "./App.css";
import { ajaxGet } from "./helpers/ajax";
import SliderPosition from "./components/slider";
import LineChartVelo from "./components/lineChart";
import MapTest from "./components/maps";
import Navbar from "./components/Navbar/Navbar";
import MapParcours from "./components/maps";

const moyenne = (data) => {
	let sum = 0;
	for (const iterator of data) {
		if (!isNaN(iterator)) sum += iterator;
	}
	return sum / data.length;
};

const lissageData = (_data, nbrValeurAMoyenner) => {
	let dataLissé = [];
	for (let i = 0; i < _data.length; i++) {
		let moyenneTemp;
		if (i + nbrValeurAMoyenner > _data.length) {
			moyenneTemp = moyenne(_data.slice(i, _data.length));
		}
		moyenneTemp = moyenne(_data.slice(i, i + nbrValeurAMoyenner));

		dataLissé.push(moyenneTemp);
	}
	return dataLissé;
};

const handleDataForChart = (datas) => {
	let BPM = [];
	let speed = [];
	let altitudeBrut = [];
	let altitudeLissé = [];
	let altitude = [];
	let BPMdata = datas[0];
	let BPMposition = datas[1];
	for (let i = 0; i < BPMdata.length; i++) {
		const element = BPMdata[i];

		BPM.push({ x: element[0], BPM: element[1] });
	}
	for (let i = 0; i < BPMposition.length; i++) {
		const element = BPMposition[i];
		if (element[3] && element[4]) {
			altitudeBrut.push(element[3]);
			speed.push({ x: element[0], Speed: element[4] * 3.6 });
		}
	}
	altitudeLissé = lissageData(altitudeBrut, 1);
	for (let i = 0; i < altitudeLissé.length; i++) {
		const element = altitudeLissé[i];
		altitude.push({ x: BPMposition[i][0], Altitude: element });
	}

	let data = { BPM, altitude, speed };
	return data;
};

const mesureDenivelléPositif = (altitude) => {
	let dPlus = 0;
	for (let i = 1; i < altitude.length; i++) {
		let ecart = altitude[i] - altitude[i - 1];
		if (ecart > 0.1) dPlus += ecart;
	}
	return Math.round(dPlus);
};



//React.memo pour ne pas recalculer les infos à chaque refresh
const Analyse = React.memo(({ data }) => {
	return (
		<div className="analyse">
			<div style={{ flex: 1 }}>
				<div className="infoParcours">
					<span className="spanInfoParcours1">Distance : </span>
					<span className="spanInfoParcours2">{data.distance / 1000} km</span>
				</div>
				<div className="infoParcours">
					<span className="spanInfoParcours1">Denivellé positif : </span>
					<span className="spanInfoParcours2">{mesureDenivelléPositif(data.altitudeLissé)} m</span>
				</div>
			</div>
			<div style={{ flex: 1 }}>
				<div className="infoParcours">
					<span className="spanInfoParcours1">BPM moyen : </span>
					<span className="spanInfoParcours2">{Math.round(moyenne(data.BPM))} bpm</span>
				</div>
				<div className="infoParcours">
					<span className="spanInfoParcours1">BPM max : </span>
					<span className="spanInfoParcours2">{Math.max(...data.BPM)} bpm</span>
				</div>
			</div>
			<div style={{ flex: 1 }}>
				<div className="infoParcours">
					<span className="spanInfoParcours1">Vitesse moyenne : </span>
					<span className="spanInfoParcours2">{Math.round(moyenne(data.speed) * 100) / 100} km/h</span>
				</div>
				<div className="infoParcours">
					<span className="spanInfoParcours1">Vitesse max : </span>
					<span className="spanInfoParcours2">{Math.round(Math.max(...data.speed) * 100) / 100} km/h</span>
				</div>
			</div>
		</div>
	);
});







const App = () => {
	const [data, setDatas] = React.useState(null);
	const [dataList, setDatasList] = React.useState(null);
	const [dataAnalysées, setDatasAnalysées] = React.useState(null);
	const [hoveredChart, setHoveredChart] = React.useState(null);
	const [activeParcours, setActiveParcoursState] = React.useState(0);

	React.useEffect(() => {
		getParcours();
	}, []);

	const getParcours = () => {
		ajaxGet("http://localhost/velo/api/velo/get.php", (reponse3) => {
			const listeDesParcours = JSON.parse(reponse3);
			setDatasList(listeDesParcours);
			ajaxGet(listeDesParcours[0].url, (reponse) => {
				const arrayData = JSON.parse(reponse);
				setDatas(arrayData);
				setDatasAnalysées(analyseData(arrayData));
			});
		});
	};

	// const handleSlider = (pos) => {
	// 	setSliderPosition(pos);
	// 	// console.log(pos/data[1].length)*20
	// 	// data[1].length
	// 	// sectionRef.current.style.boxShadow = "10px 200px 30px blue"
	// 	// box-shadow: 20px 20px 45px 5px #000000;
	// };

	const analyseData = (_data) => {
		console.log("analyse");
		console.log(_data);
		let dateBPM = [];
		let datePosition = [];
		let BPM = [];
		let speed = [];
		let altitude = [];
		let positionLongLat = [];
		let distance = _data[2];

		for (let i = 0; i < _data[0].length; i++) {
			const element = _data[0][i];
			dateBPM.push(new Date(element[0]));
			BPM.push(element[1]);
		}

		for (let i = 0; i < _data[1].length; i++) {
			const element = _data[1][i];
			if (element) {
				datePosition.push(new Date(element[0]));
				altitude.push(element[3]);
				speed.push(element[4] * 3.6);
				positionLongLat.push([element[2], element[1]]);
			}
		}
		let altitudeLissé = lissageData(altitude, 40);
		let dPlus = _data[3];
		let dataAnalysées = { datePosition, distance, altitudeLissé, speed, dateBPM, BPM, dPlus, positionLongLat };
		return dataAnalysées;
	};

	const ParcoursItem = ({ data, dataListItem, index, activeParcours }) => {
		const [dataOnHover, setDataOnHover] = React.useState(null);
		const [sliderPosition, setSliderPosition] = React.useState(1);
		console.log("data, dataListItem, index, activeParcours");
		console.log(data, dataListItem, index, activeParcours);
		React.useEffect(() => {
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
		const handleSlider = (pos) => {
			setSliderPosition(pos);
		};
		const handleHoverGraph = (e) => {
			if (e.activeLabel > 1) {
				setSliderPosition(e.activeLabel);
				setHoveredChart(e.name);
			}
		};
		console.log("render from ParcoursItem");
		return (
			<section className="section">
				<div className="titreParcours">Parcours du {dataListItem.date.split(" ")[0]}</div>
				<hr className="solid"></hr>
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
			</section>
		);
	};

	if (dataAnalysées) {
		console.log("render from APP");
		return (
			<div className="app">
				<Navbar />
				<main data-tip data-for="tip" className="main">
					<ParcoursItem dataListItem={dataList[0]} index={0} data={data} activeParcours={activeParcours} />
				</main>
			</div>
		);
	} else {
		return <h3>Chargement...</h3>;
	}
};

export default App;
