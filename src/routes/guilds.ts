import router from 'express-promise-router';
import { Request, Response } from 'express';
import { getGuildById, getGuilds, searchGuilds } from '../data/guilds';
import { ulid } from 'ulid';
import { DBObject } from '../middleware/data';

const guildRoutes = router();

guildRoutes.get('/', async (req: Request, res: Response) => {
    const db = req.app.locals.db;
    const result = await getGuilds(db);
    res.status(200).send(result);
});

interface RequestBody {
    name: string;
    subject: string;
    city: string;
}

guildRoutes.post('/', async (req: Request, res: Response) => {
    const guildBody: RequestBody = req.body;
    const db: DBObject = req.app.locals.db;
    
    if ('name' in guildBody) {
        const oldGuilds = await getGuilds(db);
        const newGuilds = oldGuilds.concat({
            name: guildBody.name,
            city: guildBody.city,
            subject:guildBody.subject,
            id: ulid()
        })
        db.setGuilds(newGuilds);
        return res.status(201).send(newGuilds);
    }

    return res.status(406).send('Request body was bad');
})

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