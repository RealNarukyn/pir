import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify';
import { BookingController } from '../controllers/booking.controller';
import { SMain } from '../swagger-schemas/booking.swagger';

export const bookingsRouter: FastifyPluginAsync =
    async (server: FastifyApp) => {
      server.get('/:bDate', SMain, BookingController.main);
    };
