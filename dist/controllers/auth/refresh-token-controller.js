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
exports.refreshTokenController = void 0;
const strings_1 = require("@common/strings");
const token_service_1 = require("@services/token-service");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const user_model_1 = __importDefault(require("@model/user-model"));
/**
 *
 * @param {refreshToken: string} req request from client
 * @param res response instance to be sent
 * @returns generates new access token using refresh token & responds back
 */
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    // invalid params
    if (!refreshToken) {
        return response_transmitter_1.sendResponse.logOut(res, { message: strings_1.LOGOUT_STRINGS.TOKEN_MISSING });
    }
    const foundUser = yield (0, user_use_cases_1.getUserByRefreshToken)(user_model_1.default, { refreshToken });
    // no user found with refresh token -> refresh token - tempered 
    if (!foundUser) {
        //Forbidden 
        return response_transmitter_1.sendResponse.logOut(res, { message: strings_1.LOGOUT_STRINGS.NO_USER_FOUND });
    }
    // evaluate jwt 
    const { err, decoded } = yield (0, token_service_1.verifyJwtRefreshToken)(refreshToken);
    if (err || foundUser.username !== decoded.username) {
        //Forbidden 
        (0, user_use_cases_1.deleteUserRefreshToken)(foundUser);
        return response_transmitter_1.sendResponse.logOut(res, { message: strings_1.LOGOUT_STRINGS.NO_USER_FOUND });
    }
    const roles = Object.values((foundUser === null || foundUser === void 0 ? void 0 : foundUser.roles) || {});
    // generates new access token
    const accessToken = (0, token_service_1.generateAccessToken)({
        username: decoded.username,
        roles
    });
    (0, response_transmitter_1.sendLoginRequestResponse)(res, {
        user: {
            userId: foundUser._id,
            userName: foundUser.username,
            roles,
        },
        accessToken,
        refreshToken
    });
});
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=refresh-token-controller.js.map