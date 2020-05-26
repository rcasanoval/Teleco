function ComprobarPaises() { //Paises extra de la union europea son Portugal, Belgica y Polonia
    "use strict";
    var pais, pais_aux, paises, correcto, i;
    pais = document.getElementById("pais").value;
    pais_aux = pais.toUpperCase();
    paises = ["ESPAÑA", "ITALIA", "FRANCIA", "ALEMANIA", "PAISES BAJOS", "CROACIA", "ESLOVENIA", "PORTUGAL", "POLONIA", "BELGICA"];
    correcto = "false";
    for (i in paises) {
        if (paises[i] === pais_aux) {
            correcto = "true";
	        localStorage.pais=pais;
	        Ciudad();
            break;
        }
    }
    if (correcto === "false") {
        alert("País erroneo. No disponemos de pisos en: " + pais + ", introduzca un país disponible.");
    }
}
function LongitudClave() {
    "use strict";
    var clave, longitud, correcto, expresion;
    clave = document.getElementById("password").value;
    longitud = clave.length;
    correcto = "false";
    expresion = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})");
    if (longitud > 6 && expresion.test(clave) === true) {
        if (longitud <= 10 && longitud >= 6) {
            correcto = "true";
            alert("La contraseña es débil");
            document.form.password.style.background = 'orange';
        }
        if (longitud <= 15 && longitud > 10) {
            correcto = "true";
            alert("La contraseña es fuerte");
            document.form.password.style.background = 'green';
        }
    }
    if (correcto === "false") {
        window.alert("Debe de introducir una contraseña de entre 6-15 caracteres.\nEl formato de la contraseña es Mayúscula+Minúscula+Números \nPara una contraseña débil introducir menos de 9 caracteres y para una contraseña fuerte introducir al menos 9 caracteres");
        document.form.password.style.background = 'red';
    }
}
function Clean() {
    "use strict";
    document.form.password.style.background = 'white';
}
function ComprobarClave() {
    "use strict";
    var clave, longitud, expresion1;
    clave = document.getElementById("password").value;
    longitud = clave.length;
    expresion1 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15})");
    if (longitud < 6) {
        document.form.password.style.background = 'red';
    }
    if (longitud <= 10 && longitud >= 6 && expresion1.test(clave) === true) {
        document.form.password.style.background = 'orange';
    }
    if (longitud <= 15 && longitud > 10 && expresion1.test(clave) === true) {
        document.form.password.style.background = 'green';
    }
}
function ComprobarTelefono() {
    "use strict";
    var telefono, expresion;
    telefono = document.getElementById("telefono").value;
    expresion = /[0-9]/;
    if (!expresion.test(telefono)) {
        alert("Introduzca un número de teléfono valido");
        return false;
    }
    if (telefono.length >= 10 || telefono.length < 9) {
        alert("El número de teléfono no es valido.\nEl número debe ser de 9 digitos");
        return false;
    }
}
/*function ComprobarCorreo() {
    var correo, c, p;
    correo = document.getElementById("correo").value;
    c=0;
    p=0;
    for (i=1; i<correo.length; i++) {
        if (correo.charAt(i-1) == "@") {
            c++;
        }
        if(c==1) {
            if(correo.charAt(i-1) == ".") {
                p++;
            }
        }
    }
    if(c==1 && p==2 || p==1){
        alert("Correo valido");
    }
    else {
        alert("Introduzca un correo valido");
    }
}*/
function ComprobarCorreo() {    //Verificacion mediante expresiones regulares
    "use strict";
    var correo, expresion;
    correo = document.getElementById("correo").value;
    expresion = /\w+@\w+\.+[a-z]/;
    if (!expresion.test(correo)) {
        alert("El correo no es valido");
        return false;
    }
}
function ComprobarTemp() {
    "use strict";
    var max, min;
    max = document.getElementById("max").value;
    min = document.getElementById("min").value;
    if (min < 22 || max > 26) {
        alert("La temperatura no se encuentra entre 22º y 26º C");
        if (max > 26) {
            document.temp.max.style.color = 'red';
        } else {
            document.temp.max.style.color = 'black';
        }
        if (min < 22) {
            document.temp.min.style.color = 'red';
        } else {
            document.temp.min.style.color = 'black';
        }
    } else {
        if (max <= 26) {
            document.temp.max.style.color = 'black';
        }
        if (min >= 22) {
            document.temp.min.style.color = 'black';
        }
    }
}
function ComprobarCoordenadas() {
    "use strict";
    var coordenadas, expresion, i, j, coorarray, enlace, coor1, coor2, coor3, coor4, cooor1, cooor2, cooor3, cooor4, eleccion;
    coordenadas = document.getElementById("gps").value;
    expresion = /((N|S)?\s?[0-9]+(\º|\°)?\s+[0-9]+\'?\s+[0-9]+\.?[0-9]+\"?\,?\s?(E|O)?\s?[0-9]+(\º|\°)?\s+[0-9]+\'?\s+[0-9]+\.?[0-9]+\"?)$/;
    enlace = "https://maps.google.com/maps?q=";
    if (expresion.test(coordenadas) === true) {
        coorarray = coordenadas.split(" ");
        coor1 = coorarray[1].split("°");
        coor2 = coorarray[2].split("'");
        coor3 = coorarray[3].split("\"");
        coor4 = coor3[0].split(".");
        cooor1 = coorarray[5].split("°");
        cooor2 = coorarray[6].split("'");
        cooor3 = coorarray[7].split("\"");
        cooor4 = cooor3[0].split(".");
        if (coorarray[0] === "S" || coorarray[0] === "N") {
            if (coorarray[0] === "S") {
                enlace = enlace + "+-";
            } else {
                enlace = enlace + "+";
            }
            if (coor1[0] <= 90) {
                if ((coorarray[4] === "O" && cooor1[0] <= 180) || (coorarray[4] === "E" && cooor1[0] <= 180)) {
                    if ((coor1[0] === "90") || (cooor1[0] === "180")) {
                        if (coor1[0] === "90") {
                            if (coor2[0] > 0 || coor4[0] > 0 || coor4[1] > 0) {
                                document.form.gps.style.background = 'red';
                                document.form.gps.style.color = 'white';
                                alert("La latitud se encuentra entre 00º 00' 00.00\" y 90º 00' 00.00\"");
                                return 0;
                            }
                        }
                        if (cooor1[0] === "180") {
                            if (cooor2[0] > 0 || cooor4[0] > 0 || cooor4[1] > 0) {
                                document.form.gps.style.background = 'red';
                                document.form.gps.style.color = 'white';
                                alert("La longitud se encuentra entre 00º 00' 00.00\" y 180º 00' 00.00\"");
                                return 0;
                            }
                        }
                        enlace = enlace + coorarray[1] + "+" + coorarray[2] + "+" + coorarray[3];
                        if (coorarray[4] === "O") {
                            enlace = enlace + "+-" + coorarray[5] + "+" + coorarray[6] + "+" + coorarray[7];
                        } else {
                            enlace = enlace + "+" + coorarray[5] + "+" + coorarray[6] + "+" + coorarray[7];
                        }
                    } else {
                        enlace = enlace + coorarray[1] + "+" + coorarray[2] + "+" + coorarray[3];
                        if (coorarray[4] === "O") {
                            enlace = enlace + "+-" + coorarray[5] + "+" + coorarray[6] + "+" + coorarray[7];
                        } else {
                            enlace = enlace + "+" + coorarray[5] + "+" + coorarray[6] + "+" + coorarray[7];
                        }
                    }
                } else {
                    document.form.gps.style.background = 'red';
                    document.form.gps.style.color = 'white';
                    alert("La longitud se encuentra entre 00º 00' 00.00\" y 180º 00' 00.00\"");
                    return 0;
                }
            } else {
                document.form.gps.style.background = 'red';
                document.form.gps.style.color = 'white';
                alert("La latitud se encuentra entre 00º 00' 00.00\" y 90º 00' 00.00\"");
                return 0;
            }
        }
        document.form.gps.style.background = 'green';
        document.form.gps.style.color = 'white';
        document.form.map.value = enlace;
        eleccion = window.prompt("Quieres acceder al enlace?(S/N)");
        if (eleccion === 'S' || eleccion === 's') {
            window.open(enlace);
        }
    } else {
        document.form.gps.style.background = 'red';
        document.form.gps.style.color = 'white';
        alert("El formato de Coordenadas debe ser como el siguiente ejemplo:\n N 40º 30' 45.00\", O 3º 20' 54.00\"");
    }
    
}
function Escribiendo() {
    "use strict";
    document.form.gps.style.background = 'orange';
    document.form.gps.style.color = 'white';
}
function Enviar() {
    "use strict";
    var nombre, apellido, edad, telefono, correo, sexo, valor;
    nombre = document.getElementById("fname").value;
    apellido = document.getElementById("lname").value;
    edad = document.getElementById("edad").value;
    telefono = document.getElementById("telefono").value;
    correo = document.getElementById("correo").value;
    sexo = document.getElementById("sex").value;
    if (nombre === "" || apellido === "" || edad === "" || telefono === "" || correo === "" || sexo === "") {
        alert("Todos los campos son obligatorios");
        return false;
    } else {
        if (typeof (Storage) !== "undefined") {
            valor = document.getElementById("fname").value + " " + document.getElementById("lname").value;
            localStorage.firstmane = valor;
            document.getElementById("info").innerHTML = "Hola " + localStorage.firstmane + ": Bienvenido a smartroom";
        } else {
            document.getElementById("info").innerHTML = "Sorry, your browser not support web storage..";
        }
    }
}
window.onload = function info() {
    "use strict";
    if (localStorage.firstmane !== undefined) {
        document.getElementById("info").innerHTML = "Hola " + localStorage.firstmane + ": Bienvenido a smartroom";
    }
};
//Javascript de tablas
$(document).ready(function () {
    "use strict";
    $("#meteo").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tabla1 tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
	$("#tabla2 tr").filter(function () {
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	});
        $("#tabla3 tr").filter(function () {
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
	$("#tabla4 tr").filter(function () {
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $("#tabla2").hide();
    $("#tabla3").hide();
    $("#tabla4").hide();
    $("#numest1").show();
    $("#numest2").hide();
    $("#numest3").hide();
    $("#numest4").hide();
 
});
/******************************************************************/
function pulsar1() {
    "use strict";
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this,0,4);
	
    }
  };
  xhttp.open("GET", "Estaciones_meteorologicas.xml", true);
  xhttp.send();
    
    $("#tabla2").hide();
    $("#tabla3").hide();
    $("#tabla4").hide();
    $("#tabla1").show();
    $("#numest1").show();
    $("#numest2").hide();
    $("#numest3").hide();
    $("#numest4").hide();
}
/*******************************************************************************************/
function pulsar2() {
    "use strict";
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { 
    myFunction(this,5,9);
    }
  };

  xhttp.open("GET", "Estaciones_meteorologicas.xml", true);
 xhttp.send();
    $("#tabla1").hide();
    $("#tabla3").hide();
    $("#tabla4").hide();
    $("#tabla2").show();
    $("#numest1").hide();
    $("#numest2").show();
    $("#numest3").hide();
    $("#numest4").hide();
}
function pulsar3() {
    "use strict";
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this,10,14);
    }
  };
  xhttp.open("GET", "Estaciones_meteorologicas.xml", true);
  xhttp.send();
    $("#tabla1").hide();
    $("#tabla2").hide();
    $("#tabla4").hide();
    $("#tabla3").show();
    $("#numest1").hide();
    $("#numest2").hide();
    $("#numest3").show();
    $("#numest4").hide();
}
function pulsar4() {
    "use strict";
     var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this,15,19);
    }
  };
  xhttp.open("GET", "Estaciones_meteorologicas.xml", true);
  xhttp.send();
    $("#tabla1").hide();
    $("#tabla2").hide();
    $("#tabla4").show();
    $("#tabla3").hide();
    $("#numest1").hide();
    $("#numest2").hide();
    $("#numest3").hide();
    $("#numest4").show();
}
function myFunction(xml,ini,fin) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<thead><tr><th>Ciudad</th><th>Temperatura</th><th>Humedad</th><th>Ruido</th><th>Nivel de iluminacion</th><th>Color de iluminacion</th></tr></thead>";
  var x = xmlDoc.getElementsByTagName("PG");

  for (i = ini; i <=fin; i++) { 
    table += "<tbody><tr><td>" +
    x[i].getElementsByTagName("CIUDAD")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TEMPERATURA")[0].childNodes[0].nodeValue +
    "</td><td>"+
    x[i].getElementsByTagName("HUMEDAD")[0].childNodes[0].nodeValue +
    "</td><td>"+
    x[i].getElementsByTagName("RUIDO")[0].childNodes[0].nodeValue +
    "</td><td>"+
    x[i].getElementsByTagName("NIVEL_DE_LUZ")[0].childNodes[0].nodeValue +
    "</td><td>"+
    x[i].getElementsByTagName("COLOR_ILUMINACION")[0].childNodes[0].nodeValue +
    "</td></tr></tbody>";
  }
