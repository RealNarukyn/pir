import { FastifyPluginAsync } from 'fastify';
import { FastifyApp } from '../../types/fastify';
import { FillerController } from './filler.controller';
import { SFillBookings, SFillTracks } from './filler.swagger';

export const fillerRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/tracks', SFillTracks, FillerController.FillTracks);
  server.post('/bookings/:date', SFillBookings, FillerController.FillBookings);
};

