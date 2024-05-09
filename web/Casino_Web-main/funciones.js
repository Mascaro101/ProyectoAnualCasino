/*Prueba para calcular el ancho de la pantalla al 100%
var ancho = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
console.log("Ancho de la pantalla: " + ancho + " píxeles");*/

/*Prueba para calcular el alto de la pantalla al 100%
var alto = document.documentElement.scrollHeight;
console.log("Alto del contenido: " + alto + " píxeles");*/

/*En caso de que la colección de usuarios no exista o se encuentre vacía, lo primero que sucederá es que
se creará automáticamente una cuenta para poder ingresar a la página con valores por default*/
var consulta = JSON.parse(localStorage.getItem("colUsuarios"));

if(consulta == null || consulta.length == 0){
    colUsuarios = [];

    fechaActual = new Date();

    colUsuarios.push(
        {
            "usuario": "admin",
            "contrasenia": "admin",
            "mail": "admin@mail.com",
            "dia": 1,
            "mes": 1,
            "anio": 2000,
            "telefono": 4430000,
            "saldo": 0,
            "ultimaCarga":fechaActual,
            "cargaDia": 0
        }
    );
    localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
}

/*/=======================================================================================\*\
||                                    CREAR CUENTA                                         ||
\*\=======================================================================================/*/

/**
 * CrearCuenta.html

 * Función que lee toda la información ingresada por el usuario al momento de crear una cuenta.
 * Si todo se valida correctamente la cuenta creada se agregará a la colección de usuarios
 * que se encuentra en el localStorage, sinó indicará los errores por los cuales no pudo ser creada.
 */
function crearCuenta(){

    /*Aislo la sección donde se deben mostrar los errores en la creación de cuentas */
    var pantallaError = document.getElementById("pantallaErrorCrearCuenta");

    /*Siempre que se realiza una ejecución de este código primero se limpian todos los mensajes
    de errores de ejecuciones fallidas anteriores*/
    pantallaError.innerHTML = "";

    /*Aislo todos los elementos para leer sus valores y además modificar su estilo
    según los errores o aciertos que haya habido al ejecutar el código */
    var elemUsuario = document.getElementById("crearUsuario");
    var elemContrasenia1 = document.getElementById("crearContrasenia1");
    var elemContrasenia2 = document.getElementById("crearContrasenia2");
    var elemMail = document.getElementById("crearMail");
    var elemDia = document.getElementById("crearDia");
    var elemMes = document.getElementById("crearMes");
    var elemAnio = document.getElementById("crearAnio");
    var elemTelefono = document.getElementById("crearTelefono");
    var elemCheckSuscripcion = document.getElementById("crearSuscripcion");
    var elemCheckTerminos = document.getElementById("crearTerminos");

    var colElementos = [];
    colElementos.push(elemUsuario);
    colElementos.push(elemContrasenia1);
    colElementos.push(elemContrasenia2);
    colElementos.push(elemMail);
    colElementos.push(elemDia);
    colElementos.push(elemMes);
    colElementos.push(elemAnio);
    colElementos.push(elemTelefono);
    colElementos.push(elemCheckSuscripcion);
    colElementos.push(elemCheckTerminos);

    /*Limpio las clases asignadas a los campos del formulario en consultas previas*/
    limpiarFormulario(colElementos);
    
    /*Valido que todos los datos ingresados por el usuario sean correctos antes
    de crear el nuevo usuario*/
    var usuarioValido = validarUsuario(elemUsuario, pantallaError);
    var contraseniaValida = validarContrasenia(elemContrasenia1, elemContrasenia2, pantallaError);
    var mailValido = validarMail(elemMail, pantallaError);
    var fechaValida = validarFecha(elemDia, elemMes, elemAnio, pantallaError);
    var telefonoValido = validarTelefono(elemTelefono, pantallaError);
    var terminosValido = validarTerminos(elemCheckTerminos, pantallaError);

    /*Si todas las validaciones son correctas, entonces se accederá a este bloque donde finalmente
    se creará el usuario que se guardará en el localStorage*/
    if(usuarioValido && contraseniaValida && mailValido && fechaValida && telefonoValido && terminosValido){

        //Se utiliza la pantalla de errores para marcar el éxito en la ejecución de la función
        pantallaError.innerHTML = "<li class=\"pantallaExito\">Cuenta creada con éxito</li>";

        //Se crea el JSON que representa al nuevo usuario
        var nuevoUsuario =
        {
            "usuario": elemUsuario.value,
            "contrasenia": elemContrasenia1.value,
            "mail": elemMail.value,
            "dia": elemDia.value,
            "mes": elemMes.value,
            "anio": elemAnio.value,
            "telefono": elemTelefono.value,
            "saldo": 0,
            "ultimaCarga":fechaActual,
            "cargaDia": 0
        }

        //Aislo la colección de usuario del localStorage y le agrego el nuevo usuario
        var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));
        colUsuarios.push(nuevoUsuario);

        //Cargo la colección actualizada de usuarios al localStorage
        localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));

        //Limpio el formulario completo
        var formulario = document.getElementById("formularioCrearCuenta");
        formulario.reset();
        limpiarFormulario(colElementos);
    }
}

