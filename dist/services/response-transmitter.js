"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.sendAccessDeniedRequestResponse = exports.sendSuccessRequestForNoDataResponse = exports.sendSuccessRequestResponse = exports.sendServerErrorRequestResponse = exports.sendNewItemCreatedRequestResponse = exports.sendPlainResponseCode = exports.sendLogoutRequestResponse = exports.sendLoginRequestResponse = exports.sendConflictsRequestResponse = exports.sendBadRequestResponse = void 0;
const strings_1 = require("@common/strings");
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
const sendAccessDeniedRequestResponse = (res) => {
    res.status(_constant_1.STATUS_CODE.ACCESS_DENIED).json({
        status: _constant_1.STATUS_CODE.ACCESS_DENIED,
        message: strings_1.ACCESS_MISSING
    });
};
exports.sendAccessDeniedRequestResponse = sendAccessDeniedRequestResponse;
const sendPlainResponseCode = (res, { code }) => {
    res.sendStatus(code);
};
exports.sendPlainResponseCode = sendPlainResponseCode;
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
// import { STATUS_CODE } from "@constant";
const sendResponseTemplate = (primaryCode, secondaryCode = primaryCode) => (res, { message = '', data = '' }) => {
    res.status(primaryCode).json({
        status: secondaryCode,
        message: message,
        data: data
    });
};
// const sendPlainResponseCode = (res: IResponse, {
//     code
// } : {
//     code: number
// }) => {
//     res.sendStatus(code)
// }
// const sendLoginRequestResponse = (res: IResponse, {
//     user,
//     accessToken,
//     refreshToken
// }: {
//     user: IUserResponseObject
//     accessToken: string
//     refreshToken:  string
// }) => {
//     res.status(STATUS_CODE.SUCCESS).json({
//         user,
//         accessToken,
//         refreshToken
//     });
// }
const sendResponse = {
    success: sendResponseTemplate(_constant_1.STATUS_CODE.SUCCESS),
    badRequest: sendResponseTemplate(_constant_1.STATUS_CODE.BAD_REQUEST),
    conflictRequest: sendResponseTemplate(_constant_1.STATUS_CODE.CONFLICTS),
    createdRequest: sendResponseTemplate(_constant_1.STATUS_CODE.CREATED),
    serverError: sendResponseTemplate(_constant_1.STATUS_CODE.SERVER_ERROR),
    accessDenied: sendResponseTemplate(_constant_1.STATUS_CODE.ACCESS_DENIED),
    logOut: sendResponseTemplate(_constant_1.STATUS_CODE.LOGOUT),
    plainCode: sendPlainResponseCode,
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response-transmitter.js.map