
//nombres de lista del Local Storage

function codigosLocalStorage(codigo) {
  const claveRegistroUsuario = "listaRegisto";
  const claveAltaUsuario = "listaAlta";
  const claveborradoUsuario = "listaBorrado";

  switch (codigo) {
    case 0:
      return claveRegistroUsuario;
      break;
    case 1:
      return claveAltaUsuario;
      break;
    case 2:
      return claveborradoUsuario;
      break;
    default:
      return null;
      break;
  }
}
function IDimportantes(codigo) { //formularios y tablas
  switch (codigo) {
    case 0:
      return "formularioRegistroUsuario";
      break;
    case 1:
      return "formularioModificacionUsuario";
      break;
    case 2:
      return "tablaUsuarios";
      break;
    case 3:
      return "miModal";
      break;
    case 4:
      return "botonUsuariosRegistrados";
      break;
    case 5:
      return "botonUsuariosAlta";
      break;
    case 6:
      return "botonUsuariosborrados";
      break;
    case 7:
      return "contenedorFormularioRegistro";
      break;
    default:
      return null;
      break;
  }
}


function manejarFormularioUsuario(event) {
  event.preventDefault();
  const correo = document.getElementById("inputEmail");
  const nombre = document.getElementById("inputName");
  const numero = document.getElementById("inputNumber")
  const usuario = {
    nombre: nombre.value,
    correo: correo.value,
    validacionCorreo: false,
    numero: numero.value,
    validacionNumero: false,
  };
  if (aprobarIngresoUsuario(usuario)) {
    ingresarElementoEnArray(usuario, codigosLocalStorage(0));
  }
  else {
    alert("No se pudo crear el usuario, revise bien los campos");
  }
  limpiarYenfocarPrimerImput(IDimportantes(0), "email");
}

//bien
function ingresarElementoEnArray(elemento, listaLS) {
  //console.log("ingres a la fucnion con los parametros: ",elemento,"espacioo:  ",listaLS)
  let elementosArray = obtenerContenidoLS(listaLS); //registro siempre en listaRegistro
  elementosArray.push(elemento);
  actualizarArrayLS(elementosArray, listaLS);

}
//bien
function actualizarArrayLS(elementosArray, listaLS) {
  localStorage.setItem(listaLS, JSON.stringify(elementosArray));
  capturarTabla(IDimportantes(2), listaLS);
}

//parece bien
function obtenerContenidoLS(listaLS) {
  let devuelvoArray = [];
  const arrayLocalStorage = localStorage.getItem(listaLS);
  if (arrayLocalStorage) {

    devuelvoArray = JSON.parse(arrayLocalStorage);
  }
  return devuelvoArray;
}
//parece bien, debe funcionar en dos listas
function borrarElemento(index, listaLS) {
  console.log("en borrar obtengo: ", index, "luego: ", listaLS);
  let elementosArray = obtenerContenidoLS(listaLS);
  elementosArray.splice(index, 1);
  actualizarArrayLS(elementosArray, listaLS,);
  capturarTabla(IDimportantes(2), listaLS);
}

