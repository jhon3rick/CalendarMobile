/**
 * Calendar Mobile
 *
 * @version 1.0
 *
 * @author Jhon Erick Marroquin Cardenas <jhon3rick@gmail.com> || @jhon3rick
 */

//Variables globales a definir por el desarrollador
var limiteInferiorYear	= 2000;
var separadorFecha		= "-";
var contador=0;

//Variables Globales Calendario
var fechaInicioCalendario;
var yearCalendario;
var monthCalendario;
var dayCalendario;
var idInputCalendario;
var contenido_calendario;

contenido_calendario  = '	<div id="modal_calendario">';
contenido_calendario += '		<div id="contenedor_calendario">';
contenido_calendario += '			<div id="titulos_calendario">';
contenido_calendario += '				<div id="titulo_calendario" class="titulo_calendario"></div>';
contenido_calendario += '				<div class="sub_titulo_calendario">Dia</div>';
contenido_calendario += '				<div class="sub_titulo_calendario">Mes</div>';
contenido_calendario += '				<div class="sub_titulo_calendario">Año</div>';
contenido_calendario += '			</div>';
contenido_calendario += '			<div id="contenedor_day_calendario" class="fecha_calendario fecha_calendario_left">';
contenido_calendario += '			  	<div class="contenedor_signo_calendario">';
contenido_calendario += '					<div id="mas_day" class="signo_calendario">+</div>';
contenido_calendario += '				</div>';
contenido_calendario += '				<div class="contenedor_numero_calendario">';
contenido_calendario += '					<div id="day_calendario" class="numero_calendario"></div>';
contenido_calendario += '				</div>';
contenido_calendario += '				<div class="contenedor_signo_calendario">';
contenido_calendario += '					<div id="menos_day" class="signo_calendario">-</div>';
contenido_calendario += '				</div>';
contenido_calendario += '			</div>';
contenido_calendario += '			<div id="contenedor_month_calendario" class="fecha_calendario">';
contenido_calendario += '				<div class="contenedor_signo_calendario">';
contenido_calendario += '					<div id="mas_month" class="signo_calendario">+</div>';
contenido_calendario += '				</div>';
contenido_calendario += '				<div class="contenedor_numero_calendario">';
contenido_calendario += '					<div id="month_calendario" class="numero_calendario"></div>';
contenido_calendario += '				</div>';
contenido_calendario += '				<div id="anterior_month" class="contenedor_signo_calendario">';
contenido_calendario += '					<div id="menos_month" class="signo_calendario">-</div>';
contenido_calendario += '				</div>';
contenido_calendario += '			</div>';
contenido_calendario += '			<div id="contenedor_year_calendario" class="fecha_calendario fecha_calendario_right">';
contenido_calendario += '				<div class="contenedor_signo_calendario">';
contenido_calendario += '					<div id="mas_year" class="signo_calendario">+</div>';
contenido_calendario += '				</div>';
contenido_calendario += '				<div class="contenedor_numero_calendario">';
contenido_calendario += '					<div id="year_calendario" class="numero_calendario"></div>';
contenido_calendario += '				</div>';
contenido_calendario += '				<div class="contenedor_signo_calendario">';
contenido_calendario += '					<div id="menos_year" class="signo_calendario">-</div>';
contenido_calendario += '				</div>';
contenido_calendario += '			</div>';
contenido_calendario += '			<div id="contenedor_btn_calendario">';
contenido_calendario += '				<div class="centrar_btn_vertical">';
contenido_calendario += '					<div id="aceptar_calendario" class="btn_calendario"><span class="span_text_btn_calendario">Aceptar</span></div>';
contenido_calendario += '					<div id="cancelar_calendario" class="btn_calendario"><span class="span_text_btn_calendario">Cancelar</span></div>';
contenido_calendario += '				</div>';
contenido_calendario += '			</div>';
contenido_calendario += '		</div>';
contenido_calendario += '	</div>';

function cargarCalendario(inputFecha, titulo, modal) {

	//Div padre contenedor Calendario
	var div_contenedor = document.createElement("div");
	div_contenedor.innerHTML = contenido_calendario;
	div_contenedor.setAttribute("id", "carga_modal_calendario");

	padre_calendario=inputFecha.parentNode;

	if(document.getElementById('carga_modal_calendario')){
		//Se elimina el calendario si esta desplegado
		var calendario = document.getElementById("carga_modal_calendario");
		calendario.parentNode.removeChild(calendario);
	}
	//Inserta calendario despues del nodo input
	inputFecha.parentNode.insertBefore (div_contenedor, inputFecha.nextSibling);

	//Asigna clase si el caloendario es modal
	if(modal==true){ document.getElementById("carga_modal_calendario").className	= "fondo_modal_calendario"; }


	//document.getElementById("contenedor_calendario").style.display	= "block";
	document.getElementById("titulo_calendario").innerHTML			= titulo;
	idInputCalendario=inputFecha.id;

	if(inputFecha.value==""){ fechaInicioCalendario = new Date(); }
	else{
		var inputFecha=inputFecha.value.split(separadorFecha);
		fechaInicioCalendario = new Date(inputFecha[0], inputFecha[1]-1, inputFecha[2]);
	}

	yearCalendario	= fechaInicioCalendario.getFullYear();
	monthCalendario	= fechaInicioCalendario.getMonth();
	dayCalendario	= fechaInicioCalendario.getDate();

	document.getElementById("year_calendario").innerHTML	= yearCalendario;
	document.getElementById("month_calendario").innerHTML	= monthCalendario+1;
	document.getElementById("day_calendario").innerHTML		= dayCalendario;
}

