import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { ajaxGet } from "./helpers/ajax";
import ParcoursItem from "./components/ParcoursItem";
import { useState,useEffect } from "react";

const App = () => {
	const [dataList, setDatasList] = useState(null);
	const [index, setIndex] = useState(0);
	useEffect(() => {
		ajaxGet("http://localhost/velo/api/velo/get.php", (reponse3) => {
			const listeDesParcours = JSON.parse(reponse3);
			// console.log(listeDesParcours);
			setDatasList(listeDesParcours);
	
		});
	}, []);

	const handleKey = (e) => {
		if (e.keyCode === 37&& index!==0) {
			setIndex(index-1)
		}
		if (e.keyCode === 39) {
			setIndex(index+1)
		}
	};
	return (
		<div className="app" onKeyDown={handleKey} tabIndex="0">
			<Navbar />
			<main data-tip data-for="tip" className="main">
				{dataList && <ParcoursItem dataListItem={dataList[index]} />}
			</main>
		</div>
	);
};

export default App;
