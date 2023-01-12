import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Account() {
    const token = cookies.get("TOKEN");
    const navigate = useNavigate();

    const handleLogout = () => {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/login");
    }

    if (token) return (
        <>
            <h1>Hey</h1>
            <Link to="/account/game"><button>Play</button></Link>
            <Link to="/account/update"><button>Update</button></Link>
            <button onClick={handleLogout}>Logout</button>
        </>
        
    );
    else window.location.href = "/login"
  }
  
  export default Account;