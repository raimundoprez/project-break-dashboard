//función que sirve para crear un elemento del dashboard con una función de inicialización, un ID, clases extra y un padre
export function createDashboardElement(setup, id, classes, parent) {
    const element = document.createElement("section");

    if (id) element.id = id;
    for (const theClass of classes) element.classList.add(theClass);

    setup(element, parent);
}