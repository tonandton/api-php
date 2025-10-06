var express = require("express");
var cors = require("cors");
var app = express();
// var mysql = require("mysql2");
const { Pool, Result } = require("pg");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "FirstDB",
// });

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "api-php",
  port: 5432,
});

app.use(cors());

app.use(express.json()); // ✅ สำหรับ JSON body
app.use(express.urlencoded({ extended: true })); // ✅ สำหรับ form-data

app.get("/users", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows[0]);
    console.log(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res, next) => {
  const { f_name, l_name, username, password, avatar } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (f_name, l_name, username, password, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [f_name, l_name, username, password, avatar]
    );
    res.json({ success: true, insertId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/users", async (req, res, next) => {
  const { f_name, l_name, username, password, avatar, id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET f_name = $1, l_name = $2, username = $3, password = $4, avatar = $5 WHERE id = $6 RETURNING id",
      [f_name, l_name, username, password, avatar, id]
    );
    res.json({ success: true, updatedId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// app.delete("/users", function (req, res, next) {
//   connection.query(
//     "DELETE FROM `users` WHERE id = ?",
//     [req.body.id],
//     function (err, result) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ success: true, insertId: result.insertId });
//     }
//   );
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
