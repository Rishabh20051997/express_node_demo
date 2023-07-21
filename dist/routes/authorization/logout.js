"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logoutController_1 = require("../../controllers/logoutController");
const logoutRouter = (0, express_1.Router)();
logoutRouter.post('/', logoutController_1.handleLogout);
exports.default = logoutRouter;
//# sourceMappingURL=logout.js.map