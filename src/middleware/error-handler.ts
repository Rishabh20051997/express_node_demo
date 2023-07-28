import { sendServerErrorRequestResponse } from '@services/response-transmitter';
import { logEvents } from './log-events'

export const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    sendServerErrorRequestResponse(res, {
        message:  err.message
    })
}