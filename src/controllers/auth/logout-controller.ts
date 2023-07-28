import { STATUS_CODE } from '@constant';
import { LOGOUT_STRINGS } from '@common/strings';
import { deleteUserRefreshToken, getUserByRefreshToken } from '@use-cases/user-use-cases';
import { sendLogoutRequestResponse, sendPlainResponseCode } from '@services/response-transmitter';

const {
    TOKEN_MISSING,
    NO_USER_FOUND
} = LOGOUT_STRINGS


export const handleLogout = async (req, res) => {

    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return sendLogoutRequestResponse(res, { message: TOKEN_MISSING })
    }

    // Is refreshToken in db?
    const foundUser = await getUserByRefreshToken(refreshToken)

    if (!foundUser) {
        return sendLogoutRequestResponse(res, { message: NO_USER_FOUND })
    }

    // Delete refreshToken in db
    await deleteUserRefreshToken(foundUser)


    // Logout Success
    return sendPlainResponseCode(res, { code: STATUS_CODE.NO_CONTENT })
}