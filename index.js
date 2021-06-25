var numeroDeEmpleados=0
//funcion para formatear el salario
const formatoSalario = (salario)=>{
    const salarioUSD=new window.Intl.NumberFormat("es-ES",{
        style: "currency",
        currency:"MXN",
    }).format(salario);
    return salarioUSD;
}
//funcion para formatear el slario a dolares
const formatoSalarioDolares = (salario)=>{
    const salarioUSD=new window.Intl.NumberFormat("en-EN",{
        style: "currency",
        currency:"USD",
    }).format(salario);
    return salarioUSD;
}
//declaracion del metodo constructor de empleado
function nuevoEmpleado(id,nombre,salario,empresa)
{
    this.id=id;
    this.nombre=nombre;
    this.salario=salario;
    this.empresa=empresa;
}
//arreglo que contendra a todos los empleados
var empleados=[
    {id:numeroDeEmpleados++,nombre:"mario martinez olivares",salario:"10000", empresa:"pjmop"},
    {id:numeroDeEmpleados++,nombre:"mario martinez",salario:"20000", empresa:"pjmop"},
    {id:numeroDeEmpleados++,nombre:"mario",salario:"30000", empresa:"pjmop"},
    {id:numeroDeEmpleados++,nombre:"marco",salario:"40000", empresa:"pjmop1"},
    {id:numeroDeEmpleados++,nombre:"marco martinez",salario:"50000", empresa:"pjmop1"},
    {id:numeroDeEmpleados++,nombre:"oscar",salario:"40000", empresa:"platzi"},
    {id:numeroDeEmpleados++,nombre:"oscar martinez",salario:"50000", empresa:"platzi"},
];
//creacion de una fila
const fila=document.createElement('tr');
//fila.className="registro"

//captura de los inputs del empleado
const  inputAgregar= document.querySelector('input.campoIngresar')
const inputSalario=document.querySelector('input.campoIngresarSal')
const inputEmpresa=document.querySelector('input.campoIngresarEmpresa')
//tabla
const tabla=document.querySelector('.cuerpotabla');
//boton agregar
const agregar=document.querySelector('.botoningresar');
//funcion que agrega nuevos empleados
const funcionAgregar = () =>{
    funcionLimpiarTabla(empleados)
    empleados.push(new nuevoEmpleado(
    numeroDeEmpleados++,
    inputAgregar.value,
    inputSalario.value,
    inputEmpresa.value));
    funcionMostrarEmpleados(empleados);
};
//evento de escucha de boton agregar
agregar.addEventListener('click',funcionAgregar);

//funcion para mostrar los empleados
const funcionMostrarEmpleados= (arreglo) => {
        arreglo.forEach(item => {
            if(item.salario > 10000)
            {
                tabla.innerHTML += 
                `<tr class=empleado${item.id}>`+
                "<td>"+item.nombre+"</td>"+
                `<td class="salario salario-verde">`+formatoSalario(item.salario)+"</td>"+
                "<td>"+item.empresa+"</td>"
                +"</tr>";
            }
            else
            {
                tabla.innerHTML += 
                `<tr class=empleado${item.id}>`+
                "<td>"+item.nombre+"</td>"+
                `<td class="salario salario-rojo">`+formatoSalario(item.salario)+"</td>"+
                "<td>"+item.empresa+"</td>"
                +"</tr>";
            }
    })
} 
//LIMPIAR TABLA
const funcionLimpiarTabla= (arreglo) => {
    arreglo.forEach((empleado)=>{
        let empleadoDom=  document.querySelector(`tr.empleado${empleado.id}`)
        tabla.removeChild(empleadoDom)
    })
}

