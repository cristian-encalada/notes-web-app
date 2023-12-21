// Handles the HTTP request/response logic.

import express, { Request, Response } from "express";
import { noteService } from "../services/noteService";

const router = express.Router();

router.get("/api/notes", async (req: Request, res: Response) => {
  const notes = await noteService.getAllNotes();
  res.json(notes);
});

router.post("/api/notes", async (req: Request, res: Response) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content fields required");
  }

  try {
    const note = await noteService.createNote({ title, content, category, archived:false });
    res.json(note);
  } catch (error) {
    res.status(500).send("Something went wrong :(");
  }
});

router.put("/api/notes/:id", async (req: Request, res: Response) => {
  const { title, content, category, archived } = req.body;
  const id = parseInt(req.params.id);

  if (archived === undefined) {
    return res.status(400).send("Archived field is required");
  }

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be a valid number");
  }

  try {
    const updatedNote = await noteService.updateNote(id, {
      title,
      content,
      category,
      archived,
    });
    res.json(updatedNote);
  } catch (error) {
    res.status(500).send("Something went wrong :(");
  }
});

router.delete("/api/notes/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be a valid number");
  }

  try {
    await noteService.deleteNote(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Something went wrong :(");
  }
});

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json('The backend app is working well!. Go to /api/notes');
});

export default router;
