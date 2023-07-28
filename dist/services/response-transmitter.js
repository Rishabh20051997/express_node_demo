"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessRequestForNoDataResponse = exports.sendSuccessRequestResponse = exports.sendServerErrorRequestResponse = exports.sendNewItemCreatedRequestResponse = exports.sendPlainResponseCode = exports.sendLogoutRequestResponse = exports.sendLoginRequestResponse = exports.sendConflictsRequestResponse = exports.sendBadRequestResponse = void 0;
const _constant_1 = require("@constant");
const sendBadRequestResponse = (res, { message = '' }) => {
    res.status(_constant_1.STATUS_CODE.BAD_REQUEST).json({
        status: _constant_1.STATUS_CODE.BAD_REQUEST,
        message: message
    });
};
exports.sendBadRequestResponse = sendBadRequestResponse;
const sendConflictsRequestResponse = (res, { message = '' }) => {
    res.status(_constant_1.STATUS_CODE.CONFLICTS).json({
        status: _constant_1.STATUS_CODE.CONFLICTS,
        message: message
    });
};
exports.sendConflictsRequestResponse = sendConflictsRequestResponse;
const sendNewItemCreatedRequestResponse = (res, { message = '', data }) => {
    res.status(_constant_1.STATUS_CODE.CREATED).json({
        status: _constant_1.STATUS_CODE.CREATED,
        message: message,
        data
    });
};
exports.sendNewItemCreatedRequestResponse = sendNewItemCreatedRequestResponse;
const sendSuccessRequestResponse = (res, { message = '', data }) => {
    res.status(_constant_1.STATUS_CODE.SUCCESS).json({
        status: _constant_1.STATUS_CODE.SUCCESS,
        message: message,
        data: data
    });
};
exports.sendSuccessRequestResponse = sendSuccessRequestResponse;
const sendSuccessRequestForNoDataResponse = (res, { message = '', data }) => {
    res.status(_constant_1.STATUS_CODE.SUCCESS).json({
        status: _constant_1.STATUS_CODE.NO_CONTENT,
        message: message,
        data: data
    });
};
exports.sendSuccessRequestForNoDataResponse = sendSuccessRequestForNoDataResponse;
const sendServerErrorRequestResponse = (res, { message = '' }) => {
    res.status(_constant_1.STATUS_CODE.SERVER_ERROR).json({
        status: _constant_1.STATUS_CODE.SERVER_ERROR,
        message: message
    });
};
exports.sendServerErrorRequestResponse = sendServerErrorRequestResponse;
const sendLoginRequestResponse = (res, { user, accessToken, refreshToken }) => {
    res.status(_constant_1.STATUS_CODE.SUCCESS).json({
        user,
        accessToken,
        refreshToken
    });
};
exports.sendLoginRequestResponse = sendLoginRequestResponse;
const sendLogoutRequestResponse = (res, { message }) => {
    res.status(_constant_1.STATUS_CODE.LOGOUT).json({
        status: _constant_1.STATUS_CODE.LOGOUT,
        message: message
    });
};
exports.sendLogoutRequestResponse = sendLogoutRequestResponse;
const sendPlainResponseCode = (res, { code }) => {
    res.sendStatus(code);
};
exports.sendPlainResponseCode = sendPlainResponseCode;
//# sourceMappingURL=response-transmitter.js.map