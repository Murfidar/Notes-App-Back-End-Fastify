import {
  addNotes,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from 'controller';
import { FastifyInstance } from 'fastify';

export default async function routes(fastify: FastifyInstance) {
  fastify
    .get('/notes', getAllNotes)
    .post('/notes', addNotes)
    .get('/notes', getNoteById)
    .put('notes/:id', updateNoteById)
    .delete('/notes/:id', deleteNoteById);
}
