import { STATUS_CODE } from '../common/constant';
import { logEvents } from './logEvents'

export const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS_CODE.SERVER_ERROR,
        message: err.message
    });
}