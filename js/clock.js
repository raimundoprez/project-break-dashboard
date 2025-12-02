//variables locales
const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
});

const phrases = {
    midnight: "Ya es muy tarde, dulces sueños.",
    morning: "Despégate de la cama, desayuna y a programar.",
    noon: "Llegamos al ecuador del día, es hora de darlo todo.",
    earlyAfternoon: "Con el estómago lleno, toca seguir trabajando.",
    lateAfternoon: "¿Apetece un té?",
    evening: "La jornada llega a su fin, buen trabajo hoy.",
    night: "Buenas noches, a cenar y prepararse para mañana."
};

//devuelve el total de minutos transcurridos en el día dada una hora y sus minutos
function tm(hours, minutes) {
    return hours * 60 + minutes;
}

//devuelve si una hora y sus minutos están en el intervalo que forman otras dos horas
function inRange(h0, m0, h1, m1, h2, m2) {
    const t0 = tm(h0, m0);
    const t1 = tm(h1, m1);
    const t2 = tm(h2, m2);

    return t0 >= t1 && t0 <= t2;
}

export function setup(self, parent) {
    self.innerHTML = `
        <div id="clock-container" class="box">
            <span id="clock-time"></span>
            <span id="clock-date"></span>
            <span id="clock-phrase"></span>
        </div>
    `;

    //añadir elemento al padre
    parent.appendChild(self);

    //obtener los elementos a los que añadir funcionalidades del DOM
    const clockTime = document.getElementById("clock-time");
    const clockDate = document.getElementById("clock-date");
    const clockPhrase = document.getElementById("clock-phrase");

    //añadimos un callback que se repite cada 1 segundo para actualizar los campos
    const getTime = () => {
        const now = new Date();
        const string = formatter.format(now);
        const array = string.split(", ", 2);

        const time = array[1];
        const date = array[0];

        //con estos condicionales evitamos actualizar la fecha si no cambia y así podemos hacer copy-paste de los campos más fácilmente
        if (clockTime.innerText !== time)
            clockTime.innerText = time;

        if (clockDate.innerText !== date)
            clockDate.innerText = date;

        //ver en qué parte del día estamos y actualizar el campo de la frase en consecuencia
        const h = now.getHours();
        const m = now.getMinutes();

        let phrase;

        if (inRange(h, m, 0, 1, 7, 0))
            phrase = phrases.midnight;
        else if (inRange(h, m, 7, 1, 12, 0))
            phrase = phrases.morning;
        else if (inRange(h, m, 12, 1, 14, 0))
            phrase = phrases.noon;
        else if (inRange(h, m, 14, 1, 16, 0))
            phrase = phrases.earlyAfternoon;
        else if (inRange(h, m, 16, 1, 18, 0))
            phrase = phrases.lateAfternoon;
        else if (inRange(h, m, 18, 1, 22, 0))
            phrase = phrases.evening;
        else
            phrase = phrases.night;

        if (clockPhrase.innerText !== phrase)
            clockPhrase.innerText = phrase;
    };

    //llamamos al callback para que el panel no esté vacío el primer segundo
    getTime();
    setInterval(getTime, 1000);
}