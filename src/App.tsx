import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [todolistId: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "active" },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],

    [todolistId_2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Bread', isDone: false },
    ],
  })

  const deleteTask = (taskId: string, todolistId: string) => {
    const nextState: TasksState = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) }
    setTasks(nextState)
  }

  const changeFilter = (filter: FilterValues, todolistId: string) => {
    const nextState: Todolist[] = todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)
    setTodolists(nextState)
  }

  const createTask = (title: string, todolistId: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const nextState: TasksState = { ...tasks, [todolistId]: [...tasks[todolistId], newTask] }
    setTasks(nextState)
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const nextState: TasksState = { ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t) }
    setTasks(nextState)
  }

  const deleteTodolist = (todolistId: string) => {
    const nextState: Todolist[] = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(nextState)
    delete tasks[todolistId]
  }

  // UI

  const todolistItems = todolists.map(tl => {
    let filteredTasks = tasks[tl.id]
    if (tl.filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (tl.filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
      <TodolistItem 
        key={tl.id}
        title={tl.title}
        filter={tl.filter} 
        todolistId={tl.id}
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        deleteTodolist = {deleteTodolist}
        />
    )
  })



  return (
    <div className="app">
      {todolistItems}
    </div>
  )
}
