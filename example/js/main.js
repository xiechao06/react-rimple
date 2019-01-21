'use strict'
const e = React.createElement
const $num = rimple.slot(1)

class IncButton extends React.Component {
  render () {
    let { slots } = this.props
    return e('button', {
      onClick: () => $num.inc()
    }, 'inc')
  }
}

class DecButton extends React.Component {
  render () {
    let { slots } = this.props
    return e('button', {
      onClick: () => $num.dec()
    }, 'dec')
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { liked: false }
  }

  render () {
    let { num, slots } = this.props
    return e(
      'div',
      null,
      e(IncButton),
      e('button', {
        onClick: () => slots.num.dec()
      }, 'dec'),
      e('p', null, 'value: ' + num)
    )
  }
}

const domContainer = document.querySelector('#main')

ReactDOM.render(e(reactRimple.withSlots({ num: $num })(App)), domContainer)
