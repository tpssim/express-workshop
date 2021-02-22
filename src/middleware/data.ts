import { Request, Response, NextFunction } from 'express';
import memoryCache from 'memory-cache';
import mockGuilds from '../data/mocks/guilds.json';
import { Guild } from '../data/types';

export interface DBObject {
  getGuilds: () => Guild[];
  setGuilds: (guilds: Guild[]) => void;
}

const guildsKey = 'guilds_mem_key';

export const createDataMiddleware = () => {
  memoryCache.put(guildsKey, mockGuilds);
  return (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!res.locals['db']) {
      res.locals['db'] = {
        setGuilds: (newGuilds: Guild[]) => memoryCache.put(guildsKey, newGuilds),
        getGuilds: () => memoryCache.get(guildsKey)
      };
    }

    next();
  };
}