import formBodyPlugin from 'fastify-formbody';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import fastifyAuth0Verify from 'fastify-auth0-verify';

import { FastifyApp } from './types/fastify';
import { config } from './config';
import { router } from './components/index.router';
import { DatabaseController } from './utils/database.utils';

export const App = async (server: FastifyApp) => {
  // -- Connect to the Database
  DatabaseController.connectDB();

  // -- CORS
  server.register(fastifyCors);

  // -- Accept Form Bodies
  server.register(formBodyPlugin);

  // -- Auth0 Verify
  await server.register(fastifyAuth0Verify, config.AUTH0);

  // Swagger Options
  server.register(fastifySwagger, config.SWAGGER);

  // -- Import all routers
  server.register(router, { prefix: '/api', });
};
