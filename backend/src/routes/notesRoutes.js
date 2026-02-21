import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote, getNotesByID } from "../controllers/notesController.js";

/**
 * @desc    Express router for Note routes
 * @routes
 *          GET     /           -> Get all notes
 *          GET     /:id        -> Get note by ID
 *          POST    /           -> Create new note
 *          PUT     /:id        -> Update note by ID
 *          DELETE  /:id        -> Delete note by ID
 * @baseRoute /api/notes
 * @access  Public
 */

const router = express.Router();

/**
 * @route   GET /
 * @desc    Get all notes
 * @access  Public
 */
router.get("/", getAllNotes)

/**
 * @route   GET /:id
 * @desc    Get single note by ID
 * @access  Public
 */
router.get("/:id", getNotesByID)

/**
 * @route   POST /
 * @desc    Create a new note
 * @access  Public
 */
router.post("/", createNote);

/**
 * @route   PUT /:id
 * @desc    Update a note by ID
 * @access  Public
 */
router.put("/:id", updateNote);

/**
 * @route   DELETE /:id
 * @desc    Delete a note by ID
 * @access  Public
 */
router.delete("/:id", deleteNote);

export default router