import { createSlice } from "@reduxjs/toolkit";
import { deepCopy } from "./utils/index";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    todos: [],
    currentTodo: null,
    todoToAdd: null,
    searchTitle: "",
    currentIndex: -1,
    message: "",
    submitted: false,
    error: "",
    isLoading: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    isDeletingAll: false,
    isFinding: false,
  },
  reducers: {
    setCurrentTodo: (state, action) => {
      state.currentTodo = action.payload;
    },
    getCurrentTodo: (state) => {
      return state.currentTodo;
    },
    setTodoToAdd: (state, action) => {
      state.todoToAdd = action.payload;
    },
    getTotoToAdd: (state) => {
      return state.todoToAdd;
    },
    findByTitle: (state) => {
      return { ...state, isFinding: true };
    },
    findByTitleSuccessful: (state, action) => {
      return { ...state, isFinding: false };
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
    getSearchTitle: (state) => {
      return state.searchTitle;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    getCurrentIndex: (state) => {
      return state.currentIndex;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    getMessage: (state) => {
      return state.message;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
    getSubmitted: (state) => {
      return state.submitted;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    getTodos: (state) => {
      return { ...state, isLoading: true };
    },
    getTodosSuccessful: (state) => {
      return { ...state, isLoading: false };
    },
    getTodo: (state, action) => {
      return state.todos.filter((t) => (t.id = action.payload));
    },
    addTodo: (state, action) => {
      state.todos = state.todos.concat(action.payload);
      return {
        ...state,
        isAdding: true,
        todos: state.todos.concat(action.payload),
      };
    },
    addTodoSuccessful: (state, action) => {
      return {
        ...state,
        isAdding: false,
        todos: state.todos.concat(action.payload),
      };
    },
    updateTodo: (state, action) => {
      const idx = state.todos.findIndex((t) => t.id === action.payload.id);
      state.todos[idx] = action.payload.todo;
      return { ...state, isUpdating: true };
    },
    updateTodoSuccessful: (state, action) => {
      let mappings = deepCopy(state.todos);
      const idx = mappings.findIndex((t) => t._id === action.payload.id);

      if (mappings && mappings[idx]) {
        let todo = action.payload.todo;
        todo.dueDate = todo.dueDate.toISOString();
        delete todo.id;
        mappings[idx] = { ...mappings[idx], ...todo };
      }

      return { ...state, isUpdating: false, todos: mappings };
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
      return { ...state, isDeleting: true };
    },
    deleteTodoSuccessful: (state, action) => {
      let mappings = state.todos.filter((t) => t._id !== action.payload.id);
      return { ...state, isDeleting: false, todos: mappings };
    },
    deleteTodos: (state) => {
      state.todos = [];
      return { ...state, isDeletingAll: true };
    },
    deleteTodosSuccessful: (state, action) => {
      return { ...state, isDeletingAll: false };
    },
    apiErrored: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});

export const {
  setCurrentTodo,
  getCurrentTodo,
  setTodoToAdd,
  getTodoToAdd,
  findByTitle,
  setSearchTitle,
  getSearchTitle,
  findByTitleSuccessful,
  setCurrentIndex,
  getCurrentIndex,
  setMessage,
  getMessage,
  setSubmitted,
  getSubmitted,
  setTodos,
  getTodos,
  getTodosSuccessful,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  deleteTodosSuccessful,
} = storeSlice.actions;

export const selectTodos = (state) => state.store.todos;
export const selectCurrentTodo = (state) => state.store.currentTodo;
export const selectTodoToAdd = (state) => state.store.todoToAdd;
export const selectCurrentIndex = (state) => state.store.currentIndex;
export const selectSearchTitle = (state) => state.store.searchTitle;
export const selectMessage = (state) => state.store.message;
export const selectSubmitted = (state) => state.store.submitted;

export default storeSlice.reducer;
