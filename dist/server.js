"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const log_events_1 = require("@middleware/log-events");
const error_handler_1 = require("@middleware/error-handler");
const credentials_1 = require("@middleware/credentials");
const cors_options_1 = require("@config/cors-options");
const root_1 = __importDefault(require("@routes/root"));
const logger_service_1 = require("@services/logger-service");
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
// Connect to MongoDB
try {
    mongoose_1.default.connect(process.env.DATABASE_URI);
}
catch (err) {
    (0, logger_service_1.log)('DB Connection Failed : ', err);
}
// custom middleware logger
app.use(log_events_1.logger);
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials_1.credentials);
// Cross Origin Resource Sharing
app.use((0, cors_1.default)(cors_options_1.corsOptions));
// built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: false }));
// built-in middleware for json 
app.use(express_1.default.json());
//middleware for cookies
app.use((0, cookie_parser_1.default)());
//serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));
// routes
app.use('/', root_1.default);
app.use(error_handler_1.errorHandler);
mongoose_1.default.connection.once('open', () => {
    (0, logger_service_1.log)('Connected to MongoDB');
    app.listen(PORT, () => (0, logger_service_1.log)(`Server running on port ${PORT}`));
});
//# sourceMappingURL=server.js.map