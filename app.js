require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

app.post("/api/v1/people", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Please enter a name." });
    return;
  }
  if (!req.body.age) {
    res.status(400).json({ error: "Please provide age." });
    return;
  }
  req.body.index = people.length;
  people.push(req.body);

  res
    .status(201)
    .json({ message: "A person record was added", index: req.body.index });
});

app.get("/api/v1/people/", (req, res) => {
  res.json(people);
});

app.get("/api/v1/people/:id", (req, res) => {
  const index = req.params.id;
  if (isNaN(index) || index >= people.length) {
    res
      .status(404)
      .json({ message: "The user with the id {index} does not exist" });
    return;
  }
  res.json(people[index]);
});

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports = { app, server };
