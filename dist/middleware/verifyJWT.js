"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../common/constant");
const loggerService_1 = require("../service/loggerService");
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(constant_1.STATUS_CODE.UN_AUTHORIZED);
    const token = authHeader.split(' ')[1];
    (0, loggerService_1.log)(token);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(constant_1.STATUS_CODE.UN_AUTHORIZED); //invalid token
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        next();
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map