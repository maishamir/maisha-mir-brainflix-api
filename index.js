import express from "express";
import cors from "cors";
import "dotenv/config";
import videoRoutes from './routes/videos.js'

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/images", express.static("public/images"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use('/videos', videoRoutes)