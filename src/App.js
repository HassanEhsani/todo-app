import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // این کار برای بارگذاری تسک‌ها از LocalStorage هنگام راه‌اندازی صفحه است
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // این کار برای ذخیره کردن تسک‌ها در LocalStorage هر بار که تغییر می‌کنه
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
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
          <li key={index}>
            ✅ {task}
            <button onClick={() => deleteTask(index)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
