import { h } from 'preact'
import client, { NT, set } from '../../nt'
import './style'

interface DropProps {
  options: string[]
  selected: string
}

const Dropdown = ({ k, label }: { k: string; label: string }) => (
  <NT
    data={{
      options: `${k}/options`,
      selected: `${k}/selected`
    }}
    render={({ options, selected }: DropProps) => {
      if (options === undefined || options.length === 0) {
        return null
      }
      return (
        <label class="g-dropdown">
          {label}
          <select
            onChange={e =>
              set(`${k}/selected`, (e.target as HTMLSelectElement).value)
            }
          >
            {options.map(option => (
              <option
                key={option}
                value={option}
                selected={option === selected}
              >
                {option}
              </option>
            ))}
          </select>
        </label>
      )
    }}
  />
)

export default Dropdown
