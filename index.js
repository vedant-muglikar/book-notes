import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let res;
let items;

async function checkList() {
  res = await db.query("SELECT * FROM book");
  items = res.rows;
}
checkList();

async function getBook(id) {
  let book;
  book = await db.query("SELECT * FROM book WHERE id = $1", [id]);
  let res = book.rows[0];
  return res;
}

app.get("/", async (req, res) => {
  await checkList();
  res.render("index.ejs", { books: items });
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.post("/add-book", async (req, res) => {
  const name = req.body.name;
  const converted = name.split(" ").join("+");
  const notes = req.body.notes;
  const rating = req.body.rating;

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${converted}`
    );
    const book_id = response.data.docs[0].cover_edition_key;

    await db.query(
      "INSERT INTO book(title, olid, note, rating)VALUES ($1, $2, $3, $4);",
      [name, book_id, notes, rating]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/view", async (req, res) => {
  let id = req.body.book_id;
  let book = await getBook(id);
  res.render("view.ejs", { book: book });
});

app.post("/edit-note", async (req, res) => {
  const note = req.body.notes;
  const id = req.body.id;
  await db.query("UPDATE book SET note=$1 WHERE id=$2", [note, id]);
  let book = await getBook(id);
  res.render("view.ejs", { book: book });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
