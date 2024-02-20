import { Router } from "express";
import pg from "pg";
const { Pool } = pg;

export const router = Router();

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'pietro',
  host: 'localhost',
  database: 'libri',
  password: 'pietro',
  port: 5432,
});

// Error handling middleware
const handleErrors = (res, error) => {
  console.error(error);
  if (error.status) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// CRUD endpoints
router.get("/users", async (req, res) => {
  try {
    const results = await getAllUsers();
    res.send(results);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get("/books/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await getAllBooks(+userId);
    res.send(results);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get("/book/detail/:userId/:bookId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const result = await getSingleBook(+userId, +bookId);
    res.send(result);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.post("/books/:title/:author/:isbn/:description/:numOfRead/:userId", async (req, res) => {
  try {
    const { title, author, isbn, description, numOfRead, userId } = req.params;
    const results = await postBook(title, author, isbn, description, numOfRead, userId);
    res.send(results);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.delete("/books/delete/:bookId", async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const results = await deleteBook(+bookId);
    res.send(results);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.put("/book/update/:userId/:bookId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const { title, author, isbn, description, numOfRead } = req.body;
    const results = await updateBook(+userId, +bookId, title, author, isbn, description, +numOfRead);
    res.send(results);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Service functions
const getAllUsers = async () => {
  const { rows } = await pool.query('SELECT * FROM users');
  if (rows.length > 0) {
    return rows;
  } else {
    throw { status: 404, message: 'Users not found' };
  }
};

const getAllBooks = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM books WHERE user_id = $1', [userId]);
  if (rows.length > 0) {
    return rows;
  } else {
    throw { status: 404, message: 'Books not found' };
  }
};

const getSingleBook = async (userId, bookId) => {
  const { rows } = await pool.query('SELECT * FROM books WHERE user_id = $1 AND id = $2', [userId, bookId]);
  if (rows.length > 0) {
    return rows[0];
  } else {
    throw { status: 404, message: 'Book not found' };
  }
};

const postBook = async (title, author, isbn, description, numOfRead, userId) => {
  const addedTime = new Date();
  const deletedTime = new Date();
  const { rowCount } = await pool.query(
    `INSERT INTO books (title, author, isbn, description, addedTime, deletedTime, numOfRead, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [title, author, isbn, description, addedTime, deletedTime, numOfRead, userId]
  );
  if (rowCount > 0) {
    return { status: 200, message: 'Book added successfully' };
  } else {
    throw { status: 404, message: 'Book not added' };
  }
};

const deleteBook = async (bookId) => {
  const { rowCount } = await pool.query('DELETE FROM books WHERE id = $1', [bookId]);
  if (rowCount > 0) {
    return { status: 200, message: 'Book deleted successfully' };
  } else {
    throw { status: 404, message: 'Book not found' };
  }
};

const updateBook = async (userId, bookId, title, author, isbn, description, numOfRead) => {
  const { rowCount } = await pool.query(
    `UPDATE books SET title = $1, author = $2, isbn = $3, description = $4, numOfRead = $5
     WHERE user_id = $6 AND id = $7`,
    [title, author, isbn, description, numOfRead, userId, bookId]
  );
  if (rowCount > 0) {
    return { status: 200, message: 'Book updated successfully' };
  } else {
    throw { status: 404, message: 'Book not found' };
  }
};
