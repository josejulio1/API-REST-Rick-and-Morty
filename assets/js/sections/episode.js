import { getEpisode, getEpisodes } from "../get-api.js";
import { EpisodeItem } from "../models/item/EpisodeItem.js";
import { EPISODE } from "../models/models.js";

// Sección personajes
export const $episodes = document.getElementById('episodes');

// Panel de filtros
const $setDefaultEpisodes = document.getElementById('set-default-episodes');

const $filterId = document.getElementById('filter-id-episodes');
const $searchId = document.getElementById('search-id-episodes');

const $filterRangeStart = document.getElementById('filter-range-start-episodes');
const $filterRangeEnd = document.getElementById('filter-range-end-episodes');
const $searchRange = document.getElementById('search-range-episodes');

const $filterCategoryEpisodeSelect = document.getElementById('filter-category-episode-select');
const $filterCategoryEpisodes = document.getElementById('filter-category-episodes');
const $searchCategory = document.getElementById('search-category-episodes');

// Eventos
// Restaura los filtros a como estaban por defecto
$setDefaultEpisodes.addEventListener('click', async () => {
    appendEpisodesToDom(await getEpisodes());
    $filterId.value = '';
    $filterRangeStart.value = '';
    $filterRangeEnd.value = '';
    $filterCategoryEpisodes.value = '';
})

// Busca por ID
$searchId.addEventListener('click', async () => {
    const { value: id } = $filterId;
    if (!id || id < 1) {
        $searchId.classList.add('search-error');
        $searchId.addEventListener('animationend', () => {
            $searchId.classList.remove('search-error');
        })
        return;
    }
    appendEpisodesToDom(await getEpisode(id));
})

// Busca por rango de ID
$searchRange.addEventListener('click', async () => {
    const { value: rangeStart } = $filterRangeStart;
    const { value: rangeEnd } = $filterRangeEnd;
    if (!rangeStart || !rangeEnd || rangeStart < 1 || rangeEnd < 1 || rangeStart > rangeEnd) {
        $searchRange.classList.add('search-error');
        $searchRange.addEventListener('animationend', () => {
            $searchRange.classList.remove('search-error');
        })
        return;
    }
    const items = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
        items.push(...await getEpisode(i));
    }
    appendEpisodesToDom(items);
})

// Busca por categoría
$searchCategory.addEventListener('click', async () => {
    const { value: category } = $filterCategoryEpisodes;
    if (!category) {
        $searchCategory.classList.add('search-error');
        $searchCategory.addEventListener('animationend', () => {
            $searchCategory.classList.remove('search-error');
        })
        return;
    }
    const { value: selectedOption } = $filterCategoryEpisodeSelect;
    let items = await getEpisodes();
    items = items.filter(item => item[EPISODE[selectedOption]] === category);
    appendEpisodesToDom(items);
})

/**
 * Inserta en el DOM una lista con objetos de Episodios
 * @param {Array} locations Lista de episodios a adjuntar al DOM
 */
export function appendEpisodesToDom(episodes) {
    $episodes.innerHTML = '';
    for (const episode of episodes) {
        $episodes.appendChild(
            new EpisodeItem(
                episode[EPISODE.ID],
                episode[EPISODE.NAME],
                episode[EPISODE.AIR_DATE],
                episode[EPISODE.EPISODE],
                episode[EPISODE.CREATED]
            ).getItem()
        );
    }
}