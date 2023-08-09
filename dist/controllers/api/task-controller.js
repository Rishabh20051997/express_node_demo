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
exports.createTaskController = exports.taskListController = void 0;
const task_use_cases_1 = require("@use-cases/task-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const strings_1 = require("@common/strings");
const task_model_1 = __importDefault(require("@model/task-model"));
/**
 *
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all tasks list
 */
const taskListController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskList = yield (0, task_use_cases_1.getTasksList)(task_model_1.default);
    response_transmitter_1.sendResponse.success(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: taskList
    });
});
exports.taskListController = taskListController;
/**
 *
 * @param { task: string} req request from client
 * @param res response instance to be sent
 * @returns create new task entry & response back to the client
 */
const createTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const task = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.task;
    try {
        const result = yield (0, task_use_cases_1.createTask)(task_model_1.default, { task });
        response_transmitter_1.sendResponse.createdRequest(res, {
            message: strings_1.SUCCESS_RESPONSE_MESSAGE,
            data: result
        });
    }
    catch (err) {
        return response_transmitter_1.sendResponse.serverError(res, {
            message: err
        });
    }
});
exports.createTaskController = createTaskController;
//# sourceMappingURL=task-controller.js.map