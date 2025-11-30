//variables locales
const minCharacters = 12;
const maxCharacters = 50;

const characterSets = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "!@#$%^&*()-_=+"
];

//crear el HTML completo
const passSection = document.createElement("section");

passSection.innerHTML = `
    <h2>Crea tu contraseña segura</h2>
    <img class="title-icon" src="./img/icons/padlock.png" alt="Un icono de un candado">

    <div id="password-generator" class="section-content box">
        <label for="password-bounds">Número de caracteres de la contraseña</label>

        <div>
            <input id="password-bounds" type="number"
                min="${minCharacters}" max="${maxCharacters}" placeholder="${minCharacters}">
            <button id="password-button">Generar Contraseña</button>
        </div>

        <div id="password-container">
            <span class="paragraph-with-icon">Contraseña Generada</span>
            <img id="password-clipboard" class="paragraph-icon"
                src="./img/icons/clipboard.png" alt="Una imagen de un portapapeles">
            <span id="password-generated"></span>
        </div>
    </div>
`;

passSection.classList.add("centered-panel");

//añadir el HTML al DOM
document.body.appendChild(passSection);

//obtener los elementos a los que añadir funcionalidades del DOM
const passwordBounds = document.getElementById("password-bounds");
const passwordButton = document.getElementById("password-button");
const passwordContainer = document.getElementById("password-container");
const passwordClipboard = document.getElementById("password-clipboard");
const passwordGenerated = document.getElementById("password-generated");

//función que selecciona aleatoriamente un índice de un objeto iterable
function getRandomIndex(obj) {
    if (obj.length === 0) return null;
    return Math.floor(Math.random() * obj.length);
}

//función que selecciona aleatoriamente un elemento de un objeto iterable (devuelve 0 si está vacío)
function getRandomElement(obj) {
    const index = getRandomIndex(obj);
    return index !== null ? obj[index] : "0";
}

//generar contraseña al pulsar el botón y añadirla a su contenedor
passwordButton.addEventListener("click", () => {
    //obtener el valor actual del input o el valor por defecto si es vacío
    let numCharacters = passwordBounds.value !== "" ? passwordBounds.value : passwordBounds.placeholder;

    //intentar parsear a int el valor obtenido, si la conversión falla, cogemos el valor mínimo
    numCharacters = Number.parseInt(numCharacters, 10);

    if (isNaN(numCharacters))
        numCharacters = minCharacters;

    if (numCharacters < minCharacters)
        numCharacters = minCharacters;
    else if (numCharacters > maxCharacters)
        numCharacters = maxCharacters;

    //generación de la contraseña
    let password = [];

    //empezamos generando un símbolo aleatorio de cada tipo
    const defaults = [];

    for (const characterSet of characterSets) {
        defaults.push(getRandomElement(characterSet));
    }

    //generamos el resto de caracteres que faltan
    const toGenerate = numCharacters - defaults.length;

    for (let i=0; i<toGenerate; i++) {
        //obtener un set de caracteres aleatorio
        const characterSet = getRandomElement(characterSets);

        //obtener un caracter aleatorio dentro de ese set
        const character = getRandomElement(characterSet);

        //meterlo en la contraseña
        password.push(character);
    }

    //introducimos los caracteres por defecto en algún lugar aleatorio de lo que ya tenemos
    for (const def of defaults) {
        const index = getRandomIndex(password);
        password.splice(index !== null ? index : 0, 0, def);
    }

    //pegamos la contraseña en su campo del DOM
    passwordGenerated.innerText = password.join("");

    //hacemos visible el contenedor donde está la contraseña
    passwordContainer.classList.add("password-container-visible");
});

//configurar el icono del portapapeles para que nos copie la contraseña
passwordClipboard.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordGenerated.innerText);
});