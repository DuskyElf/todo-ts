import React from 'react'

export type Tab = "todo" | "done"

export type WorkListT = string[]

export type State = {
    curr_tab: Tab
    todo_list: WorkListT,
    todo_curs: number,
    done_list: WorkListT,
    done_curs: number,
    is_appending: boolean,
}

type tabChange_stateAction = { type: "tabChange" }
type cursDown_stateAction = { type: "cursDown" }
type cursUp_stateAction = { type: "cursUp" }
type appendingTodo_stateAction = { type: "appendingTodo" }
type appendTodo_stateAction = { type: "appendTodo", todo: string }

function clamp(value: number, clamper: number): number {
    if (value < 0)
        return 0
    if (value >= clamper)
        return clamper - 1
    return value
}

type stateAction =
    | tabChange_stateAction
    | cursDown_stateAction
    | cursUp_stateAction
    | appendingTodo_stateAction
    | appendTodo_stateAction
export function stateReducer(state: State, action: stateAction): State {
    switch (action.type) {
        case "tabChange":
            if (state.curr_tab === "todo") return {...state, curr_tab: "done"}
            return {...state, curr_tab: "todo"}
        case "cursDown":
            if (state.curr_tab === "todo")
                return {...state, todo_curs: clamp(state.todo_curs + 1, state.todo_list.length)}
            return {...state, done_curs: clamp(state.done_curs + 1, state.done_list.length)}
        case "cursUp":
            if (state.curr_tab === "todo")
                return {...state, todo_curs: clamp(state.todo_curs - 1, state.todo_list.length)}
            return {...state, done_curs: clamp(state.done_curs - 1, state.done_list.length)}
        case "appendingTodo":
            return {...state, is_appending: true}
        case "appendTodo":
            return {...state, todo_list: [...state.todo_list, action.todo], is_appending: false}
        default:
            return state;
    }
}

export function useEventListener(eventName: string, handler: EventListener, element = window) {
    const savedHandler = React.useRef({} as EventListener);

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            const eventListener = (event: Event) => savedHandler.current(event);
            element.addEventListener(eventName, eventListener);

            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element]
    );
}
