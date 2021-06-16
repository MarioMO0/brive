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
    {id:numeroDeEmpleados++,nombre:"mario",salario:"10000", empresa:"pjmop"},
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
    funcionLimpiarTabla()
    empleados.push(new nuevoEmpleado(
    numeroDeEmpleados++,
    inputAgregar.value,
    inputSalario.value,
    inputEmpresa.value));
    funcionMostrarEmpleados();
};
//evento de escucha de boton agregar
agregar.addEventListener('click',funcionAgregar);

//funcion para mostrar los empleados
const funcionMostrarEmpleados= () => {
    let arrEmpleados=empleados.forEach(item => {
        //numeroDeEmpleados++;
        tabla.innerHTML += 
        `<tr class=empleado${item.id}>`+
        "<td>"+item.nombre+"</td>"+
        "<td>"+formatoSalario(item.salario)+"</td>"+
        "<td>"+item.empresa+"</td>"
        +"</tr>";
    })
} 
//LIMPIAR TABLA
const funcionLimpiarTabla= () => {
    for(let i=0;i<numeroDeEmpleados;i++)
    {
            let empleado=  document.querySelector(`tr.empleado${i}`)
            tabla.removeChild(empleado)
    }
}
//Buscar
//boton buscar
const buscar=document.querySelector('.botonbuscar');
//campo de busqueda
const inputBusqueda=document.querySelector('.campobuscar');
//funcion que busca empleados
const funcionBuscar = () =>{
    console.log('buscando')
    var filtrosBusqueda = empleados.filter(empleado =>{
        if(inputBusqueda.value===empleado.nombre)
        return empleado.nombre
        else if(inputBusqueda.value===empleado.empresa)
        return empleado.empresa;
    });
    console.log(filtrosBusqueda);
};
//evento de escucha de busqueda
buscar.addEventListener('click',funcionBuscar);

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
        funcionLimpiarTabla()
        if(item.nombre === inputNombreActual.value &&
            item.salario == inputSalarioActual.value)
            {
                item.nombre = inputEditNombre.value;
                item.salario = inputEditSalario.value;
                console.log(`el nuevo registro es:${item.nombre} ${item.salario}`)
            }
            funcionMostrarEmpleados()
    })
};
//evento de escucha de actualizar
editar.addEventListener('click',funcionEditar);

//CONVERSION A DOLARES
const botonConvertirSalario=document.querySelector('.conversionDolares');
//funcion de converison a dolares
const funcionConversion  = () => {
    funcionLimpiarTabla()
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
funcionMostrarEmpleados();
setInterval(funcionNoEmpleados,2000);