import './App.css'
import { useReducer, useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'
import { CreateItemForm } from './CraeteItemForm'
import { AppBar, Box, Container, CssBaseline, Grid2, IconButton, Paper, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { containerSx } from './TodolistItem.styles'
import { NavButton } from './NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { deepOrange, indigo } from '@mui/material/colors'
import { MaterialUISwitch } from './MaterialUISwitch'
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from './model/todolists-reducer'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [todolistId: string]: Task[]
}


export const App = () => {
  // BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
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
      { id: v1(), title: 'Bread', isDone: false },
    ],
  })

  // tasks
  //C
  const createTask = (title: string, todolistId: string) => {
    const newTask = { id: v1(), title, isDone: false }
    const nextState: TasksState = { ...tasks, [todolistId]: [...tasks[todolistId], newTask] }
    setTasks(nextState)
  }
  //D
  const deleteTask = (taskId: string, todolistId: string) => {
    const nextState: TasksState = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) }
    setTasks(nextState)
  }
  //U-1
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const nextState: TasksState = { ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t) }
    setTasks(nextState)
  }
  //U-2
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    const nextState: TasksState = { ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title } : t) }
    setTasks(nextState)
  }

  //todolists
  //C
  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)
    dispatchToTodolistsReducer(action)
    const nextTasksState: TasksState = { ...tasks, [action.payload.id]: [] }
    setTasks(nextTasksState)
    // dispatchToTaskReducer(action)
  }
  //D
  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId)
    dispatchToTodolistsReducer(action)
    const copyTasksState = { ...tasks }
    delete copyTasksState[action.payload.id]
    setTasks(copyTasksState)
    // dispatchToTaskReducer(action)
  }
  //U-1
  const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
    dispatchToTodolistsReducer(changeTodolistFilterAC({id: todolistId, filter}))
  }
  //U-2
  const changeTodolistTitle = (title: string, todolistId: string) => {
    dispatchToTodolistsReducer(changeTodolistTitleAC({id: todolistId, title}))
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
      <Grid2 key={tl.id}>
        <Paper elevation={8} sx={{ p: '15px' }}>
          <TodolistItem
            title={tl.title}
            filter={tl.filter}
            todolistId={tl.id}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeTodolistFilter={changeTodolistFilter}
            createTask={createTask}
            deleteTodolist={deleteTodolist}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid2>
    )
  })

  const [isDarkMode, setIsDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: deepOrange,
      mode: isDarkMode ? 'dark' : 'light'
    },
  })

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Box>
                <MaterialUISwitch
                  checked={isDarkMode}
                  onChange={()=> setIsDarkMode(!isDarkMode)}
                />
                <NavButton color="inherit">Sign in</NavButton>
                <NavButton color="inherit">Sign up</NavButton>
                <NavButton color="inherit" background={theme.palette.primary.dark}>Faq</NavButton>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={'lg'}>
          <Grid2 container sx={{ p: '15px 0' }}>
            <CreateItemForm createItem={createTodolist} />
          </Grid2>
          <Grid2 container spacing={4}>
            {todolistItems}
          </Grid2>
        </Container>
      </ThemeProvider>
    </div>
  )
}
