import React from "react"
import { memo } from "react"

type TodoInputProp = {
    handle: (todo: string) => void
}

const TodoInput: React.FC<TodoInputProp> = ({handle}) => {
    const inputField = React.useRef<HTMLInputElement>(null!)

    const handleKeyDown = (event: React.KeyboardEvent) => { 
        if (event.key === "Enter")
            handle(inputField.current.value)
    }

    React.useEffect(() => {
        inputField.current.focus()
    }, [])
    
    return (
        <>
            <span className="prompt">{">"}</span>
            <input className="todo-input" ref={inputField} type="text" maxLength={128} onKeyDown={handleKeyDown} />
        </>
    )
}

export default memo(TodoInput)
