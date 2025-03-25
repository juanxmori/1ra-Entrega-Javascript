//Tarea Principal: entradas de datos, procesamiento de datos y mostrar los resultado de salida de los mismos.

// Array para almacenar mascotas registradas
let mascotas = ["perro", "gato", "hamster", "tortuga", "conejo"];

// Array con los servicios ofrecidos
const servicios = [
  "clinica integral",
  "internacion",
  "laboratorio",
  "cirugias",
  "domicilios",
  "plan sanitario",
  "alimento",
  "farmacia",
];

// Función para registrar una mascota
function registrarMascota() {
  let nombre = prompt("Ingrese el nombre de la mascota:");
  let especie = prompt("Ingrese la especie de la mascota (perro, gato, etc.):");
  let edad = parseInt(prompt("Ingrese la edad de la mascota:"));

  let nuevaMascota = {
    nombre: nombre,
    especie: especie,
    edad: edad,
  };

  mascotas.push(nuevaMascota);
  console.log(`Mascota registrada: ${nombre}, ${especie}, ${edad} años.`);
}

//Funcion para mostrar los servicios disponibles
function mostrarServicios() {
  console.log("Servicios Disponibles:");
  for (let i = 0; i < servicios.length; i++) {
    console.log(`${i + 1}. ${servicios[i]}`);
  }
}

//Funcion para calcular si aplica a un descuento
function calcularDescuento(edad) {
  if (edad < 2 || edad > 10) {
    return 10; //10% de descuento
  }
  return 0; //Sin descuento
}

// Función para elegir un servicio
function elegirServicio() {
  mostrarServicios();
  let opcion = parseInt(prompt("Ingrese el número del servicio que desea:"));

  if (opcion >= 1 && opcion <= servicios.length) {
    let mascotaNombre = prompt("Ingrese el nombre de la mascota:");

    if (mascotas.length === 0) {
      console.log(
        "No hay mascotas registradas. Registre una antes de elegir un servicio."
      );
      return;
    }

    if (mascotaNombre) {
      let mascota = mascotas.find(
        (m) =>
          m.nombre && m.nombre.toLowerCase() === mascotaNombre.toLowerCase()
      );

      if (mascota) {
        let descuento = calcularDescuento(mascota.edad);
        console.log(
          `Has elegido el servicio de ${servicios[opcion - 1]} para ${
            mascota.nombre
          }.`
        );
        if (descuento > 0) {
          console.log(
            `¡Se aplica un descuento del ${descuento}% por la edad de la mascota!`
          );
        }
      } else {
        console.log(
          "Mascota no encontrada. Registrala antes de elegir un servicio."
        );
      }
    } else {
      console.log("Debe ingresar un nombre válido.");
    }
  } else {
    console.log("Opción no válida.");
  }
}

registrarMascota();
elegirServicio();
