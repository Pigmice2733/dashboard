import { h, Component } from 'preact'
import { ipcRenderer as ipc } from 'electron'

const options = [
  // first is default
  {
    name: 'Robot',
    address: 'roborio-2733-frc.local'
  },
  {
    name: 'Simulation',
    address: 'localhost'
  },
  {
    name: 'USB',
    address: '172.22.11.2'
  }
]

class Connection extends Component {
  constructor() {
    super()
    this.state = {
      connected: false,
      selected: options[0].address
    }
    ipc.send('connectionstatus')
    ipc.on('connectionstatus', (_, connected) => {
      this.setState({ connected })
    })
    this.setIp = this.setIp.bind(this)
  }

  setIp(selected) {
    this.setState({ selected })
    ipc.send('selectip', selected)
  }

  render(_, { connected, selected }) {
    return (
      <div class={`g-connection ${connected ? 'connected' : ''}`}>
        <h2>Connection</h2>
        <div class="options">
          {options.map(o => (
            <button
              class={selected === o.address ? 'selected' : ''}
              onClick={() => this.setIp(o.address)}
              key={o.address}
            >
              <span class="arrow">▶</span>
              <span class="name">{o.name}</span>
              <span class="address">{o.address}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default Connection
