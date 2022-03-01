import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../../types/fastify';
import { GameController } from './game.controller';
import { SMain } from './game.swagger';

export const gamesRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SMain, GameController.main);
};
