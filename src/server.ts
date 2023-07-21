import 'dotenv/config'
import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'


import { logger } from './middleware/logEvents'
import { errorHandler } from './middleware/errorHandler'
import { verifyJWT } from './middleware/verifyJWT'
import { credentials } from './middleware/credentials'


import { corsOptions } from './config/corsOptions'
import { connectDB } from './config/dbConn'

import RootRoute from './routes/root'
import RegisterRoute from './routes/register'
import AuthRoute from './routes/auth'
import RefreshRoute from './routes/refresh'
import LogoutRoute from './routes/logout'
import EmployeeRoute from './routes/api/employees'
import UserRoute from './routes/api/users'
import TaskRoute from './routes/api/tasks'


const PORT = process.env.PORT || 3500;

const app = express();

// Connect to MongoDB
connectDB();

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
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});