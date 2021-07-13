var numeroDeEmpleados = 0
//funcion para formatear el salario
const formatoSalario = (salario) => {
    const salarioUSD = new window.Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "MXN",
    }).format(salario);
    return salarioUSD;
}
//funcion para formatear el slario a dolares
const formatoSalarioDolares = (salario) => {
    const salarioUSD = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(salario);
    return salarioUSD;
}
//declaracion del metodo constructor de empleado
function nuevoEmpleado(id,foto, nombre, salario, empresa) {
    this.id = id;
    this.foto = foto;
    this.nombre = nombre;
    this.salario = salario;
    this.empresa = empresa;
}
//arreglo que contendra a todos los empleados
var empleados = [
    { id: numeroDeEmpleados++, foto:"", nombre: "mario martinez olivares", salario: "10000", empresa: "pjmop" },
    { id: numeroDeEmpleados++, foto:"", nombre: "mario martinez", salario: "20000", empresa: "pjmop" },
    { id: numeroDeEmpleados++, foto:"", nombre: "mario", salario: "30000", empresa: "pjmop" },
    { id: numeroDeEmpleados++, foto:"", nombre: "marco", salario: "40000", empresa: "pjmop1" },
    { id: numeroDeEmpleados++, foto:"", nombre: "marco martinez", salario: "50000", empresa: "pjmop1" },
    { id: numeroDeEmpleados++, foto:"", nombre: "oscar", salario: "40000", empresa: "platzi" },
    { id: numeroDeEmpleados++, foto:"", nombre: "oscar martinez", salario: "50000", empresa: "platzi" },
];
//captura de los inputs del empleado
const inputAgregar = document.querySelector('input.campoIngresar')
const inputSalario = document.querySelector('input.campoIngresarSal')
const inputEmpresa = document.querySelector('input.campoIngresarEmpresa')
//tabla
const tabla = document.querySelector('.cuerpotabla');
//boton agregar
const agregar = document.querySelector('.botoningresar');
//funcion que agrega nuevos empleados
const funcionAgregar = () => {
    funcionLimpiarTabla(empleados)
    empleados.push(new nuevoEmpleado(
        numeroDeEmpleados++,
        "",
        inputAgregar.value,
        inputSalario.value,
        inputEmpresa.value));
    funcionMostrarEmpleados(empleados);
};
//evento de escucha de boton agregar
agregar.addEventListener('click', funcionAgregar);

//funcion para mostrar los empleados
const funcionMostrarEmpleados = (arreglo) => {
    arreglo.forEach(item => {
        if (item.salario > 10000) {
            tabla.innerHTML +=
                `<tr class=empleado${item.id}>` +
                `<td><figure><img src =${item.foto}></figure></td>`+
                "<td>" + item.nombre + "</td>" +
                `<td class="salario salario-verde">` + formatoSalario(item.salario) + "</td>" +
                "<td>" + item.empresa + "</td>"
                + "</tr>";
        }
        else {
            tabla.innerHTML +=
                `<tr class=empleado${item.id}>` +
                `<td><figure><img src =${item.foto}></figure></td>`+ 
                "<td>" + item.nombre + "</td>" +
                `<td class="salario salario-rojo">` + formatoSalario(item.salario) + "</td>" +
                "<td>" + item.empresa + "</td>"
                + "</tr>";
        }
    })
}
//LIMPIAR TABLA
const funcionLimpiarTabla = (arreglo) => {
    arreglo.forEach((empleado) => {
        let empleadoDom = document.querySelector(`tr.empleado${empleado.id}`)
        tabla.removeChild(empleadoDom)
    })
}

