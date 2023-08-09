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
exports.loginUserController = void 0;
const strings_1 = require("@common/strings");
const bcrypt_helper_1 = require("@helpers/bcrypt-helper");
const token_service_1 = require("@services/token-service");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const user_model_1 = __importDefault(require("@model/user-model"));
const { INCORRECT_CREDENTIALS, } = strings_1.AUTHORIZATION_STRINGS;
/**
 *
 * @param {userName: string, password: string} req request from client
 * @param res response instance to be sent
 * @returns handle login using userName & password & responds back
 */
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const foundUser = yield (0, user_use_cases_1.getUserByUserName)(user_model_1.default, { userName });
    //Unauthorized -> user doesn't exists
    if (!foundUser) {
        return response_transmitter_1.sendResponse.badRequest(res, { message: INCORRECT_CREDENTIALS });
    }
    // evaluate password 
    const match = yield (0, bcrypt_helper_1.compareByCryptPassword)(password, foundUser.password);
    // if password matched
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = (0, token_service_1.generateAccessToken)({
            username: foundUser.username,
            roles
        });
        const refreshToken = (0, token_service_1.generateRefreshToken)({ username: foundUser.username });
        // Saving refreshToken with current user
        (0, user_use_cases_1.updateUserRefreshToken)(refreshToken, foundUser);
        // Send authorization roles and access token to user
        (0, response_transmitter_1.sendLoginRequestResponse)(res, {
            user: {
                userId: foundUser._id,
                userName,
                roles,
            },
            accessToken,
            refreshToken
        });
    }
    else {
        //Unauthorized -> password mis-matched
        response_transmitter_1.sendResponse.badRequest(res, { message: INCORRECT_CREDENTIALS });
    }
});
exports.loginUserController = loginUserController;
//# sourceMappingURL=auth-controller.js.map