import { Router } from 'express'

import { handleRefreshToken } from '../../controllers/refreshTokenController'

const refreshRouter = Router();

refreshRouter.post('/', handleRefreshToken);

export default refreshRouter