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
exports.createNewTask = exports.getAllTasks = void 0;
const constant_1 = require("../common/constant");
const Task_1 = __importDefault(require("../model/Task"));
const getAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskList = yield Task_1.default.find();
    if (!taskList)
        return res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.NO_CONTENT, message: 'No users found', data: [] });
    res.status(constant_1.STATUS_CODE.SUCCESS).json({ status: constant_1.STATUS_CODE.SUCCESS, message: 'Success', data: taskList });
});
exports.getAllTasks = getAllTasks;
const createNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.task)) {
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'Task is required' });
    }
    try {
        const result = yield Task_1.default.create({
            task: req.body.task,
        });
        res.status(constant_1.STATUS_CODE.CREATED).json({ status: constant_1.STATUS_CODE.CREATED, message: 'Success', data: result });
    }
    catch (err) {
        console.error(err);
        return res.status(constant_1.STATUS_CODE.BAD_REQUEST).json({ status: constant_1.STATUS_CODE.BAD_REQUEST, message: 'Something went wrong', error: err });
    }
});
exports.createNewTask = createNewTask;
//# sourceMappingURL=taskController.js.map