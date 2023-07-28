import 'dotenv/config'
import 'module-alias/register';
import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'


import { logger } from '@middleware/log-events'
import { errorHandler } from '@middleware/error-handler'
import { verifyJWT } from '@middleware/verify-JWT'
import { credentials } from '@middleware/credentials'


import { corsOptions } from '@config/cors-options'

import RootRoute from '@routes/root'
import RegisterRoute from '@routes/authorization/register-route'
import AuthRoute from '@routes/authorization/auth-route'
import RefreshRoute from '@routes/authorization/refresh-route'
import LogoutRoute from '@routes/authorization/logout-route'
import EmployeeRoute from '@routes/api/employees-route'
import UserRoute from '@routes/api/users-route'
import TaskRoute from '@routes/api/tasks-route'
import { log } from '@services/logger-service'


const PORT = process.env.PORT || 3500;

const app = express();

// Connect to MongoDB
try {
mongoose.connect(process.env.DATABASE_URI);
} catch(err) {
    log('DB Connection Failed : ',err );
}

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', RootRoute);
app.use('/register', RegisterRoute);
app.use('/auth', AuthRoute);
app.use('/refresh', RefreshRoute);
app.use('/logout', LogoutRoute);

app.use(verifyJWT);
app.use('/employees', EmployeeRoute);
app.use('/users', UserRoute);
app.use('/tasks', TaskRoute);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    log('Connected to MongoDB');
    app.listen(PORT, () => log(`Server running on port ${PORT}`));
})

