const express = require("express");
const res = require("express/lib/response");
// const { listen } = require("express/lib/application");
// const req = require("express/lib/request");
// const res = require("express/lib/response");
// const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(express.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(cors());

app.get("/", (req, res) => {
  // res.send("this is working");
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare(
  //   "vimu11",
  //   "$2a$10$BSodqB5sRuTrHcqVmHu0NOwny2/oebkfAi3nY78G3I3QQ5.2CjOWW",
  //   function (err, res) {
  //     // res == true
  //     console.log("sucesss", res);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2a$10$BSodqB5sRuTrHcqVmHu0NOwny2/oebkfAi3nY78G3I3QQ5.2CjOWW",
  //   function (err, res) {
  //     // res = false
  //     console.log("Wrong password", res);
  //   }
  // );

  if (
    req.body.email === database.users[1].email &&
    req.body.password === database.users[1].password
  ) {
    res.json("success");
  } else {
    res.status(404).json("failed to Login");
  }
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // bcrypt.hash(password, null, null, function (err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("No such user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("No such user");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
