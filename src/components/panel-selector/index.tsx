import { h, Component, FunctionalComponent, ComponentConstructor } from 'preact'
import Icon from '../icon'
import './style'

interface Panel {
  name: string
  contents: FunctionalComponent<any> | ComponentConstructor<any, any>
  icon: string
}

interface PanelProps {
  panels: Panel[]
}

interface PanelState {
  selectedPanel: number | null
}

class PanelSelector extends Component<PanelProps, PanelState> {
  constructor() {
    super()
    this.state = { selectedPanel: null }
  }

  shouldComponentUpdate(newProps: PanelProps, newState: PanelState) {
    const oldPanels = this.props.panels
    const newPanels = newProps.panels
    return (
      oldPanels.length !== newPanels.length ||
      !oldPanels.every((p, i) => p.icon === newPanels[i].icon) ||
      !oldPanels.every((p, i) => p.name === newPanels[i].name) ||
      newState.selectedPanel !== this.state.selectedPanel
    )
  }

  selectPanel = (clickedPanel: number) => () =>
    this.setState(({ selectedPanel }: PanelState) => ({
      selectedPanel: selectedPanel === clickedPanel ? null : clickedPanel
    }))

  render({ panels }: PanelProps, { selectedPanel }: PanelState) {
    return (
      <div class="g-panel">
        <div class="sidebar">
          {panels.map((p, i) => (
            <button
              class={`panel-icon ${i === selectedPanel ? 'active' : ''}`}
              onClick={this.selectPanel(i)}
              key={p.name}
            >
              <Icon icon={p.icon} />
            </button>
          ))}
        </div>
        {selectedPanel !== null && (
          <div class="panel">
            <h1>{panels[selectedPanel].name}</h1>
            {h(panels[selectedPanel].contents, {})}
          </div>
        )}
      </div>
    )
  }
}

export default PanelSelector
