"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("@controllers/api/task-controller");
const taskRouter = (0, express_1.Router)();
taskRouter.route('/')
    .get(task_controller_1.getAllTasks)
    .post(task_controller_1.createNewTask);
exports.default = taskRouter;
//# sourceMappingURL=tasks-route.js.map