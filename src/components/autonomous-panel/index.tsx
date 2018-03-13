import { h } from 'preact'
import Dropdown from '../dropdown'
import client, { NT } from '../../nt'

interface AutoProps {
  selectedAutoMode: string
}

const AutonomousPanel = () => (
  <div class="g-auto-panel">
    <Dropdown label="Auto Mode" k="/SmartDashboard/Autonomous Mode" />
    <NT
      data={{
        selectedAutoMode: '/SmartDashboard/Autonomous Mode/selected'
      }}
      render={({ selectedAutoMode }: AutoProps) => (
        <Dropdown
          label="Starting Position"
          k={`/autonomous/${selectedAutoMode}/starting_position`}
        />
      )}
    />
  </div>
)

export default AutonomousPanel
