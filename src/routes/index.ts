import {
  addNotes,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from '../controllers';
import { FastifyInstance } from 'fastify';

const messageSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    message: { type: 'string' },
  },
};

const addNotesSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    message: { type: 'string' },
    data: {
      nodeId: { type: 'string' },
    },
  },
};

const getNotesOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: { type: 'array' },
        },
      },
    },
  },
};

const addNotesOpts = {
  schema: {
    response: {
      200: addNotesSchema,
      500: addNotesSchema,
    },
  },
};

const getNotesByIdOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            note: { type: 'object' },
          },
        },
      },
      404: messageSchema,
    },
  },
};

const editDeleteNotesOpts = {
  schema: {
    response: {
      200: messageSchema,
      404: messageSchema,
    },
  },
};

const helloOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          ping: { type: 'string' },
        },
      },
    },
  },
};

export default async function routes(fastify: FastifyInstance) {
  fastify
    .get('/', helloOpts, async (req, reply) => {
      reply.code(200).send({ ping: 'it worked' });
    })
    .get('/notes', getNotesOpts, getAllNotes)
    .post('/notes', addNotesOpts, addNotes)
    .get('/notes/:id', getNotesByIdOpts, getNoteById)
    .put('/notes/:id', editDeleteNotesOpts, updateNoteById)
    .delete('/notes/:id', editDeleteNotesOpts, deleteNoteById);
}
