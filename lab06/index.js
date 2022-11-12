const axios = require('axios');
const prompt = require('prompt-sync')();

const names = [];
const get = () => {
    return axios.get('http://localhost:3000/').then(res => {
        const name = res.data.split(" ").at(-1);
        names.push(name);
        console.log("New game! \n Playing with: " + name);
        return name;
    })
}
const getOnGame = (name) => {
    return axios.get(`http://localhost:3000/${name}`).then(res => console.log(res.data));
}
const post = (name, obj) => {
    return axios.post(`http://localhost:3000/${name}`, obj).then(res => console.log(res.data));
}
const put = (name, obj) => {
    return axios.put(`http://localhost:3000/${name}`, obj).then(res => console.log(res.data));
}
const del = (name) => {
    return axios.delete(`http://localhost:3000/${name}`).then(res => console.log(res.data));
}

const answer = prompt("Lets play ?? (yes) ") ;
if (answer == "yes") {
    const choice = (name) => {
        console.log(" 1. Get \n 2. Post \n 3. Put \n 4. Delete \n 5. New game \n 6. Choose board \n 7. Exit");
        const makeChoice = prompt("Make a choice: ");
        if (makeChoice == 1) {
            getOnGame(name).then(() => choice(name)).catch(err => console.log(err.response.data));
        }
        else if (makeChoice == 2) {
            const x = prompt("x: ");
            const y = prompt("y: ");
            post(name, {"x": x, "y": y}).then(() => choice(name)).catch(err => console.log(err.response.data));
        }
        else if (makeChoice == 3) {
            const x = prompt("x: ");
            const y = prompt("y: ");
            put(name, {"x": x, "y": y}).then(() => choice(name)).catch(err => console.log(err.response.data));
        }
        else if (makeChoice == 4) {
            del(name).then(() => choice(name)).catch(err => console.log(err.response.data));
        }
        else if (makeChoice == 5) {
            get().then(name => choice(name));
        }
        else if (makeChoice == 6) {
            const boardsToChoose = names.reduce((acc, el, index) => {
                return [...acc, {[index]: el}]
            }, [])
            console.log(...boardsToChoose);
            const boardChoice = prompt("Which board (0,1,2 ...)? ");
            if (boardChoice < names.length) {
                getOnGame(names[boardChoice]).then(() => choice(names[boardChoice])).catch(err => console.log(err.response.data));
            }
            else {
                console.log("Wrong board choosed!");
                choice(boardChoice);
            }
        }
        else if (makeChoice == 7) {
            console.log("K, Bye!");
        }
        else choice(name);
    }
    get().then(name => choice(name));
}
else console.log(":((")