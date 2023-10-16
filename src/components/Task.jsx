import classNames from "classnames"
import "./task.css"
import { useStore } from "../store"

export default function Task({ id }) {
    const task = useStore((store) => store.tasks.find((task) => task.id === id))
    const deleteTask = useStore((store) => store.deleteTask)
    const setDraggedTask = useStore((store) => store.setDraggedTask)

    return (
        <div
            className="task"
            onDragStart={() => setDraggedTask(task)}
            draggable
        >
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <div>
                    <button onClick={() => deleteTask(id)}>Delete</button>
                </div>
                <div className={classNames("status", task.state)}>{task.state}</div>
            </div>
        </div >
    )
}