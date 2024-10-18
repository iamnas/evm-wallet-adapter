import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

export function SendTransaction() {
    const { data: hash, sendTransaction } = useSendTransaction()

    async function sendTx() {
        const to = document.getElementById("to").value;
        const value = document.getElementById("value").value;
        sendTransaction({ to, value: parseEther(value) });
    }

    return (
      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-semibold text-gray-800">Send Transaction</h2>
        <input
          id="to"
          type="text"
          placeholder="Recipient Address (0xA0Cf…251e)"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <input
          id="value"
          type="text"
          placeholder="Amount (0.05 ETH)"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button 
          onClick={sendTx} 
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>

        {hash && (
          <div className="bg-green-100 text-green-700 p-2 rounded-lg mt-4 shadow-md">
            Transaction Hash: {hash}
          </div>
        )}
      </div>
    )
}
