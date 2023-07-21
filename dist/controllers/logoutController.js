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
exports.handleLogout = void 0;
const constant_1 = require("../common/constant");
const User_1 = __importDefault(require("../model/User"));
const loggerService_1 = require("../service/loggerService");
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // On client, also delete the accessToken
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(constant_1.STATUS_CODE.LOGOUT).json({
            status: constant_1.STATUS_CODE.LOGOUT,
            message: 'Token Missing'
        });
    }
    // Is refreshToken in db?
    const foundUser = yield User_1.default.findOne({ refreshToken }).exec();
    if (!foundUser) {
        return res.status(constant_1.STATUS_CODE.LOGOUT).json({
            status: constant_1.STATUS_CODE.LOGOUT,
            message: 'Log out'
        });
    }
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = yield foundUser.save();
    (0, loggerService_1.log)(result);
    return res.sendStatus(constant_1.STATUS_CODE.NO_CONTENT);
});
exports.handleLogout = handleLogout;
//# sourceMappingURL=logoutController.js.map