/* eslint-disable max-len */
const TAG_NAME = 'Fillers';

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
const tracksSchemaResponse = {
  '_id': { type: 'string' },
  'trackNum': { type: 'number' },
  'trackType': { type: 'string' }
};

export const SFillBookings = {
  schema: {
    description:
      'POST Call to fill the [ bookings ] collection with 6 different bookings',
    tags: [TAG_NAME],
    body: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: 'Date you want to register. Format **YYYY-MM-DD**'
        },
        trackID: {
          type: 'string',
          description: 'Track ID for the register'
        }
      }
    },
    response: {
      '500': {
        description: 'Something went wrong...',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
      '201': {
        description: `It'll return an array with the bookings created`,
        type: 'array',
        items: {
          type: 'object',
          properties: bookingSchemaResponse
        }
      }
    }
  }
};

export const SFillTracks = {
  schema: {
    description:
      'GET Call to fill the [ tracks ] collection with 9 different tracks',
    tags: [TAG_NAME],
    params: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: 'Date you want to register. Format **YYYY-MM-DD**'
        }
      }
    },
    response: {
      '500': {
        description: 'Something went wrong...',
        type: 'object',
        properties: {
          error: { type: 'string' },
        }
      },
      '201': {
        description: `It'll return an array with the tracks created`,
        type: 'array',
        items: {
          type: 'object',
          properties: tracksSchemaResponse
        }
      }
    }
  }
};
