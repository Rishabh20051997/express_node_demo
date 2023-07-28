
import { AUTHORIZATION_STRINGS } from '@common/strings';
import { generateEncryptPassword } from '@helpers/bcrypt-helper';
import { getRolesOnBasisOfUserType } from '@helpers/user-type-roles-helpers';
import { createNewUserEntry, getUserByUserName } from '@use-cases/user-use-cases';
import {
    sendBadRequestResponse,
    sendConflictsRequestResponse,
    sendNewItemCreatedRequestResponse,
    sendServerErrorRequestResponse
} from '@services/response-transmitter';


const {
    INVALID_PARAMS,
    ALREADY_EXISTS
} = AUTHORIZATION_STRINGS

export const handleNewUser = async (req, res) => {
    const { userName, password, userType } = req.body;
    if (!userName || !password) {
        return sendBadRequestResponse(res, {
            message: INVALID_PARAMS
        })
    }

    // check for duplicate usernames in the db
    const duplicate = await getUserByUserName(userName);

    //Conflict
    if (duplicate) {
        return sendConflictsRequestResponse(res, { message: ALREADY_EXISTS })
    }

    try {
        //encrypt the password
        const hashedPwd = generateEncryptPassword(password)
        const userRoles = getRolesOnBasisOfUserType(userType)

        //create and store the new user
        const result = await createNewUserEntry({
            userName,
            hashedPwd,
            userRoles
        })

        sendNewItemCreatedRequestResponse(res, {
            message: `New user ${userName} created! Please Login to continue.`,
            data: result
        })

    } catch (err) {
        sendServerErrorRequestResponse(res, { message: err.message })
    }
}