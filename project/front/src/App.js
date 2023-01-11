import Login from "./login";
import Register from "./register";
import Game from "./game";
import { Route, Routes } from "react-router";

function App() {

  return (
  <>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/game" element={<Game/>} />
    </Routes>
  </>
  );
}

export default App;
