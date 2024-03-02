import { getCharacter, getCharacters } from "../get-api.js";
import { CharacterItem } from "../models/item/CharacterItem.js";
import { CHARACTER } from "../models/models.js";

// Sección personajes
export const $characters = document.getElementById('characters');

// Panel de filtros
const $setDefaultCharacters = document.getElementById('set-default-characters');

const $filterId = document.getElementById('filter-id-characters');
const $searchId = document.getElementById('search-id-characters');

const $filterRangeStart = document.getElementById('filter-range-start-characters');
const $filterRangeEnd = document.getElementById('filter-range-end-characters');
const $searchRange = document.getElementById('search-range-characters');

const $filterCategoryCharacterSelect = document.getElementById('filter-category-character-select');
const $filterCategoryCharacters = document.getElementById('filter-category-characters');
const $searchCategory = document.getElementById('search-category-characters');

// Eventos
// Restaura los filtros a como estaban por defecto
$setDefaultCharacters.addEventListener('click', async () => {
    appendCharactersToDom(await getCharacters());
    $filterId.value = '';
    $filterRangeStart.value = '';
    $filterRangeEnd.value = '';
    $filterCategoryCharacters.value = '';
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
    appendCharactersToDom(await getCharacter(id));
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
        items.push(...await getCharacter(i));
    }
    appendCharactersToDom(items);
})

// Busca por categoría
$searchCategory.addEventListener('click', async () => {
    const { value: category } = $filterCategoryCharacters;
    if (!category) {
        $searchCategory.classList.add('search-error');
        $searchCategory.addEventListener('animationend', () => {
            $searchCategory.classList.remove('search-error');
        })
        return;
    }
    const { value: selectedOption } = $filterCategoryCharacterSelect;
    let items = await getCharacters();
    items = items.filter(item => item[CHARACTER[selectedOption]] === category);
    appendCharactersToDom(items);
})

/**
 * Inserta en el DOM una lista con objetos de Personajes
 * @param {Array} characters Lista de personajes a adjuntar al DOM
 */
export function appendCharactersToDom(characters) {
    $characters.innerHTML = '';
    for (const character of characters) {
        $characters.appendChild(
            new CharacterItem(
                character[CHARACTER.ID],
                character[CHARACTER.NAME],
                character[CHARACTER.STATUS],
                character[CHARACTER.SPECIES],
                character[CHARACTER.GENDER],
                character[CHARACTER.IMAGE]
            ).getItem()
        );
    }
}