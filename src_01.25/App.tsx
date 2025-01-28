import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'
import { CreateItemForm } from './CreateItemForm'

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

export type TasksStateType = {
  [todolistId: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  // BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'Whiskey', isDone: true },
      { id: v1(), title: 'Cola', isDone: true },
      { id: v1(), title: 'Ice', isDone: false },
    ]
  })

// tasks
  const deleteTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    })
  }

  const createTask = (title: string, todolistId: string) => {
    const newTask: Task = { id: v1(), title, isDone: false }
    setTasks({
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]]
    })
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, isDone } : t)
    })
  }

  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, title } : t)
    })
  }

// todolists
  const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const changeTodolistTitle = (title: string, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl))
  }

  // UI
  const createTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: Todolist = { id: todolistId, title: title, filter: 'all' }
    setTodolists([...todolists, newTodolist])
    setTasks({ ...tasks, [todolistId]: [] })
  }

  const todolistsComponents = todolists.map(tl => {
    let filteredTasks = tasks[tl.id]
    if (tl.filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (tl.filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
      <TodolistItem
        todolistId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeTodolistFilter={changeTodolistFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        deleteTodolist={deleteTodolist}
        changeTaskTitle={changeTaskTitle}
        changeTodolistTitle= {changeTodolistTitle}/>
    )
  })

  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist} />
      {todolistsComponents}
    </div>
  )
}
