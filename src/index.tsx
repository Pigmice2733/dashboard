import { render, h, Component } from 'preact'
import RobotMap from './components/robot-map'
import PanelSelector from './components/panel-selector'
import ConnectionPanel from './components/connection-panel'
import Camera from './components/camera'
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
  options[key] && options[key](value)
}

interface MainState {
  angle: number
  x: number
  y: number
  connected: boolean
  address: string
  path: number[][]
  pathPositionX: number
  pathPositionY: number
}

class Main extends Component<{}, MainState> {
  constructor() {
    super()
    this.state = {
      angle: 0,
      x: 0,
      y: 0,
      pathPositionX: 0,
      pathPositionY: 0,
      connected: false,
      path: [],
      address: '10.27.33.10'
      // address: '10.151.34.85'
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
        '/path_tracking/robot_state/position/x': (x: number) =>
          this.setState({ x }),
        '/path_tracking/robot_state/position/y': (y: number) =>
          this.setState({ y }),
        '/path_tracking/path': (p: any) =>
          this.setState({ path: JSON.parse(p) }),
        '/path_tracking/path_state/path_position/x': (pathPositionX: number) =>
          this.setState({ pathPositionX }),
        '/path_tracking/path_state/path_position/y': (pathPositionY: number) =>
          this.setState({ pathPositionY })
      })
    )
  }

  render(
    _: {},
    { x, y, angle, path, pathPositionX, pathPositionY }: MainState
  ) {
    return (
      <div class="g-main">
        <Camera />
        <RobotMap
          x={x}
          y={y}
          angle={angle}
          path={path}
          pathPositionX={pathPositionX}
          pathPositionY={pathPositionY}
        />
        <PanelSelector
          panels={[
            {
              name: 'Connection',
              contents: () => <ConnectionPanel />,
              icon: 'accessPoint'
            },
            {
              name: 'Autonomous',
              contents: () => <h1>Autonomous Panel</h1>,
              icon: 'auto'
            }
          ]}
        />
      </div>
    )
  }
}

render(<Main />, document.body)
