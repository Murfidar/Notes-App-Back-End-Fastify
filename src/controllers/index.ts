import { FastifyRequest, FastifyReply } from 'fastify';
import { notes } from '../data/notes';
import { v4 as uuidv4 } from 'uuid';

export const getAllNotes = async (req: MyRequest, reply: FastifyReply) => {
  return reply.code(200).send({
    status: 'success',
    data: notes,
  });
};

type MyRequest = FastifyRequest<{
  Params: { id?: string };
  Body: {
    title: string;
    tags: string[];
    body: string;
  };
}>;

export const getNoteById = async (req: MyRequest, reply: FastifyReply) => {
  const id = req.params.id;

  const note = notes.filter((el) => el.id === id)[0];

  if (note !== undefined) {
    return reply.code(200).send({
      status: 'success',
      data: {
        note,
      },
    });
  } else {
    return reply.code(404).send({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
  }
};

export const addNotes = async (req: MyRequest, reply: FastifyReply) => {
  console.log(req.body)
  const { title, tags, body } = req.body;
  const id = uuidv4();
  const date = new Date().toISOString();

  notes.push({
    id,
    title,
    createdAt: date,
    updatedAt: date,
    tags,
    body,
  });

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return reply.code(201).send({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
  } else {
    return reply.code(500).send({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
      data: {
        noteId: id,
      },
    });
  }
};

export const updateNoteById = async (req: MyRequest, reply: FastifyReply) => {
  const { id } = req.params;

  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    return reply.code(200).send({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  } else {
    return reply.code(404).send({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
  }
};

export const deleteNoteById = async (req: MyRequest, reply: FastifyReply) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return reply.code(200).send({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  } else {
    return reply.code(404).send({
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
  }
};
