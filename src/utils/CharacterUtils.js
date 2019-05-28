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

const resolveGender = (gender) => {
    if (gender.toLowerCase() === 'male') {
        return 'male';
    }
    if (gender.toLowerCase() === 'female') {
        return 'female';
    }
    return null;
};

const resolveHeight = height => ((height === 'unknown') ? null : height);
const resolveMass = mass => ((mass === 'unknown') ? null : mass);

module.exports = {
    filterCharacterByGender,
    resolveGender,
    resolveHeight,
    resolveMass,
};