if(ini==0)
  document.getElementById("tabla1").innerHTML = table;
if(ini==5)
  document.getElementById("tabla2").innerHTML = table;
if(ini==10)
  document.getElementById("tabla3").innerHTML = table;
if(ini==15)
  document.getElementById("tabla4").innerHTML = table;
$(".tabla tr:even").css("background-color", "mediumblue");
$(".tabla tr:odd").css("background-color", "steelblue");
$(".tabla thead").css("font-size","1.10em");
$(".tabla tbody").css("font-size","0.85em");
}
///Javascript del slider
//Almacenamos el slider y los botones en variables globales.
var slider = $('#slider'), siguiente = $('#btn-next'), anterior = $('#btn-prev');
//Mover ultima imagen al primer lugar
$('#slider section:last').insertBefore('#slider section:first');
//Mostrar la primera imagen con un margen de -100%
localStorage.tam = 0;
slider.css('margin-left', '-' + 34 + '%');
function moverD() {
    "use strict";
    var tam;
    if (localStorage.tam === 0) {
        tam = 34;
    }
    if (localStorage.tam === 1) {
        tam = 50;
    }
    if (localStorage.tam === 2) {
        tam = 27;
    }
    slider.animate({marginleft: '-' + 50 + '%'}, 700, function () {
        $('#slider section:first').insertAfter('#slider section:last');
        slider.css('margin-left', '-' + tam + '%');
    });
}
function moverI() {
    "use strict";
    var tam;
    if (localStorage.tam === 0) {
        tam = 34;
    }
    if (localStorage.tam === 1) {
        tam = 50;
    }
    if (localStorage.tam === 2) {
        tam = 27;
    }
    slider.animate({marginleft: 0}, 700, function () {
        $('#slider section:last').insertBefore('#slider section:first');
        slider.css('margin-left', '-' + tam + '%');
    });
}
siguiente.on('click', function () {
    "use strict";
    moverD();
});
anterior.on('click', function () {
    "use strict";
    moverI();
});
function Grande() {
    $('#slider img').css('width', '450px');
    $('#slider img').css('height', '300px');
    localStorage.tam = 1;
    $('#slider').css('margin-left', '-' + 50 + '%');
}
function Mediano() {
    $('#slider img').css('width', '305px');
    $('#slider img').css('height', '200px');
    localStorage.tam = 0;
    $('#slider').css('margin-left', '-' + 34 + '%');
}
function Peque() {
    $('#slider img').css('width', '230px');
    $('#slider img').css('height', '150px');
    localStorage.tam = 2;
    $('#slider').css('margin-left', '-' + 27 + '%');
}
//Javascript del modal
$(document).ready(function () {
    $('.galeria_img').click(function (num) {
        "use strict";
        var img = num.target.src, sel_img, ruta, modal, mensaje, num_img, dato;
        sel_img = img.split("imagenes");
        ruta = "imagenes" + sel_img[1] + "\"";
        mensaje = sel_img[1].split("\.");
        num_img = mensaje[0].split("/");
        dato = $(this).attr("data");
        console.log(dato);
        modal = '<div class="modal" id="modal"><img src="' + ruta + 'class="modal_img" id="zoom_mw" data-zoom-image><div class="modal_salir" id="modal_salir">X</div><div class="paisaje"><h1>Paisaje ' + num_img[1] +'</h1></div></div>';
        //Mostrar el modal
        $('body').append(modal);
        //Salir del modal
        $('#modal_salir').click(function () {
            $('#modal').remove();
        });
    });
});

