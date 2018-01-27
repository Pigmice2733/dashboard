import { h } from 'preact'
import './style'

interface RobotMapProps {
  x: number
  y: number
  angle: number
  path: number[][]
}

const RobotMap = ({ x, y, angle, path }: RobotMapProps) => (
  <div class="g-robot-map">
    <div
      class="robot"
      style={{
        transform: `
translate(${x - 1}em, ${54 - y - 1.5}em)
rotate(${-angle}rad)`
      }}
    />
    {path.map(p => (
      <div
        class="point"
        style={{
          left: `${p[0]}em`,
          bottom: `${p[1]}em`
        }}
      />
    ))}
  </div>
)

export default RobotMap
