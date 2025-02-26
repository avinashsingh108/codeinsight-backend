require("dotenv").config();
const express = require("express");
const cors = require("cors");
const geminiRoute = require("./src/routes/geminiRoute");
const articleRoute = require("./src/routes/articleRoute");

const app = express();

app.use(cors({
  origin: [
    "https://codeinsight-ai.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/ai", geminiRoute);
app.use("/articles", articleRoute);

app.get("/health", (req, res) => res.status(200).send("OK"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0"; 

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received: Graceful shutdown");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
  
  setTimeout(() => {
    console.error("Forcing shutdown");
    process.exit(1);
  }, 5000);
});