//variables locales
const minCharacters = 12;
const maxCharacters = 50;
const characterSets = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789", "!@#$%^&*()-_=+"];

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

export function setup(self, parent) {
    self.innerHTML = `
        <div class="text-with-icon">
            <h2>Crea tu contraseña segura</h2>
            <img class="icon-of-title" src="./img/icons/padlock.png" alt="Un icono de un candado">
        </div>

        <div id="password-menu" class="box">
            <label for="password-bounds">Número de caracteres de la contraseña</label>

            <div>
                <input id="password-bounds" type="number" min="${minCharacters}" max="${maxCharacters}" placeholder="${minCharacters}">
                <button id="password-button">Generar Contraseña</button>
            </div>

            <div id="password-fields">
                <div class="text-with-icon">
                    <span>Contraseña Generada</span>
                    <img id="password-clipboard" class="icon-of-text" src="./img/icons/clipboard.png" alt="Una imagen de un portapapeles">
                </div>

                <span id="password-result"></span>
            </div>
        </div>
    `;

    //añadir elemento al padre
    parent.appendChild(self);

    //obtener los elementos a los que añadir funcionalidades del DOM
    const passwordBounds = document.getElementById("password-bounds");
    const passwordButton = document.getElementById("password-button");
    const passwordFields = document.getElementById("password-fields");
    const passwordClipboard = document.getElementById("password-clipboard");
    const passwordResult = document.getElementById("password-result");

    //generar contraseña al pulsar el botón y añadirla a su contenedor
    passwordButton.addEventListener("click", () => {
        //obtener el valor actual del input o el valor por defecto si está vacío
        let numCharacters = passwordBounds.value !== "" ? passwordBounds.value : passwordBounds.placeholder;

        //intentar parsear a int el valor obtenido, si la conversión falla, cogemos el valor mínimo
        numCharacters = Number.parseInt(numCharacters, 10);

        if (isNaN(numCharacters)) numCharacters = minCharacters;

        if (numCharacters < minCharacters) numCharacters = minCharacters;
        else if (numCharacters > maxCharacters) numCharacters = maxCharacters;

        //empezamos generando 1 símbolo aleatorio de cada tipo para tener al menos 1 de cada
        const defaults = [];

        for (const characterSet of characterSets) {
            const character = getRandomElement(characterSet);
            defaults.push(character);
        }

        //generamos el resto de caracteres que faltan
        const generated = [];
        const generatedSize = numCharacters - defaults.length;

        for (let i=0; i<generatedSize; i++) {
            //obtener un set de caracteres aleatorio
            const characterSet = getRandomElement(characterSets);

            //obtener un carácter aleatorio dentro de ese set
            const character = getRandomElement(characterSet);

            //meterlo en el array
            generated.push(character);
        }

        //introducimos los elementos del array1 en algún lugar aleatorio del array2
        for (const def of defaults) {
            const index = getRandomIndex(generated);
            generated.splice(index !== null ? index : 0, 0, def);
        }

        //creamos la contraseña y la mostramos en el DOM
        const password = generated.join("");
        passwordResult.innerText = password;

        //hacemos visible el contenedor donde está la contraseña
        passwordFields.classList.add("password-fields-visible");
    });

    //configurar el icono del portapapeles para que nos copie la contraseña
    passwordClipboard.addEventListener("click", () => {
        navigator.clipboard.writeText(passwordResult.innerText);
    });
}