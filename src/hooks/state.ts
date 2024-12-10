import { useState as useReactState } from "react"

// We could be cooler and do sub-element proxying, so we could make things like state.x.push(...) work
// but that's a lot of work and would make this more than a joke, so no thank you

const objectContains = <T extends object>(obj: T, key: string | symbol | number): key is keyof T => {
    return key in obj
}

export const useState = <T extends object>(initialState: T) => {
    const [state, setState] = useReactState<T>(initialState)

    const proxiedState = new Proxy(state, {
        set: (target: T, prop, value) => {
            if(objectContains(target, prop)) {
                // Using the setter function here, allows us to distinct values in one go, without conflicts!
                setState((state) => ({...state, [prop]: value}))
                return true
            }
            return false
        },
    })

    return proxiedState
}