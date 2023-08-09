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
exports.deleteUserByUserId = exports.getUserByUserId = exports.deleteUserRefreshToken = exports.getUserByRefreshToken = exports.updateUserRefreshToken = exports.getUserByUserName = exports.getUsersList = exports.createUser = void 0;
const createUser = (User, { userName, hashedPwd, userRoles }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.create({
        "username": userName,
        "password": hashedPwd,
        "roles": userRoles
    });
});
exports.createUser = createUser;
const getUsersList = (User) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield User.find();
    return list || [];
});
exports.getUsersList = getUsersList;
const getUserByUserId = (User, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.findOne({ _id: userId }).exec();
});
exports.getUserByUserId = getUserByUserId;
const getUserByUserName = (User, { userName }) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User.findOne({ username: userName }).exec();
    return foundUser;
});
exports.getUserByUserName = getUserByUserName;
const getUserByRefreshToken = (User, { refreshToken }) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User.findOne({ refreshToken: refreshToken }).exec();
    return foundUser;
});
exports.getUserByRefreshToken = getUserByRefreshToken;
const updateUserRefreshToken = (refreshToken, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.refreshToken = refreshToken;
    return yield user.save();
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