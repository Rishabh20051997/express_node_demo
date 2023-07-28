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
exports.handleRefreshToken = void 0;
const strings_1 = require("@common/strings");
const token_handlers_1 = require("@helpers/token-handlers");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return (0, response_transmitter_1.sendLogoutRequestResponse)(res, { message: strings_1.LOGOUT_STRINGS.TOKEN_MISSING });
    }
    const foundUser = yield (0, user_use_cases_1.getUserByRefreshToken)(refreshToken);
    if (!foundUser) {
        //Forbidden 
        (0, user_use_cases_1.deleteUserRefreshToken)(foundUser);
        return (0, response_transmitter_1.sendLogoutRequestResponse)(res, { message: strings_1.LOGOUT_STRINGS.NO_USER_FOUND });
    }
    // evaluate jwt 
    const { err, decoded } = yield (0, token_handlers_1.verifyJwtRefreshToken)(refreshToken);
    if (err || foundUser.username !== decoded.username) {
        //Forbidden 
        (0, user_use_cases_1.deleteUserRefreshToken)(foundUser);
        return (0, response_transmitter_1.sendLogoutRequestResponse)(res, { message: strings_1.LOGOUT_STRINGS.NO_USER_FOUND });
    }
    const roles = Object.values((foundUser === null || foundUser === void 0 ? void 0 : foundUser.roles) || {});
    const accessToken = (0, token_handlers_1.generateAccessToken)({
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
exports.handleRefreshToken = handleRefreshToken;
//# sourceMappingURL=refresh-token-controller.js.map