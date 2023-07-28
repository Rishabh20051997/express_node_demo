import { LOGOUT_STRINGS } from '@common/strings';
import { generateAccessToken, verifyJwtRefreshToken } from '@helpers/token-handlers';
import { deleteUserRefreshToken, getUserByRefreshToken } from '@use-cases/user-use-cases';
import { sendLoginRequestResponse, sendLogoutRequestResponse } from '@services/response-transmitter';

export const handleRefreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return sendLogoutRequestResponse(res, { message: LOGOUT_STRINGS.TOKEN_MISSING });
    }

    const foundUser = await getUserByRefreshToken(refreshToken);
    if (!foundUser) {
        //Forbidden 
        deleteUserRefreshToken(foundUser)
        return sendLogoutRequestResponse(res, { message: LOGOUT_STRINGS.NO_USER_FOUND });
    }

    // evaluate jwt 
    const { err, decoded } = await verifyJwtRefreshToken(refreshToken)

    if (err || foundUser.username !== decoded.username) {
        //Forbidden 
        deleteUserRefreshToken(foundUser)
        return sendLogoutRequestResponse(res, { message: LOGOUT_STRINGS.NO_USER_FOUND });
    }

    const roles = Object.values(foundUser?.roles || {});
    const accessToken = generateAccessToken({
        username:  decoded.username,
        roles
    })

    sendLoginRequestResponse(res, {
        user: {
            userId: foundUser._id,
            userName: foundUser.username,
            roles,
        },
        accessToken,
        refreshToken
    })
}