/*/=======================================================================================\*\
||                                LIMPIAR FORMULARIOS                                      ||
\*\=======================================================================================/*/

/**
 * Recibe todos los elementos de un formulario para quitarle las clases que indican
 * si hubo un error o si tuvo éxito el valor ingresado en cada campo.
 * @param {*} colElementos
 */
function limpiarFormulario(colElementos){

    for (var i = 0; i < colElementos.length; i++){
        colElementos[i].classList.remove("displayBackgroundExito", "displayBackgroundError");
    }
}

/*/=======================================================================================\*\
||                                VALIDACIONES DE DATOS                                    ||
\*\=======================================================================================/*/

/**
 * @param {*} elemUsuario 
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function validarUsuario(elemUsuario, pantallaError){

    //Aislo del elemento el valor del nombre de usuario a validar
    var cadenaUsuario = elemUsuario.value;
    var exito = true;
    var i = 0;

    //Aislo la colección de ususarios del localStorage
    var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));

    /*Si el nombre de usuario se encuentra en uso dentro de la colección de usuarios
    no podrá ser utilizado*/
    while (i < colUsuarios.length && exito){

        if (colUsuarios[i].usuario == cadenaUsuario){
          exito = false;
        }
        i++;
    }

    if(exito){
        if(cadenaUsuario.length >= 3){
            if(cadenaUsuario.length <= 16){
                elemUsuario.classList.add("displayBackgroundExito");
            } else {
                exito = false;
                elemUsuario.classList.add("displayBackgroundError");
                pantallaError.innerHTML += "<li>El nombre de usuario no puede tener más de 16 carácteres</li>";
            }
        } else {
            exito = false;
            elemUsuario.classList.add("displayBackgroundError");
            pantallaError.innerHTML += "<li>El nombre de usuario debe tener 3 o más carácteres</li>";
        }
    } else {
        elemUsuario.classList.add("displayBackgroundError");
        pantallaError.innerHTML += "<li>El nombre de usuario ya se encuentra en uso</li>";
    }

    return exito;
}

/**
 * @param {*} elemContra1 
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} elemContra2 
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function validarContrasenia(elemContra1, elemContra2, pantallaError){
    var contra1 = elemContra1.value;
    var contra2 = elemContra2.value;

    var exito = true;

    if(contra1.length >= 8 && contra1 == contra2){
        elemContra1.classList.add("displayBackgroundExito");
        elemContra2.classList.add("displayBackgroundExito");

    } else {
        var exito = false;

        if (contra1.length < 8){
            pantallaError.innerHTML += "<li>La contraseña ingresada debe tener 8 o más carácteres</li>";
        }

        if (contra1 != contra2){
            pantallaError.innerHTML += "<li>Las contraseñas ingresadas no coinciden</li>";
        }
        elemContra1.classList.add("displayBackgroundError");
        elemContra2.classList.add("displayBackgroundError");
    }

    return exito;
}

/**
 * @param {*} elemMail
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function validarMail(elemMail, pantallaError){
    var cadenaMail = elemMail.value;
    var exito = true;
    var i = 0;

    //Aislo la colección de ususarios del localStorage
    var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));

    while (i < colUsuarios.length && exito){
        if (colUsuarios[i].mail == cadenaMail){
          exito = false;
        }
        i++;
    }

    if(exito){
    
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(patronCorreo.test(cadenaMail)){
            elemMail.classList.add("displayBackgroundExito");

        } else {
            exito = false;
            elemMail.classList.add("displayBackgroundError");
            pantallaError.innerHTML += "<li>El mail ingresado no tiene un formato válido</li>";
        }

    } else {
        elemMail.classList.add("displayBackgroundError");
        pantallaError.innerHTML += "<li>El mail ingresado ya se encuentra registrado</li>";
    }

    return exito;
}

/**
 * @param {*} elemDia
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} elemMes
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} elemAnio
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function validarFecha(elemDia, elemMes, elemAnio, pantallaError){
    var exito = false;
    fechaActual = new Date();
    var dia = elemDia.value;
    var mes = elemMes.value;
    var anio = elemAnio.value;

        if(dia >0 && mes > 0 && anio > 1900){

            if (mes == 2 && ((dia <= 29  && determinaBisiesto(anio)) || (dia <= 28 && !determinaBisiesto(anio)))){
                fechaIngresada = new Date(anio+"-"+mes+"-"+dia);
                if (fechaIngresada < fechaActual){
                    exito = true;
                }

            } else if (dia <= 30 && (mes == 4 || mes == 6 || mes == 9 || mes == 11)){
                fechaIngresada = new Date(anio+"-"+mes+"-"+dia);
                if (fechaIngresada < fechaActual){
                    exito = true;
                }

            } else if (dia <= 31 && (mes == 1 || mes == 3 || mes == 5 || mes == 7 ||  mes == 8 || mes == 10 || mes == 12)){
                fechaIngresada = new Date(anio+"-"+mes+"-"+dia);
                if (fechaIngresada < fechaActual){
                    exito = true;
                }
            }
        }

        if (exito){

            if((fechaActual - fechaIngresada)/31536000000 >= 18){
                elemDia.classList.add("displayBackgroundExito");
                elemMes.classList.add("displayBackgroundExito");
                elemAnio.classList.add("displayBackgroundExito");
            } else {
                exito = false;
                elemDia.classList.add("displayBackgroundError");
                elemMes.classList.add("displayBackgroundError");
                elemAnio.classList.add("displayBackgroundError");
                pantallaError.innerHTML += "<li>Debe ser mayor de edad para registrarse a este sitio</li>";
            }
        } else {
            elemDia.classList.add("displayBackgroundError");
            elemMes.classList.add("displayBackgroundError");
            elemAnio.classList.add("displayBackgroundError");
            pantallaError.innerHTML += "<li>Formato de fecha inválido dd/mm/aaaa</li>";
        }

    return exito;
}

/**
 * @param {} anio 
 * Lee un año y verifica si es bisiesto o no
 * @returns boolean
 */
