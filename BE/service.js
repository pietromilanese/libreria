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

//CRUD endpoints
router.get("/users", async (_req, res) => {
  getAllUser(pool).then(
    (results) => {
      res.send(results);
    },
    (error) => {
      res.status(error.status).json(error.message);
    }
  )
});

router.get("/books/:userId", async (req, res) => {
  const userId = req.params.userId;
  getAllBooks(pool, +userId).then(
    (results) => {
      res.send(results);
    },
    (error) => {
      res.status(error.status).json(error.message);
    }
  )
});

router.get("/book/detail/:userId/:bookId", async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  getSingleBook(pool, +userId, +bookId).then(
    (result) => {
      res.send(result);
    },
    (error) => {
      res.status(error.status).json(error.message);
    }
  );
});

router.post("/books/:title/:author/:isbn/:description/:numOfRead/:userId", async (req, res) => {
  const title = req.params.title;
  const author = req.params.author;
  const isbn = req.params.isbn;
  const description = req.params.description;
  const addTime = new Date();
  const deletedTime = new Date();
  const numOfRead = +req.params.numOfRead;
  const userId = +req.params.userId;

  postBook(pool, title, author, isbn, description, addTime, deletedTime, numOfRead, userId).then(
    (results) => {
      res.send(results);
    },
    (error) => {
      res.status(error.status).json(error.message);
    }
  )
});

router.delete("/books/delete/:bookId", async (req, res) => {
  const bookId = req.params.bookId;

  deleteBook(pool, +bookId).then(
    (results) => {
      res.send(results);
    },
    (error) => {
      res.status(error.status).json(error.message);
    }
  );
});


router.put("/book/update/:userId/:bookId", async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  // Extract updated book details from request body
  const { title, author, isbn, description, numOfRead } = req.body;

  // Update the book in the database
  updateBook(pool, +userId, +bookId, title, author, isbn, description, +numOfRead).then(
    (results) => {
      res.send(results);
    },
    (error) => {
      res.status(error.status).json(error.message);
    }
  );
});


//service functions
export const getAllUser = (pool) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject({ status: 500, message: 'generic error' });

      } else if (results.rows.length > 0) {
        resolve(results.rows);
      } else {
        reject({ status: 404, message: 'not found' });
      }
    })
  })
};

export const getAllBooks = (pool, userId) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM books WHERE user_id = $1', [userId], (error, results) => {
      if (error) {
        reject({ status: 500, message: 'generic error' });

      } else if (results.rows.length > 0) {
        resolve(results.rows);
      } else {
        reject({ status: 404, message: 'not found' });
      }
    })
  })
};

export const getSingleBook = (pool, userId, bookId) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM books WHERE user_id = $1 AND id = $2', [userId, bookId], (error, results) => {
      if (error) {
        reject({ status: 500, message: 'generic error' });
      } else if (results.rows.length > 0) {
        resolve(results.rows[0]);
      } else {
        reject({ status: 404, message: 'not found' });
      }
    });
  });
};

export const postBook = (pool, title, author, isbn, description, addTime, deleteTime, numOfRead, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `insert into books (title, author, isbn, description, addedTime, deletedTime, numOfRead, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [title, author, isbn, description, addTime, deleteTime, numOfRead, userId],
      (error, results) => {
        if (error) {
          console.log(error);
          reject({ status: 500, message: "generic error" });
        } else if (results.rowCount > 0) {
          resolve(
            results.rows
          );
        } else {
          reject({ status: 404, message: "not found" });
        }
      }
    )
  })
};

export const deleteBook = (pool, bookId) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM books WHERE id = $1', [bookId], (error, results) => {
      if (error) {
        console.log(error);
        reject({ status: 500, message: 'generic error' });
      } else if (results.rowCount > 0) {
        resolve({ status: 200, message: 'Book deleted successfully' });
      } else {
        reject({ status: 404, message: 'Book not found' });
      }
    });
  });
};

export const updateBook = (pool, userId, bookId, title, author, isbn, description, numOfRead) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE books SET title = $1, author = $2, isbn = $3, description = $4, numOfRead = $5 WHERE user_id = $6 AND id = $7`,
      [title, author, isbn, description, numOfRead, userId, bookId],
      (error, results) => {
        if (error) {
          console.error(error);
          reject({ status: 500, message: "generic error" });
        } else if (results.rowCount > 0) {
          resolve(results.rows);
        } else {
          reject({ status: 404, message: "not found" });
        }
      }
    );
  });
};
