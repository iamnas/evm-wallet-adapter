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
        return <div>
            loading....
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
        <div >
            {data ? (data[0].result)?.toString() : ''}
            <button onClick={inc}>INCREASE</button>

            <h2>Send Transaction via smart contract</h2>
            <div style={{ marginTop: 5 }}>
                <input id="to" placeholder="0xA0Cf…251e" onChange={(e) => { setTo(e.target.value) }} required />
                <input id="value" placeholder="0.05" onChange={(e) => { setAmount(e.target.value) }} required />
                <button onClick={sendTx}>Send</button>
            </div>
        </div>
    )
}
