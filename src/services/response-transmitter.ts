import { STATUS_CODE } from "@constant";

const sendBadRequestResponse = (res, {
    message = ''
}) => {
    res.status(STATUS_CODE.BAD_REQUEST).json({
        status: STATUS_CODE.BAD_REQUEST,
        message: message
    });
}

const sendConflictsRequestResponse = (res, {
    message = ''
}) => {
    res.status(STATUS_CODE.CONFLICTS).json({
        status: STATUS_CODE.CONFLICTS,
        message: message
    });
}

const sendNewItemCreatedRequestResponse = (res, {
    message = '',
    data
}) => {
    res.status(STATUS_CODE.CREATED).json({
        status: STATUS_CODE.CREATED,
        message: message,
        data
    });
}

const sendSuccessRequestResponse = (res, {
    message = '',
    data
}) => {
    res.status(STATUS_CODE.SUCCESS).json({
        status: STATUS_CODE.SUCCESS,
        message: message,
        data: data
    });
}

const sendSuccessRequestForNoDataResponse = (res, {
    message = '',
    data
}) => {
    res.status(STATUS_CODE.SUCCESS).json({
        status: STATUS_CODE.NO_CONTENT,
        message: message,
        data: data
    });
}

const sendServerErrorRequestResponse = (res, {
    message = ''
}) => {
    res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS_CODE.SERVER_ERROR,
        message: message
    });
}

const sendLoginRequestResponse = (res, {
    user,
    accessToken,
    refreshToken
}) => {
    res.status(STATUS_CODE.SUCCESS).json({
        user,
        accessToken,
        refreshToken
    });
}

const sendLogoutRequestResponse = (res, {
    message
}) => {
    res.status(STATUS_CODE.LOGOUT).json({
        status: STATUS_CODE.LOGOUT, // session expire code
        message: message
    });
}

const sendPlainResponseCode = (res, {
    code
}) => {
    res.sendStatus(code)
}


export {
    sendBadRequestResponse,
    sendConflictsRequestResponse,
    sendLoginRequestResponse,
    sendLogoutRequestResponse,
    sendPlainResponseCode,
    sendNewItemCreatedRequestResponse,
    sendServerErrorRequestResponse,
    sendSuccessRequestResponse,
    sendSuccessRequestForNoDataResponse
}