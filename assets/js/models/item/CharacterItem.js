import { Item } from "./Item.js";

export class CharacterItem extends Item {
    constructor(id, name, status, species, gender, image) {
        const imageImg = document.createElement('img');
        const textContainerDiv = document.createElement('div');
        const idP = document.createElement('p');
        const nameP = document.createElement('p');
        const statusP = document.createElement('p');
        const speciesP = document.createElement('p');
        const genderP = document.createElement('p');

        imageImg.src = image;
        imageImg.alt = 'Character Image';
        textContainerDiv.classList.add('text-container');
        idP.textContent = id;
        nameP.textContent = name;
        statusP.textContent = status;
        speciesP.textContent = species;
        genderP.textContent = gender;

        textContainerDiv.appendChild(idP);
        textContainerDiv.appendChild(nameP);
        textContainerDiv.appendChild(statusP);
        textContainerDiv.appendChild(speciesP);
        textContainerDiv.appendChild(genderP);
        super(imageImg, textContainerDiv);
    }
}