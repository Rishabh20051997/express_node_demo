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
exports.handleLogin = void 0;
const strings_1 = require("@common/strings");
const bcrypt_helper_1 = require("@helpers/bcrypt-helper");
const token_handlers_1 = require("@helpers/token-handlers");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const { INCORRECT_CREDENTIALS, INVALID_PARAMS } = strings_1.AUTHORIZATION_STRINGS;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    // validation params
    if (!userName || !password) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, { message: INVALID_PARAMS });
    }
    const foundUser = yield (0, user_use_cases_1.getUserByUserName)(userName);
    //Unauthorized
    if (!foundUser) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, { message: INCORRECT_CREDENTIALS });
    }
    // evaluate password 
    const match = yield (0, bcrypt_helper_1.compareByCryptPassword)(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = (0, token_handlers_1.generateAccessToken)({
            username: foundUser.username,
            roles
        });
        const refreshToken = (0, token_handlers_1.generateRefreshToken)({ username: foundUser.username });
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
        //Unauthorized
        (0, response_transmitter_1.sendBadRequestResponse)(res, { message: INCORRECT_CREDENTIALS });
    }
});
exports.handleLogin = handleLogin;
//# sourceMappingURL=authController.js.map