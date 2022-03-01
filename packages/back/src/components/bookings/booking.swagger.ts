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
          description: 'Date you want to check. Format **YYYY-MM-DD**'
        }
      }
    },
    response: {
      '500': {
        description: 'Wrong bDate parameter...',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
      '200': {
        description:
        'In case there are no bookings the array will be empty',
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

export const SBooking = {
  schema: {
    description: 'POST Call to create a new book for a track',
    tags: [TAG_NAME],
    params: {
      type: 'object',
      properties: {
        bDate: {
          type: 'string',
          description: 'Date you want to book. Format **YYYY-MM-DD**'
        }
      }
    },
    body: {
      type: 'object',
      description:
        'Everyfield is mandatory EXCEPT userID, in case there\'s '+
        'no user logged you can\'t send an userID',
      properties: {
        trackID: { type: 'string' },
        userID: { type: 'string' },
        bName: { type: 'string' },
        bEmail: { type: 'string' },
        initTime: { type: 'string' },
        duration: { type: 'number' }
      }
    },
    response: {
      '500': {
        description:
          'Wrong query...',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
      '200': {
        description: 'It will return the created book',
        type: 'object',
        properties: {
          trackID: { type: 'string' },
          userID: { type: 'string' },
          bName: { type: 'string' },
          bEmail: { type: 'string' },
          bDate: { type: 'string' },
          initTime: { type: 'number' },
          duration: { type: 'string' },
        }
      }
    }
  }
};
