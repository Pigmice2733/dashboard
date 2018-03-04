import { h } from 'preact'
import Dropdown from '../dropdown'
import client, { NT } from '../../nt'

interface AutoProps {
  autoModes: string[]
  selectedAutoMode: string
  startingPositions: string[]
  selectedPosition: string
}

const AutonomousPanel = () => (
  <NT
    data={{
      autoModes: '/SmartDashboard/Autonomous Mode/options',
      selectedAutoMode: '/SmartDashboard/Autonomous Mode/selected',
      startingPositions: '/path_selection/starting_positions',
      selectedPosition: '/path_selection/starting_position'
    }}
    render={({
      autoModes,
      selectedAutoMode,
      startingPositions,
      selectedPosition
    }: AutoProps) => {
      return (
        <div class="g-auto-panel">
          <h2>Autonomous Mode</h2>
          <Dropdown
            options={
              autoModes === undefined || autoModes.length === 0
                ? ['None']
                : autoModes
            }
            selected={selectedAutoMode}
            onChange={newMode =>
              client.Assign(newMode, '/SmartDashboard/Autonomous Mode/selected')
            }
          />
          <h2>Starting Position</h2>
          <Dropdown
            options={
              startingPositions === undefined || startingPositions.length === 0
                ? ['None']
                : startingPositions
            }
            selected={selectedPosition}
            onChange={selectedPosition =>
              client.Assign(
                selectedPosition,
                '/path_selection/starting_position'
              )
            }
          />
        </div>
      )
    }}
  />
)

export default AutonomousPanel
