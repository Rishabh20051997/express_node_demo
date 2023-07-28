"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.getAllUsers = void 0;
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const strings_1 = require("@common/strings");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_use_cases_1.getAllUsersList)();
    if (!users.length) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.NO_USER,
            data: []
        });
    }
    (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: users
    });
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.ID_REQUIRED
        });
    }
    const user = yield (0, user_use_cases_1.getUserByUserId)(userId);
    if (!user) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND
        });
    }
    yield (0, user_use_cases_1.deleteUserByUserId)(user, userId);
    (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: ''
    });
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id;
    if (!userId) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.ID_REQUIRED
        });
    }
    const user = yield (0, user_use_cases_1.getUserByUserId)(userId);
    if (!user) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND,
            data: { userId: userId }
        });
    }
    (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: { user }
    });
});
exports.getUser = getUser;
//# sourceMappingURL=users-controller.js.map