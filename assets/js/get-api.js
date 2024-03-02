import { END_POINTS } from "./end-points.js";
import { appendCharactersToDom } from "./sections/character.js";
import { appendEpisodesToDom } from "./sections/episode.js";
import { appendLocationsToDom } from "./sections/location.js";

const BASE_URL = 'https://rickandmortyapi.com/api';
const $loadingTag = document.getElementById('loading-tag');

// Carga los personajes, las localizaciones y los episodios en la web
window.addEventListener('load', async () => {
    appendCharactersToDom(await getCharacters());
    appendLocationsToDom(await getLocations());
    appendEpisodesToDom(await getEpisodes());
})

// Personajes
/**
 * Consulta en la API REST todos los personajes que existen
 * @returns Devuelve una lista con los personajes encontrados
 */
export async function getCharacters() {
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

/**
 * Busca un personaje en la API REST por su ID
 * @param {number} id ID del personaje a buscar
 * @returns Devuelve una lista con el personaje encontrado
 */
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

// Localizaciones
/**
 * Consulta en la API REST todas las localizaciones que existen
 * @returns Devuelve una lista con las localizaciones encontradas
 */
export async function getLocations() {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.LOCATION}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    const { results: locations } = jsonData;
    return locations;
}

/**
 * Busca una localización en la API REST por su ID
 * @param {number} id ID de la localización a buscar
 * @returns Devuelve una lista con la localización encontrada
 */
export async function getLocation(id) {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.LOCATION}/${id}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    return [jsonData];
}

// Episodios
/**
 * Consulta en la API REST todos los episodios que existen
 * @returns Devuelve una lista con los episodios encontrados
 */
export async function getEpisodes() {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.EPISODE}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    const { results: characters } = jsonData;
    return characters;
}

/**
 * Busca un episodio en la API REST por su ID
 * @param {number} id ID del episodio a buscar
 * @returns Devuelve una lista con el episodio encontrado
 */
export async function getEpisode(id) {
    showLoading();
    const jsonData = await fetch(`${BASE_URL}/${END_POINTS.EPISODE}/${id}`, {
        method: 'GET'
    }).then(async response => {
        removeLoading();
        return await response.json();
    });
    return [jsonData];
}

// Otros
/**
 * Muestra una animación de cargando en la web
 */
function showLoading() {
    window.scrollTo(0, 0);
    $loadingTag.classList.remove('hide-aside');
    document.body.classList.add('no-scroll');
}

/**
 * Elimina la animación de cargando en la web
 */
function removeLoading() {
    $loadingTag.classList.add('hide-aside');
    document.body.classList.remove('no-scroll');
}