import { h, render } from 'preact'
import Connection from './components/connection'
import Sidebar from './components/sidebar'
import Camera from './components/camera'
import RobotDiagrams from './components/robot-diagrams'

const Home = () => (
  <div id="p-home">
    <Camera />
    <RobotDiagrams />
    <Sidebar />
  </div>
)

render(<Home />, document.body)
