"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const log_events_1 = require("@middleware/log-events");
const error_handler_1 = require("@middleware/error-handler");
const verify_JWT_1 = require("@middleware/verify-JWT");
const credentials_1 = require("@middleware/credentials");
const cors_options_1 = require("@config/cors-options");
const root_1 = __importDefault(require("@routes/root"));
const register_route_1 = __importDefault(require("@routes/authorization/register-route"));
const auth_route_1 = __importDefault(require("@routes/authorization/auth-route"));
const refresh_route_1 = __importDefault(require("@routes/authorization/refresh-route"));
const logout_route_1 = __importDefault(require("@routes/authorization/logout-route"));
const employees_route_1 = __importDefault(require("@routes/api/employees-route"));
const users_route_1 = __importDefault(require("@routes/api/users-route"));
const tasks_route_1 = __importDefault(require("@routes/api/tasks-route"));
const logger_service_1 = require("@services/logger-service");
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
// Connect to MongoDB
mongoose_1.default.connect(process.env.DATABASE_URI);
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
app.use('/', express_1.default.static(path_1.default.join(__dirname, '/public')));
// routes
app.use('/', root_1.default);
app.use('/register', register_route_1.default);
app.use('/auth', auth_route_1.default);
app.use('/refresh', refresh_route_1.default);
app.use('/logout', logout_route_1.default);
app.use(verify_JWT_1.verifyJWT);
app.use('/employees', employees_route_1.default);
app.use('/users', users_route_1.default);
app.use('/tasks', tasks_route_1.default);
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    }
    else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(error_handler_1.errorHandler);
mongoose_1.default.connection.once('open', () => {
    (0, logger_service_1.log)('Connected to MongoDB');
    app.listen(PORT, () => (0, logger_service_1.log)(`Server running on port ${PORT}`));
});
//# sourceMappingURL=server.js.map