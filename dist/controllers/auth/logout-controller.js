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
exports.handleLogout = void 0;
const _constant_1 = require("@constant");
const strings_1 = require("@common/strings");
const user_use_cases_1 = require("@use-cases/user-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const { TOKEN_MISSING, NO_USER_FOUND } = strings_1.LOGOUT_STRINGS;
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return (0, response_transmitter_1.sendLogoutRequestResponse)(res, { message: TOKEN_MISSING });
    }
    // Is refreshToken in db?
    const foundUser = yield (0, user_use_cases_1.getUserByRefreshToken)(refreshToken);
    if (!foundUser) {
        return (0, response_transmitter_1.sendLogoutRequestResponse)(res, { message: NO_USER_FOUND });
    }
    // Delete refreshToken in db
    yield (0, user_use_cases_1.deleteUserRefreshToken)(foundUser);
    // Logout Success
    return (0, response_transmitter_1.sendPlainResponseCode)(res, { code: _constant_1.STATUS_CODE.NO_CONTENT });
});
exports.handleLogout = handleLogout;
//# sourceMappingURL=logout-controller.js.map