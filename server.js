const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const port = process.env.PORT || 8080;

// Database setup
const dbFile = process.env.DB_FILE || path.join(__dirname, 'data', 'shortlink.db');
fs.mkdirSync(path.dirname(dbFile), { recursive: true });
const db = new Database(dbFile);

db.exec(`CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE,
  url TEXT NOT NULL,
  visits INTEGER DEFAULT 0
)`);

app.use(bodyParser.json());

function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

app.post('/api/links', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: 'url required' });
  }
  const code = generateCode();
  const stmt = db.prepare('INSERT INTO links(code, url) VALUES (?, ?)');
  try {
    stmt.run(code, url);
    res.json({ code, short_url: `http://localhost:${port}/${code}` });
  } catch (err) {
    res.status(500).json({ message: 'create failed' });
  }
});

app.get('/:code', (req, res) => {
  const stmt = db.prepare('SELECT url, visits FROM links WHERE code = ?');
  const row = stmt.get(req.params.code);
  if (!row) {
    return res.status(404).send('Not found');
  }
  const update = db.prepare('UPDATE links SET visits = visits + 1 WHERE code = ?');
  update.run(req.params.code);
  res.redirect(row.url);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
