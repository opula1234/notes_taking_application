import mongoose, { mongo } from "mongoose";

/**
 * @desc    Mongoose schema for Note documents
 * @property {string} title - Title of the note (required)
 * @property {string} content - Content/body of the note (required)
 * @property {Date} createdAt - Timestamp when note was created (auto-generated)
 * @property {Date} updatedAt - Timestamp when note was last updated (auto-generated)
 */

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true } //createdAt, updatedAt
);

/**
 * @desc    Mongoose model representing the Notes collection
 * @model   Note
 * @collection notes
 */
const Note = mongoose.model("Note", noteSchema)

export default Note