import { Request, Response, NextFunction } from 'express';
/**
* We want to be able to easily log incoming requests in order to better
* track how our server is handling requests.
*/

export const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const message = req.method + ' ' + req.path;
    console.log(message);
    next();
} 