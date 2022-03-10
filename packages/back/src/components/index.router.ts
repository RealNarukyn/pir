import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify';

import { fillerRouter } from './filler/filler.router';
import { tracksRouter } from './tracks/track.router';
import { bookingsRouter } from './bookings/booking.router';
import { usersRouter } from './users/user.router';
import { newsRouter } from './news/news.router';

export const router: FastifyPluginAsync = async (server: FastifyApp) => {
  // Verify from AUTH0 with BFF ( Backend From Frontend )
  server.get('/verify', {
    handler(request, reply) {
      reply.send(request.user);
    },
    preValidation: server.authenticate,
  });

  server.register(fillerRouter, {prefix: '/filler'});
  server.register(usersRouter, {prefix: '/users'});
  server.register(tracksRouter, {prefix: '/tracks'});
  server.register(bookingsRouter, {prefix: '/bookings'});
  server.register(newsRouter, {prefix: '/news'});
};
