import { FastifyPluginAsync } from 'fastify';

import { FastifyApp } from '../../types/fastify';
import { UserController } from './user.controller';
import { SMain } from './user.swagger';

export const usersRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/:authID', SMain, UserController.main);
};
