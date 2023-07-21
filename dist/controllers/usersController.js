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
exports.getUser = exports.deleteUser = exports.getAllUsers = void 0;
const constant_1 = require("../common/constant");
const User_1 = __importDefault(require("../model/User"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    if (!users)
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, message: 'No users found', data: [] });
    res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, message: 'Success', data: users });
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id)) {
    }
    const user = yield User_1.default.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, message: `User ID ${req.body.id} not found` });
    }
    yield user.deleteOne({ _id: req.body.id });
    res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, message: `Success` });
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id)) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, "message": 'User ID required' });
    }
    const user = yield User_1.default.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, message: `User ID ${req.body.id} not found` });
    }
    res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, message: `Success`, data: { user } });
});
exports.getUser = getUser;
//# sourceMappingURL=usersController.js.map