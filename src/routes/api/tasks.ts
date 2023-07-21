

import { Router } from 'express'

import { getAllTasks, createNewTask } from '../../controllers/taskController'

const router = Router();

router.route('/')
    .get(getAllTasks)
    .post(createNewTask)

export default router