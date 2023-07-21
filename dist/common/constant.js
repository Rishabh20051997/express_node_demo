"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODE = exports.REFRESH_TOKEN_EXPIRE_TIME = exports.TOKEN_EXPIRE_TIME = exports.USER_TYPES = void 0;
var USER_TYPES;
(function (USER_TYPES) {
    USER_TYPES["USER"] = "User";
    USER_TYPES["EDITOR"] = "Editor";
    USER_TYPES["ADMIN"] = "Admin";
})(USER_TYPES || (exports.USER_TYPES = USER_TYPES = {}));
exports.TOKEN_EXPIRE_TIME = '2m';
exports.REFRESH_TOKEN_EXPIRE_TIME = '1d';
var STATUS_CODE;
(function (STATUS_CODE) {
    STATUS_CODE["SUCCESS"] = "200";
    STATUS_CODE["CREATED"] = "201";
    STATUS_CODE["NO_CONTENT"] = "204";
    STATUS_CODE["BAD_REQUEST"] = "400";
    STATUS_CODE["UN_AUTHORIZED"] = "401";
    STATUS_CODE["ACCESS_DENIED"] = "403";
    STATUS_CODE["CONFLICTS"] = "409";
    STATUS_CODE["LOGOUT"] = "440";
    STATUS_CODE["SERVER_ERROR"] = "500";
})(STATUS_CODE || (exports.STATUS_CODE = STATUS_CODE = {}));
//# sourceMappingURL=constant.js.map