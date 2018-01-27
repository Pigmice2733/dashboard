import { render, h, Component } from 'preact'
import RobotMap from './components/robot-map'
import './style'

import { Client as ntClient } from 'wpilib-nt-client'

const client = new ntClient()

const connect = (address: string) =>
  new Promise<boolean>(resolve => {
    client.start(
      (con, err) => {
        resolve(con)
      },
      address,
      1735
    )
  })

type NTValue = string | number | boolean

interface HandleOptions {
  [key: string]: (val: any) => any
}

const handle = (options: HandleOptions) => (key: string, value: NTValue) => {
  options[key] ? options[key](value) : console.log(key)
}

interface MainState {
  angle: number
  x: number
  y: number
  connected: boolean
  address: string
  path: number[][]
}
class Main extends Component<{}, MainState> {
  constructor() {
    super()
    this.state = {
      angle: 0,
      x: 0,
      y: 0,
      connected: false,
      path: [],
      address: 'localhost'
    }
  }

  setupNT = () => {
    setInterval(async () => {
      this.setState({ connected: client.isConnected() })
      if (!this.state.connected) {
        connect(this.state.address)
      }
    }, 200)
  }

  componentWillMount() {
    this.setupNT()
    client.addListener(
      handle({
        '/path_tracking/robot_state/rotation': (a: number) =>
          this.setState({ angle: a - Math.PI / 2 }),
        '/path_tracking/robot_state/x': (x: number) => this.setState({ x }),
        '/path_tracking/robot_state/y': (y: number) => this.setState({ y }),
        '/path_tracking/path': (p: any) =>
          this.setState({ path: JSON.parse(p) })
      })
    )
  }

  render(_: {}, { x, y, angle, path }: MainState) {
    console.log(path)
    return (
      <div>
        <RobotMap x={x} y={y} angle={angle} path={path} />
        <h2>{this.state.connected ? 'Connected' : 'Disconnected'}</h2>
      </div>
    )
  }
}

render(<Main />, document.body)
