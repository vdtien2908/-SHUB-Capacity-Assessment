'use strict';

const { ReasonPhrases, StatusCodes } = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statusCode = StatusCodes.CONFLICT
    ) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.BAD_REQUEST,
        statusCode = StatusCodes.BAD_REQUEST
    ) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.NOT_FOUND,
        statusCode = StatusCodes.NOT_FOUND
    ) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    NotFoundError,
};
