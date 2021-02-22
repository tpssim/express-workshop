import router from 'express-promise-router';
import { Request, Response } from 'express';

const routes = router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello world');
});


export default routes;