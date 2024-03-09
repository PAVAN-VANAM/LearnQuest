import express, { json } from "express";
import cors from "cors";
const port = 8000;

const app = express();
app.use(json());
app.use(cors());

const api = "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";

app.post("/completions", async (res, req) => {
  const options = {
    method: "POST",
    Headers: {
      Authorization: `Bearer ${api}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gtp-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    req.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log("Your server is listening at" + port));
