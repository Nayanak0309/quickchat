import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";



const app = express();
const server = http.createServer(app);

//middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());


app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("✅ Server running on PORT: " + PORT));
