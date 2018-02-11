import { h } from 'preact'
import ListSelect from '../list-select'
import { connect } from '../../nt'

const addresses = [
  { name: 'Simulator', address: 'localhost', key: 'sim' },
  { name: 'USB', address: '172.22.11.2', key: 'usb' },
  { name: 'WiFi/Ethernet', address: '10.27.33.10', key: 'wifi' }
]

const ConnectionPanel = () => {
  console.log('render connection panel')
  return (
    <ListSelect
      onChange={k => connect(addresses.find(a => a.key === k).address)}
      options={addresses}
      render={val => <h1>{val.name}</h1>}
    />
  )
}

export default ConnectionPanel