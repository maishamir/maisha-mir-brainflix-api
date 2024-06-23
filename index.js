import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use('/images', express.static('public/images'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
