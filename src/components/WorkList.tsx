import { memo } from "react"
import * as M from "../models"

type WorkListProp = {
    items: M.WorkListT
    curr_index: number
}

const WorkList: React.FC<WorkListProp> = ({items, curr_index}) => {
    return (
        <ul className="work-list">
            {items.map((item, index) => {
                const selected = index === curr_index;
                return (
                    <li key={index} className={selected ? "selected-list": ""}>
                        {selected ? (
                            <>
                                <span className="indicator">
                                    {"-> | "}
                                </span>
                                <span>{item}</span>
                            </>)
                            : "| " + item
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default memo(WorkList)
