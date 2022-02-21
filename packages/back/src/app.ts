import formBodyPlugin from 'fastify-formbody';
import mongoose from 'mongoose';
import fastifySwagger from 'fastify-swagger';

import { FastifyApp } from './types/fastify';
import { config } from './config';
import { indexRouter } from './routes/index.router';

export const App = async (server: FastifyApp) => {
  // -- Connect to the Database
  mongoose.connect(config.MONGO.dbURL)
      .then(() => console.log('Connected to Database 🖥️'))
      .catch((err) => {
        throw new Error(err);
      });

  // Swagger Options
  server.register(fastifySwagger, config.SWAGGER);

  // -- Accept Form Bodies
  server.register(formBodyPlugin);

  // -- Import all routers
  server.register(indexRouter, { prefix: '/api', });
};
