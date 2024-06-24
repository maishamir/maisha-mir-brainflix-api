import express from 'express';
import fs from "fs";
import crypto from "crypto";

const router = express.Router();

const readVideoFile = () => {
  try {
    const videoFile = fs.readFileSync("./data/videos.json");
    const videoData = JSON.parse(videoFile);
    return videoData;
  } catch (e) {
    console.log("Could not read videos.json", e);
  }
};

router.get("/", (req, res) => {
  try {
    const videoData = readVideoFile();
    const strippedVideoData = videoData.map((video) => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    }));
    res.json(strippedVideoData);
  } catch (e) {
    console.error("Unable to handle GET /videos request: ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const videoData = readVideoFile();
    const video = videoData.find((video) => video.id == id);
    if (!video) {
      res.status(404).json({ message: "No video with that id exists" });
    } else {
      video.image = video.image;
      res.json(video);
    }
  } catch (e) {
    console.error("Unable to handle GET /videos/:id request", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const writeToVideoFile = (data) => {
  const stringifiedData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./data/videos.json", stringifiedData);
};

router.post("/", (req, res) => {
  try {
    // todo: Read video data to get the latest data
    const videoData = readVideoFile();
    // todo: Create a new object with the information from the client
    const newVideo = {
      id: crypto.randomUUID(),
      title: req.body.title,
      channel: "Maisha Mir",
      description: req.body.description,
      views: 0,
      likes: 0,
      duration: "11.51",
      video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [],
      image: "images/placeholder.jpg"
    };
    // todo: Insert the new tree into our existing video array
    videoData.push(newVideo);
    // todo: Write the new videoData to our file
    writeToVideoFile(videoData);
    res.status(201).json(newVideo);
  } catch (e) {
    console.log("Error handling POST /videos request: ", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
