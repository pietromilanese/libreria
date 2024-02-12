const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'pietro',
  host: 'localhost',
  database: 'libri',
  password: 'pietro',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    // Example query to fetch data from a table
    const result = await pool.query('SELECT * FROM your_table_name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
