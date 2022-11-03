import { useEffect, useState } from 'react'
import './App.css'
import Edit from './assets/editar.png'
import Trash from './assets/trash.png'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([]) //trazer todos todos
  const [inputValue, setInputValue] = useState('') //Adiciona valor
  const [inputVisibility, setInputVisibility] = useState(false) //mudar o estado do botão de adicionar
  //Se o InputVisibility estiver ativo vai injetar esse SelectTodo para ser representado como variavel e puder receber o ID selecionado
  const [selectedTodo, setSelectTodo] = useState() 


  //Muda o botão de adicionar
  async function handleWithNewButton(){
    console.log('teste')
    setInputVisibility(!inputVisibility)
  }

  //Muda o status e a cor da tarefa
  async function modifyStatusTodo(todo) {
    await axios.put('http://localhost:3333/todos', 
    {id: todo.id,
    status: !todo.status})
    getTodos()
  }

  //Mostra a tela de edição do campo e seto o setSelectTodo para ser atualizado como novo valor passado como propriedade
  async function handleWithEditButtonClick(todo) {
    setSelectTodo(todo)
    setInputVisibility(true)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  //Create
  async function createTodo() {
    await axios.post('http://localhost:3333/todos', 
    {name: inputValue,
    })
    getTodos()
    setInputVisibility(!inputVisibility)
    setInputValue('')
  }

  //Read
  async function getTodos() {
    const response = await axios.get('http://localhost:3333/todos')
    setTodos(response.data)
  }

  //Update
  async function editTodo() {
    await axios.put('http://localhost:3333/todos',
    {id: selectedTodo.id,
    name: inputValue
    })
    setSelectTodo()
    setInputVisibility(false)
    getTodos()
    setInputValue('')
  }
  

  //Delete
  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`)
    getTodos() 
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  //Usado para cada atualização quando for chamado aparecer, sem necessidade de atualização a todo instante
  useEffect(() => {
    getTodos()
  }, [])


  return (
    <div className="App">

      <header className='container'>
        <div className='header'>
          <h1>Crud + Prisma + Docker</h1>
          
        </div>
        <div className='todos'>
          {todos.map((todo) => {
            return (
              <div className='todo'>
                <p key={todo.id}>{todo.name}</p>
                <button onClick={() => handleWithEditButtonClick(todo)}><img src={Edit} className='edit' /></button>
                <button onClick={() => deleteTodo(todo)}><img src={Trash} className='trash' /></button>
            </div>)
          })}
    </div>
        <input className='inputName' 
               value={inputValue} 
               style={{visibility: inputVisibility ? 'visible': 'hidden'}} 
               onChange={(event) => {
                setInputValue(event.target.value)
        }} />
        <button className='newTaskButton' onClick={inputVisibility ? selectedTodo ? editTodo : createTodo : handleWithNewButton}>{inputVisibility ? 'Confirmar' : 'Adicionar'}</button>
      </header>
    </div>
  )
}

export default App
