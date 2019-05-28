const tap = require('tap');
const utils = require('../src/utils/Utils');

const objectA = [
    {
        id: 2,
    },
    {
        id: 1,
    },
    {
        id: 3,
    },
    {
        id: 5,
    },
];

tap.test('Test Sort Same Order', async () => {
    objectA.sort(utils.compareValues('name'));
    tap.same(objectA[0], {
        id: 2,
    });
});

tap.test('Test Sort Asc Order', async () => {
    objectA.sort(utils.compareValues('id'));
    tap.same(objectA[0], {
        id: 1,
    });
});

tap.test('Test Sort dsc Order', async () => {
    objectA.sort(utils.compareValues('id', 'desc'));
    tap.same(objectA[0], {
        id: 5,
    });
});

tap.test('Test Clean Swapi Url', async () => {
    let path = utils.cleanSwapiUrl('https://swapi.co/api/people/1/');
    tap.same(path, 1);

    path = utils.cleanSwapiUrl('https://swapi.co/api/people/1');
    tap.same(path, 1);

    path = utils.cleanSwapiUrl('https://swapi.co/');
    tap.same(path, undefined);

    path = utils.cleanSwapiUrl('https://swapi.co///');
    tap.same(path, undefined);

    path = utils.cleanSwapiUrl('https:/');
    tap.same(path, undefined);
});

tap.test('Test Get Page From Url', async () => {
    let page = utils.getPageFromUrl('https://swapi.co/api/people/?page=2');
    tap.same(page, 2);

    page = utils.getPageFromUrl('https://swapi.co/api/people/?page=');
    tap.same(page, null);

    page = utils.getPageFromUrl();
    tap.same(page, null);
});

tap.test('Is valid number', async () => {
    let isValidNumber = utils.isValidNumber('10');
    tap.same(isValidNumber, true);

    isValidNumber = utils.isValidNumber('1a');
    tap.same(isValidNumber, false);

    isValidNumber = utils.isValidNumber(10);
    tap.same(isValidNumber, true);

    isValidNumber = utils.isValidNumber();
    tap.same(isValidNumber, false);
});

tap.test('CM to FT Conversion', async () => {
    const { number } = utils.cmToFeet(180);
    tap.same(number, 5.9055);
});

tap.test('Test IP Address', async () => {
    const req = {
        headers: {
            'x-forwarded-for': '192.168.1.1',
        },
        connection: {
            remoteAddress: '192.168.1.2',
            socket: {
                remoteAddress: '192.168.1.3',
            },
        },
        socket: {
            remoteAddress: '192.168.1.4',
        },
    };

    let ip = utils.getIp(req);
    tap.same(ip, '192.168.1.1');

    delete req.headers['x-forwarded-for'];

    ip = utils.getIp(req);
    tap.same(ip, '192.168.1.2');

    delete req.connection.remoteAddress;

    ip = utils.getIp(req);
    tap.same(ip, '192.168.1.4');
    delete req.socket.remoteAddress;

    ip = utils.getIp(req);
    tap.same(ip, '192.168.1.3');
});
