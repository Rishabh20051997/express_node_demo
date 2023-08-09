import {
    createTask,
    getTasksList
} from '@use-cases/task-use-cases';
import { sendResponse } from '@services/response-transmitter';
import {
    SUCCESS_RESPONSE_MESSAGE,
    TASK_LIST_RESPONSE_LABEL
} from '@common/strings';
import Task from "@model/task-model";



/**
 * 
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all tasks list
 */
export const taskListController = async (_req: IRequest, res: IResponse) => {
    const taskList = await getTasksList(Task)

    sendResponse.success(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: taskList
    })

}


/**
 * 
 * @param { task: string} req request from client
 * @param res response instance to be sent
 * @returns create new task entry & response back to the client
 */
export const createTaskController = async (req: IRequest, res: IResponse) => {
    const task: string = req?.body?.task

    try {
        const result = await createTask(Task, { task })
        sendResponse.createdRequest(res, {
            message: SUCCESS_RESPONSE_MESSAGE,
            data: result
        })

    } catch (err) {
        return sendResponse.serverError(res, {
            message: err
        })
    }
}