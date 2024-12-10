// Super basic TODO app, but really cursed

import { useCallback } from 'react'
import { useState } from './hooks/state' // State of the art state-management library
import { nanoid } from 'nanoid'


type TODO = {
  id: string
  text: string
  completed: boolean
}

type State = {
  todos: TODO[]
  input: string
}

// Your new favourite and obv. best state-management solution:
// A single app-wide, mutable and reactive state, what is performance anyways :)
type OnlyPropsYouNeed = { state: State }

// The only valid answer to the interview question: "How do we update the parent state from a child in React"
// A: Build your own proxied state wrapper, and just mutate away :)
const DeleteAllButton = ({ state }: OnlyPropsYouNeed): JSX.Element => {
  
  
  return (
    <button
      className='bg-red-700 uppercase font-black'
      disabled={!state.todos}
      onClick={() => state.todos = []}
    > Delete ALL </button>
  )
}


const ToDoList = ({ state }: OnlyPropsYouNeed): JSX.Element => {
  return (
    <div className='flex flex-col gap-4'>
        {state.todos.map(todo => (
          <div key={todo.id} className='flex flex-row gap-2 mx-auto w-96 border border-white border-opacity-20 rounded-md p-2'>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => state.todos = state.todos.map(t => t.id === todo.id? { ...t, completed: !t.completed} : t)}
              className='my-auto'
            />
            <div className='flex-1 flex justify-center'>
              <p className={`my-auto ${todo.completed? 'line-through' : ''}`}>{todo.text}</p>
            </div>
            <button
              className='bg-red-800'
              onClick={() => state.todos = state.todos.filter(t => t.id !== todo.id)}
            > remove </button>
          </div>
        ))}
      </div>
  )
}

function App() {

  const state = useState<State>({ todos: [], input: '' })

  const handleAddTodo = useCallback(() => {
    const todo: TODO = {
      id: nanoid(),
      completed: false,
      text: state.input
    }
    state.todos = [...state.todos, todo]
    state.input = ''
  }, [state]);

  return (
    <div className='flex-1 flex flex-col my-8 mx-4'>
      <h1 className='mb-4 text-2xl font-black'>
        the <span className='line-through'>super cursed</span> best React ToDo app
      </h1>
      <p className='text-left'>
        Why should React developers suffer through <code>const [state, setState] = useState(...)</code> and pretend objects are not mutable?
        JavaScript already has interior mutability, so why not embrace it?
        Just because React refuses to re-render when you <i>pass state back to the parent</i>?
      </p>
      <p className='text-left'>
        By replacing React's <code>useState</code> with a custom hook, we've removed these artificial restrictions.
        State management is now as simple as it always should've been:
        <ul>
          <li>Want to clear a list? <code>state.todos = []</code></li>
          <li>Want to update a field? <code>state.value = "yay"</code></li>
        </ul>
      </p>
      <p className='text-left'>
        Under the hood, we simply wrap our state in a proxy and then feed any updates back to React, so we benefit from wonderful <i>reactivity</i> without dancing around React's limitations.
        <br />
        Since this is currently a pre-release, there are a few caveats:
        <br />
        Currently, object methods like <code>array.push(...)</code> won't trigger updates, and this cannot be solved without recursive proxies. But we call this a <b>design-pattern</b>*.
        <br />
        <span className='text-sm'>* No in-place modifications; create a new copy and replace the state - almost more functional, if you think about it.</span>
      </p>
      <div className='flex flex-row gap-4 justify-center my-4'>
        <input type='text' onChange={(event) => state.input = event.target.value} value={state.input} placeholder='Enter ToDo here...'/>
        <button disabled={!state.input} onClick={handleAddTodo}>add</button>
      </div>
      <ToDoList state={state} />

      <div className='mt-auto flex justify-center'>
        <DeleteAllButton state={state} />
      </div>
    </div>
  )
}

export default App
