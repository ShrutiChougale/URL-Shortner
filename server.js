const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let urlDatabase = {};

function generateCode(length = 5) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Simple URL Shortener</h2>
    <form method="POST" action="/shorten">
      <input name="longUrl" placeholder="Enter URL" required/>
      <button type="submit">Shorten</button>
    </form>
  `);
});

app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  const code = generateCode();
  urlDatabase[code] = longUrl;

  res.send(`Short URL: <a href="/${code}">http://localhost:${PORT}/${code}</a>`);
});

app.get("/:code", (req, res) => {
  const longUrl = urlDatabase[req.params.code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.send("Invalid URL");
  }
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
