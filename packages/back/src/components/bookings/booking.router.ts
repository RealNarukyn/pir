/* eslint-disable max-len */
import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../../types/fastify';
import { BookingController } from './booking.controller';
import { SMain, SBooking, SOpenBooks, SJoinGame } from './booking.swagger';

export const bookingsRouter: FastifyPluginAsync =
    async (server: FastifyApp) => {
      server.get('/:bDate', SMain, BookingController.main);
      server.get('/:bDate/openbooks', SOpenBooks, BookingController.findOpenGames);

      server.post('/:bDate', SBooking, BookingController.booking);

      server.put('/joinGame/:bookID', SJoinGame, BookingController.joinGame);
    };