//Buscar
//campo de busqueda
const inputBusqueda = document.querySelector('.campobuscar');
var nombre = []
var copiaFiltro = []
//funcion que busca empleados
const funcionBuscar = (e) => {
    let nombreCompleto = '';
    //console.log(e)
    //verificamos si la tecla pulsada es borrar
    if (e.key === "Backspace") {
        //sacamos del arreglo la ultima letra
        nombre.pop()
        //verificamos si el input esta vacio y si se presiona backspace entonces muestra todos los empleados
        //si no eentonces
        //comprueba si no hay nodos en la tabla ???
        try {
            if (tabla.hasChildNodes) {
                funcionLimpiarTabla(copiaFiltro)
            }
        }
        catch (error) {

        }
    }
    //si no entonces si la tecla pulsada no es backspace entonces agrega el valor de la tecla al nombre
    else {
        nombre.push(e.key)
        //si la tecla presionada es space entonces limpia la tabla
        if (e.key === " ") {
            funcionLimpiarTabla(copiaFiltro)
        }
    }
    //aqui se arma el nombre
    nombre.forEach((letra) => {
        nombreCompleto += letra;
    })
    console.log(nombreCompleto)
    //aqui se hace una comparacion del nombre armado vs lo que se tiene en el arreglo de empleados y si coincide es regresado en un arreglo
    var filtrosBusqueda = empleados.filter((empleado) => {
        if (nombreCompleto === empleado.nombre || nombreCompleto === empleado.empresa) {
            console.log("ha coincidido un registro")
            return empleado
        }
    });
    //verificar si hay algun elemento hijo
    if (tabla.hasChildNodes) {
        if (filtrosBusqueda.length === 0) {
            console.log('no hay nada para mostrar')
        } else {
            funcionMostrarEmpleados(filtrosBusqueda)
            copiaFiltro = filtrosBusqueda.slice();
        }
    }
};
//evento de escucha de busqueda 
inputBusqueda.addEventListener('keydown', funcionBuscar);
inputBusqueda.addEventListener('focus', function () {
    funcionLimpiarTabla(empleados)
})
inputBusqueda.addEventListener('blur', function () {
    funcionMostrarEmpleados(empleados)
})
//Editar 
//boton editar
const editar = document.querySelector('.botoneditar');
//campos a editar
const inputNombreActual = document.querySelector('.camponombreactual');
const inputSalarioActual = document.querySelector('.camposalarioactual');
const inputEditNombre = document.querySelector('.campoeditarnombre');
const inputEditSalario = document.querySelector('.campoeditarsalario');
//funcion editar
const funcionEditar = () => {
    var registroEditado = empleados.forEach(item => {
        funcionLimpiarTabla(empleados)
        if (item.nombre === inputNombreActual.value &&
            item.salario == inputSalarioActual.value) {
            item.nombre = inputEditNombre.value;
            item.salario = inputEditSalario.value;
        }
        funcionMostrarEmpleados(empleados)
    })
};
//evento de escucha de actualizar
editar.addEventListener('click', funcionEditar);

//CONVERSION A DOLARES
const botonConvertirSalario = document.querySelector('.conversionDolares');
//funcion de converison a dolares
const funcionConversion = () => {
    funcionLimpiarTabla(empleados)
    var recorreArray = empleados.forEach(item => {
        console.log(item.salario)
        let salarioUSD = formatoSalarioDolares(item.salario / 21.50)
        item.salario = salarioUSD;
        tabla.innerHTML +=
            `<tr class=empleado${item.id}>` +
            `<td><figure><img src =${item.foto}></figure></td>`+
            "<td>" + item.nombre + "</td>" +
            "<td>" + item.salario + "</td>" +
            "<td>" + item.empresa + "</td>"
            + "</tr>";
    })
};
//EVENTO QUE ESCUCHA A LA CONVERSION A DOLARES 
botonConvertirSalario.addEventListener('click', funcionConversion)

//total de empleados
const mostrarNoEmpleados = document.querySelector('.noEmpleados');
const funcionNoEmpleados = () => {
    mostrarNoEmpleados.innerHTML = `No empleados:${empleados.length}`;
}
funcionMostrarEmpleados(empleados);
setInterval(funcionNoEmpleados, 1000);





// -------------------------------------------------------------------------------------
// AQUI ESTA EL CODIGO JS PARA TOMAR LA FOTO
// Obtenemos todos los elementos que necesitaremos
var formularioTomarFotos= document.querySelector('.container'),
    cerrar_btn = document.querySelector('#cerrar'),
    video = document.querySelector('#camera-stream'),
    image = document.querySelector('#snap'),
    start_camera = document.querySelector('#start-camera'),
    controls = document.querySelector('.controls'),
    take_photo_btn = document.querySelector('#take-photo'),
    delete_photo_btn = document.querySelector('#delete-photo'),
    save_photo_btn = document.querySelector('#save-photo'),
    error_message = document.querySelector('#error-message');
