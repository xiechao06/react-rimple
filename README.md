# react-rimple
react and [rimple](www.github.com/xiechao06/rimple) bridge

# installation

```bash
$ npm i react-rimple
```

# examples

```javascript
import React, { Component } from 'react'
import withSlots from 'react-rimple'
import { slot } from 'rimple'

let num = slot(1)

class App extends Component {
    render () {
        let { num } = this.props
        return <h1>{ num % 1 ? 'odd' : 'even' }</h1>
    }
}

export default withSlots({ num })(App)

```
