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
exports.verifyJwtAccessToken = exports.verifyJwtRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _constant_1 = require("@constant");
/**
 *
 * @param username username of user
 * @param roles roles of user assigned
 * @returns generate new access token
 */
const generateAccessToken = ({ username, roles }) => {
    return jsonwebtoken_1.default.sign({
        "UserInfo": {
            "username": username,
            "roles": roles
        }
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: _constant_1.TOKEN_EXPIRE_TIME });
};
exports.generateAccessToken = generateAccessToken;
/**
 *
 * @param username username of user
 * @returns generate new refresh token
 */
const generateRefreshToken = ({ username }) => {
    return jsonwebtoken_1.default.sign({ "username": username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: _constant_1.REFRESH_TOKEN_EXPIRE_TIME });
};
exports.generateRefreshToken = generateRefreshToken;
/**
 *
 * @param username username of user
 * @returns verify if refresh token is valid
 */
const verifyJwtRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {
        err: '',
        decoded: {}
    };
    yield jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        result.err = err;
        result.decoded = decoded;
    });
    return result;
});
exports.verifyJwtRefreshToken = verifyJwtRefreshToken;
/**
 *
 * @param username username of user
 * @returns verify if access token is valid
 */
const verifyJwtAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {
        err: '',
        decoded: {}
    };
    yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        result.err = err;
        result.decoded = decoded;
    });
    return result;
});
exports.verifyJwtAccessToken = verifyJwtAccessToken;
//# sourceMappingURL=token-handlers.js.map