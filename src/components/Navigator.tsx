import { memo } from "react";
import { Tab } from "../models";

type NavigatorProp = {
    selected: Tab
}

const Navigator: React.FC<NavigatorProp> = ({selected}) => {
    const right_space: React.CSSProperties = {
        whiteSpace: "pre-wrap"
    };
    return (
        <div className="navigator" style={right_space}>
            <span>{"  Todo   Done"}</span>
            <span className={"indicator indicator-" + selected}>{"[      ]"}</span>
        </div>
    )
}

export default memo(Navigator)
