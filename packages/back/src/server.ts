import fastify from 'fastify';

const server = fastify({
  logger: { prettyPrint: true },
  disableRequestLogging: true,
});

// server.register(main_app);

server.listen(5000, '0.0.0.0');
