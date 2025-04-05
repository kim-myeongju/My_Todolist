import './App.css'
import Header from './components/Header';
import TestComp from './components/TestComp';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useState, useRef, useReducer, useCallback } from 'react';

const mockDataTodo = [
  {
    id: 0,
    isDone: false,
    content: "React Study",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "카페가서 일본원서 읽기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "토익공부",
    createdDate: new Date().getTime(),
  },
];

const reducer = (state, action) => {

  switch(action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE": {
      return state.map((it) => it.id === action.targetId ? {...it, isDone: !it.isDone} : it);
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default : return state;
  }
}

function App() {
  // const [todo, setTodo] = useState(mockDataTodo);
  const isRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockDataTodo);

  // const onCreate = (content) => {
  //   const newItem = {
  //     id: isRef.current,
  //     content,
  //     isDone: false,
  //     createdDate: new Date().getTime(),
  //   };
  //   setTodo([newItem, ...todo]);
  //   isRef.current++;
  // }
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: isRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    })

    isRef.current++;
  };

  // const onUpdate = (targetId) => {
  //   setTodo(
  //     todo.map(
  //       // (it) => {
  //       //   if(it.id === targetId) {
  //       //     return {
  //       //       ...it,
  //       //       isDone: !it.isDone,
  //       //     };
  //       //   } else {
  //       //     return it;
  //       //   }
  //       // }
  //       (it) => it.id === targetId ? {...it, isDone: !it.isDone} : it
  //     )
  //   )
  // }
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  // const onDelete = (targetId) => {
  //   setTodo(todo.filter((it) => it.id !== targetId));
  // }
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
};

export default App
