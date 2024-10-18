// import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import './App.css'

// const queryClient = new QueryClient()

// async function getTodos() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
//   const response = await data.json();
//   return response;
// }


import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: mainnet, 
  transport: http(), 
}) 

function App() {


  const [value, setValue] = useState("")

  async function getBalance() {
    const res = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"})

    setValue((parseInt(res)/1e18).toFixed(5))
    console.log(res);
    
  }



  return (
    <>

      {/* <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider> */}

      <h1>{value}</h1>

      <button onClick={getBalance} >Get Balance</button>

    </>
  )
}


// function Todos() {
//   // Access the client
//   // const queryClient = useQueryClient()

//   // Queries
//   const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

//   return (
//     <div>
//       <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
//     </div>
//   )
// }


export default App
