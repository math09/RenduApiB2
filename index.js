const express = require('express');
const app = express();
const port = 3000; 
app.use(express.json());

let books = [
  { id: 1, title: 'Fableheaven', author: 'Brandon Mull' },
  { id: 2, title: 'Paris 1328', author: 'Alterhis' },
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

// fetch all book
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Livre non trouvé' });
  }
  res.json(book);
});

app.listen(port, () => {
});