function capturarTabla(IDelemento, listaLS,codigoTabla) {
  const tabla = document.getElementById(IDelemento);
  tabla.innerHTML = "";
  pintarTablaDeElementos(tabla, listaLS,codigoTabla);
}
function pintarTablaDeElementos(tabla, listaLS,codigoTabla) {
  const arrayElementos = obtenerContenidoLS(listaLS);
  arrayElementos.forEach((element, index) => {
    switch(codigoTabla){
      case 0:         //tabla de usuarios Registrados
    tabla.innerHTML += `
    <tr>
      <th  scope="row">${index + 1}</th>
         <td class=""> <span class="">${element.nombre}</span> </td>
         <td class=" d-flex align-items-center"> <span>${element.correo}</span>
         <span>
         <form class="btn-group">
         <input type="radio" class="btn-check"  name="options-outlined${index}" id="botonNoCorreo${index}" autocomplete="off" checked>
         <label class="btn btn-outline-danger" onclick="controladorBotonVerificar('botonNoCorreo:${index}')" for="botonNoCorreo${index}">No</label>
         <input type="radio" class="btn-check" name="options-outlined${index}" id="botonSiCorreo${index}" autocomplete="off">
         <label class="btn btn-outline-success" onclick="controladorBotonVerificar('botonSiCorreo:${index}')" for="botonSiCorreo${index}">Si</label>
     </form>     
         </span>
     </td>
     
     <td>
     <span class="element-span">${element.numero}</span>
     <span>
         <form class="btn-group">
             <input type="radio" class="btn-check"  name="options-outlined${index}" id="botonNoNumero${index}" autocomplete="off" checked>
             <label class="btn btn-outline-danger" onclick="controladorBotonVerificar('botonNoNumero:${index}')" for="botonNoNumero${index}">No</label>
             <input type="radio" class="btn-check" name="options-outlined${index}" id="botonSiNumero${index}" autocomplete="off">
             <label class="btn btn-outline-success" onclick="controladorBotonVerificar('botonSiNumero:${index}')" for="botonSiNumero${index}">Si</label>
         </form>
     </span>
 </td>
        <td class="d-flex justify-content-evenly pe-0 me-0 ">
        <button class="btn btn-danger" onclick="borrarElemento(${index},'${codigosLocalStorage(0)}')">Eliminar</button>
        <button class="btn btn-warning" onclick="dispararModalUsuario(${index},'${listaLS}')">Modificar</button>
        <button class="btn btn-success" >Alta</button>
     
        </td>
    </tr>
    `;    
    break;
    case 1: //tabla de usuarios en alta
      tabla.innerHTML += `
      <tr>
        <th  scope="row">${index + 1}</th>
           <td class=""> <span class="">${element.nombre}</span> </td>
           <td class=" d-flex align-items-center"> <span>${element.correo}</span>
       </td>
       
       <td>
       <span class="element-span">${element.numero}</span>
       </td>
          <td class="d-flex justify-content-evenly pe-0 me-0 ">
          <button class="btn btn-danger" onclick="borrarElemento(${index},'${codigosLocalStorage(0)}')">Eliminar</button>
          </td>
      </tr>
      `;    
      break;
    case 2:
      tabla.innerHTML += `
      <tr>
        <th  scope="row">${index + 1}</th>
           <td class=""> <span class="">${element.nombre}</span> </td>
           <td class=" d-flex align-items-center"> <span>${element.correo}</span>
       </td>
       
       <td>
       <span class="element-span">${element.numero}</span>
       </td>
          <td class="d-flex justify-content-evenly pe-0 me-0 ">
          <button class="btn btn-danger" onclick="borrarElemento(${index},'${codigosLocalStorage(0)}')" disabled>Eliminar</button>
          </td>
      </tr>
      `;    
      break;
    default:
      alert("no esta puesto el codigo de la tabla");
    break;  
    }
  });
}
function pintarFormularioRegistro(parametro){
  parametro.innerHTML=""; 
  parametro.innerHTML += `
  <form id="formularioRegistroUsuario" onsubmit="manejarFormularioUsuario(event)">
  <div class="mb-3">
    <label for="inputEmail" class="form-label">Correo Electronico</label>
    <input type="email" class="form-control" id="inputEmail" name="email" autocomplete="email" required />
  </div>

  <div class="mb-3">
    <label for="inputName" class="form-label">Nombre Completo</label>
    <input type="text" class="form-control" id="inputName" name="name" autocomplete="name" required />
  </div>
  <div class="mb-3">
    <label for="inputNumber" class="form-label">Numero de telefono</label>
    <input type="number" class="form-control" id="inputNumber" name="number" autocomplete="tel-local"required />
  </div>
  <button type="submit" class="btn btn-primary">Enviar</button>
  
</form>
  `;
}
function controladorBotonVerificar(id) {
  let [nombreBoton, index] = id.split(":"); //obtengo nombre del boton e ID
  let validacionSiNo = nombreBoton.substring(5, 7); // Obtenemos "No" o "Si" directamente de 'nombreBoton'
  let identificadorAtributo = nombreBoton.substring(7);
  const boton = document.getElementById(id);
  let elementosArray = obtenerContenidoLS(codigosLocalStorage(0));
  let variableAuxiliar;

  // Obtener el otro botón (Si o No) y su ID
  //  const otroBotonId = validacionSiNo === 'Si' ? `botonNoCorreo:${index}` : `botonSiCorreo:${index}`;
  //  const otroBoton = document.getElementById(otroBotonId);

  if (identificadorAtributo === 'Correo') {
    variableAuxiliar = elementosArray[index].validacionCorreo;
  } else if (identificadorAtributo === 'Numero') {
    variableAuxiliar = elementosArray[index].validacionNumero;
  }

  if (validacionSiNo === 'No') {
    if (variableAuxiliar === true) {
      variableAuxiliar = false;
    }
  }
  if (validacionSiNo === 'Si') {
    if (variableAuxiliar === false) {
      variableAuxiliar = true;
    }
  }
  if (identificadorAtributo === 'Correo') {
    elementosArray[index].validacionCorreo = variableAuxiliar;
  } else if (identificadorAtributo === 'Numero') {
    elementosArray[index].validacionNumero = variableAuxiliar;
  }
  // Cambiar el estado del otro botón (desmarcarlo)
  // const otroValidacionSiNo = validacionSiNo === 'Si' ? 'No' : 'Si';
  // const otroIdentificadorAtributo = `validacion${nombreBoton.substring(7)}`;
  /* 
   if (otroIdentificadorAtributo === 'Correo') {
     elementosArray[index].validacionCorreo = variableAuxiliar;
     elementosArray[index].validacionNumero = !variableAuxiliar;
   } else if (otroIdentificadorAtributo === 'Numero') {
     elementosArray[index].validacionNumero = variableAuxiliar;
     elementosArray[index].validacionCorreo = !variableAuxiliar;
   }
   
  
     boton.checked = true;
    otroBoton.checked = false;*/
  actualizarArrayLS(elementosArray, codigosLocalStorage(0));
}


