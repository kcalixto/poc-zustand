import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

const store = (set) => ({
    tasks: [
        {
            id: "1",
            title: "Test task",
            state: "ONGOING"
        }
    ],

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
})

// shallow avoids unnecessary re-renders by comparing the previous value with the new one
export const useStore = createWithEqualityFn(store, shallow)