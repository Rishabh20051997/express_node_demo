import { Router } from 'express'

import RegisterRoute from '@routes/authorization/register-route'
import AuthRoute from '@routes/authorization/auth-route'
import RefreshRoute from '@routes/authorization/refresh-route'
import LogoutRoute from '@routes/authorization/logout-route'
import EmployeeRoute from '@routes/api/employees-route'
import UserRoute from '@routes/api/users-route'
import TaskRoute from '@routes/api/tasks-route'
import { verifyJWT } from '@middleware/verify-JWT'
import { sendResponse } from '@services/response-transmitter'
import { STATUS_CODE } from '@constant'

const rootRouter = Router();

rootRouter.use('/register', RegisterRoute);
rootRouter.use('/auth', AuthRoute);
rootRouter.use('/refresh', RefreshRoute);
rootRouter.use('/logout', LogoutRoute);

rootRouter.use(verifyJWT);
rootRouter.use('/employees', EmployeeRoute);
rootRouter.use('/users', UserRoute);
rootRouter.use('/tasks', TaskRoute);


rootRouter.all('*', (_req, res) => {
    sendResponse.plainCode(res, { code: STATUS_CODE.NOT_FOUND})
});

export default rootRouter