import { useReadContracts } from 'wagmi'
import { ABI, ADDRESS } from '../utils'
import { useWriteContract } from 'wagmi'
import { useState } from 'react'

const ContractData = {
    address: ADDRESS,
    abi: ABI,
}

export default function ReadContract() {
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const { data, isLoading } = useReadContracts({
        contracts: [
            {
                ...ContractData,
                functionName: 'count'
            }
        ]
    })

    const { writeContract } = useWriteContract()

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-lg font-semibold text-gray-800">Loading...</div>
        </div>
    }

    const inc = () => {
        writeContract({
            ...ContractData,
            functionName: 'increase',
        })
    }

    async function sendTx() {
        writeContract({
            ...ContractData,
            functionName: 'transfer',
            value: amount,
            args: [to, amount]
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Smart Contract Interaction</h1>

                <div className="mb-6 text-center text-lg">
                    <span className="font-semibold">Count:</span> {data ? (data[0].result)?.toString() : ''}
                </div>

                <button 
                    onClick={inc} 
                    className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition-all mb-4"
                >
                    INCREASE
                </button>

                <h2 className="text-lg font-semibold mb-2 text-center text-gray-800">Send Transaction</h2>
                <div className="space-y-4">
                    <input
                        id="to"
                        type="text"
                        placeholder="Recipient Address (0xA0Cf…251e)"
                        onChange={(e) => { setTo(e.target.value) }}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        id="value"
                        type="text"
                        placeholder="Amount (0.05 ETH)"
                        onChange={(e) => { setAmount(e.target.value) }}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button 
                        onClick={sendTx} 
                        className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-all"
                    >
                        Send Transaction
                    </button>
                </div>
            </div>
        </div>
    )
}
