import Note from "../models/Note.js"


/**
 * @desc    Get all notes
 * @route   GET /api/notes
 * @access  Public
 * @returns {Array} Array of note objects sorted by createdAt (ascending)
 */
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: 1 }); // -1 will sort in descending order (newest first)
        res.status(200).json(notes)
    } catch (error) {
        console.error(`Error in getAllNotes controller ${error}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @desc    Get a single note by ID
 * @route   GET /api/notes/:id
 * @access  Public
 * @param   {string} req.params.id - Note ID
 * @returns {Object} Note object
 * @returns {404} If note is not found
 */
export async function getNotesByID(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: `No Notes for this ${id}` })
        res.status(200).json(note)
    } catch (error) {
        console.error(`Error in getNotesByID controller - ${req.params.id}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 * @access  Public
 * @param   {string} req.body.title - Title of the note
 * @param   {string} req.body.content - Content of the note
 * @returns {Object} Newly created note
 * @returns {500} If server error occurs
 */
export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error(`Error in createNote controller - ${error}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @desc    Update an existing note by ID
 * @route   PUT /api/notes/:id
 * @access  Public
 * @param   {string} req.params.id - Note ID
 * @param   {string} req.body.title - Updated title
 * @param   {string} req.body.content - Updated content
 * @returns {Object} Updated note
 * @returns {404} If note is not found
 */
export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updatedNote) return res.status(404).json({ message: "Note Not Found please check the ID..." })
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error(`Error in updateNote Controller - ${error}`)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @desc    Delete a note by ID
 * @route   DELETE /api/notes/:id
 * @access  Public
 * @param   {string} req.params.id - Note ID
 * @returns {Object} Deleted note data
 * @returns {404} If note is not found
 */
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({ message: `Note not found for this ID ${req.params.id}` })
        res.status(201).json({ message: `Note deleted for this id ${req.params.id}`, "data": deletedNote })
    } catch (error) {
        console.error(`Error in deleteNote controller`)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

