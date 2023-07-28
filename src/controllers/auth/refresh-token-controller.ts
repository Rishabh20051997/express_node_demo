import { LOGOUT_STRINGS } from '@common/strings';
import { generateAccessToken, verifyJwtRefreshToken } from '@helpers/token-handlers';
import { deleteUserRefreshToken, getUserByRefreshToken } from '@use-cases/user-use-cases';
import { sendLoginRequestResponse, sendLogoutRequestResponse } from '@services/response-transmitter';


/**
 * 
 * @param {refreshToken: string} req request from client
 * @param res response instance to be sent
 * @returns generates new access token using refresh token & responds back
 */
export const handleRefreshToken = async (req: IRequest, res: IResponse) => {
    const refreshToken: string | undefined = req.body.refreshToken;

    // invalid params
    if (!refreshToken) {
        return sendLogoutRequestResponse(res, { message: LOGOUT_STRINGS.TOKEN_MISSING });
    }

    const foundUser = await getUserByRefreshToken(refreshToken);

     // no user found with refresh token -> refresh token - tempered 
    if (!foundUser) {
        //Forbidden 
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

    // generates new access token
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