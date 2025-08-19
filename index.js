const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const port = 5000;

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Taimoor",
    content: "Love to change thoughts into functional code!",
  },
  {
    id: uuidv4(),
    username: "Abubakar",
    content: "build to attract!",
  },
  {
    id: uuidv4(),
    username: "Alishba",
    content: "Cook for self satisfaction",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let newpost = {
    id: uuidv4(),
    username,
    content,
  };
  posts.push(newpost);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => id === p.id);
  if (post) {
    res.render("show.ejs", { post });
  } else {
    res.send("This ID is not Found");
  }
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.get("/post/:id");
app.listen(port, (req, res) => {
  console.log(`Listening to ${port}`);
});
