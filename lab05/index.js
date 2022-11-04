// const express = require('express');

// const app = express()

// app.get('/', (req, res) => {
//     res.send("Get request appearing\n");
// });

// app.post('/', (req, res) => {
//     res.send("Posting appearing\n");
// })

// app.listen(3001);

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
        console.log(this.board);
    }
    insert(sign, x, y) {
        if (this.checkIf(x, y)) {
            this.board[x*2][y*2] = sign;
            this.logs.push({"x": x, "y": y})

            const automatic = () => {
            const getRandomInt = () => {
                const min = 0;
                const max = 3;
                return Math.floor(Math.random() * (max - min) + min);
            }
            const x2 = getRandomInt();
            const y2 = getRandomInt();
            if (this.checkIf(x2, y2)) {
                this.board[x2*2][y2*2] = "o";
                this.logs.push({"x": x2, "y": y2})
            } 
            else automatic();
            }
            automatic();
        }
        else console.log("Ruch nie wykonany: Miejsce zajęte!");
    }
    checkIf(x, y) {
        if (this.board[x*2][y*2] === '') return true;
        else return false;
    }
    delete() {
        const last = this.logs.pop();
        console.log(last)
        this.board[last.x*2][last.y*2] = '';
    }
}

const game = new Game();
game.getBoard();
game.insert("x", 1, 1);
game.insert("x", 0, 1);
game.insert("x", 2, 1);
game.delete();
game.delete();
game.getBoard();