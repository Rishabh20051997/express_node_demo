

import { Router } from 'express'

import { taskListController, createTaskController } from '@controllers/api/task-controller'
import { taskCreateValidator } from '@serializers/validators/task-validator';

const taskRouter = Router();

taskRouter.route('/')
    .get(taskListController)
    .post(taskCreateValidator, createTaskController)

export default taskRouter