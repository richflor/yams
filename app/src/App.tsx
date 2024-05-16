import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Login } from "./components/views/Login";
import SignUp from "./components/views/Signup";

function App() {

  return (
    <BrowserRouter>
    <div className="main_container">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/game" element={<Game />} /> */}
        {/* <Route path="/pick" element={<PickPastries />} /> */}
        {/* <Route path="/scoreboard" element={<ChoosePastries />} /> */}
      </Routes>      
    </div>
    </BrowserRouter>
  )
}

export default App
