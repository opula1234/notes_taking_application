import express from "express"
import router from "./routes/notesRoutes";
const app = express()

app.get("/api/notes", (req, res) => {
    res.status(200).send("You got 50 notes")
});


app.post("/api/notes", (req, res) => {
    res.status(201).json({ message: "Post created successfully" });
});


app.put("/api/notes/:id", (req, res) => {
    res.status(200).json({ message: "Post updated successfully" });
});


app.delete("/api/notes/:id", (req, res) => {
    res.status(200).json({ message: "Note deleted successfully" });
});

app.listen(5001, () => {
    console.log("Server started on Port: 5001");
});