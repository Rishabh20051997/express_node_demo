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




export const getAllTasks = async (_req, res) => {
    const taskList = await getAllTasksList()
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



export const createNewTask = async (req, res) => {
    const task = req?.body?.task
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