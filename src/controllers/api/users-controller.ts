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


export const getAllUsers = async (_req, res) => {
    const users = await getAllUsersList()


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

export const deleteUser = async (req, res) => {
    const userId = req?.body?.id
    if (!userId) {
        sendBadRequestResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.ID_REQUIRED
        })
    }

    const user = await getUserByUserId(userId)

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

export const getUser = async (req, res) => {
    const userId = req?.body?.id
    if (!userId) {
        return sendBadRequestResponse(res, {
            message: USER_LIST_RESPONSE_LABEL.ID_REQUIRED
        })
    }

    const user = await getUserByUserId(userId)

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