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

const filterValues = (key, filter) => (object) => {
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
        return false;
    }

    const varA = (typeof object[key] === 'string')
        ? object[key].toUpperCase() : object[key];

    return varA.toLowerCase() === filter.toLowerCase();
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

module.exports = {
    compareValues,
    filterValues,
    cleanSwapiUrl,
};