//ta bien
function aprobarIngresoUsuario(usuario) {
  if (usuario.numero < 1000000) {
    return false;
  }
  else {
    return /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ ']+$/.test(usuario.nombre);
  }

}
//ta bien
function limpiarYenfocarPrimerImput(idElemento, valorImput) {
  document.getElementById(idElemento).reset();
  const primerCampo = document.querySelector('input[type="' + valorImput + '"]');
  primerCampo.focus();
}
function removerEtiqueta(parametro){
  if (parametro) {
  parametro.remove();
  }
}


//----------------------------funciones para modificar usuario------------------------------------------------------------

//se activa con el click en el boton modificar
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
//------------------COSAS FUERA DEL FUNCIONES----------------------------
//dibujo la tabla al recargar la pagina
const botonUsuariosRegistrados = document.getElementById(IDimportantes(4));
const botonUsuariosAlta = document.getElementById(IDimportantes(5));
const botonUsuariosBorrados = document.getElementById(IDimportantes(6));

botonUsuariosRegistrados.addEventListener("click", () => {
  pintarFormularioRegistro(document.getElementById(IDimportantes(7)));
  capturarTabla(IDimportantes(2), codigosLocalStorage(0),0);

});
botonUsuariosAlta.addEventListener("click", () => {
  removerEtiqueta(document.getElementById(IDimportantes(0)));
  capturarTabla(IDimportantes(2), codigosLocalStorage(1),1);
});
botonUsuariosBorrados.addEventListener("click", () => {
  removerEtiqueta(document.getElementById(IDimportantes(0)));
  capturarTabla(IDimportantes(2), codigosLocalStorage(2),2);
});