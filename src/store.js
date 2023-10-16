import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { persist } from "zustand/middleware"

const store = (set) => ({
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

// shallow avoids unnecessary re-renders by comparing the previous value with the new one
export const useStore = createWithEqualityFn(persist(store, {
    name: "store",
}), shallow)