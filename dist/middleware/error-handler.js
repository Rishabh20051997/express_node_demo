"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_transmitter_1 = require("@services/response-transmitter");
const log_events_1 = require("./log-events");
// error handler middleware
const errorHandler = (err, req, res) => {
    (0, log_events_1.logEvents)(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    (0, response_transmitter_1.sendServerErrorRequestResponse)(res, {
        message: err.message
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map