import './App.css'
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useState, useRef } from 'react';

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

function App() {
  const [todo, setTodo] = useState(mockDataTodo);
  const isRef = useRef(3);

  const onCreate = (content) => {
    const newItem = {
      id: isRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    isRef.current++;
  }

  return (
    <div className='App'>
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} />
    </div>
  );
};

export default App
