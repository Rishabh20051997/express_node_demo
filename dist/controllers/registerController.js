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
exports.handleNewUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../model/User"));
const constant_1 = require("../common/constant");
const loggerService_1 = require("../service/loggerService");
// body {
//     userName: '',
//     password: '',
//     userType: USER_TYPES
// }
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, userType } = req.body;
    if (!userName || !password) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({
            status: constant_1.STATUS_CODE.BAD_REQUEST,
            message: 'Username and password are required.'
        });
    }
    // check for duplicate usernames in the db
    const duplicate = yield User_1.default.findOne({ username: userName }).exec();
    //Conflict
    if (duplicate) {
        return res.status(constant_1.STATUS_CODE.CONFLICTS).json({
            status: constant_1.STATUS_CODE.CONFLICTS,
            message: 'User Already Exists. Please Login to continue'
        });
    }
    try {
        //encrypt the password
        const hashedPwd = yield bcrypt_1.default.hash(password, 10);
        let userRoles;
        if (userType === constant_1.USER_TYPES.ADMIN) {
            userRoles = {
                "Admin": 5150,
                "Editor": 1984,
                "User": 2001
            };
        }
        else if (userType === constant_1.USER_TYPES.EDITOR) {
            userRoles = {
                "Editor": 1984,
                "User": 2001
            };
        }
        else {
            // 'User'
            userRoles = {
                "Editor": 1984,
                "User": 2001
            };
        }
        //create and store the new user
        const result = yield User_1.default.create({
            "username": userName,
            "password": hashedPwd,
            "roles": userRoles
        });
        (0, loggerService_1.log)(result);
        res.status(constant_1.STATUS_CODE.CREATED).json({
            status: constant_1.STATUS_CODE.CREATED,
            message: `New user ${userName} created! Please Login to continue.`
        });
    }
    catch (err) {
        res.status(constant_1.STATUS_CODE.SERVER_ERROR).json({
            status: constant_1.STATUS_CODE.SERVER_ERROR,
            message: err.message
        });
    }
});
exports.handleNewUser = handleNewUser;
//# sourceMappingURL=registerController.js.map