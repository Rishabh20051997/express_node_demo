import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_EXPIRE_TIME, TOKEN_EXPIRE_TIME } from '@constant';

/**
 * 
 * @param username username of user
 * @param roles roles of user assigned
 * @returns generate new access token
 */
const generateAccessToken = ({
    username,
    roles 
}: IJwtAccessTokenSignInObject['UserInfo']): string => {
    return jwt.sign(
        {
            "UserInfo": {
                "username": username,
                "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: TOKEN_EXPIRE_TIME }
    );
}

/**
 * 
 * @param username username of user
 * @returns generate new refresh token
 */
const generateRefreshToken = ({ username }: IJwtRefreshTokenSignInObject): string => {
    return jwt.sign(
        { "username": username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
    );
}


/**
 * 
 * @param username username of user
 * @returns verify if refresh token is valid
 */
const verifyJwtRefreshToken = async (refreshToken)=> {
    const result = {
        err: '',
        decoded : {} as IJwtRefreshTokenSignInObject
    } 

    await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            result.err = err
            result.decoded = decoded
        }
    );

    return result
}


/**
 * 
 * @param username username of user
 * @returns verify if access token is valid
 */
const verifyJwtAccessToken = async (token)  => {
    const result = {
        err: '',
        decoded : {} as IJwtAccessTokenSignInObject
    } 

    await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            result.err = err
            result.decoded = decoded
        }
    );

    return result
}




export {
    generateAccessToken,
    generateRefreshToken,
    verifyJwtRefreshToken,
    verifyJwtAccessToken
}