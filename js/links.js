//variables locales
const storageKey = "dashboardLinks";

//función que lee la lista de enlaces del localStorage y los devuelve en un array
function getStoredLinks() {
    const string = localStorage.getItem(storageKey);
    let json;

    try {
        json = JSON.parse(string);
    }
    catch(error) {
        console.error("Fallo al leer la lista de links", error);
    }

    if (Array.isArray(json)) return json;
    return null;
}

//función que guarda la lista de enlaces en el localStorage, recibe un array con objetos ya formateados
function setStoredLinks(array) {
    const string = JSON.stringify(array);
    localStorage.setItem(storageKey, string);
}

//función que transforma la lista del DOM a array js
function listElementsToArray(list) {
    const array = [];

    for (const linkBox of list.children) {
        const link = linkBox.children[0] ? linkBox.children[0].children[0] : null;

        if (link) {
            const name = link.innerText;
            const url = link.getAttribute("href");

            if (name && url) {
                array.push({name, url});
            }
        }
    }

    return array;
}

//función que itera sobre enlaces de un array js y los pasa a la lista del DOM
function arrayToListElements(list, array) {
    list.innerHTML = "";

    for (const element of array) {
        const name = typeof element.name === "string" ? element.name : "";
        const url = typeof element.url === "string" ? element.url : "";

        if (name !== "" && url !== "") {
            addLink(list, name, url);
        }
    }
}

//función que elimina un enlace de la lista de enlaces del DOM
function removeLink(linkBox) {
    linkBox.remove();
}

//función que añade un enlace a la lista de enlaces del DOM
function addLink(list, name, url) {
    const linkBox = document.createElement("li");
    const linkWrapper = document.createElement("div");
    const link = document.createElement("a");
    const closeButton = document.createElement("img");

    linkBox.classList.add("link-box");

    linkWrapper.classList.add("link-wrapper");

    link.innerText = name;
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");

    closeButton.classList.add("link-close-button");
    closeButton.setAttribute("src", "./img/icons/remove.png");
    closeButton.setAttribute("alt", "Un icono de borrado");

    closeButton.addEventListener("click", () => {
        removeLink(linkBox);
        
        const array = listElementsToArray(list);
        setStoredLinks(array);
    });

    linkWrapper.appendChild(link);

    linkBox.appendChild(linkWrapper);
    linkBox.appendChild(closeButton);

    list.appendChild(linkBox);
}

export function setup(self, parent) {
    self.innerHTML = `
        <div class="text-with-icon">
            <h2>Añade tu enlace de interés</h2>
            <img class="icon-of-title" src="./img/icons/link.png" alt="Un icono de un link">
        </div>

        <div id="link-menu" class="box">
            <input id="link-name" type="text" placeholder="Nombre del enlace">
            <input id="link-url" type="text" placeholder="URL del enlace">
            <button id="link-button">Añadir enlace</button>

            <ul id="link-list"></ul>
        </div>
    `;

    //añadir elemento al padre
    parent.appendChild(self);

    //obtener los elementos a los que añadir funcionalidades del DOM
    const linkName = document.getElementById("link-name");
    const linkUrl = document.getElementById("link-url");
    const linkButton = document.getElementById("link-button");
    const linkList = document.getElementById("link-list");

    //gestionar el pulsado del botón
    linkButton.addEventListener("click", () => {
        const name = linkName.value;
        const url = linkUrl.value;

        //si el usuario ha dejado algún campo vacío, abortar
        if (!name || !url) return;

        //añadir un nuevo enlace al DOM con los datos especificados
        addLink(linkList, name, url);

        //actualizar el localStorage
        const array = listElementsToArray(linkList);
        setStoredLinks(array);
    });

    //cargar la lista de enlaces inicial del localStorage
    const array = getStoredLinks();
    if (array) arrayToListElements(linkList, array);
}