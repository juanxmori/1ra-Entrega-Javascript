// Inicializamos las mascotas vacías o las recuperamos del localStorage
let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

// Capturamos el formulario y los elementos para registrar las mascotas
const formMascota = document.getElementById("formMascota");
const nombreInput = document.getElementById("nombreMascota");
const especieInput = document.getElementById("especieMascota");
const edadInput = document.getElementById("edadMascota");
const listaMascotas = document.getElementById("listaMascotas");

// Capturamos los elementos del formulario para asignar servicios
const formServicio = document.getElementById("formServicio");
const nombreBusqueda = document.getElementById("nombreBusqueda");
const selectServicio = document.getElementById("selectServicio");
const mensajeError = document.getElementById("mensajeError"); // Para mostrar mensaje de error

// Mostrar las mascotas en la página
function mostrarMascotas() {
  listaMascotas.innerHTML = ""; // Limpiar antes de mostrar nuevas mascotas
  mascotas.forEach((mascota) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${mascota.nombre}</h5>
          <p class="card-text">
            Especie: ${mascota.especie}<br>
            Edad: ${mascota.edad}<br>
            Servicio: ${mascota.servicio ? mascota.servicio : "Ninguno"}
          </p>
        </div>
      </div>
    `;
    listaMascotas.appendChild(card);
  });
}

// Evento para registrar mascotas
formMascota.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const especie = especieInput.value.trim();
  const edad = parseInt(edadInput.value);

  if (!nombre || !especie || !edad) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Creamos la nueva mascota y la añadimos al array
  const nuevaMascota = {
    nombre: nombre,
    especie: especie,
    edad: edad,
    servicio: null,
  };

  // Guardamos la mascota en el array y actualizamos el localStorage
  mascotas.push(nuevaMascota);
  localStorage.setItem("mascotas", JSON.stringify(mascotas));

  // Mostramos las mascotas nuevamente
  mostrarMascotas();

  // Limpiamos el formulario
  formMascota.reset();
});

// Evento para asignar servicio a una mascota
formServicio.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreMascotaBuscada = nombreBusqueda.value.trim().toLowerCase();
  const servicioSeleccionado = selectServicio.value;

  // Buscamos la mascota por nombre
  const mascotaEncontrada = mascotas.find(
    (mascota) => mascota.nombre.toLowerCase() === nombreMascotaBuscada
  );

  if (mascotaEncontrada) {
    // Asignamos el servicio a la mascota
    mascotaEncontrada.servicio = servicioSeleccionado;

    // Guardamos los cambios en localStorage
    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    // Mostramos las mascotas nuevamente
    mostrarMascotas();

    // Limpiamos el formulario
    formServicio.reset();
    mensajeError.innerHTML = ""; // Limpiamos mensaje de error
  } else {
    // Mostramos el mensaje de error en el DOM
    mensajeError.innerHTML = `<div class="alert alert-danger" role="alert">Mascota no encontrada. Verifica el nombre.</div>`;
  }
});

// Llamamos a mostrarMascotas para cargar las que ya estaban guardadas
mostrarMascotas();
