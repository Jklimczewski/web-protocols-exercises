const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

const users = [];

router.get('/users', authenticateToken, (req, res) => {
  const reqUser = req.user.username;
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
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user);
      res.status(200).send({
        message: "Logging in...",
        username: user.username,
        accessToken: accessToken,
      });
    } else {
      res.status(401).send('Bad password');
    }
  } catch {
    res.status(500).send();
  }
})


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

module.exports = router;