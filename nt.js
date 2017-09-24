import { ipcRenderer } from 'electron'
import { Component } from 'preact'

const ipc = ipcRenderer

const subscribeNT = (component, subscriptions) =>
  class WrappedComponent extends Component {
    constructor() {
      super()
      this.state = { props: {} }
    }

    componentWillMount() {
      Object.keys(subscriptions).forEach(prop => {
        const desiredKey = subscriptions[prop]
        if (desiredKey.startsWith('/')) {
          ipc.on('value', (e, key, value) => {
            if (key === desiredKey) {
              this.setState(state => {
                state.props[prop] = value
                return state
              })
            }
          })
        } else if (desiredKey === 'keys') {
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
