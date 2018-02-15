import { Client as ntClient } from 'wpilib-nt-client'

const client = new ntClient()

export const set = (key: string, value: string) => client.Assign(value, key)

let robotAddress: string
let connected = false

export const connect = (address: string) => {
  if (connected && robotAddress === address) {
    return
  }
  robotAddress = address
  new Promise<boolean>(resolve => {
    client.start(
      (con, err) => {
        console.log(con ? 'connected' : 'disconnected', address)
        connected = con
        resolve(con)
        if (!con) {
          connect(robotAddress)
        }
      },
      robotAddress,
      1735
    )
  })
}

export default client
