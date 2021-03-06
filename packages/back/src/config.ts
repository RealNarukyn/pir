import { FastifyLoggerInstance } from 'fastify';
import dotenv from 'dotenv';
import pino from 'pino';

import { checkEnv } from './utils/validators';

dotenv.config();

// #region [ APP Config ]
const APP_PORT = checkEnv('PORT');
const APP_LOGGER: FastifyLoggerInstance = pino({
  name: process.env.APP_NAME || 'PIR-APP',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss',
      colorize: true,
    },
  },
});
// #endregion
const APP = { port: APP_PORT, logger: APP_LOGGER };

// #region [ MONGODB Config ]
const DB_URL = checkEnv('DB_URL');
// #endregion
const MONGO = { dbURL: DB_URL };

// [ SWAGGER Config ]
const SWAGGER = {
  routePrefix: '/api/doc',
  swagger: {
    info: {
      title: 'PIR APP - Swagger',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://github.com/fastify/fastify-swagger',
      description: 'fastify-swagger documentation'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true
};

// [ Auth 0 ]
const AUTH0 = {
  domain: checkEnv('AUTH0_DOMAIN'),
  audience: checkEnv('AUTH0_AUDIENCE'),
  scope: checkEnv('AUTH0_SCOPE')
};
export const config = { APP, MONGO, SWAGGER, AUTH0 };
