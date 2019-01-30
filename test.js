import { slot } from 'rimple'
import test from 'tape'
import { withSlots, ConnectSlots } from './index'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

configure({ adapter: new Adapter() })

test('HOC', t => {
  class NameComponent extends React.Component {
    render () {
      return <div>{this.props.name}</div>
    }
  }
  let name = slot('Tom').tag('name')
  const NameComponentWithSlots = withSlots({ name })(NameComponent)
  let wrapped = shallow(<NameComponentWithSlots />)
  t.equal(wrapped.props().name, 'Tom')
  t.equal(wrapped.html(), '<div>Tom</div>')

  name.val('Jerry')
  t.equal(wrapped.props().name, 'Jerry')
  t.equal(wrapped.html(), '<div>Jerry</div>')
  t.end()
})

test('render props - children', t => {
  let name = slot('Tom').tag('name')
  let el = <ConnectSlots slots={{ name }}>
    {({ name, slots }) => <div>{ name }</div>}
  </ConnectSlots>
  let wrapped = shallow(el)
  t.ok(wrapped.find('div').contains('Tom'))
  name.val('Jerry')
  t.ok(wrapped.find('div').contains('Jerry'))

  // non-function children
  el = <ConnectSlots slots={{ name }}>
    <div>Tom</div>
  </ConnectSlots>
  wrapped = shallow(el)
  t.ok(wrapped.find('div').contains('Tom'))
  t.end()
})

test('render props - render', t => {
  let name = slot('Tom').tag('name')
  let el = <ConnectSlots
    slots={{ name }}
    render={({ name, slots }) => <div>{ name }</div>}
  />
  let wrapped = shallow(el)
  t.ok(wrapped.find('div').contains('Tom'))
  name.val('Jerry')
  t.ok(wrapped.find('div').contains('Jerry'))
  t.end()
})
