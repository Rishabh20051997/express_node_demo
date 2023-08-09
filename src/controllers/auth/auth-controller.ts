import { AUTHORIZATION_STRINGS } from '@common/strings';
import { compareByCryptPassword } from '@helpers/bcrypt-helper';
import { generateAccessToken, generateRefreshToken } from '@services/token-service';
import { getUserByUserName, updateUserRefreshToken } from '@use-cases/user-use-cases';
import { sendResponse, sendLoginRequestResponse } from '@services/response-transmitter';
import User from '@model/user-model'

const {
    INCORRECT_CREDENTIALS,
} = AUTHORIZATION_STRINGS


/**
 * 
 * @param {userName: string, password: string} req request from client
 * @param res response instance to be sent
 * @returns handle login using userName & password & responds back
 */
export const loginUserController = async (req: IRequest, res: IResponse) => {
    const { userName, password } : {
        userName: string
        password: string
    } = req.body;

    const foundUser = await getUserByUserName(User, { userName })

    //Unauthorized -> user doesn't exists
    if (!foundUser) {
        return sendResponse.badRequest(res, { message: INCORRECT_CREDENTIALS })
    }

    // evaluate password 
    const match = await compareByCryptPassword(password, foundUser.password)

    // if password matched
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = generateAccessToken({
            username: foundUser.username,
            roles
        })

        const refreshToken = generateRefreshToken({ username: foundUser.username })

        // Saving refreshToken with current user
        updateUserRefreshToken(refreshToken, foundUser)

        // Send authorization roles and access token to user
        sendLoginRequestResponse(res, {
            user: {
                userId: foundUser._id,
                userName,
                roles,
            },
            accessToken,
            refreshToken
        });

    } else {
        //Unauthorized -> password mis-matched
        sendResponse.badRequest(res, { message: INCORRECT_CREDENTIALS })
    }
}