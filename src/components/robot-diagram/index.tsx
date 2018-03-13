import { h } from 'preact'
import { NT, set } from '../../nt'
import './style'

enum ArmState {
  Open,
  Closed,
  Neutral
}

interface Position {
  x: number
  y: number
}

const aluminum = '#b5b5b5'
const intakeWheel = 'green'

const translate = (x: number, y: number) => `translate(${x}, ${y})`

const SideWheel = ({ x, y }: Position) => (
  <rect fill={intakeWheel} width={4} height={1} x={x} y={y} />
)

const IntakeSide = ({ x, y }: Position) => (
  <g transform={translate(x, y)}>
    <rect fill={aluminum} width={12} height={2} />
    <SideWheel x={0.5} y={0.5} />
    <SideWheel x={0.5} y={2.3} />
    <SideWheel x={6} y={0.5} />
  </g>
)

interface RobotSideProps {
  elevatorPosition: number
  isRed: boolean
}

const RobotSide = ({ elevatorPosition, isRed }: RobotSideProps) => {
  console.log(elevatorPosition)
  const stagePosition = 40 - elevatorPosition * 3.5
  elevatorPosition = 88 - elevatorPosition * 7
  return (
    <svg class="g-robot-side" viewBox="0 0 40 97">
      <IntakeSide x={1} y={elevatorPosition} />
      <rect height={50} width={1} fill={aluminum} x={13} y={stagePosition} />
      <rect height={51} width={1} fill={aluminum} x={14} y={40} />
      <rect
        height={55}
        width={1}
        fill={aluminum}
        x={-3}
        y={43}
        transform="rotate(-23)"
      />
      <rect
        fill={isRed ? 'red' : 'blue'}
        width={30}
        height={5}
        x={10}
        y={91}
        rx={1}
        ry={1}
      />
    </svg>
  )
}

const TopWheel = () => (
  <path
    fill={intakeWheel}
    d="M9.6 0A9.6 9.6 0 0 0 0 9.6a9.6 9.6 0 0 0 9.6 9.6 9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 9.6 0zm0 1.1a8.5 8.5 0 0 1 .1 0 8.5 8.5 0 0 1 .7 0L10 5a4.7 4.7 0 0 0-.4 0 4.7 4.7 0 0 0-2.1.5L5.5 2A8.5 8.5 0 0 1 9.8 1zm1.8.2a8.5 8.5 0 0 1 4.2 2.2l-2.7 2.7A4.7 4.7 0 0 0 10.7 5zM4.7 2.6l2.3 3a4.7 4.7 0 0 0-1.7 2L2 6.2a8.5 8.5 0 0 1 2.8-3.5zm11.8 1.8a8.5 8.5 0 0 1 1.7 4.3l-4 .4a4.7 4.7 0 0 0-.9-2.4zm-15 3l3.6 1a4.7 4.7 0 0 0-.2 1.2 4.7 4.7 0 0 0 .2 1.4l-3.7 1.2a8.5 8.5 0 0 1 0-4.8zm12.8 2.4h3.9a8.5 8.5 0 0 1-1.5 4.6l-3.2-2.2a4.7 4.7 0 0 0 .8-2.4zm-9 1.8a4.7 4.7 0 0 0 1.7 2l-2 3.2a8.5 8.5 0 0 1-3.1-3.5zm7.8 1.1l3 2.8a8.5 8.5 0 0 1-4.2 2.4l-1-3.8a4.7 4.7 0 0 0 2.2-1.4zm-5.5 1.1a4.7 4.7 0 0 0 2 .5 4.7 4.7 0 0 0 .6 0l.4 3.8a8.5 8.5 0 0 1-4.6-.7z"
  />
)

interface IntakeTopProps {}

const IntakeTop = () => (
  <g>
    <TopWheel />
  </g>
)

interface RobotTopProps {
  intakePosition: ArmState
  intakeSpeed: number
  isRed: boolean
  robotAngle: number
}

const RobotTop = ({
  intakePosition,
  intakeSpeed,
  isRed,
  robotAngle
}: RobotTopProps) => (
  <svg
    class="g-robot-top"
    viewBox="0 0 50 50"
    style={{ transform: `rotate(${-robotAngle}rad)` }}
  >
    <rect
      fill={isRed ? 'red' : 'blue'}
      width={50}
      height={50}
      rx={3.5}
      ry={3.5}
    />
    <IntakeTop />
  </svg>
)

interface DiagramProps {
  intakeSpeed: number
  elevatorPosition: number
  isRed: boolean
  intakePosition: ArmState
  robotAngle: number
}

const RobotDiagram = () => (
  <NT
    data={{
      intakePosition: '/components/intake/arm_state',
      intakeSpeed: '/components/intake/wheel_speed',
      elevatorPosition: '/components/elevator/position',
      isRed: '/FMSInfo/IsRedAlliance',
      robotAngle: '/components/drivetrain/rotation'
    }}
    render={({
      intakePosition,
      intakeSpeed,
      elevatorPosition,
      isRed,
      robotAngle
    }: DiagramProps) => {
      return (
        <div class="g-robot-diagram">
          <RobotSide
            elevatorPosition={
              elevatorPosition === undefined ? 0 : elevatorPosition
            }
            isRed={isRed}
          />
          <RobotTop
            robotAngle={robotAngle}
            intakePosition={intakePosition}
            intakeSpeed={intakeSpeed}
            isRed={isRed}
          />
          <h1>{elevatorPosition}</h1>
        </div>
      )
    }}
  />
)

export default RobotDiagram
