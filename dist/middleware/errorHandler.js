"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constant_1 = require("../common/constant");
const logEvents_1 = require("./logEvents");
const errorHandler = (err, req, res, next) => {
    (0, logEvents_1.logEvents)(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(constant_1.STATUS_CODE.SERVER_ERROR).json({
        status: constant_1.STATUS_CODE.SERVER_ERROR,
        message: err.message
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map