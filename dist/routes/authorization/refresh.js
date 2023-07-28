"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refresh_token_controller_1 = require("../../controllers/auth/refresh-token-controller");
const refreshRouter = (0, express_1.Router)();
refreshRouter.post('/', refresh_token_controller_1.handleRefreshToken);
exports.default = refreshRouter;
//# sourceMappingURL=refresh.js.map