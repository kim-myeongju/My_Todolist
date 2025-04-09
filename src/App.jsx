import './App.css'
import Header from './components/Header';
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

// Props Drilling을 방지하기 위해 State와 Dispatch함수들을 따로 저장.
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  console.log("App Start");
  
  const [todo, dispatch] = useReducer(reducer, initialState);

  // 할 일 생성
  // async: 비동기 함수 선언 / await를 쓰기 위해 필요
  const onCreate = async (content) => {
    if (!content.trim()) return;

    try {
      // db에 저장
      // await: Promise 완료까지 기다림 / 서버 응답이 올 때까지 다음 작업을 보류
      const res = await axios.post('http://localhost:3001/todos', {content});

      // 화면 리스트에 추가
      dispatch({type: "CREATE", newItem: res.data});
    } catch (err) {
      console.log("추가 실패- ", err);
    }
  };

  // 할 일 목록 띄우기
  useEffect(() => {
    axios.get('http://localhost:3001/todos').then((res) => {
      dispatch({type: "INIT", newItem: res.data});
    })
    .catch((err) => console.log('목록 불러오기 실패- ', err));
  }, []);

  const onUpdate = useCallback(async (targetId, completed) => {
    try {
      await axios.put(`http://localhost:3001/todos/${targetId}`, {
        isDone: completed,
      });

      dispatch({
        type: "UPDATE",
        targetId,
        completed,
      });
    } catch (err) {
      console.log("수정 실패- ", err);
    }
  }, []);

  const onDelete = useCallback(async (targetId) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${targetId}`);

      dispatch({
        type: "DELETE",
        targetId,
      });
    } catch (err) {
      console.log("삭제 실패- ", err)
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