import { memo } from "react"

const Header: React.FC = () => {
    return (
        <div>
            <div className="header_title">Simple Todo App:</div>
            <hr />
        </div>
    )
}

export default memo(Header)
