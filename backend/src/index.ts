import dotenv from 'dotenv';
dotenv.config();

// Entry point to initialize Express and define route handlers.

import express from "express";
import cors from "cors";
import noteController from "./controllers/noteController";

const app = express();

app.use(express.json());
app.use(cors());

app.use(noteController);

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});