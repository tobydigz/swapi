const {
    createHeightsObject,
} = require('../utils/CharacterUtils');
const {
    fetchMovie,
} = require('../data/sources/MovieSource');

const {
    fetchCharacters,
} = require('../data/sources/CharacterSource');

exports.getCharacters = async (req, res) => {
    const {
        sort,
        order,
        filter,
    } = req.query;

    const {
        id,
    } = req.params;

    const {
        characters: characterIds,
    } = await fetchMovie(id);

    const characters = await fetchCharacters(characterIds, sort, order, filter);
    let totalHeight = 0;

    characters.forEach((character) => {
        const {
            height,
        } = character;
        totalHeight += Number(height);
    });
    const heights = createHeightsObject(totalHeight);

    return res.status(200).send({
        count: characters.length,
        heights,
        characters,
    });
};
