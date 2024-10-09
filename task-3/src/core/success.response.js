'use strict';

const { ReasonPhrases, StatusCodes } = require('../utils/httpStatusCode');

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metaData = {},
    }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metaData = metaData;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metaData }) {
        super({ message, metaData });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.CREATED,
        reasonStatusCode = ReasonPhrases.CREATED,
        metaData,
        options = {},
    }) {
        super({ message, statusCode, reasonStatusCode, metaData });
        this.options = options;
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse,
};
