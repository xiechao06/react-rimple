import React from 'react'

const connect = function connect (slots) {
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
        let { slots: origSlots, ...restProps } = this.props
        slots = Object.assign(slots, origSlots)
        let props = Object.assign({}, restProps, this.state, { slots })
        return <Component {...props} />
      }
    }
    return HOC
  }
}

export default connect
