import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // فیلتر وضعیت تسک‌ها

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
    setTasks([...tasks, { text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText('');
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // فیلتر کردن تسک‌ها بر اساس وضعیت
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'completed') return task.completed;
    if (statusFilter === 'incomplete') return !task.completed;
  });

  return (
    <div className="App">
      <div className="app-container">
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

        {/* فیلتر کردن تسک‌ها */}
        <div className="filters">
          <button onClick={() => setStatusFilter('all')}>همه</button>
          <button onClick={() => setStatusFilter('completed')}>تمام شده</button>
          <button onClick={() => setStatusFilter('incomplete')}>در حال انجام</button>
        </div>

        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              ✅ {task.text}
              <button onClick={() => editTask(index)}>ویرایش</button>
              <button onClick={() => toggleCompletion(index)}>
                {task.completed ? 'بازگشت به حالت اولیه' : 'تکمیل شده'}
              </button>
              <button onClick={() => deleteTask(index)}>حذف</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
