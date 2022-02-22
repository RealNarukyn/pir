const TAG_NAME = 'Tracks';

export const SMain = {
  schema: {
    description:
      'GET Call to recieve an array of all the available tracks info.',
    tags: [TAG_NAME],
    response: {
      '200': {
        description:
          'In case there are no tracks availables the array will be empty',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            '_id': { type: 'string' },
            'trackNum': { type: 'number' },
            'trackType': { type: 'string' },
            '__v': { type: 'number' }
          }
        }
      }
    }
  }
};
