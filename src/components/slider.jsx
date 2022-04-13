import React from "react";
import "../App.css";

const SliderPosition = ({ sliderValue, sliderValueProps, arrayLength }) => {
	const [valueSlider, setValueSlider] = React.useState(1);
	const handleChange = (e) => {
		setValueSlider(e);
		sliderValue(e);
	};
	return (
		<input
			className="slider"
			type="range"
			value={sliderValueProps || valueSlider}
			onChange={(event) => handleChange(event.target.value)}
			min={1}
			max={arrayLength - 1}
			step={1}
		></input>
	);
};

export default SliderPosition;
