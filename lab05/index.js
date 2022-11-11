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
    res.send(games[req.params.game].insert("x", x, y));
});
app.put('/:game', jsonParser, (req, res) => {
    const x = req.body.x;
    const y = req.body.y;
    res.send(games[req.params.game].changeLast(x, y));
});
app.delete('/:game', (req, res) => {
    res.send(games[req.params.game].deleteLast());
});

app.listen(3000);

class Game {
    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        this.logs = [];
    }
    getBoard() {
        const topLine = "--------------------\n";
        const inside = this.board.reduce((acc, el) => {
            const helper = el.reduce((acc2, place) => {
                return acc2 + " | " + place + " | "
            }, "");
            return acc + helper + "\n--------------------\n";
        }, "");
        return topLine + inside;
    }
    insert(sign, x, y) {
        if (this.checkIfFree(x, y)) {
            this.board[x][y] = sign;
            this.logs.push({"sign": sign, "x": x, "y": y})
            const your_move = this.logs[this.logs.length-1]
            const game_res_before_comp = this.checkIfWin();
            console.log(game_res_before_comp)
            if (game_res_before_comp == "") {
                const comp_move = this.automatic(sign);
                const game_res_after_comp = this.checkIfWin();
                console.log(game_res_after_comp)
                if (game_res_after_comp == "") return "Twój ruch " + JSON.stringify(your_move) + "\n" + "Ruch komputera: " + JSON.stringify(comp_move)
                else {
                    const board = this.getBoard();
                    this.clearAll();
                    return board + "\n" + game_res_before_comp + "\n" + "Nowa gra!"
                }
            }
            else {
                const board = this.getBoard();
                this.clearAll();
                return board + "\n" + game_res_before_comp + "\n" + "Nowa gra!"
            }
        }
        else return "Ruch nie wykonany: Miejsce zajęte!";
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
                this.board[x2][y2] = "o";
                this.logs.push({"sign": "o", "x": x2, "y": y2});
            }
            else {
                this.board[x2][y2] = "x";
                this.logs.push({"sign": "x", "x": x2, "y": y2});
            }
            return this.logs[this.logs.length-1]
        } 
        else return this.automatic(sign);
    }
    checkIfFree(x, y) {
        if (this.board[x][y] === ' ') return true;
        else return false;
    }
    deleteLast() {
        const last = this.logs.pop();
        this.board[last.x][last.y] = ' ';
        return "Usunąłeś ruch: " + JSON.stringify(last) + "\n"
    }
    changeLast(x, y) {
        if (this.checkIfFree(x, y)) {
            const changedSign = this.logs[this.logs.length-1].sign;
            const infoDel = this.deleteLast();
            this.board[x][y] = changedSign;
            this.logs.push({"sign": changedSign, "x": x, "y": y})
            return infoDel + "\n" + "I zmieniłeś na: " + JSON.stringify(this.logs[this.logs.length-1])
        }
        else return "Zamiana nie wykonana: Miejsce zajęte!";
    }
    clearAll() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }
    checkIfWin() {
        const inLine = () => {
            for (let i = 0; i < 3; i++) {
                let res = 0;
                for (let j = 0; j < 3; j++) {
                    if (this.board[i][j] == "x") res++;
                    else if (this.board[i][j] == "o") res--;
                }
                if (res == 3) return "X WON";
                else if (res == -3) return "O WON";
                else res = 0;
            }
            return "";
        }
        const inColumn = () => {
            for (let i = 0; i < 3; i++) {
                let res = 0;
                for (let j = 0; j < 3; j++) {
                    if (this.board[j][i] == "x") res++;
                    else if (this.board[j][i] == "o") res--;
                }
                if (res == 3) return "X WON";
                else if (res == -3) return "O WON";
                else res = 0;
            }
            return "";
        }
        const diagonal = () => {
            let res = 0;
            for (let i = 0; i < 3; i++) {
                if (this.board[i][i] == "x") res++;
                else if (this.board[i][i] == "o") res--;
            }
            if (res == 3) return "X WON";
            else if (res == -3) return "O WON";
            else res = 0;
            let j = 2;
            for (let i = 0; i < 3; i++) {
                if (this.board[i][j] == "x") res++;
                else if (this.board[i][j] == "o") res--;
                j--;
            }
            if (res == 3) return "X WON";
            else if (res == -3) return "O WON";
            else return "";
            }
        const inLineRes = inLine();
        const diagonalRes = diagonal();
        const inColumnRes = inColumn();
        if (inLineRes != "") return inLineRes;
        else if (inColumnRes != "") return inColumnRes;
        else if (diagonalRes != "") return diagonalRes;
        else return "";
    }
}