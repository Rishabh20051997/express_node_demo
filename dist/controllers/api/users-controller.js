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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = exports.deleteUserController = exports.userListController = void 0;
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const strings_1 = require("@common/strings");
const user_model_1 = __importDefault(require("@model/user-model"));
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all users list who has registered the app
 */
const userListController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_use_cases_1.getUsersList)(user_model_1.default);
    response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: users
    });
});
exports.userListController = userListController;
/**
 *
 * @param {id: string} req request from client
 * @param res response instance to be sent
 * @returns delete the existing user if present & response back to client
 */
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield (0, user_use_cases_1.getUserByUserId)(user_model_1.default, { userId });
    // if user doesn't exists
    if (!user) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND
        });
    }
    yield (0, user_use_cases_1.deleteUserByUserId)(user, userId);
    response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: ''
    });
});
exports.deleteUserController = deleteUserController;
/**
 *
 * @param {id: string} req request from client
 * @param res response instance to be sent
 * @returns find users using id & sends back user info
 */
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id;
    const user = yield (0, user_use_cases_1.getUserByUserId)(user_model_1.default, { userId });
    // if user doesn't exists
    if (!user) {
        return response_transmitter_1.sendResponse.badRequest(res, {
            message: strings_1.USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND,
            data: { userId: userId }
        });
    }
    response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: { user }
    });
});
exports.getUserController = getUserController;
//# sourceMappingURL=users-controller.js.map