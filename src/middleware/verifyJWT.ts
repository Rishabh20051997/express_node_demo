import  jwt from 'jsonwebtoken'
import { STATUS_CODE } from '../common/constant';
import { log } from '../service/loggerService';

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(STATUS_CODE.UN_AUTHORIZED);
    const token = authHeader.split(' ')[1];
    log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(STATUS_CODE.UN_AUTHORIZED); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}