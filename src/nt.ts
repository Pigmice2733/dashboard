import { Client as ntClient } from 'wpilib-nt-client'

const client = new ntClient()

export const set = (key: string, value: string) => client.Assign(value, key)

export const connect = (address: string) =>
  new Promise<boolean>(resolve => {
    client.start(
      (con, err) => {
        console.log(con ? 'connected' : 'disconnected', address)
        resolve(con)
        if (!con) {
          connect(address)
        }
      },
      address,
      1735
    )
  })

export default client
