const TAG_NAME = 'News';

const newsSchemaResponse = {
  _id: { type: 'string' },
  created_at: { type: 'string' },
  updated_at: { type: 'string' },
  title: { type: 'string' },
  body: { type: 'string' },
  author: { type: 'string' },
};

export const SMain = {
  schema: {
    description: 'GET Call to recieve an array of all the news',
    tags: [TAG_NAME],
    response: {
      '200': {
        description:
        'In case there are no news the array will be empty',
        type: 'array',
        items: {
          type: 'object',
          properties: newsSchemaResponse
        }
      }
    }
  }
};
