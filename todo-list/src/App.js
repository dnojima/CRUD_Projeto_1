// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { title: 'Aprender React', completed: false },
    { title: 'Fazer projeto Todo List', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  // Função para adicionar ou editar tarefa
  const saveTask = () => {
    if (isEditing) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? { ...task, title: newTask } : task
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, { title: newTask, completed: false }]);
    }
    closeModal();
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const openModal = (index = null) => {
    setModalActive(true);
    if (index !== null) {
      setIsEditing(true);
      setEditingIndex(index);
      setNewTask(tasks[index].title);
    } else {
      setIsEditing(false);
      setNewTask('');
    }
  };

  const closeModal = () => {
    setModalActive(false);
    setIsEditing(false);
    setNewTask('');
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="header-title">Todo List - Terra Magna</h1>
        </div>
      </header>

      <main className="container">
        <section className="tasks-section">
          <h2 className="section-title">Lista de Tarefas</h2>
          
          <div className="cards">
            {tasks.map((task, index) => (
              <div key={index} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-info">
                  <p>{task.title}</p>
                </div>
                <div className="task-actions">
                  <button className="button edit" onClick={() => openModal(index)}>Editar</button>
                  <button className="button delete" onClick={() => deleteTask(index)}>Excluir</button>
                  <button className="button toggle" onClick={() => toggleTaskCompletion(index)}>
                    {task.completed ? 'Desmarcar' : 'Concluir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button className="floating-button" onClick={() => openModal()}>+</button>

        {/* Modal */}
        <div className={`modal ${modalActive ? 'active' : ''}`}>
          <div className="modal-content">
            <header className="modal-header">
              <h2>{isEditing ? 'Editando Tarefa' : 'Nova Tarefa'}</h2>
              <button className="modal-close" onClick={closeModal}>&#10006;</button>
            </header>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Nome da tarefa"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="button save">Salvar</button>
                <button type="button" className="button cancel" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>CRUD_1 - Terra Magna</p>
        </div>
      </footer>
    </>
  );
};

export default App;
