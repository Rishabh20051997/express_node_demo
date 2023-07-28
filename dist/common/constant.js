"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODE = exports.REFRESH_TOKEN_EXPIRE_TIME = exports.TOKEN_EXPIRE_TIME = exports.USER_TYPES = void 0;
// possible user type of user
var USER_TYPES;
(function (USER_TYPES) {
    USER_TYPES["USER"] = "User";
    USER_TYPES["EDITOR"] = "Editor";
    USER_TYPES["ADMIN"] = "Admin";
})(USER_TYPES || (exports.USER_TYPES = USER_TYPES = {}));
// time taken by access token to expire
exports.TOKEN_EXPIRE_TIME = '2m';
// time taken by refresh token to expire
exports.REFRESH_TOKEN_EXPIRE_TIME = '1d';
var STATUS_CODE;
(function (STATUS_CODE) {
    // success
    STATUS_CODE[STATUS_CODE["SUCCESS"] = 200] = "SUCCESS";
    STATUS_CODE[STATUS_CODE["CREATED"] = 201] = "CREATED";
    STATUS_CODE[STATUS_CODE["NO_CONTENT"] = 204] = "NO_CONTENT";
    // client error
    STATUS_CODE[STATUS_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    STATUS_CODE[STATUS_CODE["UN_AUTHORIZED"] = 401] = "UN_AUTHORIZED";
    STATUS_CODE[STATUS_CODE["ACCESS_DENIED"] = 403] = "ACCESS_DENIED";
    STATUS_CODE[STATUS_CODE["CONFLICTS"] = 409] = "CONFLICTS";
    STATUS_CODE[STATUS_CODE["LOGOUT"] = 440] = "LOGOUT";
    // server error
    STATUS_CODE[STATUS_CODE["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(STATUS_CODE || (exports.STATUS_CODE = STATUS_CODE = {}));
//# sourceMappingURL=constant.js.map