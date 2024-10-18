import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { SendTransaction } from './SendTransaction'

export function Account() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const balance = useBalance({
    address
  })

  return (
    <div>
      {isConnected && <button onClick={() => disconnect()}>Disconnect</button>}
      {address && <div>
        Your address - {address}
        Your balance - {balance?.data?.formatted}
      </div>}


      <SendTransaction />
    </div>
  )
}