function determinaBisiesto(anio)
{
    if (anio % 4 == 0) {
        if (!(anio % 100 == 0 && anio % 400 != 0)) {
            esBisiesto = true;
        } else {
            esBisiesto = false;
        }
    } else {
        esBisiesto = false;
    }
    return esBisiesto;
}

/**
 * @param {*} elemTelefono 
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function validarTelefono(elemTelefono ,pantallaError){
    var exito = true;
    var telefonoString = elemTelefono.value;
    var telefonoInt = parseInt(telefonoString);

    if (telefonoInt.toString().length != telefonoString.length || telefonoInt < 0){
        exito = false;
        elemTelefono.classList.add("displayBackgroundError");
        pantallaError.innerHTML += "<li>Los números de teléfono solo deben contener números</li>";
    }

    if(telefonoInt.toString().length < 7){
        exito = false;
        elemTelefono.classList.add("displayBackgroundError");
        pantallaError.innerHTML += "<li>Los números de teléfono deben tener al menos 7 dígitos</li>";
    }

    if (exito){
        elemTelefono.classList.add("displayBackgroundExito");
    }

    return exito;
}

/**
 * @param {*} elemCheckTerminos
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function validarTerminos(elemCheckTerminos, pantallaError){

    var exito = true;

    if(elemCheckTerminos.checked == false){
        exito = false;
        pantallaError.innerHTML += "<li>Debe aceptar los términos y condiciones para crearse una cuenta en este sitio</li>";
    }

    return exito;
}

/**
 * @param {*} elemMonto
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function verificarDineroValido(elemMonto, pantallaError){

    var valorDinero = elemMonto.value;
    var exito = false;

    const patronDinero = /^-?\d+(\.\d+)?$/;

    if(patronDinero.test(valorDinero) && valorDinero >= 0){
        exito = true;
        elemMonto.classList.add("displayBackgroundExito");
    } else {
        elemMonto.classList.add("displayBackgroundError");
        pantallaError.innerHTML += "<li>El valor ingresado para el monto no es válido</li>";
    }

    return exito;
}

/*/=======================================================================================\*\
||                               INGRESAR A LA PÁGINA                                      ||
\*\=======================================================================================/*/

/**
 * Verifica que los datos del usuario que quiere entrar a la página sean correctos
 * si es así se moverá el navegador a la página Juegos.html sinó
 * indicará por que no se puede ingresar
 */
function ingresarUsuarioPagina(){
    var elemUsuarioLogin = document.getElementById("usuarioLogin");
    var elemContraLogin = document.getElementById("contraLogin");

    var colElementos = [];
    colElementos.push(elemUsuarioLogin);
    colElementos.push(elemContraLogin);
    /*Limpio las clases asignadas a los campos del formulario en consultas previas*/
    limpiarFormulario(colElementos);

    var pantallaError = document.getElementById("pantallaErrorIndex");

    var usuarioLogin = elemUsuarioLogin.value;
    var contraLogin = elemContraLogin.value;

    var puedeEntrar = false;
    var existeUsuario = false;
    var i = 0;

    var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));
    
    while (!existeUsuario && i < colUsuarios.length){
        if(colUsuarios[i].usuario == usuarioLogin){
            existeUsuario = true;
            elemUsuarioLogin.classList.add("displayBackgroundExito");
            if(colUsuarios[i].contrasenia == contraLogin){
                puedeEntrar = true;
                elemContraLogin.classList.add("displayBackgroundExito");
            } else {
                elemContraLogin.classList.add("displayBackgroundError");
                pantallaError.innerHTML = "<li>Contraseña incorrecta</li>";
            }
        }
        i++;
    }

    if(!existeUsuario){
        elemUsuarioLogin.classList.add("displayBackgroundError");
        pantallaError.innerHTML = "<li>Nombre de usuario no registrado</li>";
    } else if (puedeEntrar){
        pantallaError.innerHTML = "<li class=\"pantallaExito\">Ingresando...</li>";
        window.location.href = "juegos.html";
        localStorage.setItem("usuarioActivo", JSON.stringify(colUsuarios[i-1]));
    }

}

/*/=======================================================================================\*\
||                                    CERRAR SESIÓN                                        ||
\*\=======================================================================================/*/

/**
 * Quita del localStorage al usuarioActivo
 */
function cerrarSesion(){
    localStorage.setItem("usuarioActivo", JSON.stringify(null));
    window.location.href = "index.html";
}

