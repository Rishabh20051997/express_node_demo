"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refreshTokenController_1 = require("../../controllers/refreshTokenController");
const refreshRouter = (0, express_1.Router)();
refreshRouter.post('/', refreshTokenController_1.handleRefreshToken);
exports.default = refreshRouter;
//# sourceMappingURL=refresh.js.map