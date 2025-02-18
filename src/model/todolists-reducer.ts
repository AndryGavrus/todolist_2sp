import { v1 } from "uuid";
import { FilterValues, Todolist } from "../App";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type createTodolistActionType = ReturnType<typeof createTodolistAC>
export type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>



type ActionType = DeleteTodolistActionType | createTodolistActionType | changeTodolistFilterActionType | changeTodolistTitleActionType

export const todolistsReducer = (todolists: Todolist[], action: ActionType): Todolist[] => {
    switch (action.type) {
        case "delete_todolist":
            return todolists.filter(tl => tl.id !== action.payload.id)
        case "create_todolist":
            const newTodolist: Todolist = { id: action.payload.id, title: action.payload.title, filter: 'all' }
            return [...todolists, newTodolist]
        case "change_todolist_filter":
            return todolists.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)
            case "change_todolist_title":
            return todolists.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)
        default:
            return todolists

    }
}

export const deleteTodolistAC = (id: string) => {
    return (
        { type: 'delete_todolist', payload: { id } } as const
    )
}

export const createTodolistAC = (title: string) => {
    return (
        { type: 'create_todolist', payload: { title, id: v1() } } as const
    )
}

export const changeTodolistFilterAC = (payload:{ id: string, filter: FilterValues }) => {
    return (
        { type: 'change_todolist_filter', payload } as const
    )
}

export const changeTodolistTitleAC = (payload:{ id: string, title: string }) => {
    return (
        { type: 'change_todolist_title', payload} as const 
    )
}