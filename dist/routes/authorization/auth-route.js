"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("@controllers/auth/auth-controller");
const auth_validators_1 = require("@serializers/validators/auth-validators");
const authRouter = (0, express_1.Router)();
authRouter.post('/', auth_validators_1.authValidator, auth_controller_1.loginUserController);
exports.default = authRouter;
//# sourceMappingURL=auth-route.js.map