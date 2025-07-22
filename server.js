const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

const links = {};

function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

app.post('/api/links', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: 'url required' });
  }
  const code = generateCode();
  links[code] = { url, visits: 0 };
  res.json({ code, short_url: `http://localhost:${port}/${code}` });
});

app.get('/:code', (req, res) => {
  const entry = links[req.params.code];
  if (!entry) {
    return res.status(404).send('Not found');
  }
  entry.visits += 1;
  res.redirect(entry.url);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
