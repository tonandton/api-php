var express = require("express");
var cors = require("cors");
var app = express();
var mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "FirstDB",
});

app.use(cors());

app.use(express.json()); // ✅ สำหรับ JSON body
app.use(express.urlencoded({ extended: true })); // ✅ สำหรับ form-data

app.get("/users", function (req, res, next) {
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    res.json(results);
    console.log(results);
  });
});

app.get("/users/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `users` WHERE `id` = ?",
    [id],
    function (err, res) {
      res.json(res);
    }
  );
});

app.post("/users", function (req, res, next) {
  const { f_name, l_name, username, password, avatar } = req.body;
  connection.query(
    "INSERT INTO `users`(`f_name`, `l_name`, `username`, `password`, `avatar`) VALUES (?,?,?,?,?)",
    [f_name, l_name, username, password, avatar],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, insertId: result.insertId });
    }
  );
});

app.put("/users", function (req, res, next) {
  const { f_name, l_name, username, password, avatar, id } = req.body;
  connection.query(
    "UPDATE `users` SET `f_name`= ?, `l_name`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?",
    [f_name, l_name, username, password, avatar, id],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, insertId: result.insertId });
    }
  );
});

app.delete("/users", function (req, res, next) {
  connection.query(
    "DELETE FROM `users` WHERE id = ?",
    [req.body.id],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, insertId: result.insertId });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
