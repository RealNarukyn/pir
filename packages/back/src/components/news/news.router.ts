import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../../types/fastify';
import { NewsController } from './news.controller';
import { SMain } from './news.swagger';

export const newsRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SMain, NewsController.main);
};
