const express = require("express");
const bcrypt = require('bcrypt')
// const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

const users = [];

router.get('/users', (req, res) => {
  res.json(users);
})

router.post('/register', async (req, res) => {
  const nameExists = users.find(user => user.username === req.body.username);
  if (nameExists != null) {
    return res.status(409).send('Name already taken');
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
})

router.post('/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (user == null) {
    return res.status(409).send('Cannot find user');
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send('Logging in...');
    } else {
      res.status(401).send('Bad password');
    }
  } catch {
    res.status(500).send();
  }
})

module.exports = router;