import { h, render } from 'preact'
import subscribeNT from './nt'

const KeysListRaw = ({ keys = [] }) => (
  <ul>{keys.map(key => <li key={key}>{key}</li>)}</ul>
)

const KeysList = subscribeNT(KeysListRaw, { keys: 'keys' })

const Mode = subscribeNT(({ mode = '' }) => <h1>{`Mode: ${mode}`}</h1>, {
  mode: '/robot/mode'
})

const Selected = subscribeNT(
  ({ selected = '' }) => <h1>{`Selected: ${selected}`}</h1>,
  {
    selected: '/SmartDashboard/Autonomous Mode/selected'
  }
)

const Home = () => (
  <div id="p-home">
    <h1>Home</h1>
    <Selected />
    <Mode />
    <KeysList />
  </div>
)

render(<Home />, document.body)
