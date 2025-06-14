const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let letters = [];
let nextId = 1; // For generating unique IDs

// POST /api/letters endpoint
app.post('/api/letters', (req, res) => {
  const { content, tag } = req.body;

  if (!content || !tag) {
    return res.status(400).json({ error: 'Content and tag are required' });
  }

  const newLetter = {
    id: nextId++,
    content,
    tag,
    timestamp: new Date().toISOString(),
  };

  letters.push(newLetter);
  res.status(201).json(newLetter);
});

// GET /api/letters endpoint
app.get('/api/letters', (req, res) => {
  const { tag } = req.query;

  if (tag) {
    const filteredLetters = letters.filter(letter => letter.tag.toLowerCase() === tag.toLowerCase());
    return res.status(200).json(filteredLetters);
  }

  res.status(200).json(letters);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
