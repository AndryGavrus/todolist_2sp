import { type ChangeEvent } from 'react'
import type { FilterValues, Task } from './App'
import { Button } from './Button'
import { CreateItemForm } from './CraeteItemForm'
import { EditableSpan } from './EditableSpan'

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
        <EditableSpan changeTitle={(newTitle: string)=>changeTodolistTitle(newTitle, todolistId)} title={title}/>
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
                {/* <span>{task.title}</span> */}
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
