const express = require('express');
const app = express();
const port = 3000; 
app.use(express.json());

let books = [
  { id: 1, title: 'Fableheaven', author: 'Brandon Mull', publicationDate: '30-07-2006' },
  { id: 2, title: 'Paris 1328', author: 'Alterhis', publicationDate: '28-06-2023' },
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

// Fetch book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Livre non trouvé' });
  }
  res.json(book);
});

// Add new book
app.post('/api/books', (req, res) => {
    const { title, author, publicationDate } = req.body;
    const newBook = { id: books.length + 1, title, author, publicationDate };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update book by ID
app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, publicationDate } = req.body;
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    const updatedBook = { id: bookId, title, author, publicationDate };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
});

// Delete book by ID
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json(deletedBook);
});

app.listen(port, () => {});