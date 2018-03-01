import { h } from 'preact'

interface DropdownProps {
  options: string[]
  selected?: string
  onChange: (selectedKey: string) => any
}

const Dropdown = ({ options, onChange, selected }: DropdownProps) => (
  <select onChange={e => onChange((e.target as HTMLSelectElement).value)}>
    {options.map(option => (
      <option key={option} value={option} selected={option === selected}>
        {option}
      </option>
    ))}
  </select>
)

export default Dropdown
