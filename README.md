# react-rimple
react and [rimple](www.github.com/xiechao06/rimple) bridge

# why

react-rimple provide a much simpler solution to state management which is very
easy to understood. The key idea is:

```
Your components (they may be parents and children components) connect with some
states (I name them slots), when these slots' change, components
are updated.
```

And due to the power of [rimple](www.github.com/xiechao06/rimple), the manipulation
of states is easy and intuitive, no more courtesy like `addValue`, `decValue`,
just something like `n.inc()`, `n.val(30)`, `n.mutateWith(n => n * 2)`

# Installation

```bash
$ npm i react-rimple
```

# Usage

```javascript
import { withSlots, ConnectSlots } from 'react-rimple'
```


# example

```javascript
import React, { Component } from 'react'
import { withSlots, ConnectSlots } from 'react-rimple'
import { slot } from 'rimple'

let $num = slot(1).tag('num')

function IncButton ({ slots }) {
  return <button onClick={ () => {
      $num.inc()
  } }>increment</button>
}

function DecButton ({ slots }) {
  return <button onClick={ () => {
      $num.dec()
  } }>decrement</button>
}

// using HOC

class App extends Component {
  render () {
    let { num } = this.props
    return <div>
        <IncButton />
        <DecButton />
        <p>{ num }</p>
    </div>
  }
}

export default withSlots({ num: $num })(App)

// or using render props

class App extends Component {
  render () {
    let { num } = this.props
    // using render or children as render function
    return <ConnectSlots slots={{ num: $num }}>
      ({num} => <div>
        <IncButton />
        <DecButton />
        <p>{ num }</p>
      </div>)
    </ConnectSlots>
  }
}

```

checkout the *test.js* and *example* directory for a complete one
