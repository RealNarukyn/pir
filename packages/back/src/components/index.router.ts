import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify';
import { tracksRouter } from './tracks/track.router';
import { bookingsRouter } from './bookings/booking.router';
import { usersRouter } from './users/user.router';
import { newsRouter } from './news/news.router';

export const router: FastifyPluginAsync = async (server: FastifyApp) => {
  server.register(usersRouter, {prefix: '/users'});
  server.register(tracksRouter, {prefix: '/tracks'});
  server.register(bookingsRouter, {prefix: '/bookings'});
  server.register(newsRouter, {prefix: '/news'});
};
