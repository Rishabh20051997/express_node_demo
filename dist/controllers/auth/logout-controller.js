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
exports.logoutUserController = void 0;
const _constant_1 = require("@constant");
const strings_1 = require("@common/strings");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const user_model_1 = __importDefault(require("@model/user-model"));
const { TOKEN_MISSING, NO_USER_FOUND } = strings_1.LOGOUT_STRINGS;
/**
 *
 * @param {refreshToken: string} req request from client
 * @param res response instance to be sent
 * @returns handle logout using refreshToken & deletes refreshToken from user info & responds back
 */
const logoutUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.refreshToken;
    // invalid params
    if (!refreshToken) {
        return response_transmitter_1.sendResponse.logOut(res, { message: TOKEN_MISSING });
    }
    // Is refreshToken in db?
    const foundUser = yield (0, user_use_cases_1.getUserByRefreshToken)(user_model_1.default, { refreshToken });
    // no user found with refresh token -> refresh token - tempered 
    if (!foundUser) {
        return response_transmitter_1.sendResponse.logOut(res, { message: NO_USER_FOUND });
    }
    // Delete refreshToken in db
    yield (0, user_use_cases_1.deleteUserRefreshToken)(foundUser);
    // Logout Success
    return response_transmitter_1.sendResponse.plainCode(res, { code: _constant_1.STATUS_CODE.NO_CONTENT });
});
exports.logoutUserController = logoutUserController;
//# sourceMappingURL=logout-controller.js.map