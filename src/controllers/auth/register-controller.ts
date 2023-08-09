import { generateEncryptPassword } from '@helpers/bcrypt-helper';
import { getRolesOnBasisOfUserType } from '@helpers/user-type-roles-helpers';
import { createUser } from '@use-cases/user-use-cases';
import { sendResponse } from '@services/response-transmitter';
import User from '@model/user-model'




/**
 * 
 * @param {userName: string, password: string, userType: IUserTypes } req request from client
 * @param res response instance to be sent
 * @returns register new user using userName & password & responds back
 */
export const registerUserController = async (req: IRequest, res: IResponse) => {
    const { userName, password, userType } : {
        userName: string
        password: string
        userType: IUserTypes
    } = req.body;


    try {
        //encrypt the password
        const hashedPwd = await generateEncryptPassword(password)
        const userRoles = getRolesOnBasisOfUserType(userType)

        //create and store the new user
        const result = await createUser(User, {
            userName,
            hashedPwd,
            userRoles
        })
        sendResponse.createdRequest(res, {
            message: `New user ${userName} created! Please Login to continue.`,
            data: result
        })

    } catch (err) {
        sendResponse.serverError(res, { message: err.message })
    }
}