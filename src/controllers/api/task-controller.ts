import {
    createNewTaskEntry,
    getAllTasksList
} from '@use-cases/task-use-cases';
import {
    sendBadRequestResponse,
    sendNewItemCreatedRequestResponse,
    sendSuccessRequestForNoDataResponse,
    sendSuccessRequestResponse
} from '@services/response-transmitter';
import {
    SUCCESS_RESPONSE_MESSAGE,
    TASK_LIST_RESPONSE_LABEL
} from '@common/strings';



/**
 * 
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all tasks list
 */
export const getAllTasks = async (_req: IRequest, res: IResponse) => {
    const taskList = await getAllTasksList()

    // if tasks list is empty
    if (!taskList.length) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: TASK_LIST_RESPONSE_LABEL.NO_TASK,
            data: []
        })
    }

    sendSuccessRequestResponse(res, {
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
export const createNewTask = async (req: IRequest, res: IResponse) => {
    const task: string | undefined = req?.body?.task

    // if params are not proper -> return
    if (!task) {
        return sendBadRequestResponse(res, {
            message: TASK_LIST_RESPONSE_LABEL.TASK_REQUIRED
        })
    }

    try {
        const result = await createNewTaskEntry(task)
        sendNewItemCreatedRequestResponse(res, {
            message: SUCCESS_RESPONSE_MESSAGE,
            data: result
        })

    } catch (err) {
        return sendBadRequestResponse(res, {
            message: err
        })
    }
}