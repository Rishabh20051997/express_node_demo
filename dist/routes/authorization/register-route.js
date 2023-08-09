"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("@controllers/auth/register-controller");
const auth_validators_1 = require("@serializers/validators/auth-validators");
const registerRouter = (0, express_1.Router)();
registerRouter.post('/', auth_validators_1.registerUserValidator, register_controller_1.registerUserController);
exports.default = registerRouter;
//# sourceMappingURL=register-route.js.map