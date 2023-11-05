
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
      return null;  // codigo 999 predeterminado para no imprimir lista
      break;
  }
}
function IDimportantes(codigo) { //formularios , tablas, botones
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
    ingresarElementoEnArray(usuario, codigosLocalStorage(0), 0);
  }
  else {
    alert("No se pudo realizar la acción, revise bien los campos");
  }
  limpiarYenfocarPrimerImput(IDimportantes(0), "email");
}

//bien
function ingresarElementoEnArray(elemento, listaLS, codigoPintarTabla) {
  let elementosArray = obtenerContenidoLS(listaLS); //registro siempre en listaRegistro
  elementosArray.push(elemento);
  actualizarArrayLS(elementosArray, listaLS, codigoPintarTabla);

}
//bien
function actualizarArrayLS(elementosArray, listaLS, codigoPintarTabla) {
  localStorage.setItem(listaLS, JSON.stringify(elementosArray));
  capturarTabla(IDimportantes(2), listaLS, codigoPintarTabla);
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
//parece bien, debe funcionar en dos listas (diferenciar caso borrado en lista propia y en lista ajena)
function borrarElemento(index, listaLS, codigoPintarTabla) {
  let elementosArray = obtenerContenidoLS(listaLS);
  if (codigoPintarTabla === 1) {
    ingresarElementoEnArray(elementosArray[index], codigosLocalStorage(2), 999); //solo si borro usuario dado de alta
  }
  elementosArray.splice(index, 1);
  actualizarArrayLS(elementosArray, listaLS, codigoPintarTabla);
  capturarTabla(IDimportantes(2), listaLS, codigoPintarTabla);
}

function capturarTabla(IDelemento, listaLS, codigoPintarTabla) {
  const tabla = document.getElementById(IDelemento);
  tabla.innerHTML = "";
  pintarTablaDeElementos(tabla, listaLS, codigoPintarTabla);
}
function pintarTablaDeElementos(tabla, listaLS, codigoPintarTabla) {
  const arrayElementos = obtenerContenidoLS(listaLS);
  arrayElementos.forEach((element, index) => {
    switch (codigoPintarTabla) {
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
        <button class="btn btn-danger" onclick="borrarElemento(${index},'${codigosLocalStorage(0)}',0)">Eliminar</button>
        <button class="btn btn-warning" onclick="dispararModalUsuario(${index},'${listaLS}')">Modificar</button>
        <button class="btn btn-success" onclick="darAltaUsuario(${index},'${codigosLocalStorage(0)}',0)">Alta</button>
     
        </td>
    </tr>
    `;
        break;
      case 1: //tabla de usuarios en alta
        tabla.innerHTML += `
      <tr>
        <th  scope="row">${index + 1}</th>
           <td class=""> <span class="">${element.nombre}</span> </td>
           <td class="  align-items-center"> <span>${element.correo}</span>
       </td>
       
       <td>
       <span class="element-span">${element.numero}</span>
       </td>
          <td class="">
          <div class="text-center">
          <button class="btn btn-danger" onclick="borrarElemento(${index},'${codigosLocalStorage(1)}',1)">Eliminar</button>
          </div>
          </td>
      </tr>
      `;
        break;
      case 2:
        tabla.innerHTML += `
      <tr>
        <th  scope="row">${index + 1}</th>
           <td class=""> <span class="">${element.nombre}</span> </td>
           <td class=""> <span>${element.correo}</span>
       </td>
       
       <td>
       <span class="element-span">${element.numero}</span>
       </td>
          <td class="">
           <div class="text-center">
          <button class="btn btn-warning" onclick="RestaurarElemento(${index},'${codigosLocalStorage(2)}',2)" >Restaurar</button>
          </div>
          </td>
      </tr>
      `;
        break;
      case 999:
        break;
      default:
        console.log("no esta bien puesto el codigo de la tabla");
        break;
    }
  });
}
function pintarTituloTabla(etiqueta,codigoTitulos){
    etiqueta.innerHTML="";
    switch(codigoTitulos){
      case 0:
      etiqueta.innerHTML+=` 
     <th scope="col">#</th>
      <th scope="col">Nombre Completo </th>
     <th scope="col" ><span>Correo Electronico</span><span class="mx-5"></span><span id="spanValidacionCorreo">Validado</span></th>
     <th scope="col"><span>Telefono</span><span class="mx-3"></span><span id="spanValidacionNumero">Validado</span></th>
     <th class="text-center" scope="col">Acciones</th>
    `;
    break;
    case 1:
      etiqueta.innerHTML+=` 
      <th scope="col">#</th>
       <th scope="col">Nombre Completo </th>
      <th scope="col" ><span>Correo Electronico</span><span class="mx-5"></span></th>
      <th scope="col"><span>Telefono</span><span class="mx-3"></span></th>
      <th class="text-center" scope="col">Acciones</th>
     `;
     break;
  }
}
function RestaurarElemento(index, listaLS, codigoPintarTabla) {
  let elementosArray = obtenerContenidoLS(listaLS);
  ingresarElementoEnArray(elementosArray[index], codigosLocalStorage(1), 999);
  console.log("Usuario:", elementosArray[index].nombre, " Restaurado con exito");
  borrarElemento(index, listaLS, codigoPintarTabla);
}
function darAltaUsuario(index, listaLS, codigoPintarTabla) {
  let arrayElementos = obtenerContenidoLS(listaLS);
  let usuario = arrayElementos[index];
  if (aprobarAltaUsuario(usuario)) {
    ingresarElementoEnArray(usuario, codigosLocalStorage(1), 100);//puede mejorar, se envia 100 para no imprimir nada y en la siguiente funcion se corrige con la tabla Alta
    borrarElemento(index, listaLS, codigoPintarTabla);
  }
}
function aprobarAltaUsuario(usuario) {
  if (usuario.validacionCorreo === true && usuario.validacionNumero === true) {
    return true;
  } else {
    alert("No puede darse el alta sin Validar Correo y Numero");
    return false;
  }
}
function pintarFormularioRegistro(parametro) {
  parametro.innerHTML = "";
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
  actualizarArrayLS(elementosArray, codigosLocalStorage(0), 0);
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
function removerEtiqueta(parametro) {
  if (parametro) {
    parametro.remove();
  }
}


//----------------------------funciones para modificar usuario------------------------------------------------------------



function dispararModalUsuario(index, nombreLista) {
  $('#miModal').modal('show');
  let elementosArray = obtenerContenidoLS(nombreLista);
  const campo1 = document.getElementById('campo1');
  const campo2 = document.getElementById('campo2');
  const campo3 = document.getElementById('campo3');

  //recupero la informacion para mostrar en los imputs
  campo1.value = elementosArray[index].nombre;
  campo2.value = elementosArray[index].correo;
  campo3.value = elementosArray[index].numero;

  //guardo el indice dentro de los atributos del boton guardar cambios
  const boton = document.getElementById("btnGuardarCambios");
  boton.setAttribute('data-index', index);

}
function cerrarModalUsuario(){
  $('#miModal').modal('hide');

}

// Función que captura el evento submit y modifica el array
function formularioModificacionUsuario(event) {
  event.preventDefault();

  const boton = document.getElementById("btnGuardarCambios");
  let index = boton.getAttribute('data-index');

  let elementosArray = obtenerContenidoLS(codigosLocalStorage(0));
  const campo1 = document.getElementById('campo1');
  const campo2 = document.getElementById('campo2');
  const campo3 = document.getElementById('campo3');

  //estas lineas son para tener los imputs con la informacion y no vacios
  const elementoModificado = {
    nombre: campo1.value,
    correo: campo2.value,
    numero: campo3.value,
    validacionCorreo: elementosArray[index].validacionCorreo,
    validacionNumero: elementosArray[index].validacionNumero,
  }
  if (aprobarIngresoUsuario(elementoModificado)) {
    elementosArray[index] = elementoModificado;
    actualizarArrayLS(elementosArray, codigosLocalStorage(0), 0);
    pintarTablaDeElementos(IDimportantes(2), codigosLocalStorage(0), 0);
    $('#miModal').modal('hide');
  } else {
    alert("No se pudo realizar la acción, algun campo tiene informacion invalida");
  }
}

//---------------------------------COSAS FUERA DE FUNCIONES------------------------------------

const botonUsuariosRegistrados = document.getElementById(IDimportantes(4));
const botonUsuariosAlta = document.getElementById(IDimportantes(5));
const botonUsuariosBorrados = document.getElementById(IDimportantes(6));
const titulosTablaTr =document.getElementById("titulosTablaTr");

botonUsuariosRegistrados.addEventListener("click", () => {
  pintarFormularioRegistro(document.getElementById(IDimportantes(7)));
  pintarTituloTabla(titulosTablaTr,0);
  capturarTabla(IDimportantes(2), codigosLocalStorage(0), 0);
});
botonUsuariosAlta.addEventListener("click", () => {
  removerEtiqueta(document.getElementById(IDimportantes(0)));   //quitar formulario
  pintarTituloTabla(titulosTablaTr,1);
  capturarTabla(IDimportantes(2), codigosLocalStorage(1), 1);
});
botonUsuariosBorrados.addEventListener("click", () => {
  removerEtiqueta(document.getElementById(IDimportantes(0))); //quitar formulario
  pintarTituloTabla(titulosTablaTr,1);
  capturarTabla(IDimportantes(2), codigosLocalStorage(2), 2);
});