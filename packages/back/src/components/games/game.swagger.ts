const TAG_NAME = 'Games';

const gameSchemaResponse = {
  _id: { type: 'string' },
  trackID: { type: 'string' },
  host: { type: 'string' },
  players: { type: 'array', items: { type: 'string' } },
  date: { type: 'string' },
  initTime: { type: 'string' },
  duration: { type: 'number' },
  minSkill: { type: 'string' },
  maxSkill: { type: 'string' },
};

const proposalSchemaRequest = {
  trackID: { type: 'string' },
  host: { type: 'string' },
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

export const SProposal = {
  schema: {
    description: 'POST Call to create a new proposal to game',
    tags: [TAG_NAME],
    body: {
      type: 'object',
      properties: proposalSchemaRequest
    },
    response: {
      '201': {
        description:
            'In case the proposal game is succesfully ' +
            'created it\'ll return the proposal object',
        type: 'object',
        properties: gameSchemaResponse
      },
      '500': {
        description:
            'In case there\'s an error creating the proposal:',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
    }
  }
};
