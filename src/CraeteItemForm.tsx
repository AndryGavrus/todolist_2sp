import { ChangeEvent, useState, KeyboardEvent } from "react"
import { IconButton, TextField } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type CreateItemFormPropsType = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem: createItem}:CreateItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField
            label='Enter a title'
            variant="outlined"
            size="small"
                error={Boolean(error)}
                helperText={error}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler} />
            {/* <Button title={'+'} onClick={createItemHandler} /> */}
            <IconButton onClick={createItemHandler}><AddCircleOutlineIcon fontSize='medium' color="primary"/></IconButton>
            {/* {error && <div className={'error-message'}>{error}</div>} */}
        </div>
    )
}