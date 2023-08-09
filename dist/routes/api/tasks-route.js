"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("@controllers/api/task-controller");
const task_validator_1 = require("@serializers/validators/task-validator");
const taskRouter = (0, express_1.Router)();
taskRouter.route('/')
    .get(task_controller_1.taskListController)
    .post(task_validator_1.taskCreateValidator, task_controller_1.createTaskController);
exports.default = taskRouter;
//# sourceMappingURL=tasks-route.js.map