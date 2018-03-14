import { h, Component } from 'preact'
import { Client as ntClient, Listener } from 'wpilib-nt-client'

const client = new ntClient()

export const set = (key: string, value: string) => client.Assign(value, key)

let robotAddress: string
let connected = false

export const connect = (address: string) => {
  if (connected && robotAddress === address) {
    console.log(client.getKeys())
    return
  }
  console.log(address)
  robotAddress = address
  new Promise<boolean>(resolve => {
    client.start((con, err) => {
      console.log(con ? 'connected' : 'disconnected', address)
      connected = con
      resolve(con)
      if (!con) {
        connect(robotAddress)
      }
    }, robotAddress)
  })
}

type NTValue = string | number | undefined | string[] | number[]

interface NTKeyWithTransform<T> {
  key: string
  transform: (d: NTValue) => T
}

interface NTProps<T> {
  render: (data: { [K in keyof T]: T[K] }) => any
  data: { [K in keyof T]: NTKeyWithTransform<T[K]> | string } & {
    [key: string]: any
  }
}

interface NTState {
  [key: string]: any
}

export class NT<T extends {}> extends Component<NTProps<T>, NTState> {
  listener: Listener

  constructor(props: NTProps<T>) {
    super()
    this.state = Object.keys(props.data).reduce<NTState>(
      (acc, val) => ((acc[val] = undefined), acc),
      {}
    )
  }

  componentWillMount() {
    const props = this.props
    this.listener = client.addListener((ntKey, ntValue) => {
      console.log(ntKey, ntValue)
      const propsKey = Object.keys(props.data).find(k => {
        const d = props.data[k]
        return (typeof d === 'string' ? d : d.key) === ntKey
      })
      if (propsKey === undefined) {
        return
      }
      const d = props.data[propsKey]
      if (typeof d !== 'string') {
        ntValue = d.transform(ntValue)
      }
      if (propsKey !== undefined) {
        this.setState((state: NTState) => (state[propsKey] = ntValue))
      }
    }, true)
  }

  componentWillUnmount() {
    client.removeListener(this.listener)
  }

  render(props: NTProps<T>) {
    return props.render(this.state as T)
  }
}

export default client
