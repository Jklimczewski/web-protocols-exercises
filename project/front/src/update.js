import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Update() {
    const token = cookies.get("TOKEN");
    const navigate = useNavigate();
    
    const handleDelete = () => {
        navigate("/login")
    }
    if (token) return (
        <>
            <h1>What do you want to do ?</h1>
            <p>Type your nick if you want to: </p>
            <input></input>
            <button>submit</button>
            <br></br><br></br>
            <Link to="/account/update/data"><button>Account info</button></Link>
            <button onClick={handleDelete}>Delete account</button>
            
        </>
        
    );
    else window.location.href = "/login"
  }
  
  export default Update;