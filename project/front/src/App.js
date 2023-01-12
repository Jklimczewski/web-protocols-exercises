import Login from "./login";
import Register from "./register";
import Game from "./game/game";
import Account from "./account"
import Update from "./update"
import Data from "./data"
import NotFound from "./notFound"
import { Route, Routes } from "react-router";

function App() {  
  return (
  <>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/account" element={<Account/>} />
      <Route path="/account/game" element={<Game/>} />
      <Route path="/account/update" element={<Update/>} />
      <Route path="/account/update/data" element={<Data/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </>
  );
}

export default App;
