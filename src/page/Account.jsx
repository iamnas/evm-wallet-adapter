import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { SendTransaction } from './SendTransaction'

export function Account() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const balance = useBalance({
    address
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Account</h1>

        {isConnected && (
          <button 
            onClick={() => disconnect()} 
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        )}

        {address && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner">
            <p className="text-gray-700 mb-2">Your Address:</p>
            <p className="font-mono text-sm bg-gray-200 p-2 rounded-lg">
              {address}
            </p>
            <p className="mt-4 text-gray-700">Balance:</p>
            <p className="text-2xl font-semibold text-green-500">
              {balance?.data?.formatted} ETH
            </p>
          </div>
        )}

        <SendTransaction />
      </div>
    </div>
  )
}
