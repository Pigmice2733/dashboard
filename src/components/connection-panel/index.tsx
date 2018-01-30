import ListSelect from '../list-select'

const addresses = [
  { name: 'Simulator', address: 'localhost' },
  { name: 'USB', address: '172.22.11.2' },
  { name: 'WiFi/Ethernet', address: 'roborio-2733-frc.local' }
]
const ConnectionPanel = () => ListSelect

export default ConnectionPanel
