import { sendServerErrorRequestResponse } from '@services/response-transmitter';
import { logEvents } from './log-events'


// error handler middleware
export const errorHandler = (err, req, res) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    sendServerErrorRequestResponse(res, {
        message:  err.message
    })
}