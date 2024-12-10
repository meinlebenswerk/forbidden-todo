# The best ToDo App
Every web framework has its rite of passage: building a ToDo app. But why stop at just another ToDo app when you can use it as a testing ground for the (objectively) best way to handle two-way data binding in React?

Why suffer through the tyranny of `setState` and reducers when you can have the freedom of **mutability**?
This ToDo app is built with the **BetterState** hook, a drop-in* replacement for React’s `useState` that lets you manage state the way it was always meant to be: simple, intuitive, and slightly cursed, making the most of JavaScript’s interior mutability.

No more state setters. No more callback gymnastics. Just state updates, like this:
```javascript
import { useState } from 'better-state'; // not a real package (yet, and hopefully never)

// Set up your state (notice how we don’t even need `setState` anymore)
const state = useState({
  todos: [],
  input: "",
});

// And mutate away
state.todos = [...state.todos, { id: 0, text: 'Learn about BetterState', done: false }];
state.input = "yay";
```  
It's React state management - simplified. It’s so good, we don't even give you a choice - consider React’s `useState` deprecated.



## Setup
This project uses pnpm as it's package manager, with it installed, you first need to install the dependencies:

```bash
pnpm install
```  

Then you can start the development server with:  
```bash
pnpm dev
```  

And if you want to build the project, just run:
```bash
pnpm build
```  

## Features  
- **Drop-in replacement** for React’s `useState` (but now you only get the **state** instead of a unwieldy tuple)  
- Enjoy the elegance of state updates like `state.todos = [...]` -  no more pretending objects aren’t mutable
- Under the hood, we proxy-wrap state and feed updates back to React for full reactivity.  

## Caveats
As with any pre-release, there are a few caveats:  
- Methods like `array.push(...)` don’t trigger updates (recursive proxies would fix this, but we call it a **design-pattern**).  
- No in-place modifications; always create new copies and assign them - functional-ish, if you think about it.
- *not really a drop-in replacement since you now only get the state object, but that’s a feature, not a bug.

## Acknowledgments
To the React team: this is what we’ve always needed. Let’s get it into core for the next release, yes?