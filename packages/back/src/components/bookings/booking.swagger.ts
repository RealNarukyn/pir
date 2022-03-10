/* eslint-disable max-len */
const TAG_NAME = 'Bookings';

const bookingSchemaRequest = {
  trackID: { type: 'string' },
  userID: { type: 'string' },
  bName: { type: 'string' },
  bEmail: { type: 'string' },
  initTime: { type: 'string' },
  duration: { type: 'number' },
  openGame: { type: 'boolean' },
  host: { type: 'string' },
  minSkill: { type: 'string' },
  maxSkill: { type: 'string' }
};

const bookingSchemaResponse = {
  _id: { type: 'string' },
  trackID: { type: 'string' },
  userID: { type: 'string' },
  bName: { type: 'string' },
  bEmail: { type: 'string' },
  bDate: { type: 'string' },
  initTime: { type: 'string' },
  endTime: { type: 'string' },
  duration: { type: 'number' },
  openGame: { type: 'boolean' },
  host: { type: 'string' },
  players: { type: 'array', items: { type: 'string' } },
  stillJoinable: { type: 'boolean' },
  minSkill: { type: 'string' },
  maxSkill: { type: 'string' }
};

const openGameSchemaResponse = {
  _id: { type: 'string' },
  trackID: { type: 'string' },
  userID: { type: 'string' },
  bName: { type: 'string' },
  bEmail: { type: 'string' },
  bDate: { type: 'string' },
  initTime: { type: 'string' },
  endTime: { type: 'string' },
  duration: { type: 'number' },
  openGame: { type: 'boolean' },
  host: { type: 'string' },
  players: { type: 'array', items: { type: 'string' } },
  stillJoinable: { type: 'boolean' },
  minSkill: { type: 'string' },
  maxSkill: { type: 'string' },
  trackInfo: {
    type: 'object',
    properties: {
      '_id': { type: 'string' },
      'trackNum': { type: 'number' },
      'trackType': { type: 'string' }
    }
  }
};

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
        description: `In case there are no bookings the array will be empty. In case it's a **CLOSED** Game the properties: 
        - host
        - players
        - minSkill
        - maxSkill
        will be null or invalid`,
        type: 'array',
        items: {
          type: 'object',
          properties: bookingSchemaResponse
        }
      }
    }
  }
};

export const SOpenBooks = {
  schema: {
    description:
      'GET Call to recieve an array of all the ' +
      'OPEN GAMES bookings for the selected day.',
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
        description: `In case there are no open games bookings the array will be empty`,
        type: 'array',
        items: {
          type: 'object',
          properties: openGameSchemaResponse
        }
      }
    }
  }
};

export const SBooking = {
  schema: {
    description: `POST Call to create a new book for a track.
    The *userID* property it's not mandatary unless you try to book an open game.
    In case it's a **CLOSED** Game the properties:
    - openGame
    - host
    - minSkill
    - maxSkill
    Won't be necessary to be fullfilled.
    `,
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
      properties: bookingSchemaRequest
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
        description: `It'll return the created game. In case it's a **CLOSED** Game the properties: 
        - host
        - players
        - minSkill
        - maxSkill
        will be null or invalid`,
        type: 'object',
        properties: bookingSchemaResponse
      }
    }
  }
};

export const SJoinGame = {
  schema: {
    description: `PUT Call to add a new player to the open game booking`,
    tags: [TAG_NAME],
    params: {
      type: 'object',
      properties: {
        bookID: { type: 'string', description: '_id of the open game you want to join' },
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
        description: `It'll return an ok message`,
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
};
