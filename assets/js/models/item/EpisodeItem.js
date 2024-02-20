import { Item } from "./Item.js";

export class EpisodeItem extends Item {
    constructor(id, name, airDate, episode, created) {
        const textContainerDiv = document.createElement('div');
        const idP = document.createElement('p');
        const nameP = document.createElement('p');
        const airDateP = document.createElement('p');
        const episodeP = document.createElement('p');
        const createdP = document.createElement('p');

        textContainerDiv.classList.add('text-container');
        idP.textContent = id;
        nameP.textContent = name;
        airDateP.textContent = airDate;
        episodeP.textContent = episode;
        createdP.textContent = created;

        textContainerDiv.appendChild(idP);
        textContainerDiv.appendChild(nameP);
        textContainerDiv.appendChild(airDateP);
        textContainerDiv.appendChild(episodeP);
        textContainerDiv.appendChild(createdP);
        super(textContainerDiv);
    }
}