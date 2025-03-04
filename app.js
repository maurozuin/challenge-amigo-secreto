/********************************************************************************************************************/
/*El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. 
Aquí deberás desarrollar la lógica para resolver el problema.
Este desafío consiste en una aplicación que permite a los usuarios ingresar nombres de amigos en una lista, 
realizar un sorteo aleatorio y determinar quién es el "Amigo Secreto". Los usuarios pueden agregar nombres 
a través de un campo de texto y un botón "Añadir", visualizar la lista y, finalmente, hacer clic en 
"Sortear Amigo" para seleccionar un nombre aleatorio, mostrando el resultado en pantalla.

Funcionalidades
-Agregar nombres: Los usuarios pueden ingresar nombres en un campo de texto y hacer clic en "Añadir" para agregarlos a la lista.
-Validación de entrada: Si el campo de texto está vacío o contiene caracteres no válidos, el sistema mostrará una alerta 
solicitando un nombre válido.
-Visualización dinámica: Los nombres ingresados aparecerán en una lista actualizada automáticamente debajo del campo de entrada.
-Sorteo aleatorio: Al hacer clic en el botón "Sortear Amigo", el sistema seleccionará aleatoriamente un nombre de la lista 
y lo mostrará en pantalla.

*/
/********************************************************************************************************************/
/*
Autor 
MZuin
*/
//-----------------------------------------------------------------------------------------------------------------
//variables
let listaAmigos = [];
let numeroMaximoAmigos = 3;

//------------------------------------------------------------------------------------------------------------------
//ingreso datos
function agregarAmigo(){
    
	let nombreIngresado = leerDatoElemento('amigo');
    console.log(`Nombre ingresado: ${nombreIngresado}`);

    //permite solo n cantidad de amigos en la lista
    if (listaAmigos.length > numeroMaximoAmigos-1){
        //console.log(`Máximo es: ${numeroMaximoAmigos}`);
		alert(`No puede ingresar mas amigos a la lista, el máximo es: ${numeroMaximoAmigos}`);
        escribirDatoElemento('amigo',"");
		return;		
	}

    //validar ingreso
    let validarIngreso = validarAmigo(nombreIngresado)
	if (validarIngreso != 0){
		//alert("Ingresa por favor tu lista de amigos");
        escribirDatoElemento('amigo',"");
		return;
	}

    //verifico si el nombre esta en la lista 
    if (listaAmigos.includes(nombreIngresado.toUpperCase())) {
        alert(`El nombre ya fue ingresado: ${nombreIngresado}`);
        return;
    } else {
        //carga el arreglo
        listaAmigos.push(nombreIngresado.toUpperCase());
        console.log(listaAmigos);
        escribirDatoElemento('amigo',"");
        
        //mostrar listado amigos ingresados
        mostrarAmigos('listaAmigos');
    } 
}

//obtener dato ingresado por el usuario
function leerDatoElemento(elemento){
    console.log('Lee valor elemento');
    let ingresarAmigo = document.getElementById(elemento);    
	return ingresarAmigo.value;
}

//escribir dato ingresado por el usuario
function escribirDatoElemento(elemento, valor){
    console.log('Escribe valor elemento');
    let ingresarElemento = document.getElementById(elemento);  
    ingresarElemento.value = valor;
	ingresarElemento.focus();  
}

//fn para validar el ingreso de datos
function validarAmigo(nombreIngresado) {
    var validador = /^[a-zA-Z\s-]+$/;

    if (!nombreIngresado) {
        alert("El nombre está vacío! Ingresa un nombre válido");
        return 1;
    }

    if (!validador.test(nombreIngresado)) {
        alert("El nombre contiene caracteres inválidos! Ingresa un nombre válido");
        return 1;
    }

    return 0;
}

//muestra listado en la página
function mostrarAmigos(elemento){
	let i = 0;
	let nuevoAmigo = document.getElementById(elemento);
    //limpio texto
	nuevoAmigo.innerHTML = "";

    //recorro listado y luego imprimo
	for (i = 0; i< listaAmigos.length;i++){
		let registro = document.createElement("li");
		registro.textContent = listaAmigos[i];
		nuevoAmigo.appendChild(registro);
	}
}

//------------------------------------------------------------------------------------------------------------------
//sorteo
//sortear a partir de la lista ingresada
function sortearAmigo(){
	//valido que se haya ingresado lista
    if(listaAmigos.length == 0){
		alert("No se ingresó ningún amigo para realizar el sorteo!");
		return;
	}

    if (listaAmigos.length < numeroMaximoAmigos){
        //console.log(`Máximo es: ${numeroMaximoAmigos}`);
		alert('Ingrese mas amigos a la lista de sorteo');
		return;		
	}

	let idAmigoGanador = generarIdSorteo();
    let ganadorSorteo = listaAmigos[idAmigoGanador];

	let amigoGanador = document.getElementById("resultado");
	amigoGanador.innerHTML = `El ganador es:  ${ganadorSorteo}`;	

    //deshabilitar controles
    document.querySelector('#sortear').setAttribute('disabled','true');
    document.querySelector('#amigo').setAttribute('disabled','true');
	document.querySelector('#agrega').setAttribute('disabled','true');
}

//id random 
function generarIdSorteo(){
    let idGenerado = Math.floor(Math.random()*listaAmigos.length);
    console.log(`Posición amigo ganador: ${idGenerado}`);
    return idGenerado;
}

function borrarUltimoAmigo(){

    //controla si hay amigos cargados
    if (listaAmigos.length > 0){
        //borrar último
        listaAmigos.pop();
        //mostrar listado amigos ingresados
        mostrarAmigos('listaAmigos');
    }else{        
		alert('No hay amigos ingresados');
	}    
	
}

function nuevoSorteo(){
	let limpiaLista = document.getElementById("listaAmigos");
	limpiaLista.innerHTML = "";
    
    let amigoGanador = document.getElementById("resultado");
	amigoGanador.innerHTML = "";

    listaAmigos = []; // nueva instancia;
    listaAmigos.length = 0;
    //document.querySelector('#sortear').setAttribute('disabled','false');
    document.getElementById('sortear').removeAttribute('disabled');
    //document.querySelector('#agrega').setAttribute('disabled','false');
    document.getElementById('agrega').removeAttribute('disabled');
    //document.querySelector('#amigo').setAttribute('disabled','false');
    document.getElementById('amigo').removeAttribute('disabled');
    
}