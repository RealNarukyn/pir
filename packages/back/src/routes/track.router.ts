import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../types/fastify';
import { TrackController } from '../controllers/track.controller';
import { SMain } from '../swagger-schemas/track.swagger';

export const tracksRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SMain, TrackController.main);
};