/*/=======================================================================================\*\
||                             ACTUALIZAR DATOS CUENTA                                     ||
\*\=======================================================================================/*/

/**
 * Juegos.html, Perfil.html, Cargar.html, Reglas.html, Opciones.html

 * Actualiza los datos que se muestran en la vista pequeña de datos a la derecha
 * sobre el usuario que se encuentra activo
 */
function actualizarDatosCuenta(){
    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo != null){
        var nombreUsuario = usuarioActivo.usuario;
        var saldo = usuarioActivo.saldo;
    
        var usuarioVista = document.getElementById("usuarioVista");
        var saldoVista = document.getElementById("saldoVista");
    
        usuarioVista.value = nombreUsuario;
        saldoVista.value = saldo;

    } else {
        window.location.href = "index.html";
    }
}

/*/=======================================================================================\*\
||                                    Perfil.html                                          ||
\*\=======================================================================================/*/

/**
 * Perfil.html

 * Al ingresar a la página Perfil.html muestra la información de perfil
 * del usuarioActivo. También debe actualizar los datos de la cuenta
 */
function actualizarPerfilUsuario(){
    actualizarDatosCuenta();

    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    var nombre = usuarioActivo.usuario;
    var mail = usuarioActivo.mail;
    var dia = usuarioActivo.dia;
    var mes = usuarioActivo.mes;
    var anio = usuarioActivo.anio;
    var telefono = usuarioActivo.telefono;

    var mostrarNombre = document.getElementById("usuarioEnPerfil");
    var mostrarMail = document.getElementById("mailEnPerfil");
    var mostrarNacimiento = document.getElementById("nacimientoEnPerfil");
    var mostrarTelefono = document.getElementById("telefonoEnPerfil");

    mostrarNombre.value = nombre;
    mostrarMail.value = mail;
    mostrarNacimiento.value = dia+"/ "+mes+"/ "+anio;
    mostrarTelefono.value = telefono;
}

/**
 * Perfil.html

 * Lee los cambios que quiere realizar el usuario en su perfil y si es posible
 * los realiza
 */
function realizarCambiosDePerfil(){

    //Aislo los elementos que leen los cambios que quiere realizar el usuario
    var elemMailNuevo = document.getElementById("cambiarMail");
    var elemTelefonoNuevo = document.getElementById("cambiarTelefono");
    var elemContraNueva1 = document.getElementById("cambiarContrasenia1");
    var elemContraNueva2 = document.getElementById("cambiarContrasenia2");

    /*Aislo la sección donde se debe mostrar en el perfil los errores
    de los cambios no realizados*/
    var pantallaError = document.getElementById("pantallaErrorPerfil");
    /*Se limpia lo que tenía antes la pantalla por si quedaron mensajes de error
    preexistentes */
    pantallaError.innerHTML = "";

    var colElementos = [];
    colElementos.push(elemMailNuevo);
    colElementos.push(elemTelefonoNuevo);
    colElementos.push(elemContraNueva1);
    colElementos.push(elemContraNueva2);
    /*Limpio las clases asignadas a los campos del formulario en consultas previas*/
    limpiarFormulario(colElementos);
    
    /*Si el usuario activa el boton de guardar cambios pero no se ingreso nada
    entonces no se validará nada, sinó realizará las validaciones correspondientes*/
    if(elemMailNuevo.value != "" || elemTelefonoNuevo.value != "" || elemContraNueva1.value != ""){

        //Aislo el usuario activo y la colección de usuarios
        var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));

        var i = 0;
        var encontrado = false;

        /*Busca el usuario activo dentro de la colección, cuando lo encuentra lo borra
        y vuelve a setear el arreglo en el local store sin el usuario activo para evitar
        errores de preexistencia de mail*/
        while(!encontrado && i < colUsuarios.length){
            if(colUsuarios[i].usuario == usuarioActivo.usuario){
                var usuarioActualizado = colUsuarios[i];
                colUsuarios.splice(i);
                localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
            }
            i++;
        }

        if(elemMailNuevo.value != ""){
            var puedeCambiarMail = validarMail(elemMailNuevo, pantallaError);
            if(puedeCambiarMail){
                usuarioActualizado.mail = elemMailNuevo.value;
            }
        }else{
            var puedeCambiarMail = true;
        }

        if(elemTelefonoNuevo.value != ""){
            var puedeCambiarTelefono = validarTelefono(elemTelefonoNuevo, pantallaError);
            if(puedeCambiarTelefono){
                usuarioActualizado.telefono = elemTelefonoNuevo.value;
            }
        } else {
            var puedeCambiarTelefono = true;
        }

        if(elemContraNueva1.value != ""){
            var puedeCambiarContrasenia = validarContrasenia(elemContraNueva1, elemContraNueva2, pantallaError);
            if(puedeCambiarContrasenia){
                usuarioActualizado.contrasenia = elemContraNueva1.value;
            }
        } else {
            var puedeCambiarContrasenia = true;
        }

        /*Evaluación final, si se realizaron cambios con exito se pushea el
        usuario actualizado a la colUsuarios recuperada anteriormente y se setea en el localStorage.
        Caso contrario, se vuelve a pushear el usuarioActivo*/
        if(puedeCambiarMail && puedeCambiarTelefono && puedeCambiarContrasenia){
            colUsuarios.push(usuarioActualizado);
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));
            localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));

            var formulario = document.getElementById("formularioActualizarPerfil");
            formulario.reset();
            limpiarFormulario(colElementos);

            pantallaError.innerHTML = "<li class=\"pantallaExito\">Cambios realizados con éxito</li>";
            actualizarPerfilUsuario();

        } else {
            colUsuarios.push(usuarioActivo);
            localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
        }
    }
}

