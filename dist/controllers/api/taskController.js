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
exports.createNewTask = exports.getAllTasks = void 0;
const task_use_cases_1 = require("@use-cases/task-use-cases");
const response_transmitter_1 = require("@services/response-transmitter");
const strings_1 = require("@common/strings");
const getAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskList = yield (0, task_use_cases_1.getAllTasksList)();
    if (!taskList.length) {
        return (0, response_transmitter_1.sendSuccessRequestForNoDataResponse)(res, {
            message: strings_1.TASK_LIST_RESPONSE_LABEL.NO_TASK,
            data: []
        });
    }
    (0, response_transmitter_1.sendSuccessRequestResponse)(res, {
        message: strings_1.SUCCESS_RESPONSE_MESSAGE,
        data: taskList
    });
});
exports.getAllTasks = getAllTasks;
const createNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const task = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.task;
    if (!task) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.TASK_LIST_RESPONSE_LABEL.TASK_REQUIRED
        });
    }
    try {
        const result = yield (0, task_use_cases_1.createNewTaskEntry)(task);
        (0, response_transmitter_1.sendNewItemCreatedRequestResponse)(res, {
            message: strings_1.SUCCESS_RESPONSE_MESSAGE,
            data: result
        });
    }
    catch (err) {
        return (0, response_transmitter_1.sendBadRequestResponse)(res, {
            message: strings_1.SOMETHING_WENT_WRONG_MESSAGE
        });
    }
});
exports.createNewTask = createNewTask;
//# sourceMappingURL=taskController.js.map