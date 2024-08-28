import { useEffect, useState } from 'react'
import AddTask from './AddTask'
import './App.css'
import Header from './Header'
import TaskList from './TaskList'
import axios from 'axios'

function App() {
  const [tasks,setTasks] = useState([])
  const onCreate = async(name,title) => {
    const posted = await axios.post('http://localhost:3000/tasks',{
      name,
      title
    }) 
    console.log(posted)
    const created = [
      ...tasks,
      posted.data
    ]
    setTasks(created)
  }
  const fetchTask = async () => {
    const response = await axios.get('http://localhost:3000/tasks')
    setTasks(response.data)
  }
  useEffect(()=>{
    fetchTask();
  },[])
  const deleteTaskByID = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
    const afterTask = tasks.filter((task) => {
      return task.id !== id
      // tasks.filter istenmeyen öğeleri çıkararak filtreleme yapar
    })
    setTasks(afterTask)

  }
  return (
    <>
    <Header/>
    <AddTask onCreate = {onCreate}/>
    <h1>Görevler</h1>
    <TaskList tasks={tasks} onDelete={deleteTaskByID}/>
    </>
  )
}

export default App