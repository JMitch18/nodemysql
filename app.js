const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodemysql"
});

// Connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected...");
});

const app = express();

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Database created....");
  });
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});

// Create table
app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

// Insert post 1
app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is post number one" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("added post 1");
  });
});

// Insert post 1
app.get("/addpost2", (req, res) => {
  let post = { title: "Post Two", body: "This is post number two" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("added post 2");
  });
});

// Select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Posts fetched...");
  });
});

// Select single post
app.get("/getposts/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Post fetched...");
  });
});

// Update post

app.get("/updateposts/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${
    req.params.id
  }`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Post updated...");
  });
});

// Delete post
app.get("/deleteposts/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Post deleted...");
  });
});

// port
app.listen("3000", () => {
  console.log("Server started on port 3000");
});
