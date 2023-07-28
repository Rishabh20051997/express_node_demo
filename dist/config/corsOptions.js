"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const strings_1 = require("@common/strings");
const allowed_origins_1 = require("@config/allowed-origins");
exports.corsOptions = {
    origin: (origin, callback) => {
        if (allowed_origins_1.allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error(strings_1.CORS_ERROR_MESSAGE));
        }
    },
    optionsSuccessStatus: 200
};
//# sourceMappingURL=corsOptions.js.map