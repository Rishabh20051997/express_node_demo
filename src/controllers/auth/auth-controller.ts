import { AUTHORIZATION_STRINGS } from '@common/strings';
import { compareByCryptPassword } from '@helpers/bcrypt-helper';
import { generateAccessToken, generateRefreshToken } from '@helpers/token-handlers';
import { getUserByUserName, updateUserRefreshToken } from '@use-cases/user-use-cases';
import { sendBadRequestResponse, sendLoginRequestResponse } from '@services/response-transmitter';

const {
    INCORRECT_CREDENTIALS,
    INVALID_PARAMS
} = AUTHORIZATION_STRINGS


export const handleLogin = async (req, res) => {
    const { userName, password } = req.body;

    // validation params
    if (!userName || !password) {
        return sendBadRequestResponse(res, { message: INVALID_PARAMS })
    }

    const foundUser = await getUserByUserName(userName)

    //Unauthorized
    if (!foundUser) {
        return sendBadRequestResponse(res, { message: INCORRECT_CREDENTIALS })
    }

    // evaluate password 
    const match = await compareByCryptPassword(password, foundUser.password)

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
        //Unauthorized
        sendBadRequestResponse(res, { message: INCORRECT_CREDENTIALS })
    }
}