"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("@controllers/auth/register-controller");
const registerRouter = (0, express_1.Router)();
registerRouter.post('/', register_controller_1.handleNewUser);
exports.default = registerRouter;
//# sourceMappingURL=register-route.js.map