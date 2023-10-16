import classNames from "classnames"
import "./task.css"
import { useStore } from "../store"

export default function Task({ id }) {
    const task = useStore((store) => store.tasks.find((task) => task.id === id))

    return (
        <div className="task">
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <div></div>
                <div className={classNames("status", task.state)}>{task.state}</div>
            </div>
        </div>
    )
}