//Funcion q valida si existe o no la fecha
function validarFechaCalendario(){
	var validarFecha = new Date(yearCalendario, monthCalendario, dayCalendario);

	if(!validarFecha || validarFecha.getFullYear() == yearCalendario && validarFecha.getMonth() == monthCalendario && validarFecha.getDate() == dayCalendario){
		return true;
	}
	else{ return false; }
}

//Funcion carga el total de dias por mes
function daysMonthCalendario(){
	var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if ((monthCalendario==1)&&(yearCalendario%4==0)&&((yearCalendario%100!=0)||(yearCalendario%400==0))){
		dayCalendario = 29;
	}
	else{ dayCalendario = monthDays[monthCalendario]; }
}

function addRemoveYearCalendario(evento){

	document.getElementById("day_calendario").style.backgroundColor="#FFF";
	document.getElementById("month_calendario").style.backgroundColor="#FFF";
	document.getElementById("year_calendario").style.backgroundColor="#D5E2F1";

	if(evento=="mas") yearCalendario++;
	if(evento=="menos" && yearCalendario>limiteInferiorYear) yearCalendario--;
	document.getElementById("year_calendario").innerHTML=yearCalendario;

	if(!validarFechaCalendario()) daysMonthCalendario();
	document.getElementById("day_calendario").innerHTML=dayCalendario;
}

function addRemoveMonthCalendario(evento){
	document.getElementById("day_calendario").style.backgroundColor="#FFF";
	document.getElementById("month_calendario").style.backgroundColor="#D5E2F1";
	document.getElementById("year_calendario").style.backgroundColor="#FFF";

	if(evento=='mas'){
		monthCalendario++;
		if(monthCalendario>11)monthCalendario=0;
	}
	if(evento=='menos'){
		monthCalendario--;
		if(monthCalendario<0)monthCalendario=11;
	}
	document.getElementById("month_calendario").innerHTML=monthCalendario+1;

	if(!validarFechaCalendario()) daysMonthCalendario();
	document.getElementById("day_calendario").innerHTML=dayCalendario;
}

function addRemoveDayCalendario(evento){

	document.getElementById("day_calendario").style.backgroundColor="#D5E2F1";
	document.getElementById("month_calendario").style.backgroundColor="#FFF";
	document.getElementById("year_calendario").style.backgroundColor="#FFF";

	if(evento=='mas'){
		dayCalendario++;
		if(!validarFechaCalendario()){ dayCalendario=1; }
	}

	if(evento=='menos'){
		dayCalendario--;
		if(!validarFechaCalendario()) daysMonthCalendario();
	}
	document.getElementById("day_calendario").innerHTML=dayCalendario;
}

function accionBtnAceptar(){
	document.getElementById(idInputCalendario).value=yearCalendario+separadorFecha+(monthCalendario+1)+separadorFecha+dayCalendario;
	//document.getElementById("contenedor_calendario").style.display ="none";
	var calendario = document.getElementById("carga_modal_calendario");
	calendario.parentNode.removeChild(calendario);
}

function accionBtnCancelar(){
	//document.getElementById("contenedor_calendario").style.display ="none";
	var calendario = document.getElementById("carga_modal_calendario");
	calendario.parentNode.removeChild(calendario);
}

function cambiarFechaCalendario(opc){
	switch(opc){
		case 'mas_day':
			addRemoveDayCalendario('mas');
			break;
		case 'menos_day':
			addRemoveDayCalendario('menos');
			break;
		case 'mas_month':
			addRemoveMonthCalendario('mas');
			break;
		case 'menos_month':
			addRemoveMonthCalendario('menos');
			break;
		case 'mas_year':
			addRemoveYearCalendario('mas');
			break;
		case 'menos_year':
			addRemoveYearCalendario('menos');
			break;

	}
}
/*
window.onload = function() {
  	document.getElementById('prueba').addEventListener('touchstart', function(event) {
	    alert(event.touches.length+"-"+event);
	    //for(i in event){ alert(i+": "+event[i]) }
	}, 	false);
};
*/


//Eventos Quo.js -->
$$(document).ready(function(event){
	$$(".signo_calendario").touch(function(){
		cambiarFecha=$$(this).attr("id");
		cambiarFechaCalendario(cambiarFecha);
		document.getElementById(cambiarFecha).className ="signo_calendario_selected";
		setTimeout(function(){ document.getElementById(cambiarFecha).className ="signo_calendario"; },100);

	});
	
	// $$('#preuba').on("touchstart", contador);
	// $$('#preuba').on("touchend",  autoFuncion(contador))

	// function autoFuncion(variable){alert(variable);}
	// $$('.signo_calendario').touchstart(function(){
	// 	alert("inicio")
	// });

	// $$(".signo_calendario").hold(function(event){
	// 	console.log(event);
	// 	for(i in event){
	// 		console.log(i+": "+event[i])
	// 	}

	// 	cambiarFecha=$$(this).html()+$$(this).parent().attr("id");
	// 	cambiarFechaCalendario(cambiarFecha);
	// });

	$$(".btn_calendario").touch(function(){
		ejecutar_btn=$$(this).attr("id");
		document.getElementById(ejecutar_btn).className ="btn_calendario_selected";
		setTimeout(function(){ document.getElementById(ejecutar_btn).className ="btn_calendario"; },100);

		setTimeout(function(){
			if(ejecutar_btn=="aceptar_calendario")accionBtnAceptar();
			else if(ejecutar_btn=="cancelar_calendario")accionBtnCancelar();
		},200);


	});

});