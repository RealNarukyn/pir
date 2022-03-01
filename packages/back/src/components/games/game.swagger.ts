const TAG_NAME = 'Games';

const gameSchemaResponse = {
  _id: { type: 'string' },
  gameType: { type: 'string' },
  host: { type: 'string' },
  players: { type: 'array', items: { type: 'string' } },
  date: { type: 'string' },
  initTime: { type: 'string' },
  duration: { type: 'number' },
  minSkill: { type: 'string' },
  maxSkill: { type: 'string' },
};

export const SMain = {
  schema: {
    description: 'GET Call to recieve an array of all the proposed games',
    tags: [TAG_NAME],
    response: {
      '200': {
        description:
        'In case there are no games the array will be empty',
        type: 'array',
        items: {
          type: 'object',
          properties: gameSchemaResponse
        }
      }
    }
  }
};
