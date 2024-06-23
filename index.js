import express from "express";
import cors from "cors";
import "dotenv/config";
import fs, { readv } from "fs";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/images', express.static('public/images'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

const readVideoFile = () => {
    try {
        const videoFile = fs.readFileSync('./data/videos.json');
        const videoData = JSON.parse(videoFile);
        return videoData;
    } catch (e) {
        console.log("Could not read videos.json", e)
    }
}

app.get('/videos', (req, res) => {
    try {
        const videoData = readVideoFile();
        const strippedVideoData = videoData.map((video, index) => ({
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: `images/image${index}.jpg`
        }))
        res.json(strippedVideoData)
    } catch (e) {
        console.error("Unable to handle GET /videos request: ", e);
        res.status(500).json({message: "Internal Server Error"})
    }
})

app.get('/videos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const videoData = readVideoFile();
        const video = videoData.filter(video => video.id == id)
        if (video.length === 0) {
            res.status(404).json({"message": "No video with that id exists"})
        }
        res.json(video)
    } catch (e) {
        console.error("Unable to handle GET /videos/:id request", e)
        res.status(500).json({message: "Internal Server Error"})
    }
})