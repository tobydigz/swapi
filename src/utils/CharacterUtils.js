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

    if (gender.toLowerCase() === 'hermaphrodite') {
        return 'hermaphrodite';
    }

    if (gender.toLowerCase() === 'n/a') {
        return 'n/a';
    }

    if (gender.toLowerCase() === 'none') {
        return 'none';
    }
    return null;
};

const resolveNumberField = number => ((isValidNumber(number)) ? number : null);

const filterCharacterByGender = filter => (character) => {
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

const createHeightsObject = (heightCm) => {
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
    characterMapper,
    createHeightsObject,
    filterCharacterByGender,
};
