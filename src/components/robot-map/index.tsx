import { h } from 'preact'
import { NT } from '../../nt'
import './style'

interface MapProps {
  robotX: number
  robotY: number
  robotAngle: number
  path: number[][]
  pathPositionX: number
  pathPositionY: number
  goalPointX: number
  goalPointY: number
}

const RobotMap = () => (
  <NT
    data={{
      robotX: '/path_tracking/robot_state/position/x',
      robotY: '/path_tracking/robot_state/position/y',
      robotAngle: {
        key: '/path_tracking/robot_state/rotation',
        transform: (a: number) => a - Math.PI / 2
      },
      path: {
        key: '/path_tracking/path',
        transform: (p: string[]) => p.map(v => JSON.parse(v))
      },
      pathPositionX: 'path_tracking/path_state/path_position/x',
      pathPositionY: 'path_tracking/path_state/path_position/y'
    }}
    render={({
      robotX,
      robotY,
      robotAngle,
      path,
      pathPositionX,
      pathPositionY,
      goalPointX,
      goalPointY
    }: MapProps) => (
      <div class="g-robot-map">
        <div
          class="robot"
          style={{
            transform: `
translate(${robotX - 0.4572}em, ${16.4592 - robotY - 0.51181}em)
rotate(${-robotAngle}rad)`
          }}
        />
        {(path === undefined ? [] : path).map((p, i) => (
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
            left: `${goalPointX}em`,
            bottom: `${goalPointY}em`,
            background: 'yellow'
          }}
        />
      </div>
    )}
  />
)

export default RobotMap
