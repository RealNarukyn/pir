const TAG_NAME = 'Users';

export const SMain = {
  schema: {
    description: 'GET Call to recieve an information of a specific user',
    tags: [TAG_NAME],
    params: {
      type: 'object',
      properties: {
        authID: {
          type: 'string',
          description: 'ID from Auth0 that matches with the DB'
        }
      }
    },
    response: {
      '500': {
        description: 'Wrong authID parameter...',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
      '404': {
        description: 'No user founds with the provided authID',
        type: 'object',
        properties: {
          message: { type: 'string' },
        }
      },
      '200': {
        type: 'object',
        properties: {
          authID: { type: 'string' },
          skillLevel: { type: 'string' },
        }
      }
    }
  }
};
