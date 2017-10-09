import { h, render } from 'preact'
import Connection from './components/connection'
import Sidebar from './components/sidebar'

const Home = () => (
  <div id="p-home">
    <h1>Home</h1>
    <Sidebar />
  </div>
)

render(<Home />, document.body)
