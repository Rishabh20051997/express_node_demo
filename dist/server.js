"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const logEvents_1 = require("./middleware/logEvents");
const errorHandler_1 = require("./middleware/errorHandler");
const verifyJWT_1 = require("./middleware/verifyJWT");
const credentials_1 = require("./middleware/credentials");
const corsOptions_1 = require("./config/corsOptions");
const dbConn_1 = require("./config/dbConn");
const root_1 = __importDefault(require("./routes/root"));
const register_1 = __importDefault(require("./routes/authorization/register"));
const auth_1 = __importDefault(require("./routes/authorization/auth"));
const refresh_1 = __importDefault(require("./routes/authorization/refresh"));
const logout_1 = __importDefault(require("./routes/authorization/logout"));
const employees_1 = __importDefault(require("./routes/api/employees"));
const users_1 = __importDefault(require("./routes/api/users"));
const tasks_1 = __importDefault(require("./routes/api/tasks"));
const loggerService_1 = require("./service/loggerService");
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
// Connect to MongoDB
(0, dbConn_1.connectDB)();
// custom middleware logger
app.use(logEvents_1.logger);
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials_1.credentials);
// Cross Origin Resource Sharing
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
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
app.use('/register', register_1.default);
app.use('/auth', auth_1.default);
app.use('/refresh', refresh_1.default);
app.use('/logout', logout_1.default);
app.use(verifyJWT_1.verifyJWT);
app.use('/employees', employees_1.default);
app.use('/users', users_1.default);
app.use('/tasks', tasks_1.default);
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
app.use(errorHandler_1.errorHandler);
mongoose_1.default.connection.once('open', () => {
    (0, loggerService_1.log)('Connected to MongoDB');
    app.listen(PORT, () => (0, loggerService_1.log)(`Server running on port ${PORT}`));
});
//# sourceMappingURL=server.js.map