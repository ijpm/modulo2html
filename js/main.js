$(document).ready(function(){   

	/************ Carga de titulaciones y experiencias**************************************/
	var API_URL = 'http://localhost:8000/api/';
	var titulaciones = [];
	var titulacionesContainer = $('#titulacionesContainer');
	var loader = $('.loader');
	var experiencias = [];
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
				pintado += '<article><header><h4>' + experiencias[i].nombre + '</h4></header><div><span>' + experiencias[i].centro + '</span>';
				pintado += '<p>' + experiencias[i].descripcion + '</p></div></article>';
			}

			experienciasContainer.html(pintado);
		}
	};

	var drawTitulaciones = function () {
		console.log('al menos lo intento');
		titulacionesContainer.html('');

		if (titulaciones.length == 0) {
			titulacionesContainer.html('<div>No hay titulaciones.</div>');
		} else {
			var pintado = '';
			for (var i = 0; i < titulaciones.length; i++) {
				pintado += '<div class="col-6"><article><div><header><h4>' + titulaciones[i].nombre + '</h4></header>';
				pintado += '<div><span>' + titulaciones[i].centro + '</span></div></div></article></div>';
			}

			titulacionesContainer.html(pintado);
		}
	};

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

	setTimeout(function() {
		getTitulaciones();
		getExperiencias();
	}, 1500);
	setTimeout(function() {
		$(".video").html('<video width="400" height="300" controls><source src="video/sobre.mp4" type="video/mp4" id="videosobremi"></video>');
	}, 1500);
	
	/************ FIN Carga de titulaciones y experiencias**********************************/

	/************ Radios CUSTOM y mecanismo aparece/desaparece del campo como me has conocido ********/
	var inputhack;
	$("#otromas").hide();
	$(".radios").each(function(){
		$( this ).click(function(){
		    $(".radios").each(function(){
		    	$( this ).removeClass("radiosel");
		    	inputhack=$( this ).find('input');
		    	inputhack.attr('checked', false);
		    });
		    $( this ).toggleClass("radiosel");
		    inputhack=$( this ).find('input');
		    if (inputhack.val() == "otros") {
		    	$("#otromas").show();
		    }else{
		    	$("#otromas").hide();		    	
		    }
		    inputhack.attr('checked', true);
		});
	});
	/************ FIN Radios CUSTOM y mecanismo aparece/desaparece del campo como me has conocido ****/

	/************ Impedir que se escriban mas de 150 palabras en el textarea ********/
	$("#comentario").on('keyup', function() {
        var words = this.value.match(/\S+/g).length;
        if (words > 150) {
            // Split the string on first 200 words and rejoin on spaces
            var trimmed = $(this).val().split(/\s+/, 150).join(" ");
            // Add a space at the end to keep new typing making new words
            $(this).val(trimmed + " ");
        }
        else {
            $('#display_count').text(words);
            $('#word_left').text(150-words);
        }
    })
	/************ FIN Impedir que se escriban mas de 150 palabras en el textarea ****/

	/************ Smooth Scroll & ScrollSpy******************/
	/*****  source : https://jsfiddle.net/mekwall/up4nu/ ****/
	// Cache selectors
	var lastId,
	    topMenu = $("#menu"),
	    topMenuHeight = topMenu.outerHeight(),
	    // All list items
	    menuItems = topMenu.find("a"),
	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({ 
	      scrollTop: offsetTop
	  }, 300);
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href='#"+id+"']").parent().addClass("active");
	   }                   
	});
	/************ FIN Smooth Scroll & ScrollSpy ***************/

	/************ FIN Smooth Scroll & a la flecha ***************/

		$('#linkflecha').on('click',function (e) {
		    e.preventDefault();

		    var target = this.hash;
		    var $target = $(target);

		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top
		    }, 900, 'swing', function () {
		        window.location.hash = target;
		    });
		});

	/************ FIN Smooth Scroll & a la flecha ***************/	  	
});