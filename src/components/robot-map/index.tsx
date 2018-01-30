import { h } from 'preact'
import './style'

interface RobotMapProps {
  x: number
  y: number
  angle: number
  path: number[][]
  pathPositionX: number
  pathPositionY: number
}

const RobotMap = ({
  x,
  y,
  angle,
  path,
  pathPositionX,
  pathPositionY
}: RobotMapProps) => {
  console.log({ x, y, angle, pathPositionX, pathPositionY })
  return (
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
      <div
        class="point"
        style={{
          left: `${pathPositionX}em`,
          bottom: `${pathPositionY}em`,
          background: 'purple'
        }}
      />
      <div class="point" style="left: 0; bottom: 5em; background: orange" />
    </div>
  )
}

export default RobotMap
