//variables locales
const switchInterval = 15000;
const bgPath = "./img/background/";

const bgFiles = [
    "blue_whale.jpg", "crab.jpg", "dolphin.jpg", "great_white_shark.jpg", "hammerhead_shark.jpg",
    "octopus.jpg", "orca.jpg", "sailfish.jpg", "sea_turtle.jpg", "tuna.jpg"
];

const bgList = bgFiles.map(bgFile => `url("${bgPath}${bgFile}")`);

//creamos un contenedor que contenga 2 fondos, uno delantero y otro trasero
//ambos fondos se van alternando para producir una transición suave entre imágenes
const bgContainer = document.createElement("div");
const bgFront = document.createElement("div");
const bgBack = document.createElement("div");

let bgCurrentFront = bgFront;
let bgCurrentBack = bgBack;

//función que devuelve una ruta relativa a una imagen aleatoria de entre las disponibles
//la función recibe la ruta de la imagen actual para evitar repetirla
function selectBackgroundImage(currentImage) {
    let copy = bgList;

    if (currentImage !== null) {
        const currentIndex = copy.indexOf(currentImage);

        if (currentIndex !== -1) {
            copy = [...bgList];
            copy.splice(currentIndex, 1);
        }
    }

    if (copy.length === 0)
        return null;

    const randomIndex = Math.floor(Math.random() * copy.length);
    return copy[randomIndex];
}

//función que cambia el background frontal por el trasero y viceversa
function switchBackground() {
    const currentImage = bgCurrentFront.style.backgroundImage;
    const randomImage = selectBackgroundImage(currentImage || null);

    if (randomImage === null)
        return;

    const bgCurrentTemp = bgCurrentFront;

    bgCurrentFront = bgCurrentBack;
    bgCurrentBack = bgCurrentTemp;

    bgCurrentFront.style.backgroundImage = randomImage;

    bgCurrentFront.classList.add("bg-visible");
    bgCurrentBack.classList.remove("bg-visible");
}

//configurar los contenedores
bgContainer.id = "bg-container";

bgContainer.appendChild(bgFront);
bgContainer.appendChild(bgBack);

document.body.appendChild(bgContainer);

//ejecutamos la función de selección de imagen antes de crear el intervalo para no esperar a tener el primer background
switchBackground();

//creamos el intervalo
setInterval(switchBackground, switchInterval);