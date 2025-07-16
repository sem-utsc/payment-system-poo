function getAlumnosWithZeroCalif() {
	var alumnos = [];
	document.querySelectorAll("#xAlumnosG > tbody > tr:not([class])").forEach(row => {
		const alumno = row.querySelector("a.liga").getAttribute("onclick").replace("muestraCalif(", "").replace(")", "");
		const name = row.querySelector("td:nth-child(3)").innerText.trim();
		if (row.querySelector("[id^='Calif']").innerHTML == '0') {
			// send and alert to confirm if the `alumno` should be added to `alumnos` display the name
			if (confirm(`Alumno: ${alumno}, Nombre: ${name}. ¿Deseas agregarlo a la lista?`)) {
				alumnos.push(alumno);
				const numFila = row.querySelector("td").innerHTML;
				console.log(`Alumno: ${alumno}, Fila: ${numFila}, nombre: ${name}`);
			}
		}
	});
	console.log(`Alumnos con calificación 0: ${alumnos.join(', ')}`);
	console.log(alumnos);
	
}


function reprobados() {
	document.querySelectorAll("tr div[id^='Calif']").forEach(e => {
		if (e.innerHTML == '0') {
			e.style = "background:red;"
		} else {
			e.style = ""
		}
	})
}

function asd() {
	let cveActividad = prompt(`clave de la actividad:`);
	let cveResultado = prompt(`clave del resultado:`);
	let califGeneral = prompt(`calificación general (0, 8, 9, 10):`,"");
	const listaAlumno = [
		"28171"
	];
	const fetchPromises = [];
	document.querySelectorAll("#xAlumnosG > tbody > tr:not([class])").forEach(row => {
		const alumno = row.querySelector("a.liga").getAttribute("onclick").replace("muestraCalif(", "").replace(")", "");
		if (row.querySelector("[id^='Calif']").innerHTML == '0' && listaAlumno.includes(alumno)) {
			const name = row.querySelector("td:nth-child(3)").innerText.trim();
			const forms = new URLSearchParams();
			const numFila = row.querySelector("td").innerHTML;
			forms.append("xCargaA", document.getElementById("xCargaA").value);
			forms.append("xPeriodo", document.getElementById("xPeriodo").value);
			forms.append("xParcial", document.getElementById("xParcial").value);
			forms.append("cont", numFila);
			forms.append("xTotal", numFila);
			forms.append("xContA", document.getElementById("xContA").value);
			forms.append("xContR", document.getElementById("xContR").value);
			forms.append("xAccion", "GuardaT");
			forms.append("C;1;" + numFila, document.getElementById("xInd1" + alumno).value + ";" + alumno);
			forms.append("C;3;" + numFila, document.getElementById("xInd3" + alumno).value + ";" + alumno);
			forms.append("C;6;" + numFila, document.getElementById("xInd6" + alumno).value + ";" + alumno);
			let caliAct = califGeneral.length > 0 ? califGeneral : prompt(`${name}: calificación de la actividad (0, 8, 9, 10):`,"8");
			forms.append("C;8;" + numFila + ";1", caliAct+";" + alumno + ";"+cveActividad); // actividad
			let caliRes = califGeneral.length > 0 ? califGeneral : prompt(`${name}: calificación del resultado (0, 8, 9, 10):`,"8");
			forms.append("C;7;" + numFila + ";1", caliRes+";" + alumno + ";"+cveResultado); // resultado
			console.log(forms);
			// Guardar la promesa en el array
			fetchPromises.push(
				fetch("/websaiiut/jsp/academia/lista_cotejo_Rev.jsp", {
					method: "POST",
					body: forms
				}).then(response => response.json())
					.then(data => {
						console.log(name, data.mensaje);
					})
					.catch(error => {
						console.log(error);
					})
			);
		}
	});
	// Ejecutar todas las peticiones en paralelo
	Promise.all(fetchPromises).then(() => {
		alert("Todas las peticiones han finalizado.");
	})
	.catch(error => {
		console.error("Error en alguna de las peticiones:", error);
	});
}
// asd()