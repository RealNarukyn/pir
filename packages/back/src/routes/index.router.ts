import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import { FastifyApp } from '../types/fastify';

export const indexRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
};
