const bunyan = require('bunyan');
const config = require('config');

const {
    logLevel,
} = config;

function reqSerializer(req) {
    const {
        method,
        url,
        headers,
        remoteAddress,
        remotePort,
    } = req;

    const newHeaders = {
        ...headers,
    };

    delete newHeaders.x_token;
    delete newHeaders.timestamp;
    delete newHeaders.nonce;
    delete newHeaders.signature;
    delete newHeaders.authorization;

    return {
        method,
        url,
        remoteAddress,
        remotePort,
        headers: newHeaders,
    };
}

exports.log = bunyan.createLogger({
    name: 'receipt-verifier',
    serializers: {
        req: reqSerializer,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err,
    },
    level: logLevel,
});

exports.logRequest = (req) => {
    const log = this.log.child({
        id: req.id,
        body: req.body,
    }, true);
    log.info({
        req,
    });
};

exports.logCustomError = (id, body, statusCode) => {
    const log = this.log.child({
        id,
        body,
        statusCode,
    }, true);

    log.info('response');
};

exports.logGenericError = (err, id) => {
    const log = this.log.child({
        id,
    }, true);
    log.error({
        err,
    });
};
