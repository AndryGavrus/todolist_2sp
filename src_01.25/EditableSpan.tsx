import { ChangeEvent, useState } from "react"

type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const OnEditMode = () => {
        setIsEditMode(true)
    }

    const OffEditMode = () => {
        setIsEditMode(false)
        changeTitle(itemTitle)
    }

        const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setItemTitle(event.currentTarget.value)
        }

    return (
        isEditMode
        ? <input 
            value={itemTitle} 
            onChange={changeItemTitleHandler} 
            autoFocus
            onBlur={OffEditMode}/>
        : <span onDoubleClick={OnEditMode}>{title}</span>
    )
}
