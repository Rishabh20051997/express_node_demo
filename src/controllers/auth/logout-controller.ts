import { STATUS_CODE } from '@constant';
import { LOGOUT_STRINGS } from '@common/strings';
import { deleteUserRefreshToken, getUserByRefreshToken } from '@use-cases/user-use-cases';
import { sendLogoutRequestResponse, sendPlainResponseCode } from '@services/response-transmitter';

const {
    TOKEN_MISSING,
    NO_USER_FOUND
} = LOGOUT_STRINGS

/**
 * 
 * @param {refreshToken: string} req request from client
 * @param res response instance to be sent
 * @returns handle logout using refreshToken & deletes refreshToken from user info & responds back
 */
export const handleLogout = async (req: IRequest, res: IResponse) => {

    const refreshToken: string | undefined = req?.body?.refreshToken;

    // invalid params
    if (!refreshToken) {
        return sendLogoutRequestResponse(res, { message: TOKEN_MISSING })
    }

    // Is refreshToken in db?
    const foundUser = await getUserByRefreshToken(refreshToken)

    // no user found with refresh token -> refresh token - tempered 
    if (!foundUser) {
        return sendLogoutRequestResponse(res, { message: NO_USER_FOUND })
    }

    // Delete refreshToken in db
    await deleteUserRefreshToken(foundUser)


    // Logout Success
    return sendPlainResponseCode(res, { code: STATUS_CODE.NO_CONTENT })
}