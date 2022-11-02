import { useState } from 'react'
import './App.css'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const arrayTodos = [
  {name: 'Limpar a casa', status: false},
  {name:'Limpar o cachorro', status:true}
]

const Todos = ({ todos } ) => {
  return (
    <div className='todos'>
      {todos.map((todo) => {
        return (
        <div className='todo'>
          <button className='checkbox' style={{backgroundColor: todo.status ? 'purple' : 'white'}}></button>
          <p>{todo.name}</p>
          <button><AiOutlineEdit size={20} /></button>
          <button><AiOutlineDelete size={20} /></button>
        </div>)
      })}
    </div>
  )
}

function App() {
  return (
    <div className="App">

      <header className='container'>
        <div className='header'>
          <h1>Lista ToDo</h1>
        </div>
        <Todos todos={arrayTodos}></Todos>
      </header>
    </div>
  )
}

export default App
