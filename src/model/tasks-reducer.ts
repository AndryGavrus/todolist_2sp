import type { TasksState } from '../App'
import { createTodolistActionType, DeleteTodolistActionType } from './todolists-reducer'

const initialState: TasksState = {}

type ActionType = DeleteTodolistActionType | createTodolistActionType

export const tasksReducer = (tasks: TasksState = initialState, action: ActionType): TasksState => {
    switch (action.type) {
        case 'delete_todolist':
            const copyTasksState = { ...tasks }
            delete copyTasksState[action.payload.id]
            return copyTasksState
        case 'create_todolist':
            return { ...tasks, [action.payload.id]: [] }
        default:
            return tasks
    }
}

