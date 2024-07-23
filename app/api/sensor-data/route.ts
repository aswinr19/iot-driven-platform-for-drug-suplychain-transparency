import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { mainChainAddress, mainChainABI } from '@/context/Constants'

const ETHEREUM_PROVIDER_URL = 'http://127.0.0.1:8545/'
const PRIVATE_KEY =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

if (!ETHEREUM_PROVIDER_URL || !PRIVATE_KEY) {
    throw new Error('Missing environment variables')
}

export async function POST(request: NextRequest) {
    console.log('Received POST request')
    try {
        const { temperature, humidity } = await request.json()

        const provider = new ethers.JsonRpcProvider(ETHEREUM_PROVIDER_URL)

        const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

        const contract = new ethers.Contract(
            mainChainAddress,
            mainChainABI,
            wallet
        )

        console.log('Temperature:', temperature, 'Humidity:', humidity)
        console.log('Contract address:', contract.target)

        const tx = await contract.updateDrugsLoudShippmentEnv(
            1,
            Math.round(temperature),
            Math.round(humidity)
        )
        await tx.wait()

        console.log('Transaction successful:', tx.hash)

        return NextResponse.json(
            {
                message: 'Data added to blockchain successfully',
                txHash: tx.hash,
            },
            {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            }
        )
    } catch (error) {
        console.error('Error processing request:', error)
        return NextResponse.json(
            { error: 'Error processing request', details: error.message },
            {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            }
        )
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        }
    )
}
// export default async function handler(req, res) {
// if (req.method === 'POST') {
// try {
// const { temperature, humidity } = req.body

// const provider = new ethers.JsonRpcProvider()
// const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider)
// const contract = new ethers.Contract(
//     mainChainAddress,
//     mainChainABI,
//     signer
// )

// const web3Modal = new Web3Modal()
// const connection = await web3Modal.connect()
// const provider = new ethers.BrowserProvider(connection)
// const signer = await provider.getSigner()
// const contract = new ethers.Contract(
//     mainChainAddress,
//     mainChainABI,
//     signer
// )

// if (!contract) return

// console.log(temperature, humidity)
// console.log(contract)

// const tx = await contract.addSensorData(temperature, humidity)
// await tx.wait()

//             res.status(200).json({
//                 message: 'Data added to blockchain successfully',
//             })
//         } catch (error) {
//             res.status(500).json({ error: 'Error processing request' })
//         }
//     } else {
//         res.setHeader('Allow', ['POST'])
//         res.status(405).end(`Method ${req.method} Not Allowed`)
//     }
// }
