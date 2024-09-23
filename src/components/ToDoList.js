import { useState } from 'react';
import Image from 'next/image';
import trashCan from '../assets/img/trash.png';

export default function TodoList({ 
  todos, 
  completedTodos, 
  onToggle, 
  onDelete, 
  showForm, 
  setShowForm, 
  newTodo, 
  setNewTodo, 
  addTodo, 
  handleUnmark 
}) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Para armazenar ID da tarefa a ser deletada
  const [showConfirm, setShowConfirm] = useState(false); // Para controlar a exibição da caixa de confirmação

  const handleConfirmDelete = (id) => {
    setConfirmDeleteId(id);
    setShowConfirm(true); // Mostra a caixa de confirmação
  };

  const confirmDelete = () => {
    if (confirmDeleteId !== null) {
      const isCompleted = completedTodos.some(todo => todo.id === confirmDeleteId);
      onDelete(confirmDeleteId, isCompleted); // Chama a função de exclusão
      setShowConfirm(false); // Fecha a caixa de confirmação
      setConfirmDeleteId(null); // Reseta o ID da tarefa
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false); // Fecha a caixa de confirmação
    setConfirmDeleteId(null); // Reseta o ID da tarefa
  };

  return (
    <>
      <section className="toDoList">
        <h2>Suas tarefas de hoje</h2>

        {todos.length === 0 ? (
          <p>Nenhuma tarefa para hoje.</p>
        ) : (
          todos.map(todo => (
            <article className="cardTask" key={todo.id}>
              <div>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => onToggle(todo.id)} 
                />
                <span>{todo.text}</span>
              </div>
              <button onClick={() => handleConfirmDelete(todo.id)}>
                <Image src={trashCan} alt='Lixeira' />
              </button>
            </article>
          ))
        )}

        {completedTodos.length > 0 && (
          <section className="taskCompleted">
            <h2>Tarefas Finalizadas</h2>
            {completedTodos.map(todo => (
              <article className='cardTask' key={todo.id}>
                <div>
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => handleUnmark(todo.id)} 
                  />
                  <span className='listCompleted'>{todo.text}</span>
                </div>
                <button onClick={() => handleConfirmDelete(todo.id)}>
                  <Image src={trashCan} alt='Lixeira' />
                </button>
              </article>
            ))}
          </section>
        )}
      </section>

      {showConfirm && (
        <section className="confirmDeletePanel">
          <article className='deleteConfig'>
            <h2>Deletar tarefa</h2>
            <p>Tem certeza que você deseja deletar essa tarefa?</p>
            <div className='confirmButtons'>
              <button className='btnCancel' onClick={confirmDelete}>Confirmar</button>
              <button className='btnDelete' onClick={cancelDelete}>Cancelar</button>
            </div>
          </article>
        </section>
      )}

      <section className="containerButton">
        <button className="newTaskBtn" onClick={() => setShowForm(!showForm)}>
          Adicionar nova tarefa
        </button>
        {showForm && (
          <article className="formNewTask">
            <form className="newTaskAdd" onSubmit={addTodo}>
              <h2>Nova tarefa</h2>
              <label>Título</label>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Digite"
                required
              />
              <div className='containerBtnTask'>
                <button className='btnCancel' type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                <button className='btnAdd' type="submit">Adicionar</button>
              </div>
            </form>
          </article>
        )}
      </section>
    </>
  );
}