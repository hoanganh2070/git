
import userRouter from './UserRoute';

import { Express } from 'express';



export const routerConfig = (app: Express) => {
    app.use('/', userRouter);
};

