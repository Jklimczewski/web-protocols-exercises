const express = require('express');
const cors = require("cors")
const app = express()
app.use(cors());

const games = {};
app.get('/', (req, res) => {
    games["1"] = new Game()
    res.send("Lets start");
});
app.get('/newgame', (req, res) => {
    res.send(games["1"].getBoard());
});
    // app.post('/newgame', (req, res) => {
    //     res.send(game.insert())
    // })

// app.post('/', (req, res) => {
//     res.send("Posting appearing\n");
// })

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
        this.logs = []
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
        console.log(last)
        this.board[last.x*2][last.y*2] = '';
    }
    changeLast(x, y) {
        if (this.checkIfFree(x, y)) {
            const changedSign = this.logs[this.logs.length-1].sign
            this.deleteLast()
            this.insert(changedSign, x , y)
        }
        else console.log("Zamiana nie wykonana: Miejsce zajęte!")
    }
}

// const game = new Game();
// game.getBoard();
// game.insert("x", 1, 1);
// game.insert("x", 0, 1);
// game.insert("x", 2, 1);
// game.deleteLast();
// game.deleteLast();
// game.changeLast(1, 2)
// game.getBoard();