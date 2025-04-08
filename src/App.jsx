import './App.css'
import Header from './components/Header';
// import TestComp from './components/TestComp';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useReducer, useCallback, useMemo, createContext, useEffect } from 'react';
import axios from 'axios';

const initialState = [];

const reducer = (state, action) => {

  switch(action.type) {
    case "INIT":
      return action.newItem;
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((it) => it.id === action.targetId ? {...it, isDone: action.completed} : it);
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default : return state;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  console.log("App Start");
  
  const [todo, dispatch] = useReducer(reducer, initialState);

  const onCreate = async (content) => {
    if (!content.trim()) return;

    try {
      const res = await axios.post('http://localhost:3001/api/todos', {content});

      dispatch({type: "CREATE", newItem: res.data});
    } catch (err) {
      console.log("App.jsx: 추가 실패- ", err);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/todos').then((res) => {
      console.log("서버 연결 성공!");
      dispatch({type: "INIT", newItem: res.data});
    })
    .catch((err) => console.log('App.jsx: 목록 불러오기 실패- ', err));
  }, []);

  const onUpdate = useCallback(async (targetId, completed) => {
    try {
      await axios.put(`http://localhost:3001/api/todos/${targetId}`, {
        isDone: completed,
      });

      dispatch({
        type: "UPDATE",
        targetId,
        completed,
      });
    } catch (err) {
      console.log("App.jsx: 수정 실패- ", err);
    }
  }, []);

  const onDelete = useCallback(async (targetId) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${targetId}`);

      dispatch({
        type: "DELETE",
        targetId,
      });
    } catch (err) {
      console.log("App.jsx: 삭제 실패- ", err)
    }
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
};

export default App;