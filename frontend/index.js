const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const SONGS_DIR = path.join(__dirname, "Songs");

// Serve static mp3 files
app.use("/songs", express.static(SONGS_DIR));

// API to return list of songs
app.get("/api/songs", (req, res) => {
  fs.readdir(SONGS_DIR, (err, files) => {
    if (err) return res.status(500).send("Failed to load songs");
    const mp3Files = files.filter(file => file.endsWith(".mp3"));
    res.json(mp3Files);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
