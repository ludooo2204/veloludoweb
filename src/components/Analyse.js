import React from "react";
import { moyenne,mesureDenivelléPositif } from "../helpers/maths";
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
export default Analyse;
