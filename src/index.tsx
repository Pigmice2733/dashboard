import { render, h, Component } from 'preact'
import RobotMap from './components/robot-map'
import PanelSelector from './components/panel-selector'
import ConnectionPanel from './components/connection-panel'
import Camera from './components/camera'
import './style'
import client, { connect } from './nt'

let currentAddress: string

type NTValue = string | number | boolean

interface HandleOptions {
  [key: string]: (val: any) => any
}

const handle = (options: HandleOptions) => (key: string, value: NTValue) => {
  // console.log(key, value)
  options[key] && options[key](value)
}

interface MainState {
  angle: number
  x: number
  y: number
  path: number[][]
  pathPositionX: number
  pathPositionY: number
  goalPointX: number
  goalPointY: number
}

const setValue = (key: string, value: string) => client.Assign(value, key)

class Main extends Component<{}, MainState> {
  constructor() {
    super()
    this.state = {
      angle: 0,
      x: 0,
      y: 0,
      pathPositionX: 0,
      pathPositionY: 0,
      path: [],
      goalPointX: 0,
      goalPointY: 0
    }
  }

  componentWillMount() {
    client.addListener(
      handle({
        '/path_tracking/robot_state/rotation': (a: number) =>
          this.setState({ angle: a - Math.PI / 2 }),
        '/path_tracking/robot_state/position/x': (x: number) =>
          this.setState({ x }),
        '/path_tracking/robot_state/position/y': (y: number) =>
          this.setState({ y }),
        '/path_tracking/path': (p: any) =>
          this.setState({ path: p.map(JSON.parse) }),
        '/path_tracking/path_state/goal_point/x': (goalPointX: number) =>
          this.setState({ goalPointX }),
        '/path_tracking/path_state/goal_point/y': (goalPointY: number) =>
          this.setState({ goalPointY }),
        '/path_tracking/path_state/path_position/x': (pathPositionX: number) =>
          this.setState({ pathPositionX }),
        '/path_tracking/path_state/path_position/y': (pathPositionY: number) =>
          this.setState({ pathPositionY })
      })
    )
  }

  render(
    _: {},
    {
      x,
      y,
      angle,
      path,
      pathPositionX,
      pathPositionY,
      goalPointX,
      goalPointY
    }: MainState
  ) {
    return (
      <div class="g-main">
        <Camera />
        <RobotMap
          x={x}
          y={y}
          angle={angle}
          path={path}
          goalPoint={[goalPointX, goalPointY]}
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