/*/=======================================================================================\*\
||                           CARGAR/RETIRAR DINERO DE CUENTA                               ||
\*\=======================================================================================/*/

/**
 * Cargar.html

 * Lee el monto que se desea cargar, si es correcto se acreditará el dinero en la cuenta
 * del usuario.
 */
function cargarDineroCuenta(){
    var elemMontoCargar = document.getElementById("montoCargarDinero");
    //var elemMedioDePago = document.getElementById("medioDePagoCargar");
    //var informacionPago = document.getElementById("informacionDePagoCargar");

    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    
    var pantallaError = document.getElementById("pantallaErrorCargarDinero");
    pantallaError.innerHTML = "";

    var colElementos = [];
    colElementos.push(elemMontoCargar);
    //colElementos.push(elemMedioDePago);
    //colElementos.push(informacionPago);
    limpiarFormulario(colElementos);

    if (usuarioActivo != null){

        var puedeCargarMonto = verificarDineroValidoParaCarga(elemMontoCargar, pantallaError);

        if (puedeCargarMonto){
            var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));
            var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    
            var encontrado = false;
            var i = 0;
    
            while(!encontrado && i < colUsuarios.length){
                if(colUsuarios[i].usuario == usuarioActivo.usuario){
    
                    /*Se parsean los valores a float para que js no los interprete como un string al sumar*/
                    var nuevoSaldo = parseFloat(colUsuarios[i].saldo) + parseFloat(elemMontoCargar.value);
    
                    usuarioActivo.saldo = nuevoSaldo;
                    colUsuarios[i] = usuarioActivo;

                    localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
                    localStorage.setItem("usuarioActivo", JSON.stringify(colUsuarios[i]));
                }
                i++;
            }

            var formulario = document.getElementById("formularioCargarCuenta");
            formulario.reset();
            limpiarFormulario(colElementos);

            actualizarDatosCuenta();
            pantallaError.innerHTML = "<li class=\"pantallaExito\">Carga de dinero realizada con éxito</li>";
        }
    } 
}

/**
 * @param {*} elemMonto
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function verificarDineroValidoParaCarga(elemMonto, pantallaError){

    var valorDinero = elemMonto.value;
    var exito = false;

    var esDineroValido = verificarDineroValido(elemMonto, pantallaError);

    if(esDineroValido){

        var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        //var informacionDePagoCargar = document.getElementById("informacionDePagoCargar").value;

        var ultimaCarga = new Date(usuarioActivo.ultimaCarga);
        var cargaDia = usuarioActivo.cargaDia;

        var fechaActual = new Date();

        var fechaHoy = fechaActual.getFullYear() +""+ (fechaActual.getMonth()+1) +""+ fechaActual.getDate();
        var fechaCarga = ultimaCarga.getFullYear() +""+ (ultimaCarga.getMonth()+1) +""+ ultimaCarga.getDate();

        /*if(usuarioActivo.usuario == "admin" && informacionDePagoCargar == "admin"){
            elemMonto.classList.add("displayBackgroundExito");
            exito = true;

        } else {*/
            if(fechaHoy != fechaCarga){
                if(parseFloat(valorDinero) <= 5000){
                    elemMonto.classList.add("displayBackgroundExito");;
                    exito = true;

                    usuarioActivo.ultimaCarga = fechaActual;
                    usuarioActivo.cargaDia = valorDinero;
                    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                } else {
                    elemMonto.classList.remove("displayBackgroundExito");
                    elemMonto.classList.add("displayBackgroundError");
                    pantallaError.innerHTML += "<li>El valor ingresado para monto excede el límite diario de carga de dinero (máx. $5000) </li>";
                }
            } else {
                if(parseFloat(valorDinero) + parseFloat(cargaDia) <= 5000){
                    elemMonto.classList.add("displayBackgroundExito");
                    exito = true;

                    usuarioActivo.cargaDia = parseFloat(valorDinero) + parseFloat(cargaDia);
                    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

                } else {
                    var margen = 5000 - cargaDia;

                    var horas = 23 - fechaActual.getHours();
                    var minutos = 60 - fechaActual.getMinutes();

                    if(minutos < 10){
                        minutos = "0" + minutos;
                    }

                    elemMonto.classList.remove("displayBackgroundExito");
                    elemMonto.classList.add("displayBackgroundError");
                    pantallaError.innerHTML += "<li>El valor ingresado para monto excede su límite diario, por hoy puede cargar $"+margen+"</li>";
                    pantallaError.innerHTML += "<li>Debe esperar "+horas+":"+minutos+" HS para que se reinicie el límite diario de carga de dinero</li>";
                }
            }
        //}
    }

    return exito;
}

/**
 * Cargar.html

 * Lee el monto que se desea retirar, si es correcto se retirara el dinero de la cuenta
 * del usuario.
 */
