import router from 'express-promise-router';
import { Request, Response } from 'express';
import { getGuildById, getGuilds, searchGuilds } from '../data/guilds';

const guildRoutes = router();

guildRoutes.get('/', async (req: Request, res: Response) => {
    const db = req.app.locals.db;
    const result = await getGuilds(db);
    res.status(200).send(result);
});

guildRoutes.get('/:id', async (req: Request, res: Response) => {
    const db = req.app.locals.db;
    const id = req.params.id;
    const result = await getGuildById(db, id);
    res.status(200).send(result);
});

guildRoutes.get('/:key/:value', async (req: Request, res: Response) => {
    const db = req.app.locals.db;
    const key = req.params.key;
    const value = req.params.value;
    const result = await searchGuilds(db, key, value);
    res.status(200).send(result);
});

export default guildRoutes;