import { useStore } from "../store"
import Task from "./Task"
import "./column.css"

export default function Column({ state }) {
    // filter what i want to get in my selector
    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state)
    )

    const addTask = useStore((store) => store.addTask)

    return (
        <div className="column">
            <div className="titleWrapper">
                <p>{state}</p>
                <button
                    onClick={() => { addTask("aloha", state) }}
                >Add</button>
            </div>
            {
                tasks.map((task) => {
                    return <Task id={task.id} key={task.id} />
                })
            }
        </div >
    )
}