function retirarDineroCuenta(){
    var elemMontoRetirar = document.getElementById("montoRetirarDinero");
    //var elemCuentaRetirar = document.getElementById("cuentaRetiroDinero");
    
    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    var pantallaError = document.getElementById("pantallaErrorRetirarDinero");
    pantallaError.innerHTML = "";

    var colElementos = [];
    colElementos.push(elemMontoRetirar);
    //colElementos.push(elemCuentaRetirar);
    limpiarFormulario(colElementos);

    if (usuarioActivo != null){
        var esMontoValido = verificarDineroValido(elemMontoRetirar, pantallaError);

        if(esMontoValido){
            var puedeRetirar = verificarPuedeRetirarSaldo(elemMontoRetirar, pantallaError);
    
            if(puedeRetirar){
                var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));
    
                var encontrado = false;
                var i = 0;
    
                while(!encontrado && i < colUsuarios.length){
                    if(colUsuarios[i].usuario == usuarioActivo.usuario){
        
                        encontrado = true;
                        /*Se parsean los valores a float para que js no los interprete como un string*/
                        var nuevoSaldo = parseFloat(colUsuarios[i].saldo) - parseFloat(elemMontoRetirar.value);
        
                        colUsuarios[i].saldo = nuevoSaldo;
                        localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
                        localStorage.setItem("usuarioActivo", JSON.stringify(colUsuarios[i]));
                        
                    }
                    i++;
                }
    
                var formulario = document.getElementById("formularioRetirarDinero");
                formulario.reset();
                limpiarFormulario(colElementos);

                actualizarDatosCuenta();
                pantallaError.innerHTML = "<li class=\"pantallaExito\">Retiro de dinero realizado con éxito</li>";
            }
        }
    }
}

/**
 * 
 * @param {*} elemMontoRetirar
 * Elemento que contiene los valores ingresados por el usuario a validar.
 * @param {*} pantallaError
 * Sección dentro de la página donde se imprimirá el error.
 * @returns boolean
 */
function verificarPuedeRetirarSaldo(elemMontoRetirar, pantallaError){
    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    exito = false;

    var saldoUsuario = usuarioActivo.saldo;

    if(saldoUsuario >= elemMontoRetirar.value){
        elemMontoRetirar.classList.add("displayBackgroundExito");
        exito = true;
    } else {
        elemMontoRetirar.classList.remove("displayBackgroundExito");
        elemMontoRetirar.classList.add("displayBackgroundError");
        pantallaError.innerHTML += "<li>El valor ingresado de monto para retirar excede el saldo de su cuenta</li>";
    }
    return exito;
}

/*/=======================================================================================\*\
||                                       MENÚ JUEGOS                                       ||
\*\=======================================================================================/*/

/**
 * Cambia la imagen de la ruleta en el menú de juegos al posar encima el mouse
 */
function overCambiarImgRuleta(){
    elemImg = document.getElementById("imgJuegosMenuRuleta");
    elemImg.src = "imagenes/imgJuegos/imgJuegoRuleta2Resize.png"
}

/**
 * Cambia la imagen de la ruleta en el menú de juegos al quitar de encima el mouse
 */
function outCambiarImgRuleta(){
    elemImg = document.getElementById("imgJuegosMenuRuleta");
    elemImg.src = "imagenes/imgJuegos/imgJuegoRuleta1Resize.png"
}

/**
 * Cambia la imagen del black jack en el menú de juegos al posar encima el mouse
 */
function overCambiarImgBlackJack(){
    elemImg = document.getElementById("imgJuegosMenuBlackJack");
    elemImg.src = "imagenes/imgJuegos/imgJuegoBlackJack2Resize.png"
}

/**
 * Cambia la imagen del black jack en el menú de juegos al quitar de encima el mouse
 */
function outCambiarImgBlackJack(){
    elemImg = document.getElementById("imgJuegosMenuBlackJack");
    elemImg.src = "imagenes/imgJuegos/imgJuegoBlackJack1Resize.png"
}

/**
 * Cambia la imagen del tragamonedas en el menú de juegos al posar encima el mouse
 */
function overCambiarImgTragamonedas(){
    elemImg = document.getElementById("imgJuegosMenuTragamonedas");
    elemImg.src = "imagenes/imgJuegos/imgJuegoTragamonedas2Resize.png"
}

/**
 * Cambia la imagen del tragamonedas en el menú de juegos al quitar de encima el mouse
 */
function outCambiarImgTragamonedas(){
    elemImg = document.getElementById("imgJuegosMenuTragamonedas");
    elemImg.src = "imagenes/imgJuegos/imgJuegoTragamonedas1Resize.png"
}

/*/=======================================================================================\*\
||                                    JUEGO TRAGAMONEDAS                                   ||
\*\=======================================================================================/*/

/**
 * juegoTragamonedas.html

 * Función que resuelve una tirada del tragamonedas
 */
