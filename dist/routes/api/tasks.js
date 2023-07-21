"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../../controllers/taskController");
const taskRouter = (0, express_1.Router)();
taskRouter.route('/')
    .get(taskController_1.getAllTasks)
    .post(taskController_1.createNewTask);
exports.default = taskRouter;
//# sourceMappingURL=tasks.js.map