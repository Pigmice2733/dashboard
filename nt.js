import { ipcRenderer as ipc } from 'electron'
import { Component } from 'preact'

const updateKey = key => value => {
  ipc.send('value', key, value)
}

const subscribeNT = (component, subscriptions) =>
  class WrappedComponent extends Component {
    constructor() {
      super()
      this.state = { props: {} }
    }

    componentWillMount() {
      Object.keys(subscriptions).forEach(prop => {
        const ntKey = subscriptions[prop]
        if (ntKey.startsWith('/')) {
          this.setState(state => {
            const newKey = 'set' + prop.charAt(0).toUpperCase() + prop.slice(1)
            state.props[newKey] = updateKey(ntKey)
          })
          ipc.on('value', (e, key, value) => {
            if (key === ntKey) {
              this.setState(state => {
                state.props[prop] = value
                return state
              })
            }
          })
        } else if (ntKey === 'keys') {
          ipc.on('all', (e, data) => {
            this.setState(state => {
              state.props[prop] = Object.keys(data)
              return state
            })
          })
        }
      })
    }

    render() {
      return component(this.state.props)
    }
  }

export default subscribeNT
