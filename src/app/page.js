"use client"; 

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TodoList from '@/components/ToDoList';

export default function Home() {
  const [todos, setTodos] = useState([]); // Tarefas pendentes
  const [completedTodos, setCompletedTodos] = useState([]); // Tarefas concluídas
  const [newTodo, setNewTodo] = useState(''); // Texto da nova tarefa
  const [showForm, setShowForm] = useState(false); // Controle do formulário de nova tarefa

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    setTodos(storedTodos);
    setCompletedTodos(storedCompletedTodos);
  }, []);

  // Persistir tarefas no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  // Função para adicionar nova tarefa
  const addTodo = (e) => {
    e.preventDefault();
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo !== '') {
      const exists = todos.some(todo => todo.text.toLowerCase() === trimmedTodo.toLowerCase());
      if (exists) {
        alert("Essa tarefa já existe!");
        return;
      }

      const newTask = {
        id: Date.now(),
        text: trimmedTodo,
        completed: false,
      };
      setTodos(prevTodos => [...prevTodos, newTask]); // Adiciona nova tarefa à lista
      setNewTodo(''); // Limpa o campo de entrada
      setShowForm(false); // Fecha o formulário
    }
  };

  // Função para alternar o estado da tarefa (pendente/concluída)
  const handleToggle = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      setTodos(todos.filter(todo => todo.id !== id)); // Remove da lista de pendentes
      setCompletedTodos(prevCompleted => [...prevCompleted, { ...todo, completed: true }]); // Adiciona à lista de concluídas
    }
  };

  // Função para excluir tarefa
  const handleDelete = (id, isCompleted) => {
    if (isCompleted) {
      const updatedCompletedTodos = completedTodos.filter(todo => todo.id !== id);
      setCompletedTodos(updatedCompletedTodos); // Atualiza a lista de concluídas
    } else {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos); // Atualiza a lista de pendentes
    }
  };

  // Função para desmarcar tarefa concluída
  const handleUnmark = (id) => {
    const completedTodo = completedTodos.find(todo => todo.id === id);
    if (completedTodo) {
      setCompletedTodos(completedTodos.filter(todo => todo.id !== id)); // Remove da lista de concluídas
      setTodos(prevTodos => [...prevTodos, { ...completedTodo, completed: false }]); // Adiciona de volta à lista de pendentes
    }
  };

  return (
    <>
      <Header />
      <main className="container-main">
        <TodoList 
          todos={todos} 
          completedTodos={completedTodos} 
          onToggle={handleToggle} 
          onDelete={handleDelete} 
          showForm={showForm}
          setShowForm={setShowForm}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          handleUnmark={handleUnmark}
        />
      </main>
    </>
  );
}