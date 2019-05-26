const compareValues = (key, order = 'asc') => (a, b) => {
    if (!Object.prototype.hasOwnProperty.call(a, key)
        || !Object.prototype.hasOwnProperty.call(b, key)) {
        return 0;
    }

    const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
        comparison = 1;
    } else if (varA < varB) {
        comparison = -1;
    }
    return (
        (order.toLowerCase() === 'desc') ? (comparison * -1) : comparison
    );
};

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

const cleanSwapiUrl = (url) => {
    const urlObject = new URL(url);

    const path = urlObject.pathname;
    if (!path) {
        return undefined;
    }

    const pathArray = path.split('/');

    if (pathArray.length < 1) {
        return undefined;
    }

    let pathItem = pathArray[pathArray.length - 1];
    if (!pathItem && pathArray.length >= 2) {
        pathItem = pathArray[pathArray.length - 2];
    }
    return pathItem;
};

const getPageFromUrl = (url) => {
    if (!url) {
        return null;
    }
    const urlObject = new URL(url);

    const page = urlObject.searchParams.get('page');

    return page || null;
};

module.exports = {
    compareValues,
    filterCharacterByGender,
    cleanSwapiUrl,
    getPageFromUrl,
};
