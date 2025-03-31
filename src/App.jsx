import './App.css'
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState([]);

  return (
    <div className='App'>
      <Header />
      <TodoEditor />
      <TodoList />
    </div>
  );
};

export default App
