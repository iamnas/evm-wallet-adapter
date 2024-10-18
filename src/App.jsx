import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { http, createConfig, WagmiProvider, useConnect } from 'wagmi'
import { sepolia } from 'wagmi/chains'

import { injected } from 'wagmi/connectors'
import { Account } from './page/Account'
import ReadContract from './page/ReadContract'

// const projectId = '098540e5f23ed000bf3d27b1b1690792'


export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    // metaMask(),
    // safe(),
  ],
  transports: {
    [sepolia.id]: http(),
    // [base.id]: http(),
  },
})

// eslint-disable-next-line react/prop-types
function App() {

  const queryClient = new QueryClient()



  return (
    <>

      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletOptions />
          <Account />
          <ReadContract />
        </QueryClientProvider>
      </WagmiProvider>

    </>
  )
}


export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}



export default App



