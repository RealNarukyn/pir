import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import { FastifyApp } from '../types/fastify';
import { SIndex } from '../swagger-schemas/index.swagger';
import { tracksRouter } from './track.router';
import { bookingsRouter } from './booking.router';

export const indexRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SIndex, async (req: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });

  server.register(tracksRouter, {prefix: '/tracks'});
  server.register(bookingsRouter, {prefix: '/bookings'});
};
