const TAG_NAME = 'Bookings';

export const SMain = {
  schema: {
    description:
      'GET Call to recieve an array of all the ' +
      'bookings tracks for the selected day.',
    tags: [TAG_NAME],
    params: {
      type: 'object',
      properties: {
        bDate: {
          type: 'string',
          description:
            'Date you want to check. Format **DD-MM-YYYY**'
        }
      }
    },
    response: {
      '500': {
        description:
          'Wrong bDate parameter...',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
      '200': {
        description:
        'In case there are no bookings availables the array will be empty',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            trackID: { type: 'string' },
            userID: { type: 'string' },
            bName: { type: 'string' },
            bEmail: { type: 'string' },
            bDate: { type: 'string' },
            initTime: { type: 'string' },
            duration: { type: 'string' },
          }
        }
      }
    }
  }
};
