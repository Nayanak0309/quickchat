import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config(); // Make sure this runs BEFORE connectDB()

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.get("/api/status", (req, res) => res.send("Server is live"));

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("✅ Server running on PORT: " + PORT));
