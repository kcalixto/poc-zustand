import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { persist } from "zustand/middleware"
import axios from "axios"

const store = (set) => ({
    fetch: async () => {
        const { data } = await axios.get("https://dummyjson.com/todos")
        const tasks = data.todos.map((todo) => {
            return {
                id: todo.id,
                title: todo.todo,
                state: todo.completed ? "DONE" : "ONGOING"
            }
        })

        set({ tasks: tasks })
    },

    tasks: [],

    draggedTask: null,
    setDraggedTask: (task) => set({ draggedTask: task }),

    addTask: (title, state) => set(
        (store) => (
            {
                tasks: [
                    ...store.tasks,
                    {
                        id: Math.random().toString(),
                        title,
                        state
                    }
                ]
            }
        )
    ),

    deleteTask: (id) => set(
        (store) => (
            {
                tasks: store.tasks.filter((task) => task.id !== id)
            }
        )
    ),

    moveTask: (id, state) => set((store) => ({
        tasks: store.tasks.map((task) => task.id === id ? { ...task, state } : task)
    })),
})

const log = (config) => (set, get, api) => config(
    // ovewrite the set function
    (...args) => {
        console.log(args);
        set(...args)
    },
    get,
    api,
)

// shallow avoids unnecessary re-renders by comparing the previous value with the new one
export const useStore = createWithEqualityFn(log(persist(store, {
    name: "store",
})), shallow)

// useStore.getState().fetch()