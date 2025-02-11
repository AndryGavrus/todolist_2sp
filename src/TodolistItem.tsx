import { type ChangeEvent } from 'react'
import type { FilterValues, Task } from './App'
import { CreateItemForm } from './CraeteItemForm'
import { EditableSpan } from './EditableSpan'
import { Box, Button, Checkbox, List, ListItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { containerSx, getListItemSx } from './TodolistItem.styles'


type Props = {
  title: string
  tasks: Task[]
  filter: FilterValues
  todolistId: string
  deleteTask: (taskId: string, todolistId: string) => void
  changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    title,
    tasks,
    filter,
    todolistId,
    deleteTask,
    changeTodolistFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle
  } = props

  const createTaskHandler = (taskTitle: string) => {
    createTask(taskTitle, todolistId)
  }

  const deleteTodolistHandler = () => deleteTodolist(todolistId)


  return (
    <div>
      <h3>
        <EditableSpan changeTitle={(newTitle: string) => changeTodolistTitle(newTitle, todolistId)} title={title} />
        <IconButton onClick={deleteTodolistHandler}><DeleteIcon fontSize='small' /></IconButton>
      </h3>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id, todolistId)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, newStatusValue, todolistId)
            }
            const changeTaskTitleHandler = (newTitle: string) => {
              changeTaskTitle(task.id, newTitle, todolistId)
            }

            return (
              <ListItem
                disablePadding
                key={task.id}
                sx={getListItemSx(task.isDone)}>
                <Box>
                  <Checkbox size='small' checked={task.isDone}
                    onChange={changeTaskStatusHandler} />
                  <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
                </Box>
                <IconButton onClick={deleteTaskHandler}><DeleteIcon fontSize='small' /></IconButton>
              </ListItem>
            )
          })}
        </List>
      )}
      <Box sx={containerSx}>
        <Button
          variant='contained'
          disableElevation
          size='small'
          color={filter === 'all' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('all', todolistId)} >
          All
        </Button>
        <Button
          variant='contained'
          disableElevation
          size='small'
          color={filter === 'active' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('active', todolistId)} >
          Active
        </Button>
        <Button
          variant='contained'
          disableElevation
          size='small'
          color={filter === 'completed' ? 'secondary' : 'primary'}
          onClick={() => changeTodolistFilter('completed', todolistId)} >
          Completed
        </Button>
      </Box>
    </div>
  )
}
