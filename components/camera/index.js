import { h, Component } from 'preact'

class Camera extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div class="g-camera">
        <img src="robot" />
      </div>
    )
  }
}

export default Camera
