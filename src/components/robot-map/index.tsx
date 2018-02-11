import { h } from 'preact'
import './style'

interface RobotMapProps {
  x: number
  y: number
  angle: number
  path: number[][]
  pathPositionX: number
  pathPositionY: number
  goalPoint: number[]
}

const RobotMap = ({
  x,
  y,
  angle,
  path,
  pathPositionX,
  pathPositionY,
  goalPoint
}: RobotMapProps) => (
  <div class="g-robot-map">
    <div
      class="robot"
      style={{
        transform: `
translate(${x - 1}em, ${54 - y - 1.5}em)
rotate(${-angle}rad)`
      }}
    />
    {path.map((p, i) => (
      <div
        class="point"
        style={{
          left: `${p[0]}em`,
          bottom: `${p[1]}em`,
          background: i === path.length - 1 ? 'red' : null
        }}
      />
    ))}
    <div
      class="point"
      style={{
        left: `${pathPositionX}em`,
        bottom: `${pathPositionY}em`,
        background: 'purple'
      }}
    />
    <div
      class="point"
      style={{
        left: `${goalPoint[0]}em`,
        bottom: `${goalPoint[1]}em`,
        background: 'yellow'
      }}
    />
  </div>
)

export default RobotMap
