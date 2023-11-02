
function manejarImputFormularioDeUsuarios(event) {
  event.preventDefault();
  const correo = document.getElementById("inputEmail");
  const nombre = document.getElementById("inputName");
  const usuario = {
    nombre: nombre.value,
    correo: correo.value,
  };

  ingresarElementoEnArray("listaUsuarios",usuario);
nombre.value="";
correo.value="";
correo.focus();
}

function ingresarElementoEnArray(listaDeLS,elemento){
console.log("aca llega el elemento:" ,elemento);
 let elementosArray = obtenerContenidoLS(listaDeLS);
 console.log(elemento);
  elementosArray.push(elemento);
  // envio el array completo a la funcion para actualizar LS
  actualizarArrayLS(listaDeLS,elementosArray);
  crearTablaDeElementos(listaDeLS);
}


//ya esta
function actualizarArrayLS(listaDeLS,elementosArray){
    localStorage.setItem(listaDeLS, JSON.stringify(elementosArray));
}

function obtenerContenidoLS(nombreLista) {
  // Ver si hay algo en el LS
  let elementosArray = [];
  const listaDeLS = localStorage.getItem(nombreLista);
  if (listaDeLS) {
    elementosArray = JSON.parse(listaDeLS);
  }
  return elementosArray;
}

function borrarElemento(index,nombreLista) {
  let elementosArray = obtenerContenidoLS(nombreLista);
  elementosArray.splice(index, 1);
  actualizarArrayLS(nombreLista,elementosArray);
  crearTablaDeElementos(nombreLista);
}
  // dibujar en en Table sus elementos
function  crearTablaDeElementos (nombreLista){
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";
  arrayElementos = obtenerContenidoLS(nombreLista);
  arrayElementos.forEach((element, index) => {
    tabla.innerHTML += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${element.nombre}</td>
      <td>${element.correo}</td>
      <td><button class="btn btn-danger" onclick="borrarElemento(${index}, 'listaUsuarios')">Eliminar</button></td>  </tr>
    `;
  });
}

crearTablaDeElementos("listaUsuarios");
