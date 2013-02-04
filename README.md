<h1>CalendarMobile V1.3<h1>

selector de fecha optimizado para el uso en dispositivos móviles.
este selector de fecha utiliza javascript, html y css para cumplir su proposito.
En esta ultima actualizacion brinda soporte a una coleccion de atributos que permiten la composicion del calendario.
En cuanto al uso CalendarMobile esta diseñado para ser compatible con las diferentes librerias al implementar toda la logica funcional con javascript.

<h2>METODOS DEL OBJETO CLASSCALENDARMOBILE</h2>
<pre>
id_input      : Obligatorio 	Id del input q contiene el valor del calendario
title         : Opcional 		Titulo de la ventana del calendario
modal         : Opcional 		Boleano si el calendario es modal o no, por default es false
separatorDate : Opcional 		Signo separador de day month year, por default es '-'
limitDate     : Opcional 		limite inferior year, por default es '2000'
arrayDays     : Opcional 		array con dias, inicia en Domingo -> valor por Default "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
arrayMonths   : Opcional 		array con meses, inicia en Enero -> valor por Default "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
</pre>

<h2>Uso</h2>
<pre>
&lt;script type="text/javascript"&gt;

	window.onload = function() {
		/* <!-- Se crea una nueva Instancia la clase ClassCalendarMobile --> */
		var newInputFechaInicial = new ClassCalendarMobile
		({
			id_input      : 'fechaInicial',	
			title         : 'Fecha Inicial',
			modal         : true,
			separatorDate : '/',
			limitDate     : '2011',
			arrayDays     : 'Dom,Lun,Mar,Mié,Jue,Vie,Sáb',
			arrayMonths   : 'Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic'
		});
	};
	
&lt;/script&gt;
&lt;input type="text" id="fechaInicial" /&gt;
</pre>



