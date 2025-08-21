import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/", async (req, res) => {
//   res.render("index.ejs");
// });

app.get("/", async (req, res) => {
  try {
    // const response = await axios.get(
    //   "https://covers.openlibrary.org/b/isbn/jod-M.jpg"
    // );
    // console.log(response);
    // const result = response.data;
    res.render("index.ejs");
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.post("/add-book", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const converted = name.split(" ").join("+");

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${converted}`
    );
    const result = response.data.docs[0].cover_edition_key;
    console.log(result);
    res.render("index.ejs");
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
