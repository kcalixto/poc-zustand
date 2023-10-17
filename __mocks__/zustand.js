import { act } from '@testing-library/react'
import { beforeEach } from 'vitest'

const { create: actualCreate } = await vi.importActual('zustand')

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set()

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (createState) => {
    const store = actualCreate(createState)
    const initialState = store.getState()
    storeResetFns.add(() => {
        store.setState(initialState, true)
    })
    return store
}

beforeEach(() => {
    act(() => storeResetFns.forEach((resetFn) => resetFn()))
})