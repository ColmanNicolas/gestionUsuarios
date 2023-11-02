//dibujo la tabla al recargar la pagina
crearTablaDeElementos("listaUsuarios");

//funcion que captura el evento submit del formulario de usuarios
function manejarImputFormularioDeUsuarios(event) {
  event.preventDefault();
  const correo = document.getElementById("inputEmail");
  const nombre = document.getElementById("inputName");
  const numero = document.getElementById("inputNumber")
  const usuario = {
    nombre: nombre.value,
    correo: correo.value,
    numero: numero.value,
  };
  if (aprobarUsuario(usuario)) {
    ingresarElementoEnArray("listaUsuarios", usuario);
  }
  else {
    alert("No se pudo crear el usuario, revise bien los campos");
  }
  limpiarYenfocarPrimerImput("formularioUsuario", "email");
}

//recibe el nombre de la lista del LS como cadena y recibe un elemento(objeto/cadena)
function ingresarElementoEnArray(listaDeLS, elemento) {
  let elementosArray = obtenerContenidoLS(listaDeLS);
  elementosArray.push(elemento);
  // envio el array completo a la funcion para actualizar LS
  actualizarArrayLS(listaDeLS, elementosArray);
  crearTablaDeElementos(listaDeLS);
}


//recibe el nombre de la lista del LS como cadena y recibe un arreglo de elementos)
function actualizarArrayLS(listaDeLS, elementosArray) {
  localStorage.setItem(listaDeLS, JSON.stringify(elementosArray));
}

//recibe el nombre de la lista de LS y devuelve su contenido
function obtenerContenidoLS(nombreLista) {
  // Ver si hay algo en el LS
  let elementosArray = [];
  const listaDeLS = localStorage.getItem(nombreLista);
  if (listaDeLS) {
    elementosArray = JSON.parse(listaDeLS);
  }
  return elementosArray;
}

//recibe el indice del elemento a borrar y el nombre de la lista del LS para modificar su contenido
function borrarElemento(index, nombreLista) {
  let elementosArray = obtenerContenidoLS(nombreLista);
  elementosArray.splice(index, 1);
  actualizarArrayLS(nombreLista, elementosArray);
  crearTablaDeElementos(nombreLista);
}
// dibujar en la tabla los elementos de la tabla de usuarios
function crearTablaDeElementos(nombreLista) {
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";
  arrayElementos = obtenerContenidoLS(nombreLista);
  arrayElementos.forEach((element, index) => {
    tabla.innerHTML += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${element.nombre}</td>
      <td>${element.correo}</td>
      <td>${element.numero}</td>
      <td class="d-flex justify-content-evenly pe-0 me-0"><button class="btn btn-danger" onclick="borrarElemento(${index}, 'listaUsuarios')">Eliminar</button>
      <button class="btn btn-warning" onclick="dispararModalUsuario(${index}, 'listaUsuarios')">Modificar</button>
     
      </td>  </tr>
    `;
  });
}

// valido el nombre y el numero ingresado 
function aprobarUsuario(usuario) {
  if (usuario.numero < 1000000) {
    //retorno false si el numero ingresadoo no es de  al menos 7 cifras(telefono fijo)
    return false;
  }
  else {
    //el metodo .test retorna true si el nombre ingresado cumple con los caracteres de la expresion regular, de lo contrario retorna false
    return /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ ']+$/.test(usuario.nombre);
  }

}

//el primer parametro sirve para generalizar el reseteo para cualquier formulario enviando su id
//el segundo parametro sirve para hacer focus en el primer elemento, es necesario recibir el tipo de input
function limpiarYenfocarPrimerImput(idElemento, valorImput) {
  document.getElementById(idElemento).reset();
  const primerCampo = document.querySelector('input[type="' + valorImput + '"]');
  primerCampo.focus();
}


//----------------------------funciones para modificar usuario------------------------------------------------------------

function dispararModalUsuario(index, nombreLista) {
  $('#miModal').modal('show');
  let elementosArray = obtenerContenidoLS(nombreLista);
  const campo1 = document.getElementById('campo1');
  const campo2 = document.getElementById('campo2');
  const campo3 = document.getElementById('campo3');

  //estas lineas son para tener los imputs con la informacion y no vacios
  campo1.value = elementosArray[index].correo;
  campo2.value = elementosArray[index].nombre;
  campo3.value = elementosArray[index].numero;

  //guardo el indice dentro de los atributos del boton guardar cambios
  const btnGuardarCambios = document.getElementById('btnGuardarCambios');
  btnGuardarCambios.setAttribute('data-index', index);
}

// Función que captura el evento submit y modifica el array
function realizarModificacion(event) {

  let elementosArray = obtenerContenidoLS("listaUsuarios");
  const index = event.target.getAttribute('data-index');
  const campo1 = document.getElementById('campo1');
  const campo2 = document.getElementById('campo2');
  const campo3 = document.getElementById('campo3');

  //estas lineas son para tener los imputs con la informacion y no vacios
  const elementoModificado = {
    campo1: campo1.value,
    campo2: campo2.value,
    campo3: campo3.value,
  }

  elementosArray[index] = elementoModificado;
  actualizarArrayLS("listaUsuarios", elementosArray);
  crearTablaDeElementos("listaUsuarios");
  $('#miModal').modal('hide');


}
// Asociar la función abrirModal al botón3423423

