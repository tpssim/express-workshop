import mockGuilds from './mocks/guilds.json';
type Guild = typeof mockGuilds[0];

const getGuildData = async (): Promise<Guild[]> => {
  // Database operations in JavaScript are mainly asynchronous by nature
  // either through callbacks or promise-implementations.
  return Promise.resolve(mockGuilds);
}


export const getGuilds = async (): Promise<Guild[]> => {
  return getGuildData();
}


export const getGuildById = async (id: string): Promise<Guild | void> => {
  const guilds = await getGuildData();
  const match = guilds.find(item => item.id === id);

  if (!match) {
    throw Error('No guild found with ID');
  }

  return match;
}


export const searchGuilds = async (queryParam: keyof Guild, queryValue: string): Promise<Guild[]> => {
  // Search the guilds for items that match the search terms.
  return []
}