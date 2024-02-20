import { END_POINTS } from "./end-points.js";
import { EpisodeItem } from "./models/item/EpisodeItem.js";
import { EPISODE } from "./models/models.js";
import { appendCharactersToDom } from "./sections/character.js";

const BASE_URL = 'https://rickandmortyapi.com/api';
export const $locations = document.getElementById('locations');
export const $episodes = document.getElementById('episodes');
const $loadingTag = document.getElementById('loading-tag');

window.addEventListener('load', async () => {
    appendCharactersToDom(await getCharacters());
    getLocations();
    getEpisodes();
})

async function getCharacters() {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.CHARACTER}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    const { results: characters } = jsonData;
    return characters;
}

export async function getCharacter(id) {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.CHARACTER}/${id}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    return [jsonData];
}

async function getLocations() {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.LOCATION}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    return jsonData;
}

async function getEpisodes() {
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.EPISODE}`, {
        method: 'GET'
    }).then(response => response.json());
    const { results: episodes } = jsonData;
    for (const episode of episodes) {
        $episodes.appendChild(
            new EpisodeItem(
                episode[EPISODE.ID],
                episode[EPISODE.NAME],
                episode[EPISODE.AIR_DATE],
                episode[EPISODE.EPISODE],
                episode[EPISODE.CREATED],
            ).getItem()
        );
    }
}

function showLoading() {
    $loadingTag.classList.remove('hide-aside');
    document.body.classList.add('no-scroll');
}

function removeLoading() {
    $loadingTag.classList.add('hide-aside');
    document.body.classList.remove('no-scroll');
}