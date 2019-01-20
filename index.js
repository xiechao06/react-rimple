import React from 'react'

export const withSlots = function withSlots (slots) {
  return function (Component) {
    class HOC extends React.Component {
      constructor (props) {
        super(props)
        let state = {}
        for (let k in slots) {
          let slot = slots[k]
          // k is local to this closure
          slot.change((value) => {
            this.setState({ [k]: value })
          })
          state[k] = slot.val()
        }
        this.state = state
      }
      render () {
        let props = Object.assign({}, this.props, this.state, { slots })
        return <Component {...props} />
      }
    }
    return HOC
  }
}
