import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../../types/fastify';
import { TrackController } from './track.controller';
import { SMain } from './track.swagger';

export const tracksRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SMain, TrackController.main);
};
