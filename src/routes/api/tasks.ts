

import { Router } from 'express'

import { getAllTasks, createNewTask } from '../../controllers/taskController'

const taskRouter = Router();

taskRouter.route('/')
    .get(getAllTasks)
    .post(createNewTask)

export default taskRouter