const isValidNumber = value => !Number.isNaN(Number(value));

const compareValues = (key, order = 'asc') => (a, b) => {
    if (!Object.prototype.hasOwnProperty.call(a, key)
        || !Object.prototype.hasOwnProperty.call(b, key)) {
        return 0;
    }

    let varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
    let varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

    if (isValidNumber(varA)) {
        varA = Number(varA);
    }

    if (isValidNumber(varB)) {
        varB = Number(varB);
    }

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

const cleanSwapiUrl = (url) => {
    let urlObject;
    try {
        urlObject = new URL(url);
    } catch (e) {
        return undefined;
    }

    const path = urlObject.pathname;

    const pathArray = path.split('/');

    if (pathArray.length <= 2) {
        return undefined;
    }

    let pathItem = pathArray[pathArray.length - 1];
    if (!pathItem) {
        pathItem = pathArray[pathArray.length - 2];
    }
    return pathItem || undefined;
};

const getPageFromUrl = (url) => {
    if (!url) {
        return null;
    }
    const urlObject = new URL(url);

    const page = urlObject.searchParams.get('page');

    return page || null;
};

const cmToFeet = (height) => {
    const realFeet = ((height * 0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return {
        number: realFeet,
        text: `${feet}ft and ${inches} inches`,
    };
};

const getIp = req => (req.headers['x-forwarded-for'] || '').split(',').pop()
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;

module.exports = {
    isValidNumber,
    compareValues,
    cleanSwapiUrl,
    getPageFromUrl,
    cmToFeet,
    getIp,
};
