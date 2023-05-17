import React from 'react'
import ReactDOM from 'react-dom/client'

import "./styles.css"
import * as M from "./models"

import Header from "./components/Header"
import WorkList from './components/WorkList'
import Navigator from "./components/Navigator"

const App: React.FC = () => {
    const [state, changeState] = React.useReducer(
        M.stateReducer, {
            curr_tab: "todo",
            todo_list: ["first todo", "seconda todo", "third todo", "fourth todo"],
            todo_curs: 0,
            done_list: ["first done", "seconda done"],
            done_curs: 0,
        }
    )

    const keyinputHandler = (e: Event) => {
        if (e.type !== "keydown") return;

        switch ((e as KeyboardEvent).key) {
            case 'Tab':
                e.preventDefault()
                changeState({type: "tabChange"})
                break;
            case 'j':
                changeState({type: "cursDown"})
                break;
            case 'k':
                changeState({type: "cursUp"})
                break;
        }
    }

    M.useEventListener("keydown", keyinputHandler)

    const curr_list = state.curr_tab === "todo" ? state.todo_list : state.done_list
    const curr_curs = state.curr_tab === "todo" ? state.todo_curs : state.done_curs
    return (
        <>
            <Header />
            <Navigator selected={state.curr_tab}/>
            <WorkList items={curr_list} curr_index={curr_curs}/>
        </>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(<App />)

