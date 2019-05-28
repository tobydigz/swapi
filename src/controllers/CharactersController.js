const request = require('../utils/SwapiRequest');
const Utils = require('../utils/Utils');
const {
    characterListMapper,
    createHeightsObject,
} = require('../utils/CharacterUtils');

exports.getCharacters = async (req, res) => {
    const {
        page,
        sort,
        order,
        filter,
    } = req.query;
    const path = 'people';

    const queryObject = {
        page,
    };

    const {
        results,
        next,
        previous,
    } = await request.fetchData(path, queryObject);

    const {
        characters,
        totalHeight,
    } = characterListMapper(results, filter);

    characters.sort(Utils.compareValues(sort, order));

    const heights = createHeightsObject(totalHeight);

    return res.status(200).send({
        previous: Utils.getPageFromUrl(previous),
        next: Utils.getPageFromUrl(next),
        count: characters.length,
        heights,
        characters,
    });
};
