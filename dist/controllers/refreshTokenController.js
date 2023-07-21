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
exports.handleRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const constant_1 = require("../common/constant");
// TODO:  Add type of found user
const deleteRefreshToken = (foundUser) => {
    foundUser.refreshToken = '';
    foundUser.save();
};
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(constant_1.STATUS_CODE.LOGOUT).json({
            status: constant_1.STATUS_CODE.LOGOUT,
            message: 'Log out'
        });
    }
    const foundUser = yield User_1.default.findOne({ refreshToken }).exec();
    if (!foundUser) {
        //Forbidden 
        deleteRefreshToken(foundUser);
        return res.status(constant_1.STATUS_CODE.LOGOUT).json({
            status: constant_1.STATUS_CODE.LOGOUT,
            message: 'Log out'
        });
    }
    // evaluate jwt 
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
            //Forbidden 
            deleteRefreshToken(foundUser);
            return res.status(constant_1.STATUS_CODE.LOGOUT).json({
                status: constant_1.STATUS_CODE.LOGOUT,
                message: 'Log out'
            });
        }
        const roles = Object.values((foundUser === null || foundUser === void 0 ? void 0 : foundUser.roles) || {});
        const accessToken = jsonwebtoken_1.default.sign({
            "UserInfo": {
                "username": decoded.username,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: constant_1.TOKEN_EXPIRE_TIME });
        res.status(constant_1.STATUS_CODE.SUCCESS).json({
            user: {
                userId: foundUser._id,
                userName: foundUser.username,
                roles,
            },
            accessToken,
            refreshToken
        });
    });
});
exports.handleRefreshToken = handleRefreshToken;
//# sourceMappingURL=refreshTokenController.js.map