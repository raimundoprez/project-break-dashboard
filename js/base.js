//función que sirve para crear un elemento del dashboard con una función de inicialización, clases extra y un padre
export function createDashboardElement(setup, classes, parent) {
    const element = document.createElement("section");

    for (const theClass of classes)
        element.classList.add(theClass);

    setup(element, parent);
}