//Buscar
//campo de busqueda
const inputBusqueda=document.querySelector('.campobuscar');
var nombre= []
var copiaFiltro=[]
//funcion que busca empleados
const funcionBuscar = (e) =>{
    let nombreCompleto='';
    //console.log(e)
    //verificamos si la tecla pulsada es borrar
    if(e.key==="Backspace")
    {
        //sacamos del arreglo la ultima letra
        nombre.pop()
        //verificamos si el input esta vacio y si se presiona backspace entonces muestra todos los empleados
        //si no eentonces
        //comprueba si no hay nodos en la tabla ???
        try{
            if(tabla.hasChildNodes){
                funcionLimpiarTabla(copiaFiltro)
            }
        }
        catch(error){

        }
    }
    //si no entonces si la tecla pulsada no es backspace entonces agrega el valor de la tecla al nombre
    else{
        nombre.push(e.key)
        //si la tecla presionada es space entonces limpia la tabla
        if(e.key===" ")
        {
            funcionLimpiarTabla(copiaFiltro)
        }
    }
    //aqui se arma el nombre
    nombre.forEach((letra)=>{
        nombreCompleto +=letra;
    })
    console.log(nombreCompleto)
    //aqui se hace una comparacion del nombre armado vs lo que se tiene en el arreglo de empleados y si coincide es regresado en un arreglo
   var filtrosBusqueda = empleados.filter((empleado) =>{
        if(nombreCompleto===empleado.nombre || nombreCompleto===empleado.empresa){
            console.log("ha coincidido un registro")
            return empleado
        }
    });
//verificar si hay algun elemento hijo
    if(tabla.hasChildNodes){
        if(filtrosBusqueda.length === 0)
        {
            console.log('no hay nada para mostrar')
        }else{
                funcionMostrarEmpleados(filtrosBusqueda)
                copiaFiltro = filtrosBusqueda.slice();
        }
    }
};
//evento de escucha de busqueda 
inputBusqueda.addEventListener('keydown',funcionBuscar);
inputBusqueda.addEventListener('focus', function(){
    funcionLimpiarTabla(empleados)
})
inputBusqueda.addEventListener('blur', function(){
    funcionMostrarEmpleados(empleados)
})
//Editar 
//boton editar
const editar=document.querySelector('.botoneditar');
//campos a editar
const inputNombreActual= document.querySelector('.camponombreactual');
const inputSalarioActual= document.querySelector('.camposalarioactual');
const inputEditNombre= document.querySelector('.campoeditarnombre');
const inputEditSalario= document.querySelector('.campoeditarsalario');
//funcion editar
const funcionEditar = ()  =>{
    var registroEditado= empleados.forEach(item => {
        funcionLimpiarTabla(empleados)
        if(item.nombre === inputNombreActual.value &&
            item.salario == inputSalarioActual.value)
            {
                item.nombre = inputEditNombre.value;
                item.salario = inputEditSalario.value;
            }
            funcionMostrarEmpleados(empleados)
    })
};
//evento de escucha de actualizar
editar.addEventListener('click',funcionEditar);

//CONVERSION A DOLARES
const botonConvertirSalario=document.querySelector('.conversionDolares');
//funcion de converison a dolares
const funcionConversion  = () => {
    funcionLimpiarTabla(empleados)
    var recorreArray= empleados.forEach(item => {
        let salarioUSD=item.salario/21.50
        item.salario=salarioUSD;
        tabla.innerHTML += 
        `<tr class=empleado${item.id}>`+
        "<td>"+item.nombre+"</td>"+
        "<td>"+formatoSalarioDolares(item.salario)+"</td>"+
        "<td>"+item.empresa+"</td>"
        +"</tr>";
    })
};
//EVENTO QUE ESCUCHA A LA CONVERSION A DOLARES 
botonConvertirSalario.addEventListener('click',funcionConversion)

//total de empleados
const mostrarNoEmpleados= document.querySelector('.noEmpleados');
const funcionNoEmpleados= () =>{
    mostrarNoEmpleados.innerHTML = `No empleados:${empleados.length}`;
}
funcionMostrarEmpleados(empleados);
setInterval(funcionNoEmpleados,2000);