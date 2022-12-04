import { useState } from "react";
import Data from "./Data";
import Cookies from './js-cookie/js.cookie.mjs'

const Form = () => {
  const [name, setName] = useState("");
  const [surrname, setSurrname] = useState("");

  const handleSubmit = () => {
    Cookies.set((name+surrname), 1);
    window.location.reload();
  }

  return (
    <div>
      <Data setName={setName} setSurrname={setSurrname}/>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Form;