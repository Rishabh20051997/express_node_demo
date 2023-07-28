"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_controller_1 = require("@controllers/auth/logout-controller");
const logoutRouter = (0, express_1.Router)();
logoutRouter.post('/', logout_controller_1.handleLogout);
exports.default = logoutRouter;
//# sourceMappingURL=logout-route.js.map