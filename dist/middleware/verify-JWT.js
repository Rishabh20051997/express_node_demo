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
exports.verifyJWT = void 0;
const _constant_1 = require("@constant");
const response_transmitter_1 = require("@services/response-transmitter");
const token_service_1 = require("@services/token-service");
// middleware to verify access token of client
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return response_transmitter_1.sendResponse.plainCode(res, {
            code: _constant_1.STATUS_CODE.UN_AUTHORIZED
        });
    }
    // retrieve actual token key
    const token = authHeader.split(' ')[1];
    const { err, decoded } = yield (0, token_service_1.verifyJwtAccessToken)(token);
    // has error in verificcation
    if (err)
        return response_transmitter_1.sendResponse.plainCode(res, {
            code: _constant_1.STATUS_CODE.UN_AUTHORIZED
        }); //invalid token
    req.user = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.UserInfo) === null || _a === void 0 ? void 0 : _a.username;
    req.roles = (_b = decoded === null || decoded === void 0 ? void 0 : decoded.UserInfo) === null || _b === void 0 ? void 0 : _b.roles;
    next();
});
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verify-JWT.js.map