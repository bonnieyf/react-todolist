import { Routes, Route } from "react-router-dom";
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import TodoList from './components/TodoList.js';
import Error from './components/Error.js';
import '@fortawesome/fontawesome-free/js/all.js';
import "./scss/all.scss"


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/todo" element={<TodoList/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </div>
  </>
  );
}

export default App;
