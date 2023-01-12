import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios"
const cookies = new Cookies();

function Update() {
    const token = cookies.get("TOKEN");
    const [alert, setAlert] = useState("")
    const navigate = useNavigate();
    
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/account/delete`, {
            headers: {
              Authorization: `Bearer ${token}`
            }})
            .then(res => {
                setAlert(res.data);
                setTimeout(() => {
                    cookies.remove("TOKEN", { path: "/" });
                    navigate("/login");
                }, 1000);
            })
            .catch(err => setAlert(err.response.data));
    }
    if (token) return (
        <>
            <h1>What do you want to do ?</h1>
            <Link to="/account/update/data"><button>Account info</button></Link>
            <button onClick={handleDelete}>Delete account</button>
            <br></br>
            {alert}
        </>
        
    );
    else window.location.href = "/login"
  }
  
  export default Update;