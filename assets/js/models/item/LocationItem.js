import { Item } from "./Item.js";

export class LocationItem extends Item {
    constructor(id, name, type, dimension, created) {
        const textContainerDiv = document.createElement('div');
        const idP = document.createElement('p');
        const nameP = document.createElement('p');
        const typeP = document.createElement('p');
        const dimensionP = document.createElement('p');
        const createdP = document.createElement('p');

        textContainerDiv.classList.add('text-container');
        idP.textContent = id;
        nameP.textContent = name;
        typeP.textContent = type;
        dimensionP.textContent = dimension;
        createdP.textContent = created;

        textContainerDiv.appendChild(idP);
        textContainerDiv.appendChild(nameP);
        textContainerDiv.appendChild(typeP);
        textContainerDiv.appendChild(dimensionP);
        textContainerDiv.appendChild(createdP);
        super(textContainerDiv);
    }
}