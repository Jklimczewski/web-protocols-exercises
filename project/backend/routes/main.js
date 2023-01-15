const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const fs = require('fs')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

const users = [];
const wordList = require("../../front/src/game/wordList.json")


router.post('/words', (req, res) => {
  const pattern = req.body.pattern
  const result = wordList.reduce((acc, curr) => {
    if (curr.includes(pattern)) acc.push(curr);
    return acc
  }, []);
  res.send(
    result.map(word => `${word} `).join('')
  )
})

router.post('/result', (req, res) => {
  const word = req.body.word
  const result = req.body.result
  fs.writeFile('logs.txt', word + " -> " + result + '\n', { flag: 'a' }, (err) => {
    if (err) throw err
});
  res.sendStatus(200);
})

router.get('/account/info', authenticateToken, (req, res) => {
  const reqUser = req.user.username;
  res.status(200).send(reqUser);
})

router.post('/register', async (req, response) => {
  let db_connect = dbo.getDb();
  const myquery = {username: req.body.username}
  await db_connect.collection("users").findOne(myquery, (async function(err, res) {
    if (err) throw err;
    else if (res != null) {
      return response.status(409).send('Name already taken');
    }
    else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        db_connect.collection("users").insertOne(user, function(err, resp){
          if (err) throw err;
          response.status(201).send();
        });
      } catch {
        response.status(500).send();
      }
    }
  }))
})

router.post('/login', async (req, response) => {
  let db_connect = dbo.getDb();
  const myquery = {username: req.body.username}
  await db_connect.collection("users").findOne(myquery, (async function(err, res) {
    if (err) throw err;
    else if (res == null) {
      return response.status(409).send('Cannot find user');
    }
    else {
      try {
        if (await bcrypt.compare(req.body.password, res.password)) {
          const accessToken = generateAccessToken(res);
          response.status(200).send({
            message: "Logging in...",
            username: res.username,
            accessToken: accessToken,
          });
        } else {
          response.status(401).send('Bad password');
        }
      } catch {
        response.status(500).send();
      }
    }
  }))
})

router.put('/account/update', authenticateToken, async (req, response) => {
  let db_connect = dbo.getDb();
  const myquery = {username: req.user.username}
  await db_connect.collection("users").findOne(myquery, (function(err, res) {
    if (err) throw err;
    else if (res == null) {
      return response.status(409).send('Error - you are not in the database!');
    }
  }))
  const myquery2 = {username: req.body.usernameChange}
  await db_connect.collection("users").findOne(myquery2, (async function(err, res) {
    if (err) throw err;
    else if (res != null) {
      return response.status(409).send('Name already taken');
    }
    else {
      try {
        let user;
        if (req.body.passwordChange == "" && req.body.usernameChange == "") return response.status(201).send();
        else if (req.body.passwordChange == "") {
          user = { username: req.body.usernameChange, password: req.user.password };
        }
        else if (req.body.usernameChange == "") {
          const hashedPassword = await bcrypt.hash(req.body.passwordChange, 10);
          user = { username: req.user.username, password: hashedPassword };
        }
        else {
          const hashedPassword = await bcrypt.hash(req.body.passwordChange, 10);
          user = { username: req.body.usernameChange, password: hashedPassword };
        }
        await db_connect.collection("users").deleteOne(myquery, function(err, resp){
          if (err) throw err;
        });
        db_connect.collection("users").insertOne(user, function(err, resp){
          if (err) throw err;
          response.status(201).send();
        });
      } catch {
        response.status(500).send();
      }
  }
}))
  // try {
  //   let user;
  //   if (req.body.passwordChange == "" && req.body.usernameChange == "") return res.status(201).send();
  //   else if (req.body.passwordChange == "") {
  //     user = { username: req.body.usernameChange, password: req.user.password };
  //   }
  //   else if (req.body.usernameChange == "") {
  //     const hashedPassword = await bcrypt.hash(req.body.passwordChange, 10);
  //     user = { username: req.user.username, password: hashedPassword };
  //   }
  //   else {
  //     const hashedPassword = await bcrypt.hash(req.body.passwordChange, 10);
  //     user = { username: req.body.usernameChange, password: hashedPassword };
  //   }
  //   users.splice(index, 1);
  //   users.push(user);
  //   res.status(201).send();
  // } catch {
  //   res.status(500).send();
  // }
})

router.delete('/account/delete', authenticateToken, async (req, response) => {
  let db_connect = dbo.getDb();
  let myquery = {username: req.user.username};
  await db_connect.collection("users").findOne(myquery, (function(err, res) {
      if (err) throw err;
      else if (res == null) response.status(409).send('Cannot find user');
      else {
        db_connect.collection("users").deleteOne(myquery, function(err, resp){
          if (err) throw err;
          else response.status(200).send('Deleting...');
      });
      }
    }))
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