import React, { useState, useEffect } from "react";
import { ajaxGet, compare } from "../../helpers/ajax";
import "./Navbar.css";

export default function Navbar() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	console.log("window.innerWidth");
	console.log(window.innerWidth);
	const toggleNav = () => {
		console.log(toggleMenu);
		setToggleMenu(!toggleMenu);
	};

	//Permet de recuperer la screenWidth en cas de redimensionnement
	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", changeWidth);

		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);
	const getParcours = () => {
		console.log("gegette!");

		const dataTest = '[{"id":"79","date":"25/06/2021 07:06","trajet":null,"distance":"17178","url":"n3 du 25-06-2021.txt"},{"id":"82","date":"25/06/2021 09:06","trajet":null,"distance":"118","url":"n6 du 25-06-2021 09H06.txt"}]';
		const dataFromBDD = JSON.parse(dataTest);
		console.log(dataFromBDD);
		console.log(dataFromBDD[0].date);
		const dataFromBDDTriéParDate = dataFromBDD.sort(compare);

		// ajaxGet("getParcours.php", function (e) {
		// 	console.log(e);
		// });
	};
	return (
		<nav>
			{(toggleMenu || screenWidth > 500) && (
				<ul className="list">
					<li className="items">Accueil</li>
					<li className="items" onClick={getParcours}>
						Parcours*
					</li>
					<li className="items">Analyse</li>
					<li className="items">Records</li>
				</ul>
			)}

			<div onClick={toggleNav} className="btn">
				<svg viewBox="0 0 100 80" width="30" height="25">
					<rect width="100" height="20" stroke="blue" fill="#f1f1f1" rx="8" ry="8"></rect>
					<rect y="30" width="100" height="20" stroke="blue" fill="#f1f1f1" rx="8" ry="8"></rect>
					<rect y="60" width="100" height="20" stroke="blue" fill="#f1f1f1" strrx="8" ry="8"></rect>
				</svg>
			</div>
		</nav>
	);
}
