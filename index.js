
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const geminiRoute = require("./src/routes/geminiRoute");
const articleRoute = require("./src/routes/articleRoute");

const app = express();

app.use(
  cors({
    origin: ["https://codeinsight-ai.vercel.app", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use("/ai", geminiRoute);
app.use("/articles", articleRoute);

app.get('/health', (req, res) => res.sendStatus(200));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);

process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});