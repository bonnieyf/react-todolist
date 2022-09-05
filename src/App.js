import { Routes, Route } from "react-router-dom";
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import TodoList from './components/TodoList.js';
import PageNotFound  from './components/PageNotFound.js';
import '@fortawesome/fontawesome-free/js/all.js';
import "./scss/all.scss"


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/todo" element={<TodoList/>}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  </>
  );
}

export default App;
