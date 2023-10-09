import Fastify, { FastifyInstance } from 'fastify';

const server: FastifyInstance = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: 'localhost' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
