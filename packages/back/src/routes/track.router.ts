import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import { FastifyApp } from '../types/fastify';
import { SIndex } from '../swagger-schemas/track.swagger';

export const tracksRouter: FastifyPluginAsync = async (server: FastifyApp) => {
  server.get('/', SIndex, async (req: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
};
