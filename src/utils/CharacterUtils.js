const {
    cleanSwapiUrl,
    cmToFeet,
    isValidNumber,
} = require('./Utils');

const resolveGender = (gender) => {
    if (gender.toLowerCase() === 'male') {
        return 'male';
    }
    if (gender.toLowerCase() === 'female') {
        return 'female';
    }
    return null;
};

const resolveNumberField = number => ((isValidNumber(number)) ? number : null);

const filterCharacterByGender = (filter, shouldFilter, character) => {
    if (!shouldFilter) {
        return true;
    }

    const {
        gender,
    } = character;


    if (filter === 'unknown' && gender === null) {
        return true;
    }
    if (!gender) {
        return false;
    }
    return filter.toLowerCase() === gender.toLowerCase();
};

const characterMapper = (result) => {
    const {
        name,
        url,
        height,
        mass,
        gender,
    } = result;

    return {
        name,
        id: cleanSwapiUrl(url),
        height: resolveNumberField(height),
        mass: resolveNumberField(mass),
        gender: resolveGender(gender),
    };
};

const characterListMapper = (results, filter) => {
    const characters = [];
    let totalHeight = 0;
    const shouldFilter = !!filter;
    results.forEach((result) => {
        const character = characterMapper(result);
        if (filterCharacterByGender(filter, shouldFilter, character)) {
            characters.push(character);
            totalHeight += Number(character.height);
        }
    });
    return {
        characters,
        totalHeight,
    };
};

const createHeightsObject = async (heightCm) => {
    const {
        number: heightFt,
        text: heightFtText,
    } = cmToFeet(heightCm);


    const cmHeightObject = {
        type: 'cm',
        value: heightCm,
        text_value: `${heightCm} cm`,
    };

    const ftHeightObject = {
        type: 'feet',
        value: heightFt,
        text_value: heightFtText,
    };

    return [ftHeightObject, cmHeightObject];
};

module.exports = {
    resolveGender,
    resolveNumberField,
    characterListMapper,
    createHeightsObject,
};
