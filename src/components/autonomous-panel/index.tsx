import { h } from 'preact'
import Dropdown from '../dropdown'
import client from '../../nt'

interface AutonomousPanelProps {
  autoModes: string[]
  startingPositions: string[]
}

const AutonomousPanel = ({
  autoModes,
  startingPositions
}: AutonomousPanelProps) => {
  console.log(startingPositions)
  return (
    <div class="g-auto-panel">
      <h2>Autonomous Mode</h2>
      <Dropdown
        options={autoModes.length > 0 ? autoModes : ['None']}
        onChange={newMode =>
          client.Assign(newMode, '/SmartDashboard/Autonomous Mode/selected')
        }
      />
      <h2>Starting Position</h2>
      <Dropdown
        options={startingPositions.length > 0 ? startingPositions : ['None']}
        onChange={selectedPosition =>
          client.Assign(selectedPosition, '/path_selection/initial_state')
        }
      />
    </div>
  )
}

export default AutonomousPanel
