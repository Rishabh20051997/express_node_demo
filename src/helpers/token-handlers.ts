import jwt from 'jsonwebtoken'
import { REFRESH_TOKEN_EXPIRE_TIME, TOKEN_EXPIRE_TIME } from '@constant';

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

const generateRefreshToken = ({ username }: IJwtRefreshTokenSignInObject): string => {
    return jwt.sign(
        { "username": username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
    );
}


const verifyJwtRefreshToken = async (refreshToken)=> {
    const result = {
        err: '',
        decoded : {} as IJwtRefreshTokenSignInObject
    } 

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            result.err = err
            result.decoded = decoded
        }
    );

    return result
}

const verifyJwtAccessToken = async (token)  => {
    const result = {
        err: '',
        decoded : {} as IJwtAccessTokenSignInObject
    } 

    jwt.verify(
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