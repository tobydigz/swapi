const request = require('../../utils/SwapiRequest');
const {
    compareValues,
} = require('../../utils/Utils');
const {
    characterMapper,
    filterCharacterByGender,
} = require('../../utils/CharacterUtils');
const {
    getAsync,
    setAsync,
} = require('../redis-client');

const characterKey = 'characters';

const fetchCharacterFromApi = async (id) => {
    const path = `people/${id}`;
    const character = request.fetchData(path);
    character.id = id;
    return character;
};

const fetchCharacter = async (id) => {
    const characterId = `${characterKey}-${id}`;
    let character = await getAsync(characterId);

    if (character) {
        return JSON.parse(character);
    }

    const apiCharacter = await fetchCharacterFromApi(character);

    character = characterMapper(apiCharacter);
    setAsync(characterId, JSON.stringify(character));
    return character;
};

const fetchCharacters = async (ids, sort, order, filter) => {
    const characterPromises = [];
    ids.forEach((id) => {
        characterPromises.push(fetchCharacter(id));
    });

    const characters = await Promise.all(characterPromises);

    if (sort) {
        characters.sort(compareValues(sort, order));
    }

    if (filter) {
        return characters.filter(filterCharacterByGender);
    }

    return characters;
};

module.exports = {
    fetchCharacters,
};
