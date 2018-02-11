import { h, Component } from 'preact'
import { set } from '../nt'

type ListSelectProps<T> = {
  onChange: (selected: string) => any
  options: ({ key: string } & { [K in keyof T]: T[K] })[]
  render: (val: T) => any
}

interface ListSelectState {
  selectedOption: string
}

const ListSelect = <T extends {}>(props: ListSelectProps<T>) =>
  h(
    class extends Component<ListSelectProps<T>, ListSelectState> {
      constructor({ options }: ListSelectProps<T>) {
        super()
        this.state = {
          selectedOption: options[0].key
        }
      }

      render(
        { onChange, options, render }: ListSelectProps<T>,
        { selectedOption }: ListSelectState
      ) {
        console.log(selectedOption)
        return (
          <form class="g-list-select">
            {options.map(val => (
              <div class="g-list-select-item">
                <input
                  type="radio"
                  id={val.key}
                  name={val.key}
                  value={val.key}
                  checked={selectedOption === val.key}
                  onChange={e => {
                    this.setState({ selectedOption: e.target.value })
                    this.props.onChange(e.target.value)
                  }}
                />
                <label for="contactChoice1">{render(val)}</label>
              </div>
            ))}
          </form>
        )
      }
    },
    props,
    {}
  )

export default ListSelect