// Declaramos una variable para obtener el registro clickeado
var fila="";
// Utilizamos la funcion getUserMedia para obtener la salida de la webcam
navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
if (!navigator.getMedia) {
    displayErrorMessage("Tu navegador no soporta la funcion getMedia.");
}
else {
    // Solicitamos la camara
    navigator.getMedia(
        {
            video: true
        },
        function (stream) {
            // A nuestro componente video le establecemos el src al stream de la webcam
            video.srcObject = stream;
            // Reproducimos
            video.play();
            video.onplay = function () {
                showVideo();
            };
        },
        function (err) {
            displayErrorMessage("Ocurrio un error al obtener el stream de la webcam: " + err.name, err);
        }
    );
}
// En los moviles no se puede reproducir el video automaticamente,
// programamos funcionamiento del boton inicar camara
start_camera.addEventListener("click", function (e) {
    e.preventDefault();
    // Reproducimos manualmente
    video.play();
    showVideo();
});
take_photo_btn.addEventListener("click", function (e) {
    e.preventDefault();
    var snap = takeSnapshot();
    // Mostramos la imagen
    image.setAttribute('src', snap);
    image.classList.add("visible");
    // Activamos los botones de eliminar foto y descargar foto
    delete_photo_btn.classList.remove("disabled");
    save_photo_btn.classList.remove("disabled");
    // Pausamos el stream de video de la webcam
    video.pause();
});
delete_photo_btn.addEventListener("click", function (e) {
    e.preventDefault();
    // Ocultamos la imagen
    image.setAttribute('src', "");
    image.classList.remove("visible");
    // Deshabilitamos botones de descargar y eliminar foto
    delete_photo_btn.classList.add("disabled");
    save_photo_btn.classList.add("disabled");
    // Reanudamos la reproduccion de la webcam
    video.play();
});
save_photo_btn.addEventListener("click", function(e){
    e.preventDefault();
    let snap = takeSnapshot();
    let nuevoTd = document.createElement("td")
    let figure = document.createElement("figure")
    let img = document.createElement("img")
    let indiceFilaHtml= fila.outerHTML.substring(19,20)
    figure.appendChild(img)
    img.setAttribute('src',`${snap}`)
    nuevoTd.appendChild(figure)
    fila.insertAdjacentElement(
        'afterbegin',nuevoTd
        )
    empleados[indiceFilaHtml].foto = snap;
    video.pause();
    formularioTomarFotos.classList.add("disable")
})
cerrar_btn.addEventListener("click", function(e){
    e.preventDefault()
    formularioTomarFotos.classList.add("disable")
})
function showVideo() {
    // Mostramos el stream de la webcam y los controles
    hideUI();
    video.classList.add("visible");
    controls.classList.add("visible");
}
function takeSnapshot() {
    var hidden_canvas = document.querySelector('canvas'),
        context = hidden_canvas.getContext('2d');
    var width = video.videoWidth,
        height = video.videoHeight;
    if (width && height) {
        // Configuramos el canvas con las mismas dimensiones que el video
        hidden_canvas.width = width;
        hidden_canvas.height = height;
        // Hacemos una copia
        context.drawImage(video, 0, 0, width, height);
        // Convertimos la imagen del canvas en datarurl
        return hidden_canvas.toDataURL('image/jpeg');
    }
}
function displayErrorMessage(error_msg, error) {
    error = error || "";
    if (error) {
        console.log(error);
    }
    error_message.innerText = error_msg;
    hideUI();
    error_message.classList.add("visible");
}
function hideUI() {
    // Limpiamos
    controls.classList.remove("visible");
    start_camera.classList.remove("visible");
    video.classList.remove("visible");
    snap.classList.remove("visible");
    error_message.classList.remove("visible");
}

// ---------------------CODIGO PARA AGREGAR LA FUNCION DE CLICKEAR UN REGISTRO Y TE DEJE CAPTURAR UNA FOTO --------------
tabla.addEventListener('click',conseguirFila);
function conseguirFila(e){ 
    fila=e.path[1];
    console.log(fila)
    formularioTomarFotos.classList.remove('disable')
}