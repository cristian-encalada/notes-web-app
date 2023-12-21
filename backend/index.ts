import dotenv from 'dotenv';
dotenv.config();

// Entry point to initialize Express and define route handlers.

import express from "express";
import cors from "cors";
import noteController from "./src/controllers/noteController";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use(noteController);

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});