function activarPalancaTragamonedas(){

    var elemPalanca = document.getElementById("palancaMaquina");
    var elemImgPalanca = document.getElementById("palancaMaquinaImagen");

    /*Elimino la función de la palanca para que no pueda activarse nuevamente mientras
    se resuelve la jugada*/
    elemPalanca.onclick = null;

    //Se activa el gif de movimiento de la palanca
    elemImgPalanca.src = "imagenes/imgJuegoTragamonedas/palancaTirar.gif";

    /*Se quita el gif de movimiento de la palanca luego de unos segundos volviendo a insertar
    la imágen estática de la misma*/
    setTimeout(function() {
        elemImgPalanca.src = "imagenes/imgJuegoTragamonedas/palancaEstatica.png";
    }, 760);

    /*Vuelve a colocar la función de activar la palanca luego de resolver la jugada*/
    setTimeout(function() {
        elemPalanca.onclick = activarPalancaTragamonedas;
    }, 3100);

    /*Hay una función que verifica que el valor de la apuesta sea acorde al saldo del usuarioActivo*/
    var apuestaTragamonedas = JSON.parse(localStorage.getItem("apuestaTragamonedas"));

    if(apuestaTragamonedas != null){

        var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

        if(parseFloat(apuestaTragamonedas) != 0 && usuarioActivo.saldo >= apuestaTragamonedas){
            /*Busco al usuario activo para descontarle el dinero de la jugada
            actualizo la colección que contiene al usuario y al usuarioActivo
            */
            var colUsuarios = JSON.parse(localStorage.getItem("colUsuarios"));
            var encontrado = false;
            var i = 0;

            while(!encontrado && i < colUsuarios.length){
                if(colUsuarios[i].usuario == usuarioActivo.usuario){

                    encontrado = true;
                    /*Se parsean los valores a float para que js no los interprete como un string*/
                    var nuevoSaldo = parseFloat(colUsuarios[i].saldo) - parseFloat(apuestaTragamonedas);

                    colUsuarios[i].saldo = nuevoSaldo;
                    localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
                    localStorage.setItem("usuarioActivo", JSON.stringify(colUsuarios[i]));
                    actualizarDatosCuenta();
                }
                i++;
            }
            i--;

            var pantallaPremio = document.getElementById("resultadosMenuTragamonedas");
            pantallaPremio.value = "--";

            var valor1 = Math.floor(Math.random() * (10)) + 1;
            var valor2 = Math.floor(Math.random() * (10)) + 1;
            var valor3 = Math.floor(Math.random() * (10)) + 1;

            var display1 = document.getElementById("displayTragamonedas01");
            var display2 = document.getElementById("displayTragamonedas02");
            var display3 = document.getElementById("displayTragamonedas03");

            var rodilloActual1 = JSON.parse(localStorage.getItem("rodillo1"));
            var rodilloActual2 = JSON.parse(localStorage.getItem("rodillo2"));
            var rodilloActual3 = JSON.parse(localStorage.getItem("rodillo3"));

            if(rodilloActual1 != null){
                setTimeout(function() {
                    display1.src = "imagenes/imgJuegoTragamonedas/rodillo"+rodilloActual1+"Saliendo.gif";
                }, 600);
            } else {
                setTimeout(function() {
                    display1.src = "imagenes/imgJuegoTragamonedas/rodillo8Saliendo.gif";
                }, 600);
            }

            /*Salen los valores del rodillo actual*/
            if(rodilloActual2 != null){
                setTimeout(function() {
                    display2.src = "imagenes/imgJuegoTragamonedas/rodillo"+rodilloActual2+"Saliendo.gif";
                }, 800);
            } else {
                setTimeout(function() {
                    display2.src = "imagenes/imgJuegoTragamonedas/rodillo8Saliendo.gif";
                }, 800);
            }

            if(rodilloActual3 != null){
                setTimeout(function() {
                    display3.src = "imagenes/imgJuegoTragamonedas/rodillo"+rodilloActual3+"Saliendo.gif";
                }, 1000);
            } else {
                setTimeout(function() {
                    display3.src = "imagenes/imgJuegoTragamonedas/rodillo8Saliendo.gif";
                }, 1000);
            }

            /*Giran los rodillos*/
            setTimeout(function() {
                display1.src = "imagenes/imgJuegoTragamonedas/rodillo00Girando.gif";
            }, 1000);

            setTimeout(function() {
                display2.src = "imagenes/imgJuegoTragamonedas/rodillo00Girando.gif";
            }, 1200);

            setTimeout(function() {
                display3.src = "imagenes/imgJuegoTragamonedas/rodillo00Girando.gif";
            }, 1400);


            /*Entran los valores nuevos de los rodillos*/
            setTimeout(function() {
                display1.src = "imagenes/imgJuegoTragamonedas/rodillo"+valor1+"Entrando.gif";
            }, 1640);

            setTimeout(function() {
                display2.src = "imagenes/imgJuegoTragamonedas/rodillo"+valor2+"Entrando.gif";
            }, 1840);

            setTimeout(function() {
                display3.src = "imagenes/imgJuegoTragamonedas/rodillo"+valor3+"Entrando.gif";
            }, 2040);
            
            /*Se quedan estáticos finalmente los valores nuevos de los rodillos*/
            setTimeout(function() {
                display1.src = "imagenes/imgJuegoTragamonedas/rodillo"+valor1+".png";
                localStorage.setItem("rodillo1", JSON.stringify(valor1));
            }, 2200);

            setTimeout(function() {
                display2.src = "imagenes/imgJuegoTragamonedas/rodillo"+valor2+".png";
                localStorage.setItem("rodillo2", JSON.stringify(valor2));
            }, 2400);

            setTimeout(function() {
                display3.src = "imagenes/imgJuegoTragamonedas/rodillo"+valor3+".png";
                localStorage.setItem("rodillo3", JSON.stringify(valor3));
            }, 2600);

            var premio = 0;

            // Estructura que define el valor del premio según los resultados de la jugada
            if (valor1 == valor2 && valor2 == valor3){

                if (valor1 <= 4){
                    premio = parseInt(apuestaTragamonedas) * 50;

                } else if (valor1 <= 7){
                    premio = parseInt(apuestaTragamonedas) * 100;

                } else if (valor1 <= 9){
                    premio = parseInt(apuestaTragamonedas) * 250;

                } else if (valor1 == 10){
                    premio = parseInt(apuestaTragamonedas) * 500;
                }

            } else if (valor1 == valor2){

                if(valor1 <= 3){
                    premio = parseInt(apuestaTragamonedas) /2;
                } else if (valor1 <= 7){
                    premio = parseInt(apuestaTragamonedas);
                } else if (valor1 <= 9){
                    premio = parseInt(apuestaTragamonedas) *3;
                } else if (valor1 == 10){
                    premio = parseInt(apuestaTragamonedas) *4;
                }

            } else if (valor1 == valor3){

                if(valor1 <= 3){
                    premio = parseInt(apuestaTragamonedas);
                } else if (valor1 <= 7){
                    premio = parseInt(apuestaTragamonedas) *3;
                } else if (valor1 <= 9){
                    premio = parseInt(apuestaTragamonedas) *5;
                } else if (valor1 == 10){
                    premio = parseInt(apuestaTragamonedas) *15;
                }

            } else if (valor2 == valor3){

                if(valor2 <= 3){
                    premio = parseInt(apuestaTragamonedas) /2;
                } else if (valor2 <= 7){
                    premio = parseInt(apuestaTragamonedas);
                } else if (valor2 <= 9){
                    premio = parseInt(apuestaTragamonedas) *3;
                } else if (valor2 == 10){
                    premio = parseInt(apuestaTragamonedas) *4;
                }

            } else if (valor1 == 10 || valor2 == 10 || valor3 == 10){
                premio = parseInt(apuestaTragamonedas)/2;
            }

            setTimeout(function() {
                pantallaPremio.value = parseInt(premio);
            }, 2800);

            setTimeout(function() {
                nuevoSaldo = parseFloat(colUsuarios[i].saldo) + parseFloat(premio);
                colUsuarios[i].saldo = nuevoSaldo;
                localStorage.setItem("colUsuarios", JSON.stringify(colUsuarios));
                localStorage.setItem("usuarioActivo", JSON.stringify(colUsuarios[i]));
                actualizarDatosCuenta();
            }, 3100);

        }
    }
}

