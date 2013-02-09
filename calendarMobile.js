/******************************************************************************
 * Calendar Mobile 															  *
 *																			  *
 * @version 1.4																  *
 *																			  *
 * @author Jhon Erick Marroquin Cardenas <jhon3rick@gmail.com> || @jhon3rick  *
 *																			  *
 ******************************************************************************/

ClassCalendarMobile=function(array){

	//Var Globales
	var idDivFecha				= new String;
	var inputFecha				= new String;
	var title					= new String;
	var modal					= new String;
	var id_position				= new String;
	var parentCalendarMobile	= new String;
	var obj						= eval (array);

	//Metodo id_input Obligatorio
	if(obj.id_input){ idDivFecha = obj.id_input;}
	else{ alert('Error Metodo id_input obligatorio'); return; }

	var arrayDays  = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
	var arrayMonths = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

	//Asignacion Variables evaluadas del objeto Json
	title			= obj.title || '';
	modal			= obj.modal || false;
	id_position		= obj.id_position || '';
	limitDate		= obj.limitDate || 2000;
	separatorDate	= obj.separatorDate || '-';

	//Arrays Globales
	//if(obj.title) title                 = obj.title;
	//if(obj.modal) modal                 = obj.modal;
	//if(obj.limitDate) limitDate         = obj.limitDate;
	//if(obj.separatorDate) separatorDate = obj.separatorDate;
	if(obj.arrayDays) arrayDays         = obj.arrayDays.split(',');
	if(obj.arrayMonths) arrayMonths     = obj.arrayMonths.split(',');

	//Var que almacenan fecha
	var yearCalendarMobile      = new String;
	var monthCalendarMobile     = new String;
	var dayCalendarMobile       = new String;

	//Var que muestran contenido en el calendario
	var subTitle                = new String;
	var textMonthCalendarMobile = new String;
	var textDayCalendarMobile   = new String;

	inputFecha=document.getElementById(idDivFecha);
	inputFecha.onclick=function(){ loadCalendario(); };
	inputFecha.setAttribute("readonly", "readonly");

	function bodyCalendar(){
		bodyCalendarMobile  = new String('<div id="modal_calendario">');
		bodyCalendarMobile += '		<div id="contenedor_calendario">';
		bodyCalendarMobile += '			<div id="titulos_calendario">';
		bodyCalendarMobile += '				<div id="titulo_calendario" class="titulo_calendario">'+title+'</div>';
		bodyCalendarMobile += '				<div id="subTitleDateCalendarMobile">'+subTitle+'</div>';
		bodyCalendarMobile += '			</div>';
		bodyCalendarMobile += '			<div id="contenedor_day_calendario" class="fecha_calendario fecha_calendario_left">';
		bodyCalendarMobile += '			  	<div class="contenedor_signo_calendario">';
		bodyCalendarMobile += '					<div id="masDayCalendarMobile" class="signo_calendario">+</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '				<div class="contenedor_numero_calendario">';
		bodyCalendarMobile += '					<div id="dayCalendarMobile" class="numero_calendario">'+textDayCalendarMobile+'</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '				<div class="contenedor_signo_calendario">';
		bodyCalendarMobile += '					<div id="menosDayCalendarMobile" class="signo_calendario">-</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '			</div>';
		bodyCalendarMobile += '			<div id="contenedor_month_calendario" class="fecha_calendario">';
		bodyCalendarMobile += '				<div class="contenedor_signo_calendario">';
		bodyCalendarMobile += '					<div id="masMonthCalendarMobile" class="signo_calendario">+</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '				<div class="contenedor_numero_calendario">';
		bodyCalendarMobile += '					<div id="monthCalendarMobile" class="numero_calendario">'+textMonthCalendarMobile+'</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '				<div id="anterior_month" class="contenedor_signo_calendario">';
		bodyCalendarMobile += '					<div id="menosMonthCalendarMobile" class="signo_calendario">-</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '			</div>';
		bodyCalendarMobile += '			<div id="contenedor_year_calendario" class="fecha_calendario fecha_calendario_right">';
		bodyCalendarMobile += '				<div class="contenedor_signo_calendario">';
		bodyCalendarMobile += '					<div id="masYearCalendarMobile" class="signo_calendario">+</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '				<div class="contenedor_numero_calendario">';
		bodyCalendarMobile += '					<div id="yearCalendarMobile" class="numero_calendario">'+yearCalendarMobile+'</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '				<div class="contenedor_signo_calendario">';
		bodyCalendarMobile += '					<div id="menosYearCalendarMobile" class="signo_calendario">-</div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '			</div>';
		bodyCalendarMobile += '			<div id="contenedor_btn_calendario">';
		bodyCalendarMobile += '				<div class="centrar_btn_vertical">';
		bodyCalendarMobile += '					<div id="aceptarCalendarMobile" class="btn_calendario"><span class="span_text_btn_calendario">Aceptar</span></div>';
		bodyCalendarMobile += '					<div id="cancelarCalendarMobile" class="btn_calendario"><span class="span_text_btn_calendario">Cancelar</span></div>';
		bodyCalendarMobile += '				</div>';
		bodyCalendarMobile += '			</div>';
		bodyCalendarMobile += '		</div>';
		bodyCalendarMobile += '	</div>';

		return bodyCalendarMobile;
	}

	function loadCalendario(){
		//Comprobacion si el input esta vacio o tiene una fecha
		if(inputFecha.value==""){ fechaCalendario = new Date(); }
		else{
			valueInputFecha	= inputFecha.value.split(separatorDate);
			fechaCalendario	= new Date(valueInputFecha[0], valueInputFecha[1]-1, valueInputFecha[2]);
		}

		//Variables año-mes-dia
		yearCalendarMobile  = fechaCalendario.getFullYear();
		monthCalendarMobile = fechaCalendario.getMonth()
		dayCalendarMobile   = fechaCalendario.getDate();

		//Variables String del calendario
		textMonthCalendarMobile = arrayMonths[monthCalendarMobile].slice(0,3);
		textDayCalendarMobile   = ("0"+dayCalendarMobile).slice(-2);
		subTitle=arrayDays[fechaCalendario.getDay()]+", "+dayCalendarMobile+" de "+arrayMonths[monthCalendarMobile]+" de "+yearCalendarMobile;

		//Elimina el calendario si esta desplegado
		if(document.getElementById('divPadreCalendario')){
			document.getElementById('divPadreCalendario').parentNode.removeChild(document.getElementById('divPadreCalendario'));
		}

		//Creacion del Div padre contenedor Calendario
		parentCalendarMobile = document.createElement("div");
		parentCalendarMobile.innerHTML = bodyCalendar();
		parentCalendarMobile.setAttribute("id", "divPadreCalendario");

		if(modal==true){
			if(!document.getElementById(id_position)){ document.body.appendChild(parentCalendarMobile); inputFecha.disabled = true;}
			else{ document.getElementById(id_position).appendChild(parentCalendarMobile); }
			document.getElementById("divPadreCalendario").className = "fondo_modal_calendario";
		}
		else{
			//Inserta calendario despues del nodo input
			if(!document.getElementById(id_position)){ inputFecha.parentNode.insertBefore(parentCalendarMobile, inputFecha.nextSibling); }

			//Inserta calendario dentro den nodo seleccionado
			else{ document.getElementById(id_position).appendChild(parentCalendarMobile); }
		}

		//Carga los Listeners si soporta Touch o no
		if ("ontouchstart" in document.documentElement){ listenersBodyCalendar('touchstart'); }
		else { listenersBodyCalendar('click'); }

	}

	/*----------------------------------------------- Listeners Touch o Click ------------------------------------------*/
	function listenersBodyCalendar(eventListener){

      	document.getElementById('masDayCalendarMobile').addEventListener(eventListener, function(event){
			addRemoveDayCalendarMobile('add')
			selectedBtnCalendarMobile(this, 'addRemove')
		}, false);

		document.getElementById('menosDayCalendarMobile').addEventListener(eventListener, function(event){
			addRemoveDayCalendarMobile('remove')
			selectedBtnCalendarMobile(this, 'addRemove')
		}, false);
		document.getElementById('masMonthCalendarMobile').addEventListener(eventListener, function(event){
			addRemoveMonthCalendarMobile('add')
			selectedBtnCalendarMobile(this, 'addRemove')
		}, false);
		document.getElementById('menosMonthCalendarMobile').addEventListener(eventListener, function(event){
			addRemoveMonthCalendarMobile('remove')
			selectedBtnCalendarMobile(this, 'addRemove')
		}, false);
		document.getElementById('masYearCalendarMobile').addEventListener(eventListener, function(event){
			addRemoveYearCalendario('add');
			selectedBtnCalendarMobile(this, 'addRemove')
		}, false);
		document.getElementById('menosYearCalendarMobile').addEventListener(eventListener, function(event){
			addRemoveYearCalendario('remove');
			selectedBtnCalendarMobile(this, 'addRemove')
		}, false);
		document.getElementById('aceptarCalendarMobile').addEventListener(eventListener, function(event){
			inputFecha.value=yearCalendarMobile+separatorDate+(("0"+(monthCalendarMobile+1)).slice(-2))+separatorDate+(("0"+(dayCalendarMobile)).slice(-2));
			selectedBtnCalendarMobile(this, 'btn')
		}, false);
		document.getElementById('cancelarCalendarMobile').addEventListener(eventListener, function(event){
		selectedBtnCalendarMobile(this, 'btn')
		}, false);

	}

	//Funcion q valida si existe o no la fecha
	function validaDateCalendarMobile(){
		var validaDate = new Date(yearCalendarMobile, monthCalendarMobile, dayCalendarMobile);

		if(!validaDate || validaDate.getFullYear() == yearCalendarMobile && validaDate.getMonth() == monthCalendarMobile && validaDate.getDate() == dayCalendarMobile){
			return true;
		}
		else{ return false; }
	}

	function daysMonthCalendarMobile(){
		var monthDaysCalendarMobile = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if ((monthCalendarMobile==1)&&(yearCalendarMobile%4==0)&&((yearCalendarMobile%100!=0)||(yearCalendarMobile%400==0))){
			dayCalendarMobile = 29;
		}
		else{ dayCalendarMobile = monthDaysCalendarMobile[monthCalendarMobile]; }
	}

	/*---------------------------------- Function Btn Calendar Mobile ---------------------------------*/
	function selectedBtnCalendarMobile(input, type){
		if(type!='btn'){
			input.className ="signo_calendario_selected";
			setTimeout(function(){ input.className ="signo_calendario"; },100);
		}
		else{
			input.className ="btn_calendario_selected";
			setTimeout(function(){
				inputFecha.disabled = false;
				input.className ="btn_calendario";
				parentCalendarMobile.parentNode.removeChild(parentCalendarMobile);
			},100);
		}
	}
	function addRemoveYearCalendario(evento){

		document.getElementById("dayCalendarMobile").style.backgroundColor   = "#FFF";
		document.getElementById("monthCalendarMobile").style.backgroundColor = "#FFF";
		document.getElementById("yearCalendarMobile").style.backgroundColor  = "#D5E2F1";

		if(evento=="add") yearCalendarMobile++;
		if(evento=="remove" && yearCalendarMobile>limitDate) yearCalendarMobile--;
		document.getElementById("yearCalendarMobile").innerHTML=yearCalendarMobile;

		if(!validaDateCalendarMobile()) daysMonthCalendarMobile();
		document.getElementById("dayCalendarMobile").innerHTML=(("0"+(dayCalendarMobile)).slice(-2));

		fechaCalendario	= new Date(yearCalendarMobile, monthCalendarMobile, dayCalendarMobile);
		document.getElementById("subTitleDateCalendarMobile").innerHTML = (arrayDays[fechaCalendario.getDay()]+", "+dayCalendarMobile+" de "+arrayMonths[monthCalendarMobile]+" de "+yearCalendarMobile);
	}

	function addRemoveMonthCalendarMobile(evento){
		document.getElementById("dayCalendarMobile").style.backgroundColor="#FFF";
		document.getElementById("monthCalendarMobile").style.backgroundColor="#D5E2F1";
		document.getElementById("yearCalendarMobile").style.backgroundColor="#FFF";

		if(evento=='add'){
			monthCalendarMobile++;
			if(monthCalendarMobile>11)monthCalendarMobile=0;
		}
		if(evento=='remove'){
			monthCalendarMobile--;
			if(monthCalendarMobile<0)monthCalendarMobile=11;
		}
		//document.getElementById("month_calendario").innerHTML=monthCalendarMobile+1;
		document.getElementById("monthCalendarMobile").innerHTML= arrayMonths[monthCalendarMobile].slice(0,3);

		if(!validaDateCalendarMobile()) daysMonthCalendarMobile();
		document.getElementById("dayCalendarMobile").innerHTML=(("0"+(dayCalendarMobile)).slice(-2));

		fechaCalendario	= new Date(yearCalendarMobile, monthCalendarMobile, dayCalendarMobile);
		document.getElementById("subTitleDateCalendarMobile").innerHTML = (arrayDays[fechaCalendario.getDay()]+", "+dayCalendarMobile+" de "+arrayMonths[monthCalendarMobile]+" de "+yearCalendarMobile);
	}

	function addRemoveDayCalendarMobile(evento){

		document.getElementById("dayCalendarMobile").style.backgroundColor="#D5E2F1";
		document.getElementById("monthCalendarMobile").style.backgroundColor="#FFF";
		document.getElementById("yearCalendarMobile").style.backgroundColor="#FFF";

		if(evento=='add'){
			dayCalendarMobile++;
			if(!validaDateCalendarMobile()){ dayCalendarMobile=1; }
		}

		if(evento=='remove'){
			dayCalendarMobile--;
			if(!validaDateCalendarMobile()) daysMonthCalendarMobile();
		}
		document.getElementById("dayCalendarMobile").innerHTML=(("0"+dayCalendarMobile).slice(-2));

		fechaCalendario	= new Date(yearCalendarMobile, monthCalendarMobile, dayCalendarMobile);
		document.getElementById("subTitleDateCalendarMobile").innerHTML = (arrayDays[fechaCalendario.getDay()]+", "+dayCalendarMobile+" de "+arrayMonths[monthCalendarMobile]+" de "+yearCalendarMobile);
	}

	this.closeCalendarMobile=function(){
		if(document.getElementById('divPadreCalendario')){
			document.getElementById('divPadreCalendario').parentNode.removeChild(document.getElementById('divPadreCalendario'));
			inputFecha.disabled = false;
		}
	}
}

