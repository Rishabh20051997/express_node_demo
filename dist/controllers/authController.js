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
exports.handleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../model/User"));
const constant_1 = require("../common/constant");
const loggerService_1 = require("../service/loggerService");
// body {
//     userName: '',
//     password: ''
// }
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({
            status: constant_1.STATUS_CODE.BAD_REQUEST,
            message: 'Username and password are required.'
        });
    }
    const foundUser = yield User_1.default.findOne({ username: userName }).exec();
    //Unauthorized
    if (!foundUser) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({
            status: constant_1.STATUS_CODE.BAD_REQUEST,
            message: 'User Name or Password is incorrect'
        });
    }
    // evaluate password 
    const match = yield bcrypt_1.default.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jsonwebtoken_1.default.sign({
            "UserInfo": {
                "username": foundUser.username,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: constant_1.TOKEN_EXPIRE_TIME });
        const refreshToken = jsonwebtoken_1.default.sign({ "username": foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: constant_1.REFRESH_TOKEN_EXPIRE_TIME });
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = yield foundUser.save();
        (0, loggerService_1.log)(result);
        (0, loggerService_1.log)(roles);
        // Send authorization roles and access token to user
        res.status(constant_1.STATUS_CODE.SUCCESS).json({ user: {
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
        res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({
            status: constant_1.STATUS_CODE.BAD_REQUEST,
            message: 'User Name or Password is incorrect'
        });
    }
});
exports.handleLogin = handleLogin;
//# sourceMappingURL=authController.js.map