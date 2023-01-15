import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

function Words() {
    const [inputted, setInput] = useState("");
    const [words, showWords] = useState("");
    
    const handleSearch = () => {
        if (inputted === "") {
            axios.get(`https://localhost:5000/words`)
            .then(res => showWords(res.data))
            .catch(err => showWords(err.response.data));
        }
        else {
            axios.post(`https://localhost:5000/words`, { pattern: inputted})
            .then(res => showWords(res.data))
            .catch(err => showWords(err.response.data));
        }
    }
    const handler = (event) => {
        setInput(event.target.value);
    }
    return (

        <>
            <h1>Type what should the word contain</h1>
            <input type='text' onChange={handler}></input>
            <button onClick={handleSearch}>Search</button>
            <br></br>
            <Link to="/login"><button>Leave</button></Link>
            <br></br>
            <p>Filtered words: </p>
            <ul>
                {words.split(" ").map(el => {
                    if (el) return (<li>{el}</li>)
                    else return null
                })}
            </ul>
        </>
        
    );
  }
  
  export default Words;