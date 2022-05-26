export const moyenne = (data) => {
	let sum = 0;
	for (const iterator of data) {
		if (!isNaN(iterator)) sum += iterator;
	}
	return sum / data.length;
};

export const lissageData = (_data, nbrValeurAMoyenner) => {
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
export const handleDataForChart = (datas) => {
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


export const mesureDenivelléPositif = (altitude) => {
	let dPlus = 0;
	for (let i = 1; i < altitude.length; i++) {
		let ecart = altitude[i] - altitude[i - 1];
		if (ecart > 0.1) dPlus += ecart;
	}
	return Math.round(dPlus);
};

export const analyseData = (_data) => {
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