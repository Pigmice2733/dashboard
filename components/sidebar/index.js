import { h, Component } from 'preact'
import Connection from '../connection'

class Sidebar extends Component {
  constructor() {
    super()

    this.state = {
      visibleSection: 'connection'
    }
  }
  render(_, { visibleSection }) {
    return (
      <div class={`g-sidebar ${visibleSection}`}>
        {visibleSection === 'connection' ? <Connection /> : null}
      </div>
    )
  }
}

export default Sidebar
