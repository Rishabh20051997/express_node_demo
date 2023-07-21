"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/authController");
const authRouter = (0, express_1.Router)();
authRouter.post('/', authController_1.handleLogin);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map