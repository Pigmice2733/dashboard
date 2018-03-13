import { h } from 'preact'
import ListSelect from '../list-select'
import { connect } from '../../nt'

interface ConnectionOption {
  name: string
  address: string
  key: string
}

const addresses: ConnectionOption[] = [
  { name: 'Simulator', address: 'localhost', key: 'sim' },
  { name: 'USB', address: '172.22.11.2', key: 'usb' },
  { name: 'WiFi/Ethernet', address: 'roborio-2733-frc.local', key: 'wifi' }
]

const connectToMatching = (k: string) => {
  const matchingOption = addresses.find(a => a.key === k)
  if (matchingOption === undefined) {
    return
  }
  connect(matchingOption.address)
}

const ConnectionPanel = () => (
  <ListSelect
    onChange={connectToMatching}
    options={addresses}
    render={val => val.name}
  />
)

export default ConnectionPanel
