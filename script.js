// ====================================
// FECHA DEL EVENTO
// ====================================

// Guatemala utiliza la zona horaria UTC-6.
const EVENT_DATE = "2026-11-14T18:00:00-06:00";


// ====================================
// ELEMENTOS PRINCIPALES
// ====================================

const cover = document.getElementById("cover");
const openButton = document.getElementById("openInvitation");

const audio = document.getElementById("musica");
const musicButton = document.getElementById("musicBtn");


// ====================================
// CONTROL DEL BOTÓN DE MÚSICA
// ====================================

function setMusicState(playing) {

  musicButton.classList.toggle(
    "playing",
    playing
  );

  musicButton.setAttribute(
    "aria-pressed",
    String(playing)
  );

  musicButton.setAttribute(
    "aria-label",
    playing
      ? "Pausar música"
      : "Reproducir música"
  );

}


// ====================================
// REPRODUCIR O PAUSAR LA MÚSICA
// ====================================

async function toggleMusic() {

  try {

    if (audio.paused) {

      await audio.play();

      setMusicState(true);

    } else {

      audio.pause();

      setMusicState(false);

    }

  } catch (error) {

    setMusicState(false);

    console.log(
      "El navegador bloqueó la reproducción automática."
    );

  }

}


// ====================================
// ABRIR LA INVITACIÓN
// ====================================

openButton.addEventListener("click", async () => {

  cover.classList.add("open");

  document.body.classList.remove("locked");

  // La música comienza después del toque del usuario.
  await toggleMusic();

  setTimeout(() => {

    cover.remove();

  }, 1100);

});


// ====================================
// BOTÓN FLOTANTE DE MÚSICA
// ====================================

musicButton.addEventListener(
  "click",
  toggleMusic
);


// Mantener sincronizada la animación del botón.

audio.addEventListener("play", () => {

  setMusicState(true);

});


audio.addEventListener("pause", () => {

  setMusicState(false);

});


audio.addEventListener("ended", () => {

  setMusicState(false);

});


// ====================================
// CUENTA REGRESIVA
// ====================================

// Fecha: 14 de noviembre de 2026, 6:00 p. m.
// Zona horaria de Guatemala: UTC-6
const fechaEvento = new Date(
  "2026-11-14T18:00:00-06:00"
).getTime();

const diasElemento =
  document.getElementById("dias");

const horasElemento =
  document.getElementById("horas");

const minutosElemento =
  document.getElementById("minutos");

const segundosElemento =
  document.getElementById("segundos");

const estadoEvento =
  document.getElementById("eventStatus");


function agregarCero(numero) {
  return String(numero).padStart(2, "0");
}


function actualizarCuentaRegresiva() {

  const ahora = Date.now();

  const diferencia =
    fechaEvento - ahora;


  // Si ya llegó la fecha del evento

  if (diferencia <= 0) {

    diasElemento.textContent = "00";
    horasElemento.textContent = "00";
    minutosElemento.textContent = "00";
    segundosElemento.textContent = "00";

    if (estadoEvento) {
      estadoEvento.textContent =
        "¡El gran día ha llegado! 🎓";
    }

    return;
  }


  // Cálculos

  const dias = Math.floor(
    diferencia / (1000 * 60 * 60 * 24)
  );

  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutos = Math.floor(
    (diferencia % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const segundos = Math.floor(
    (diferencia % (1000 * 60))
    / 1000
  );


  // Mostrar números

  diasElemento.textContent =
    agregarCero(dias);

  horasElemento.textContent =
    agregarCero(horas);

  minutosElemento.textContent =
    agregarCero(minutos);

  segundosElemento.textContent =
    agregarCero(segundos);
}


// Ejecutar inmediatamente

actualizarCuentaRegresiva();


// Actualizar cada segundo

setInterval(
  actualizarCuentaRegresiva,
  1000
);


// ====================================
// ANIMACIONES AL HACER SCROLL
// ====================================

const animatedElements =
  document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add(
          "visible"
        );

        observer.unobserve(
          entry.target
        );

      }

    });

  },

  {
    threshold: 0.16
  }

);


animatedElements.forEach((element) => {

  observer.observe(element);

});
