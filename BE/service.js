import { Router } from "express";

import pg from "pg";

const { Pool } = pg

export const router = Router();

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'pietro',
    host: 'localhost',
    database: 'libri',
    password: 'pietro',
    port: 5432,
  });

router.get("/users", async (_req, res) => {
    getAllUser(pool).then(
      (results) => {
        res.send(results)
      },
      (error) => {
        res.status(error.status).json(error.message)
      }
    )
  })

  router.get("/books", async (_req, res) => {
    getAllBooks(pool).then(
      (results) => {
        res.send(results)
      },
      (error) => {
        res.status(error.status).json(error.message)
      }
    )
  })

router.post("/books/:title/:author/:isbn/:description/:numOfRead/:userId", async(req, res)=>{
    const title = req.params.title;
    const author = req.params.author;
    const isbn = req.params.isbn;
    const description = req.params.description;
    const addTime = new Date();
    const deletedTime = new Date();
    const numOfRead = +req.params.numOfRead;
    const userId = +req.params.userId;
    
    postBook(pool, title, author, isbn, description, addTime, deletedTime, numOfRead, userId).then(
        (results)=>{
            res.send(results)
        },
        (error) => {
            res.status(error.status).json(error.message)
        }
    )

})

  
export const getAllUser = (pool)=> {
    return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM users', (error, results) => {
            if(error) {
                reject({status: 500, message: 'generic error'})

            }else if (results.rows.length > 0) {
                resolve(results.rows)
            }else{
                
                reject({status: 404, message: 'not found'})
            }
        })
    })
}

export const getAllBooks = (pool)=> {
    return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM books', (error, results) => {
            if(error) {
                reject({status: 500, message: 'generic error'})

            }else if (results.rows.length > 0) {
                resolve(results.rows)
            }else{
                
                reject({status: 404, message: 'not found'})
            }
        })
    })
}



export const postBook = (pool, title, author, isbn, description, addTime, deleteTime, numOfRead, userId)=> {
    return new Promise((resolve, reject)=> {
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
}