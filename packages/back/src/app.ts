import formBodyPlugin from 'fastify-formbody';
import fastifySwagger from 'fastify-swagger';

import { FastifyApp } from './types/fastify';
import { config } from './config';
import { indexRouter } from './routes/index.router';
import { DatabaseController } from './controllers/database.controller';

export const App = async (server: FastifyApp) => {
  // -- Connect to the Database
  await DatabaseController.connectDB();

  // -- Accept Form Bodies
  server.register(formBodyPlugin);

  // Swagger Options
  server.register(fastifySwagger, config.SWAGGER);

  // -- Import all routers
  server.register(indexRouter, { prefix: '/api', });
};
