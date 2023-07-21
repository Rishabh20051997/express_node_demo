import { Router } from 'express'
import path from 'path'

const rootRouter = Router();

rootRouter.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default rootRouter