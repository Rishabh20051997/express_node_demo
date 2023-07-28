"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("@controllers/auth/auth-controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/', auth_controller_1.handleLogin);
exports.default = authRouter;
//# sourceMappingURL=auth-route.js.map