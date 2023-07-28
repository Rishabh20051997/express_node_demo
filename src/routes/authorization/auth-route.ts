import { Router } from 'express'

import { handleLogin } from '@controllers/auth/auth-controller'

const authRouter = Router();

authRouter.post('/', handleLogin);


export default authRouter