import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
// import renderProps from 'render-props'

const getDisplayName = (Component) => Component.displayName || Component.name || 'Component'

export const withSlots = function withSlots (slots) {
  return function (Component) {
    class WithSlotsHOC extends React.Component {
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
        let { wrappedComponentRef, ...restProps } = this.props
        return <Component
          ref={wrappedComponentRef}
          {...restProps}
          {...this.state}
          slots={slots} />
      }
    }
    // set the displayName
    WithSlotsHOC.displayName = `WithSlotsHOC(${getDisplayName(Component)})`

    // forward refs
    WithSlotsHOC.propTypes = {
      wrappedComponentRef: PropTypes.func
    }
    // hoist statics
    return hoistStatics(WithSlotsHOC, Component)
  }
}

export class ConnectSlots extends React.Component {
  constructor (props) {
    super(props)
    let state = {}
    this.changeCbs = {}
    for (let k in props.slots) {
      let slot = props.slots[k]
      // k is local to this closure
      this.changeCbs[k] = (value) => {
        this.setState({ [k]: value })
      }
      slot.change(this.changeCbs[k])
      state[k] = slot.val()
    }
    this.state = state
  }

  render () {
    let { render, children } = this.props

    let args = {
      ...this.state,
      slots: this.props.slots
    }
    if (typeof render === 'function') {
      return render(args)
    }
    if (typeof children === 'function') {
      return children(args)
    }
    return children
  }
}

ConnectSlots.propTypes = {
  slots: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
}
