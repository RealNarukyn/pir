import fastify from 'fastify';

import { FastifyApp } from './types/fastify';
import { config } from './config';
import { App } from './app';

const server: FastifyApp = fastify({
  logger: config.APP.logger,
  pluginTimeout: 10000,
  disableRequestLogging: true
});

server.register(App);

server.listen(config.APP.port)
    .then((address) =>
      server.log.info(`Find API documentacion at: ${address}/api/doc`)
    )
    .catch((err) => {
      server.log.error(err);
      process.exit(1);
    });
