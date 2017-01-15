$(document).ready(function() {
	var API_URL = 'http://localhost:8000/api/';
	var titulaciones = [];
	var newtitulacionNombre = $('#newtitulacionNombre');
	var newtitulacionCentro = $('#newtitulacionCentro');
	var titulacionesContainer = $('#titulacionesContainer');
	var loader = $('.loader');

	var drawTitulaciones = function () {
		console.log('al menos lo intento');
		titulacionesContainer.html('');

		if (titulaciones.length == 0) {
			titulacionesContainer.html('<div>No hay titulaciones.</div>');
		} else {
			var pintado = '';
			for (var i = 0; i < titulaciones.length; i++) {
				pintado += '<div>';
				pintado += '<label for="nombre">Nombre</label><input type="text" data-titulacion-nombre="' + titulaciones[i].nombre + '" class="update-Titulacion-input" value="' + titulaciones[i].nombre + '">';
				pintado += '<label for="centro">Centro</label><input type="text" data-titulacion-centro="' + titulaciones[i].centro + '" class="update-Titulacion-input" value="' + titulaciones[i].centro + '">';
				pintado += '<button class="boton" data-titulacion-id="' + titulaciones[i].id + '">Eliminar</button>';
				pintado += '</div>';
			}

			titulacionesContainer.html(pintado);
		}
	};

	var createTitulacion = function (nombre,centro) {
		var success = function(data) {
			newtitulacionNombre.val('');
			newtitulacionCentro.val('');
			titulaciones.push(data);
			drawTitulaciones();
		};

		var data = {
			'nombre': nombre,
			'centro': centro
		};

		$.ajax({
			type: "POST",
			url: API_URL + "titulaciones",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error creando titulacion.", error);
		});
	}

	var getTitulaciones = function () {
		var success = function(data) {
			titulaciones = data;
			drawTitulaciones();
		}

		var error = function(error) {
			console.error("Error cargando titulaciones.", error);
		} 

		var complete = function(object, textStatus) {
			loader.fadeOut();
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}

		var beforeSend = function() {
			console.log("Before send");
			loader.show();
		}

		$.ajax({
			type: "GET",
			url: API_URL + "titulaciones",
			success: success,
			error: error,
			complete: complete,
			beforeSend: beforeSend
		});
	}

	var deleteTitulacion = function(id) {
		var success = function(data) {
			console.log('hola');
			titulaciones = $.grep(titulaciones, function(item){
				return item.id != id;
			});
			console.log(titulaciones);
			drawTitulaciones();
		}
		var error = function(error) {
			console.error("Error eliminando tarea", error);
		}
		$.ajax({
			type: "DELETE",
			success: success,
			error: error,
			url: API_URL + "titulaciones/" + id
		})
		.always(function(object, status, error){
			console.log(object, status, error);
		});
	}

	var updateTitulacion = function(id, nombre, centro) {
		var data = {
			'nombre': nombre,
			'centro': centro
		}

		$.ajax({
			type: "PUT",
			url: API_URL + "titulaciones/" + id,
			data: data
		})
		.done(function(data){
			for (var i = 0; i < titulaciones.length; i++){
				if(titulaciones[i].id == id) {
					titulaciones[i].nombre = nombre;
					titulaciones[i].centro = centro;
				}
			}

			drawTitulaciones;
		})
		.fail(function(error) {
			console.error("Error actualizando tarea", error);
		}) 
	}

	var experiencias = [];
	var newExperienciaNombre = $('#newExperienciaNombre');
	var newExperienciaCentro = $('#newExperienciaCentro');
	var newExperienciaDescripcion = $('#newExperienciaDescripcion');
	var experienciasContainer = $('#experienciasContainer');
	var loader2 = $('.loader2');
	
	var drawexperiencias = function () {
		console.log('al menos lo intento');
		experienciasContainer.html('');

		if (experiencias.length == 0) {
			experienciasContainer.html('<div>No hay experiencias.</div>');
		} else {
			var pintado = '';
			for (var i = 0; i < experiencias.length; i++) {
				pintado += '<div>';
				pintado += '<label for="nombre">Nombre</label><input type="text" data-experiencia-nombre="' + experiencias[i].nombre + '" class="update-Experiencia-input Experiencia-Nombre" value="' + experiencias[i].nombre + '">';
				pintado += '<label for="centro">Centro</label><input type="text" data-experiencia-centro="' + experiencias[i].centro + '" class="update-Experiencia-input Experiencia-Centro" value="' + experiencias[i].centro + '">';
				pintado += '<label for="descripcion">Descripcion</label><input type="text" data-experiencia-descripcion="' + experiencias[i].descripcion + '" class="update-Experiencia-input Experiencia-Descripcion" value="' + experiencias[i].descripcion + '">';
				pintado += '<button class="botonexp" data-Experiencia-id="' + experiencias[i].id + '">Eliminar</button>';
				pintado += '</div>';
			}

			experienciasContainer.html(pintado);
		}
	};

	var createExperiencia = function (nombre,centro,descripcion) {
		var success = function(data) {
			newExperienciaNombre.val('');
			newExperienciaCentro.val('');
			newExperienciaDescripcion.val('');
			experiencias.push(data);
			drawexperiencias();
		};

		var data = {
			'nombre': nombre,
			'centro': centro,
			'descripcion': descripcion
		};

		$.ajax({
			type: "POST",
			url: API_URL + "experiencias",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error creando Experiencia.", error);
		});
	}

	var getExperiencias = function () {
		var success = function(data) {
			experiencias = data;
			drawexperiencias();
		}

		var error = function(error) {
			console.error("Error cargando experiencias.", error);
		} 

		var complete = function(object, textStatus) {
			loader2.fadeOut();
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}

		var beforeSend = function() {
			console.log("Before send");
			loader2.show();
		}

		$.ajax({
			type: "GET",
			url: API_URL + "experiencias",
			success: success,
			error: error,
			complete: complete,
			beforeSend: beforeSend
		});
	}

	var deleteExperiencia = function(id) {
		var success = function(data) {
			console.log('hola');
			experiencias = $.grep(experiencias, function(item){
				return item.id != id;
			});
			console.log(experiencias);
			drawexperiencias();
		}
		var error = function(error) {
			console.error("Error eliminando tarea", error);
		}
		$.ajax({
			type: "DELETE",
			success: success,
			error: error,
			url: API_URL + "experiencias/" + id
		})
		.always(function(object, status, error){
			console.log(object, status, error);
		});
	}

	var updateExperiencia = function(id, nombre, centro, descripcion) {
		var data = {
			'nombre': nombre,
			'centro': centro,
			'descripcion': descripcion
		}

		$.ajax({
			type: "PUT",
			url: API_URL + "experiencias/" + id,
			data: data
		})
		.done(function(data){
			for (var i = 0; i < experiencias.length; i++){
				if(experiencias[i].id == id) {
					experiencias[i].nombre = nombre;
					experiencias[i].centro = centro;
					experiencias[i].descripcion = descripcion;
				}
			}

			drawexperiencias();
		})
		.fail(function(error) {
			console.error("Error actualizando tarea", error);
		}) 
	}


	$('#sendNewTitulacion').on("click", function(event){
		if (newtitulacionNombre.val() != '' && newtitulacionCentro.val() != '') {
			event.preventDefault();
			createTitulacion(newtitulacionNombre.val(),newtitulacionCentro.val());
		}
	});

	$(document).on("click", ".boton", function(event){
		var id = $(this).data('titulacionId');
		deleteTitulacion(id);
	});

	$(document).on("blur", ".update-Titulacion-input", function(event){
		if ($(this).data("titulacionCentro")) {
			var newNombre = $(this).siblings('.update-Titulacion-input').data("titulacionNombre");
			var newCentro = $(this).val();			
		}else{
			var newNombre = $(this).val();
			var newCentro = $(this).siblings('.update-Titulacion-input').data("titulacionCentro");
		}		
		var id = $(this).siblings('.boton').data("titulacionId");		
		updateTitulacion(id, newNombre, newCentro);		
	});


	$('#sendNewExperiencia').on("click", function(event){
		if (newExperienciaNombre.val() != '' && newExperienciaCentro.val() != '' && newExperienciaDescripcion.val() != '') {
			event.preventDefault();
			createExperiencia(newExperienciaNombre.val(),newExperienciaCentro.val(),newExperienciaDescripcion.val());
		}
	});

	$(document).on("click", ".botonexp", function(event){
		var id = $(this).data('experienciaId');
		deleteExperiencia(id);
	});

	$(document).on("blur", ".update-Experiencia-input", function(event){
		if ($(this).data("experienciaCentro")) {
			var newNombre = $(this).siblings('.Experiencia-Nombre').data("experienciaNombre");
			var newCentro = $(this).val();
			var newDescripcion = $(this).siblings('.Experiencia-Descripcion').data("experienciaDescripcion");			
		}else if ($(this).data("experienciaNombre")) {
			var newNombre = $(this).val();
			var newCentro = $(this).siblings('.Experiencia-Centro').data("experienciaCentro");
			var newDescripcion = $(this).siblings('.Experiencia-Descripcion').data("experienciaDescripcion");			
		}else if($(this).data("experienciaDescripcion")){
			var newNombre = $(this).siblings('.Experiencia-Nombre').data("experienciaNombre");
			var newCentro = $(this).siblings('.Experiencia-Centro').data("experienciaCentro");
			var newDescripcion = $(this).val();
		}		
		var id = $(this).siblings('.botonexp').data("experienciaId");		
		updateExperiencia(id, newNombre, newCentro, newDescripcion);		
	});

	setTimeout(function() {
		getTitulaciones();
		getExperiencias();
	}, 0.5);

});