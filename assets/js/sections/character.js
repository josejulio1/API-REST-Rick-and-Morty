import { getCharacter } from "../get-api.js";
import { CharacterItem } from "../models/item/CharacterItem.js";
import { CHARACTER } from "../models/models.js";

export const $characters = document.getElementById('characters');
const $filterId = document.getElementById('filter-id-characters');
const $searchId = document.getElementById('search-id-characters');

const $filterRangeStart = document.getElementById('filter-range-start-characters');
const $filterRangeEnd = document.getElementById('filter-range-end-characters');
const $searchRange = document.getElementById('search-range-characters');

$searchId.addEventListener('click', async () => {
    if (!$filterId.value) {
        $searchId.classList.add('search-error');
        $searchId.addEventListener('animationend', () => {
            $searchId.classList.remove('search-error');
        })
        return;
    }
    appendCharactersToDom(await getCharacter($filterId.value));
})

$searchRange.addEventListener('click', async () => {
    const { value: rangeStart } = $filterRangeStart;
    const { value: rangeEnd } = $filterRangeEnd;
    if (!rangeStart || !rangeEnd || rangeStart > rangeEnd) {
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