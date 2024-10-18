import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { http, createConfig, WagmiProvider, useConnect } from 'wagmi'
import { sepolia } from 'wagmi/chains'

import { injected } from 'wagmi/connectors'
import { Account } from './page/Account'
import ReadContract from './page/ReadContract'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-500 via-indigo-500 to-teal-400 p-4">
            {/* Wallet Options */}
            <div className="mb-8">
              <WalletOptions />
            </div>

            {/* Main Content: Account & Contract Interactions */}
            <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 justify-center items-center bg-white shadow-lg rounded-lg p-6">
              <Account />
              <ReadContract />
            </div>
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export function WalletOptions() {
  const { connectors, connect, error, isLoading, pendingConnector } = useConnect()

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={!connector.ready}
          className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-colors duration-300 ${
            connector.ready
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          {connector.name}
          {isLoading && pendingConnector?.id === connector.id && ' (connecting...)'}
        </button>
      ))}
      {error && <div className="text-red-500 mt-2">Connection failed: {error.message}</div>}
    </div>
  )
}

export default App
