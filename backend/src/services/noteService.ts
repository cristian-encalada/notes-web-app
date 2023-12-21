// Contains business logic. The services communicate with repositories for data access.
import { noteRepository } from "../repositories/noteRepository";
import { Note } from "../models/noteModel";
import { Prisma } from "@prisma/client";

// Type for the update data
type NoteUpdateData = {
  title?: string;
  content?: string;
  category?: string;
  archived?: boolean;
};

export const noteService = {
  async getAllNotes(): Promise<Note[]> {
    // Adjust the findAll method to use MySQL-specific syntax if necessary
    return noteRepository.findAll();
  },

  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    // Adjust the create method to use MySQL-specific syntax if necessary
    return noteRepository.create(data);
  },

  async updateNote(id: number, data: NoteUpdateData): Promise<Note> {
    return noteRepository.update(id, data);
  },

  async deleteNote(id: number): Promise<void> {
    // Adjust the delete method to use MySQL-specific syntax if necessary
    await noteRepository.delete(id);
  },
};
