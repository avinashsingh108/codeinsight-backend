require("dotenv").config();

const express = require("express");
const cors = require("cors");
const geminiRoute = require("./src/routes/geminiRoute");
const articleRoute = require("./src/routes/articleRoute");
const app = express();
app.use(
  cors({
    origin: ["https://codeinsight-ai.vercel.app/", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use("/ai", geminiRoute);
app.use("/articles", articleRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

try {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.error("Server failed to start:", error);
}
