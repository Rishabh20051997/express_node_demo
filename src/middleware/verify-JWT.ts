
import { STATUS_CODE } from '@constant';
import { sendPlainResponseCode } from '@services/response-transmitter';
import { verifyJwtAccessToken } from '@helpers/token-handlers';

export const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return sendPlainResponseCode(res, {
            code: STATUS_CODE.UN_AUTHORIZED
        })
    }
    const token = authHeader.split(' ')[1];

    const { err, decoded } = await verifyJwtAccessToken(token)

    if (err) return sendPlainResponseCode(res, {
        code: STATUS_CODE.UN_AUTHORIZED
    }); //invalid token

    req.user = decoded?.UserInfo?.username;
    req.roles = decoded?.UserInfo?.roles;
    next();

}