import { STATUS_CODE } from '../common/constant';
import User from '../model/User'
import { log } from '../service/loggerService';


export const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(STATUS_CODE.LOGOUT).json({
            status: STATUS_CODE.LOGOUT, // session expire code
            message: 'Token Missing'
        });
    }

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        return res.status(STATUS_CODE.LOGOUT).json({
            status: STATUS_CODE.LOGOUT, // session expire code
            message: 'Log out'
        });

    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    log(result);

    return res.sendStatus(STATUS_CODE.NO_CONTENT)
}