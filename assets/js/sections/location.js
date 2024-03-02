import { getLocation, getLocations } from "../get-api.js";
import { LocationItem } from "../models/item/LocationItem.js";
import { LOCATION } from "../models/models.js";

// Sección personajes
export const $locations = document.getElementById('locations');

// Panel de filtros
const $setDefaultLocations = document.getElementById('set-default-locations');

const $filterId = document.getElementById('filter-id-locations');
const $searchId = document.getElementById('search-id-locations');

const $filterRangeStart = document.getElementById('filter-range-start-locations');
const $filterRangeEnd = document.getElementById('filter-range-end-locations');
const $searchRange = document.getElementById('search-range-locations');

const $filterCategoryLocationSelect = document.getElementById('filter-category-location-select');
const $filterCategoryLocations = document.getElementById('filter-category-locations');
const $searchCategory = document.getElementById('search-category-locations');

// Eventos
// Restaura los filtros a como estaban por defecto
$setDefaultLocations.addEventListener('click', async () => {
    appendLocationsToDom(await getLocations());
    $filterId.value = '';
    $filterRangeStart.value = '';
    $filterRangeEnd.value = '';
    $filterCategoryLocations.value = '';
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
    appendLocationsToDom(await getLocation(id));
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
        items.push(...await getLocation(i));
    }
    appendLocationsToDom(items);
})

// Busca por categoría
$searchCategory.addEventListener('click', async () => {
    const { value: category } = $filterCategoryLocations;
    if (!category) {
        $searchCategory.classList.add('search-error');
        $searchCategory.addEventListener('animationend', () => {
            $searchCategory.classList.remove('search-error');
        })
        return;
    }
    const { value: selectedOption } = $filterCategoryLocationSelect;
    let items = await getLocations();
    items = items.filter(item => item[LOCATION[selectedOption]] === category);
    appendLocationsToDom(items);
})

/**
 * Inserta en el DOM una lista con objetos de Localizaciones
 * @param {Array} locations Lista de localizaciones a adjuntar al DOM
 */
export function appendLocationsToDom(locations) {
    $locations.innerHTML = '';
    for (const location of locations) {
        $locations.appendChild(
            new LocationItem(
                location[LOCATION.ID],
                location[LOCATION.NAME],
                location[LOCATION.TYPE],
                location[LOCATION.DIMENSION],
                location[LOCATION.CREATED]
            ).getItem()
        );
    }
}