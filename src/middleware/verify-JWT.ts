
import { STATUS_CODE } from '@constant';
import { sendPlainResponseCode } from '@services/response-transmitter';
import { verifyJwtAccessToken } from '@helpers/token-handlers';


// middleware to verify access token of client
export const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return sendPlainResponseCode(res, {
            code: STATUS_CODE.UN_AUTHORIZED
        })
    }

    // retrieve actual token key
    const token = authHeader.split(' ')[1];

    const { err, decoded } = await verifyJwtAccessToken(token)

    // has error in verificcation
    if (err) return sendPlainResponseCode(res, {
        code: STATUS_CODE.UN_AUTHORIZED
    }); //invalid token

    req.user = decoded?.UserInfo?.username;
    req.roles = decoded?.UserInfo?.roles;
    next();

}