import React from "react";

import { CartesianGrid, Legend, ResponsiveContainer, Line, LineChart, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import moment from "moment";
import { handleDataForChart } from "../helpers/maths";

class LineChartVelo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { activeLabel: 0 };
	}
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return false;
	// }
	handleMouse = (e) => {
		if (e != null && e.activePayload) {
			let hoveredChart = e.activePayload[0].name;
			this.props.activeLabel({ activeLabel: handleDataForChart(this.props.datas).altitude.findIndex((element) => element.x == e.activeLabel), name: hoveredChart });
		}
	};
	render() {
		// console.log("render from lineChartVelo");
		let datas = handleDataForChart(this.props.datas);

		let data = [...datas.BPM, ...datas.altitude, ...datas.speed];
		return (
			<div style={{ height: "100%", width: "100%" }}>
				<ResponsiveContainer width="100%" height="33%">
					<LineChart onMouseMove={this.handleMouse} data={data}>
						<Tooltip
							labelFormatter={(value, name, props) => {
								return new Date(value).toLocaleTimeString("fr-FR");
							}}
						/>
						<XAxis dataKey="x" domain={["dataMin", "dataMax"]} name="Time" tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")} type="number" />
						<CartesianGrid strokeDasharray="3 3" />
						<YAxis yAxisId="speed" />
						<Legend />
						<Line isAnimationActive={false} dataKey="Speed" stroke="red" yAxisId="speed" dot={false} type="monotone" activeDot={{ r: 10 }} />
					</LineChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="100%" height="33%">
					<LineChart onMouseMove={this.handleMouse} data={data}>
						<Tooltip
							labelFormatter={(value, name, props) => {
								return new Date(value).toLocaleTimeString("fr-FR");
							}}
						/>
						<XAxis dataKey="x" domain={["dataMin", "dataMax"]} name="Time" tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")} type="number" />
						<CartesianGrid strokeDasharray="3 3" />
						<YAxis yAxisId="BPM" domain={[Math.min(this.props.datas.BPM), "auto"]} />
						<Legend />
						<Line isAnimationActive={false} dataKey="BPM" type="monotone" yAxisId="BPM" stroke="black" onMouseOver={() => console.log("googo")} dot={false} activeDot={{ r: 10 }} />
					</LineChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="100%" height="33%">
					<LineChart onMouseMove={this.handleMouse} data={data}>
						<Tooltip
							labelFormatter={(value, name, props) => {
								return new Date(value).toLocaleTimeString("fr-FR");
							}}
						/>
						<XAxis dataKey="x" domain={["dataMin", "dataMax"]} name="Time" tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss")} type="number" />
						<CartesianGrid strokeDasharray="3 3" />
						<YAxis yAxisId="altitude" domain={[Math.min(this.props.datas.altitude), "auto"]} />
						<Legend />
						<Line isAnimationActive={false} dataKey="Altitude" type="monotone" yAxisId="altitude" stroke="lightblue" activeDot={{ r: 10 }} dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default LineChartVelo;
