"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_route_1 = __importDefault(require("@routes/authorization/register-route"));
const auth_route_1 = __importDefault(require("@routes/authorization/auth-route"));
const refresh_route_1 = __importDefault(require("@routes/authorization/refresh-route"));
const logout_route_1 = __importDefault(require("@routes/authorization/logout-route"));
const employees_route_1 = __importDefault(require("@routes/api/employees-route"));
const users_route_1 = __importDefault(require("@routes/api/users-route"));
const tasks_route_1 = __importDefault(require("@routes/api/tasks-route"));
const verify_JWT_1 = require("@middleware/verify-JWT");
const response_transmitter_1 = require("@services/response-transmitter");
const _constant_1 = require("@constant");
const rootRouter = (0, express_1.Router)();
rootRouter.use('/register', register_route_1.default);
rootRouter.use('/auth', auth_route_1.default);
rootRouter.use('/refresh', refresh_route_1.default);
rootRouter.use('/logout', logout_route_1.default);
rootRouter.use(verify_JWT_1.verifyJWT);
rootRouter.use('/employees', employees_route_1.default);
rootRouter.use('/users', users_route_1.default);
rootRouter.use('/tasks', tasks_route_1.default);
rootRouter.all('*', (_req, res) => {
    response_transmitter_1.sendResponse.plainCode(res, { code: _constant_1.STATUS_CODE.NOT_FOUND });
});
exports.default = rootRouter;
//# sourceMappingURL=root.js.map