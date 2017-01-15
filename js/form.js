function validacion() {	
	valor = document.getElementById("nombre").value;
	if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		alert('El campo nombre no se puede dejar en blanco.');
		return false;
	}
	 
	valor = document.getElementById("email").value;
	if( !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor)) ) {
	  alert('Introduce un email correcto.');
	  return false;
	}  

	valor = document.getElementById("telefono").value;
	if( !(/^[9|8|7|6]\d{8}$/.test(valor)) ) {
	  alert('Introduce un teléfono correcto.');
	  return false;
	}  

	valor = parseInt(document.getElementById("display_count").innerHTML);
	if( valor > 150 ) {
	  alert('Solamente se pueden introducir 150 palabras, y algo raro has hehco para que salga este mensaje.');
	  return false;
	} 

	alert('El formulario ha sido validado con éxito.');
	return false;
}	