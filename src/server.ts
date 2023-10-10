import Fastify, { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import routes from './routes';

const server: FastifyInstance = Fastify({
  logger: true,
});

server.register(cors);
server.register(swagger, {
  swagger: {
    info: {
      title: 'Notes App API Docs',
      description: 'This is an api docs created using swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'Default', description: 'Default' }],
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
});

server.register(routes);

const start = async () => {
  try {
    await server.listen({ port: 3000, host: 'localhost' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
