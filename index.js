import React from 'react'

export const withSlots = function withSlots (slots) {
  return function (Component) {
    class HOC extends React.Component {
      constructor (props) {
        super(props)
        let state = {}
        this.changeCbs = {}
        for (let k in slots) {
          let slot = slots[k]
          // k is local to this closure
          this.changeCbs[k] = (value) => {
            this.setState({ [k]: value })
          }
          slot.change(this.changeCbs[k])
          state[k] = slot.val()
        }
        this.state = state
      }

      componentWillUnmount () {
        for (let k in slots) {
          slots[k].offChange(this.changeCbs[k])
        }
      }

      render () {
        let props = Object.assign({}, this.props, this.state, { slots })
        return <Component {...props} />
      }
    }
    return HOC
  }
}
