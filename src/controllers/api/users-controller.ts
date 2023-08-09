import {
    deleteUserByUserId,
    getUsersList,
    getUserByUserId
} from '@use-cases/user-use-cases';
import { sendResponse } from '@services/response-transmitter';
import {
    SUCCESS_RESPONSE_MESSAGE,
    USER_LIST_RESPONSE_LABEL
} from '@common/strings';
import User from '@model/user-model'


/**
 * 
 * @param req request from client
 * @param res response instance to be sent
 * @returns response back all users list who has registered the app
 */
export const userListController = async (_req: IRequest, res: IResponse) => {
    const users = await getUsersList(User)

    sendResponse.success(res, {
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
export const deleteUserController = async (req: IRequest, res: IResponse) => {
    const userId: string = req?.params?.id

    const user = await getUserByUserId(User, { userId } )

    // if user doesn't exists
    if (!user) {
        return sendResponse.badRequest(res, {
            message: USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND
        })
    }

    await deleteUserByUserId(user, userId)

    sendResponse.success(res, {
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
export const getUserController = async (req: IRequest, res: IResponse) => {
    const userId: string = req?.body?.id

    const user = await getUserByUserId(User, {userId})

    // if user doesn't exists
    if (!user) {
        return sendResponse.badRequest(res, {
            message: USER_LIST_RESPONSE_LABEL.USER_NOT_FOUND,
            data: { userId: userId }
        })
    }

    sendResponse.success(res, {
        message: SUCCESS_RESPONSE_MESSAGE,
        data: { user }
    })
}