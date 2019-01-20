'use strict'
const e = React.createElement
const $num = rimple.slot(1)

class LikeButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { liked: false }
  }

  render () {
    let { num } = this.props
    if (this.state.liked) {
      return 'You liked this.'
    }

    return e(
      'div',
      null,
      e('button', {
        onClick: () => this.props.slots.num.inc()
      }, 'add'),
      e('button', {
        onClick: () => this.props.slots.num.dec()
      }, 'dec'),
      e('p', null, 'value: ' + num)
    )
  }
}

const domContainer = document.querySelector('#main')

ReactDOM.render(e(reactRimple.withSlots({ num: $num })(LikeButton)), domContainer)
