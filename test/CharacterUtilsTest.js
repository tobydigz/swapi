const tap = require('tap');
const fs = require('fs');

const utils = require('../src/utils/CharacterUtils');

const characters_json = fs.readFileSync(`${__dirname}/assets/characters.json`);
const characters_json_male = fs.readFileSync(`${__dirname}/assets/characters_male.json`);
const characters_json_female = fs.readFileSync(`${__dirname}/assets/characters_female.json`);
const characters_json_unkown = fs.readFileSync(`${__dirname}/assets/characters_unknown.json`);
const swapi_characters_json = fs.readFileSync(`${__dirname}/assets/swapi_characters.json`);

const characters = JSON.parse(characters_json);
const characters_male = JSON.parse(characters_json_male);
const characters_female = JSON.parse(characters_json_female);
const characters_unknown = JSON.parse(characters_json_unkown);
const swapi_characters = JSON.parse(swapi_characters_json);

tap.test('Gender Resolution', async () => {
    const male = utils.resolveGender('Male');
    tap.same(male, 'male');

    const female = utils.resolveGender('Female');
    tap.same(female, female);

    const unknown = utils.resolveGender('n/a');
    tap.same(unknown, null);
});

tap.test('Number Field Resolution', async () => {
    const male = utils.resolveNumberField('Male');
    tap.same(male, null);

    const empty = utils.resolveNumberField('unknown');
    tap.same(empty, null);

    const unknown = utils.resolveNumberField('unknown');
    tap.same(unknown, null);

    const valid = utils.resolveNumberField('120');
    tap.same(valid, '120');
});


tap.test('Character Mapper Test', async () => {
    const {
        characters: results,
    } = utils.characterListMapper(swapi_characters, null);

    tap.same(results, characters);
});

tap.test('Character Mapper Test With Filter Male', async () => {
    const {
        characters: results,
    } = utils.characterListMapper(swapi_characters, 'male');

    tap.same(results, characters_male);
});

tap.test('Character Mapper Test With Filter Female', async () => {
    const {
        characters: results,
    } = utils.characterListMapper(swapi_characters, 'female');

    tap.same(results, characters_female);
});

tap.test('Character Mapper Test With Filter Unknown', async () => {
    const {
        characters: results,
    } = utils.characterListMapper(swapi_characters, 'unknown');

    tap.same(results, characters_unknown);
});
