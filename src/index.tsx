import { render, h, Component } from 'preact'
import RobotMap from './components/robot-map'
import PanelSelector from './components/panel-selector'
import ConnectionPanel from './components/connection-panel'
import AutonomousPanel from './components/autonomous-panel'
import Camera from './components/camera'
import './style'

const Main = () => (
  <div class="g-main">
    <Camera />
    <RobotMap />
    <PanelSelector
      panels={[
        {
          name: 'Connection',
          contents: () => <ConnectionPanel />,
          icon: 'accessPoint'
        },
        {
          name: 'Autonomous',
          contents: () => <AutonomousPanel />,
          icon: 'auto'
        }
      ]}
    />
  </div>
)

render(<Main />, document.body)
