import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>📝 Todo App</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="تسک خود را وارد کنید..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">افزودن</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>✅ {task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
