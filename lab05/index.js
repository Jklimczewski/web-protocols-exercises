const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

const games = {};
app.get('/', (req, res) => {
    const player = uuidv4();
    games[player] = new Game();
    res.send("Starting the game with " + player);
});
app.get('/:game', (req, res) => {
    res.send(games[req.params.game].getBoard());
});
app.post('/:game', jsonParser, (req, res) => {
    const x = req.body.x;
    const y = req.body.y;
    console.log(x);
    console.log(y);
    res.send(games[req.params.game].insert("x", x, y));
});
app.put('/:game', jsonParser, (req, res) => {
    const x = req.body.x;
    const y = req.body.y;
    console.log(x);
    console.log(y);
    res.send(games[req.params.game].changeLast(x, y));
});
app.delete('/:game', (req, res) => {
    res.send(games[req.params.game].deleteLast());
});

app.listen(3000);

class Game {
    constructor() {
        this.board = [
            [ '', ' | ', '', ' | ', '' ],
            ['-------------'],
            [ '', ' | ', '', ' | ', '' ],
            ['-------------'],
            [ '', ' | ', '', ' | ', '' ]
        ];
        this.logs = [];
    }
    getBoard() {
        return this.board;
    }
    insert(sign, x, y) {
        if (this.checkIfFree(x, y)) {
            this.board[x*2][y*2] = sign;
            this.logs.push({"sign": sign, "x": x, "y": y})
            this.automatic(sign);
        }
        else console.log("Ruch nie wykonany: Miejsce zajęte!");
    }
    automatic(sign) {
        const getRandomInt = () => {
            const min = 0;
            const max = 3;
            return Math.floor(Math.random() * (max - min) + min);
        }
        const x2 = getRandomInt();
        const y2 = getRandomInt();
        if (this.checkIfFree(x2, y2)) {
            if (sign == "x") {
                this.board[x2*2][y2*2] = "o";
                this.logs.push({"sign": "o", "x": x2, "y": y2})
            }
            else {
                this.board[x2*2][y2*2] = "x";
                this.logs.push({"sign": "x", "x": x2, "y": y2})
            }
        } 
        else this.automatic(sign);
    }
    checkIfFree(x, y) {
        if (this.board[x*2][y*2] === '') return true;
        else return false;
    }
    deleteLast() {
        const last = this.logs.pop();
        console.log(last);
        this.board[last.x*2][last.y*2] = '';
    }
    changeLast(x, y) {
        if (this.checkIfFree(x, y)) {
            const changedSign = this.logs[this.logs.length-1].sign;
            this.deleteLast();
            this.board[x*2][y*2] = changedSign;
            this.logs.push({"sign": changedSign, "x": x, "y": y})
        }
        else console.log("Zamiana nie wykonana: Miejsce zajęte!");
    }
}