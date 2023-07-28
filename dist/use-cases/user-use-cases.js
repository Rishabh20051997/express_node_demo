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
exports.deleteUserByUserId = exports.getUserByUserId = exports.deleteUserRefreshToken = exports.getUserByRefreshToken = exports.updateUserRefreshToken = exports.getUserByUserName = exports.getAllUsersList = exports.createNewUserEntry = void 0;
const user_model_1 = __importDefault(require("@model/user-model"));
const createNewUserEntry = ({ userName, hashedPwd, userRoles }) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.create({
        "username": userName,
        "password": hashedPwd,
        "roles": userRoles
    });
});
exports.createNewUserEntry = createNewUserEntry;
const getAllUsersList = () => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield user_model_1.default.find();
    return list || [];
});
exports.getAllUsersList = getAllUsersList;
const getUserByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ _id: userId }).exec();
});
exports.getUserByUserId = getUserByUserId;
const getUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield user_model_1.default.findOne({ username: userName }).exec();
    return foundUser;
});
exports.getUserByUserName = getUserByUserName;
const getUserByRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield user_model_1.default.findOne({ refreshToken: refreshToken }).exec();
    return foundUser;
});
exports.getUserByRefreshToken = getUserByRefreshToken;
const updateUserRefreshToken = (refreshToken, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.refreshToken = refreshToken;
    yield user.save();
});
exports.updateUserRefreshToken = updateUserRefreshToken;
const deleteUserRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.refreshToken = '';
    yield user.save();
});
exports.deleteUserRefreshToken = deleteUserRefreshToken;
const deleteUserByUserId = (user, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user.deleteOne({ _id: userId });
});
exports.deleteUserByUserId = deleteUserByUserId;
//# sourceMappingURL=user-use-cases.js.map