let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

const formMascota = document.getElementById("formMascota");
const nombreInput = document.getElementById("nombreMascota");
const especieInput = document.getElementById("especieMascota");
const edadInput = document.getElementById("edadMascota");
const listaMascotas = document.getElementById("listaMascotas");

const formServicio = document.getElementById("formServicio");
const nombreBusqueda = document.getElementById("nombreBusqueda");
const selectServicio = document.getElementById("selectServicio");
const mensajeError = document.getElementById("mensajeError");

function mostrarMascotas() {
  listaMascotas.innerHTML = "";
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

formMascota.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const especie = especieInput.value.trim();
  const edad = parseInt(edadInput.value);

  if (!nombre || !especie || !edad) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevaMascota = {
    nombre: nombre,
    especie: especie,
    edad: edad,
    servicio: null,
  };

  mascotas.push(nuevaMascota);
  localStorage.setItem("mascotas", JSON.stringify(mascotas));

  mostrarMascotas();

  formMascota.reset();
});

formServicio.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombreMascotaBuscada = nombreBusqueda.value.trim().toLowerCase();
  const servicioSeleccionado = selectServicio.value;

  const mascotaEncontrada = mascotas.find(
    (mascota) => mascota.nombre.toLowerCase() === nombreMascotaBuscada
  );

  if (mascotaEncontrada) {
    mascotaEncontrada.servicio = servicioSeleccionado;

    localStorage.setItem("mascotas", JSON.stringify(mascotas));

    mostrarMascotas();

    formServicio.reset();
    mensajeError.innerHTML = "";
  } else {
    mensajeError.innerHTML = `<div class="alert alert-danger" role="alert">Mascota no encontrada. Verifica el nombre.</div>`;
  }
});

mostrarMascotas();
