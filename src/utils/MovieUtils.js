const {
    cleanSwapiUrl,
} = require('./Utils');

const mapCharacterId = character => cleanSwapiUrl(character);

const mapMovie = (result) => {
    const {
        title,
        episode_id: id,
        opening_crawl,
        release_date,
        characters,
    } = result;

    return {
        id,
        title,
        opening_crawl,
        release_date,
        comments: 0,
        characters: characters.map(mapCharacterId),
    };
};

module.exports = {
    mapMovie,
};
