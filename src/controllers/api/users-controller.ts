import {
    deleteUserByUserId,
    getAllUsersList,
    getUserByUserId
} from '@use-cases/user-use-cases';
import {
    sendBadRequestResponse,
    sendSuccessRequestResponse,
    sendSuccessRequestForNoDataResponse
} from '@services/response-transmitter';
import {
    SUCCESS_RESPONSE_MESSAGE,
    USER_LIST_RESPONSE_LABEL
} from '@common/strings';


/**
 * 
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all users list who has registered the app
 */
export const getAllUsers = async (_req: IRequest, res: IResponse) => {
    const users = await getAllUsersList()

    // if user list is empty
    if (!users.length) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.NO_USER,
            data: []
        })
    }

    sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: users
    })
}


/**
 * 
 * @param {id: string} req request from client
 * @param res response instance to be sent
 * @returns delete the existing user if present & response back to client
 */
export const deleteUser = async (req: IRequest, res: IResponse) => {
    const userId: string | undefined = req?.body?.id

    // invalid params
    if (!userId) {
        sendBadRequestResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.ID_REQUIRED
        })
    }

    const user = await getUserByUserId(userId)

    // if user doesn't exists
    if (!user) {
        return sendBadRequestResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND
        })
    }

    await deleteUserByUserId(user, userId)

    sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: ''
    })
}

/**
 * 
 * @param {id: string} req request from client
 * @param res response instance to be sent
 * @returns find users using id & sends back user info
 */
export const getUser = async (req: IRequest, res: IResponse) => {
    const userId: string | undefined = req?.body?.id

     // invalid params
    if (!userId) {
        return sendBadRequestResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.ID_REQUIRED
        })
    }

    const user = await getUserByUserId(userId)

    // if user doesn't exists
    if (!user) {
        return sendSuccessRequestForNoDataResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND,
            data: { userId: userId }
        })
    }

    sendSuccessRequestResponse(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: { user }
    })
}