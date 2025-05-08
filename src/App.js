import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // بارگذاری تسک‌ها از LocalStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // ذخیره تسک‌ها در LocalStorage
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

  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex ? editingText : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="App">
      <h1>📝 Todo App</h1>
      <form onSubmit={editingIndex === null ? addTask : saveEdit}>
        <input
          type="text"
          placeholder="تسک خود را وارد کنید..."
          value={editingIndex === null ? input : editingText}
          onChange={(e) => (editingIndex === null ? setInput(e.target.value) : setEditingText(e.target.value))}
        />
        <button type="submit">{editingIndex === null ? 'افزودن' : 'ذخیره تغییرات'}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            ✅ {task}
            <button onClick={() => editTask(index)}>ویرایش</button>
            <button onClick={() => deleteTask(index)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
