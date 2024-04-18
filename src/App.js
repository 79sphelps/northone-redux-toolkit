import { Switch, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/add-todo.component";
import Todo from "./components/todo.component";
import TodosList from "./components/todos-list.component";
import TodoDataService from "./services/todo.service";
import {
  getTodosSuccessful,
  setTodos,
  setCurrentIndex,
  setCurrentTodo,
  setSubmitted,
  setMessage,
} from "./redux/storeSlice";

const App = () => {
  const dispatch = useDispatch();
  const initializeTodoToAdd = () => {
    dispatch(setSubmitted(false));
    dispatch(setMessage(""));
  };

  const retrieveTodos = () => {
    TodoDataService.getTodos()
      .then((response) => {
        dispatch(setTodos(response.data));
        dispatch(setCurrentTodo(null));
        dispatch(setCurrentIndex(-1));
        dispatch(getTodosSuccessful());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          <FontAwesomeIcon icon={faHome} />
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link" onClick={() => retrieveTodos()}>
              To Do List
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/add"}
              className="nav-link"
              onClick={() => initializeTodoToAdd()}
            >
              Add <FontAwesomeIcon icon={faPlus} />
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/todos"]} component={TodosList} />
          <Route exact path="/add" component={AddTodo} />
          <Route path="/todos/:id" component={Todo} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
