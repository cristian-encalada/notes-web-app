// Manages data access logic using Prisma.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const noteRepository = {
  async findAll() {
    return prisma.note.findMany();
  },

  async create(data: { title: string, content: string, category: string, archived: boolean }) {
    return prisma.note.create({ data });
  },

  async update(id: number, data: { title?: string, content?: string, category?: string, archived?: boolean }) {
    return prisma.note.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.note.delete({
      where: { id },
    });
  },
};