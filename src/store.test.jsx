import { useEffect } from "react"
import { useStore } from "./store"
import { expect, vi } from "vitest"
import { render } from "@testing-library/react"

vi.mock("zustand")

function TestComponent({ selector, effect }) {
    const items = useStore(selector)

    useEffect(() => effect(items), [items])

    return null
}

test("should return default value at the start", () => {
    const selector = (store) => store.tasks;
    // mocked function
    const effect = vi.fn();

    render(<TestComponent selector={selector} effect={effect} />)
    expect(effect).toHaveBeenCalledWith([]);
})

test("should add an item to the store and re-run the effect", () => {
    const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask });
    const effect = vi.fn().mockImplementation((items) => {
        if (items.tasks.length === 0) {
            items.addTask("Test", "PLANNED")
        }
    });

    render(<TestComponent selector={selector} effect={effect} />)
    expect(effect).toHaveBeenCalledTimes(2);
    // expect(effect).toHaveBeenCalledWith(expect.objectContaining({ tasks: [{ title: "Test", state: "PLANNED" }] }));
})

