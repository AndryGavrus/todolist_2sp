import { type ChangeEvent } from 'react'
import type { FilterValues, Task } from './App'
import { Button } from './Button'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'

type Props = {
  todolistId: string
  title: string
  tasks: Task[]
  deleteTask: (taskId: string, todolistId: string) => void
  changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  filter: FilterValues
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolistId,
    title,
    tasks,
    filter,
    deleteTask,
    changeTodolistFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle

  } = props

  const createTaskHandler = (title: string) => {
      createTask(title, todolistId)
  }

  const deleteTodolistHandler = () => deleteTodolist(todolistId)

  const changeTodolistTitleHandler = (newTitle: string) =>{
    changeTodolistTitle(newTitle, todolistId)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
        <Button title='x' onClick={deleteTodolistHandler} />
      </h3>
      <CreateItemForm createItem={createTaskHandler}/>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
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
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={task.isDone}
                  onChange={changeTaskStatusHandler} />
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                <Button title={'x'} onClick={deleteTaskHandler} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeTodolistFilter('all', todolistId)} />
        <Button className={filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeTodolistFilter('active', todolistId)} />
        <Button className={filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeTodolistFilter('completed', todolistId)} />
      </div>
    </div>
  )
}