//Javascrpit del menu 
var i = 0;
$(document).ready(function () {
    $('.menu-bar').on('click', function () {
        "use strict";
        if (i === 0) {
            $('.contenidos').toggleClass('abrir');
            $('.slidemenu').css('visibility', 'visible');
            $('.slidemenu li').css('outline', '1.5px solid #2a2a2a');
            $('.slidemenu a').css('visibility', 'visible');
            $('.slidemenu ul').css('visibility', 'visible');
            i = 1;
        } else {
            $('.contenidos').toggleClass('abrir');
            $('.slidemenu').css('visibility', 'hidden');
            $('.slidemenu li').css('outline', 'none');
            $('.slidemenu a').css('visibility', 'hidden');
            $('.slidemenu ul').css('visibility', 'hidden');
            i = 0;
        }
    });
});
//Javascript go up
$(document).ready(function () {
    "use strict";
    $('#up').hide();
    $(window).scroll(function() {
       if($(this).scrollTop () > 45)
           $('#up').fadeIn('200');
        else
             $('#up').fadeOut('200');
    });
    $('#up').click(function () {
        $('body, html').animate({scrollTop: '0px'}, 500);
    });
});
// Javascript Select Ciudad
function Ciudad() {
    "use strict";
    var xhttp, arrayData;
    xhttp = new XMLHttpRequest();
    arrayData = new Array();
    if (localStorage.pais === "España") {
        xhttp.open("GET", 'España.txt', false);
        xhttp.send(null);
        CrearSelect(xhttp);
        
    } else if (localStorage.pais === "Italia") {
        xhttp.open("GET", 'Italia.txt', false);
        xhttp.send(null);
        CrearSelect(xhttp);
    } else if (localStorage.pais === "Alemania") {
        xhttp.open("GET", 'Alemania.txt', false);
        xhttp.send(null);
        CrearSelect(xhttp);
    } else if (localStorage.pais === "Paises Bajos") {
        xhttp.open("GET", 'Paises_Bajos.txt', false);
        xhttp.send(null);
        CrearSelect(xhttp);
    } else {
        for (var i= 0; i<3; i++)
            $('#valores').after("option id=\"Selec\"").remove();
    }
}
function Clear() {
    for(var i= 0; i<3; i++)
         $('#valores').after("option id=\"Selec\"").remove();
}
function CrearSelect(xhttp) {
    var txt, txt2, select;
    txt = xhttp.responseText;
    txt2 = txt.split(",");
    for (var i = 0; i < txt2.length; i++) {
        select = "<option id=\"valores\">" + txt2[i] + "</option>";
        $('#city').append(select);
    }
}