/**
 * juegoTragamonedas.html

 * Función que suma $10 a la apuesta del tragamonedas siempre que se pueda
 */
function sumarApuestaTragamonedas(){

    var apuestaTragamonedas = JSON.parse(localStorage.getItem("apuestaTragamonedas"));
    var usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    var elemVisorApuesta = document.getElementById("valorApuestaMenuTragamonedas");

    var saldoUsuario = usuarioActivo.saldo;

    if(apuestaTragamonedas != null){
        /* Limito a 200 el valor máximo de apuesta */
        if (saldoUsuario >= apuestaTragamonedas + 10 && apuestaTragamonedas < 200){
            elemVisorApuesta.value = parseInt(apuestaTragamonedas) + 10;
            localStorage.setItem("apuestaTragamonedas", JSON.stringify(parseInt(apuestaTragamonedas)+10));
        }

    } else {

        if (saldoUsuario > 10){
            elemVisorApuesta.value = 10;
            localStorage.setItem("apuestaTragamonedas", JSON.stringify(10));
        }

    }
}

/**
 * juegoTragamonedas.html

 * Función que resta $10 a la apuesta del tragamonedas siempre que se pueda
 */
function restarApuestaTragamonedas(){

    var apuestaTragamonedas = JSON.parse(localStorage.getItem("apuestaTragamonedas"));
    var elemVisorApuesta = document.getElementById("valorApuestaMenuTragamonedas");

    if(apuestaTragamonedas != null){

        if (apuestaTragamonedas >= 10){
            elemVisorApuesta.value = parseInt(apuestaTragamonedas) - 10;
            localStorage.setItem("apuestaTragamonedas", JSON.stringify(parseInt(apuestaTragamonedas)-10));
        }
    }
}

/**
 * juegoTragamonedas.html

 * Función creada principalmente para volver a su estado inicial los display
 * de los rodillos y el valor de la apuesta a 0
 */
function actualizarJuegoTragamonedas(){
    actualizarDatosCuenta();

    localStorage.setItem("rodillo1", JSON.stringify(8));
    localStorage.setItem("rodillo2", JSON.stringify(8));
    localStorage.setItem("rodillo3", JSON.stringify(8));

    localStorage.setItem("apuestaTragamonedas", JSON.stringify(0));
}