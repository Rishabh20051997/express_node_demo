"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
const allowed_origins_1 = require("@config/allowed-origins");
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowed_origins_1.allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};
exports.credentials = credentials;
//# sourceMappingURL=credentials.js.map