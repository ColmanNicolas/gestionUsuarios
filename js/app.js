let usuarios = [];

function manejarFormulario(event) {
  event.preventDefault();

  const correo = document.getElementById("inputEmail");
  const nombre = document.getElementById("inputName");

  // aca quiero agregar un elemento al array
  const usuario = {
    nombre: nombre.value,
    correo: correo.value,
  };

  // agrego un elemento al array
  usuarios.push(usuario);

  // guardo el array completo dentro del LS
  localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
  cargarLS();
  nombre.value = "";
  correo.value = "";
  correo.focus();
}

function borrarUsuario(index) {
  console.log("Hiciste un click en el boton Eliminar", index);
  usuarios.splice(index, 1);
  localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
  cargarLS();
}

function cargarLS() {
  // ver si hay algo en el LS
  const listaUsuarios = localStorage.getItem("listaUsuarios");
  if (listaUsuarios) {
    usuarios = JSON.parse(listaUsuarios);
  } else {
    usuarios = [];
  }
  // dibujar en en Table sus elementos
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";

  usuarios.forEach((element, index) => {
    tabla.innerHTML += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${element.nombre}</td>
      <td>${element.correo}</td>
      <td><button class="btn btn-danger" onclick="borrarUsuario(${index})">Eliminar</button></td>
    </tr>
    `;
  });
}

cargarLS();
