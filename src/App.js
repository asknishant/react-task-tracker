import React from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect } from "react";
import AddTask from './components/AddTask';

function App() {


  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const baseUrl = 'https://task-tracker-backend-server.herokuapp.com/tasks';
  //const baseUrlId = `https://task-tracker-backend-server.herokuapp.com/tasks/${id}`
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])


  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(baseUrl)
    const data = await res.json()
    console.log(data)
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(baseUrl + `${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(baseUrl + `${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(baseUrl + `${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !data.reminder } : task))
  }
  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={!showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}

      {tasks.length > 0 ?
        <Tasks tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        /> :
        'No Tasks to show :)'}

    </div>
  );
}


//Class way to make components
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;