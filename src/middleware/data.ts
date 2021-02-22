import { Request, Response, NextFunction } from 'express';
import memoryCache from 'memory-cache';
import mockGuilds from '../data/mocks/guilds.json';
import { Guild } from '../data/types';

export interface DBObject {
  getGuilds: () => typeof mockGuilds;
  setGuilds: (guilds: Guild[]) => void;
}
export const createDataMiddleware = () => {
  memoryCache.put('guilds', mockGuilds);
  return (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!res.locals['db']) {
      res.locals['db'] = {
        setGuilds: (newGuilds: Guild[]) => memoryCache.put('guilds', newGuilds),
        getGuilds: () => memoryCache.get('guilds'),
      };
    }

    next();
  };
}