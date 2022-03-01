import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../../types/fastify';
import { GameController } from './game.controller';
import { SMain, SProposal } from './game.swagger';

export const gamesRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SMain, GameController.main);
  server.post('/', SProposal, GameController.addProposal);
};
