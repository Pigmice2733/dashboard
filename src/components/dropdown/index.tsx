import { h } from 'preact'

interface DropdownProps {
  options: string[]
  onChange: (selectedKey: string) => any
}

const Dropdown = ({ options, onChange }: DropdownProps) => (
  <select onChange={e => onChange((e.target as HTMLSelectElement).value)}>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)

export default Dropdown
