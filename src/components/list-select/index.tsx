import { h, Component } from 'preact'
import './style'
import { deepCompare } from '../../utils'

type ListSelectProps<T> = {
  onChange: (selected: string) => any
  options: ({ key: string } & { [K in keyof T]: T[K] })[]
  render: (val: T) => any
}

interface ListSelectState {
  selectedOption: string
}

const ListSelect = <T extends {}>(
  { onChange, options, render }: ListSelectProps<T>,
  { selectedOption }: ListSelectState
) => {
  console.log('render list select')
  return (
    <form
      class="g-list-select"
      onChange={e => onChange((e.target as HTMLInputElement).value)}
    >
      {options.map(val => (
        <label class="g-list-select-item">
          <input type="radio" id={val.key} name="listSelect" value={val.key} />
          {render(val)}
        </label>
      ))}
    </form>
  )
}

export default ListSelect
