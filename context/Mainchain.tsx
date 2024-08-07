'use client'

import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { mainChainABI, mainChainAddress } from './Constants'
import { MainchainContextType, Role } from '../types/types'

const fetchContract = (
    signerOrProvider: ethers.Signer | ethers.Provider
): ethers.Contract => {
    return new ethers.Contract(mainChainAddress, mainChainABI, signerOrProvider)
}

function extractProxyResult(proxyResult) {
    const plainObject = Object.fromEntries(
        Object.entries(proxyResult).filter(([key]) => !isNaN(parseInt(key)))
    )

    const serializable = Object.fromEntries(
        Object.entries(plainObject).map(([key, value]) => [
            key,
            typeof value === 'bigint' ? value.toString() : value,
        ])
    )
    return serializable
}

export const MainchainContext = React.createContext<MainchainContextType>(
    {} as MainchainContextType
)

export const MainchainProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const title: string = 'Drug supply Chain Contract'
//    const [provider, setProvider] = useState<ethers.BrowserProvider>()
//    const [signer, setSigner] = useState<ethers.Signer | null>(null)
//    const [contract, setContract] = useState<ethers.Contract | null>(null)
    const [roles, setRoles] = useState<Role[]>([])
    const [currentAccount, setCurrentAccount] = useState<string | null>(null)
    const [logs, setLogs] = useState<string[]>([])
    const [error, setError] = useState<string>('')
    const [drugData, setDrugData] = useState<string>('')
    const [drugDesignData, setDrugDesignData] = useState<string>('')
    const [drugLoadData, setDrugLoadData] = useState<string>('')

    const checkIfWalletIsConnected = async () => {
        setError('')
        try {
            if (!window.ethereum)
                return (
                    setError('Install metamask'),
                    console.log('Install metamask!')
                )
            //    if( !window.ethereum) return console.log('Install metamask!');

            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            })

            if (accounts.length) setCurrentAccount(accounts[0])
            else console.log('No account found!')
        } catch (err) {
            console.log(
                `Something went wrong while connecting to account! ${err}`
            )
        }
    }

    const addToLogs = async (logObject: any) => {
        let updatedLogs = []
        const dataKeys = Object.keys(logObject)
        const numberOfData = dataKeys.length
        let logy = ''

        for (let i = numberOfData / 2; i < numberOfData; i++) {
            logy += dataKeys[i] + ': ' + logObject[dataKeys[i]] + ', '
        }

        updatedLogs.push(logy, ...logs)
        setLogs(updatedLogs)
    }

    const connectWallet = async () => {
        setError('')
        try {
            if (!window.ethereum)
                return (
                    setError('Install metamask'),
                    console.log('Install metamask!')
                )
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            setCurrentAccount(accounts[0])

            console.log('connected to wallet')
        } catch (err) {
            console.log(`Error while connecting to account! ${err}`)
        }
    }

    const disconnectWallet = () => {
        setCurrentAccount(null)
        console.log('disconnected from wallet')
    }

    const currentAccountRoles = async (): Promise<void> => {
        const provider = new ethers.JsonRpcProvider()
        const contract = fetchContract(provider)

        setError('')
        if (!contract) return

        try {
            const myRoles = await contract.whoAmI({ from: currentAccount })

            const keys: string[] = [
                'consumer',
                'designer',
                'distributor',
                'manufacturer',
                'regulator',
                'retailer',
            ]

            const values: boolean[] = Object.values(myRoles)

            let updatedRoles: Role[] = []

            for (let i = 0; i < 6; i++) {
                updatedRoles.push({
                    id: `${i}`,
                    role: keys[i],
                    isAssign: values[i],
                })
            }

            setRoles(updatedRoles)

            console.log(`Roles fetched successfully :)`)
        } catch (err) {
            setError(`Roles fetch failed :(`)
            console.log(`Roles fetch failed! - ${err}`)
        }
    }

    const addRoleToMe = async (role: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        let transaction

        try {
            switch (role) {
                case 'designer':
                    transaction = await contract.assignMeAsDesigner({
                        from: currentAccount,
                    })
                    break
                case 'regulator':
                    transaction = await contract.assignMeAsRegulator({
                        from: currentAccount,
                    })
                    break
                case 'manufacturer':
                    transaction = await contract.assignMeAsManufacturer({
                        from: currentAccount,
                    })
                    break
                case 'distributor':
                    transaction = await contract.assignMeAsDistributor({
                        from: currentAccount,
                    })
                    break
                case 'retailer':
                    transaction = await contract.assignMeAsRetailer({
                        from: currentAccount,
                    })
                    break
                case 'consumer':
                    transaction = await contract.assignMeAsConsumer({
                        from: currentAccount,
                    })
                    break
                default:
                    throw new Error(`Unknown role - ${role}`)
            }

            await transaction.wait()

            console.log(`Added role successfully :)`)
            console.log(transaction)
            currentAccountRoles()
        } catch (err) {
            setError(`Couldn't add role :(`)
            console.log(`Couldn't add role! ${err}`)
        }
    }

    const removeRoleFromMe = async (role: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')

        if (!contract) return
        let transaction

        try {
            switch (role) {
                case 'designer':
                    transaction = await contract.renounceMeFromDesigner({
                        from: currentAccount,
                    })
                    break
                case 'regulator':
                    transaction = await contract.renounceMeFromRegulator({
                        from: currentAccount,
                    })
                    break
                case 'manufacturer':
                    transaction = await contract.renounceMeFromManufacturer({
                        from: currentAccount,
                    })
                    break
                case 'distributor':
                    transaction = await contract.renounceMeFromDistributor({
                        from: currentAccount,
                    })
                    break
                case 'retailer':
                    transaction = await contract.renounceMeFromRetailer({
                        from: currentAccount,
                    })
                    break
                case 'consumer':
                    transaction = await contract.renounceMeFromConsumer({
                        from: currentAccount,
                    })
                    break
            }

            await transaction.wait()
            console.log(`Successfully removed role :) `)
            console.log(transaction)

            currentAccountRoles()
        } catch (err) {
            console.log(`Role removal failed! ${err}`)
            setError(`Role romoval failed :(`)
        }
    }

    const addDesigner = async (designerToBeAdded: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.assignThisAccountAsDesigner(
                designerToBeAdded,
                { from: currentAccount }
            )
            await transaction.wait()

            console.log(`Successfully added designer :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add designer :( ${err}`)
            setError(`Failed to add designer :(`)
        }
    }

    const addDistributor = async (
        distributorToBeAdded: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')

        if (!contract) return

        try {
            const transaction = await contract.assignThisAccountAsDistributor(
                distributorToBeAdded,
                { from: currentAccount }
            )
            await transaction.wait()

            console.log(`Successfully added distributor :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add distributor ${err}`)
            setError(`Failed to add distributor`)
        }
    }

    const addRegulator = async (regulatorToBeAdded: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        if (!contract) return

        try {
            const transaction = await contract.assignThisAccountAsRegulator(
                regulatorToBeAdded,
                { from: currentAccount }
            )
            await transaction.wait()

            console.log(`Successfully added regulator :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add regulator :( ${err}`)
            setError(`Failed to add regulator :(`)
        }
    }

    const addRetailer = async (retailerToBeAdded: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')

        if (!contract) return

        try {
            const transaction = await contract.assignThisAccountAsRetailer(
                retailerToBeAdded,
                { from: currentAccount }
            )
            await transaction.wait()

            console.log(`Successfully added retailer :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add retailer :( ${err}`)
            setError(`Failed to add retailer :(`)
        }
    }
    const addDrugDesign = async (
        drugDesgignerName: string,
        drugDesignName: string,
        drugDesignDescription: string,
        drugDrsignNotes: string
    ) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.designDrug(
                drugDesgignerName,
                drugDesignName,
                drugDesignDescription,
                drugDrsignNotes,
                { from: currentAccount }
            )

            await transaction.wait()

            console.log(`Drug design added successfully :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add drug design ${err}`)
            setError(`Failed to add drug design :(`)
        }
    }

    const addDrugTest = async (
        drugTestUDPC: string,
        drugTestDesc: string,
        drugTestPass: boolean,
        drugTestNotes: string
    ): Promise<void> => {
        setError('')
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        if (!contract) return

        try {
            const transaction = await contract.addTestCase(
                drugTestUDPC,
                drugTestDesc,
                drugTestPass,
                drugTestNotes,
                { from: currentAccount }
            )

            await transaction.wait()

            console.log(`Drug test added successfully :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add drug test ${err}`)
            setError(`Failed to add regulator :(`)
        }
    }

    const addDrugTestByRegulator = async (
        drugTestUDPC: string,
        drugTestDesc: string,
        drugTestPass: boolean,
        drugTestNotes: string
    ): Promise<void> => {
        setError('')
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.addTestCaseByRegulaor(
                drugTestUDPC,
                drugTestDesc,
                drugTestPass,
                drugTestNotes,
                { from: currentAccount }
            )
            await transaction.wait()
            console.log(`Drug test by regulator added successfully :)`)
        } catch (err) {
            console.log(`Failed to add regulator ${err}`)
            setError(`Failed to add regulator :(`)
        }
    }

    const approveDrug = async (drugApproveUDPC: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.approveDrug(drugApproveUDPC, {
                from: currentAccount,
            })
            await transaction.wait()

            console.log(`Drug approved successfully :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add regulator ${err}`)
            setError(`Failed to add regulator :(`)
        }
    }

    const sellDrugDesign = async (
        sellDrugUDPC: string,
        price: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const priceInWei = ethers.parseEther(price)
            const transaction = await contract.upForSale(
                sellDrugUDPC,
                priceInWei,
                { from: currentAccount }
            )
            await transaction.wait()

            console.log(`Drug design sold successfully :)`)
            console.log(transaction)
        } catch (err) {
            console.log(`Failed to add regulator ${err}`)
            setError(`Failed to add regulator :(`)
        }
    }

    const buyDrugDesign = async (
        buyDrugUDPC: string,
        price: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const priceInWei = ethers.parseEther(price)
            const transaction = await contract.purchaseDrugDesign(buyDrugUDPC, {
                from: currentAccount,
                value: priceInWei,
            })

            await transaction.wait()
            console.log(`Drug desugn bought successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Failed to add regulator :(`)
            console.log(`Failed to add regulator ${err}`)
        }
    }

    const updatePartnerState = async (
        state: string,
        partnerStateUDPC: string,
        partnerStateShare: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            let transaction

            switch (state) {
                case 'close':
                    transaction = await contract.closeManufactPartnership(
                        partnerStateUDPC,
                        { from: currentAccount }
                    )
                    break
                case 'open':
                    transaction = await contract.openManufactPartnership(
                        partnerStateUDPC,
                        partnerStateShare,
                        { from: currentAccount }
                    )
                    break
                case 'restrict':
                    transaction = await contract.restrictManufactPartnership(
                        partnerStateUDPC,
                        { from: currentAccount }
                    )
                    break
            }

            await transaction.wait()

            console.log(`Updated partner state successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't add partner state :(`)
            console.log(`Couldn't add role! ${err}`)
        }
    }

    const addPartner = async (
        addPartnerUDPC: string,
        addPartnerAddress: string,
        addPartnerName: string,
        addPartnerShare: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.buildRestrictPartnerContract(
                addPartnerUDPC,
                addPartnerAddress,
                addPartnerName,
                addPartnerShare,
                { from: currentAccount }
            )
            await transaction.wait()
            console.log(`Partner added successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't add partner :(`)
            console.log(`Couldn't add partner! ${err}`)
        }
    }

    const assignPartner = async (
        buildPartnerUDPC: string,
        buildPartnerName: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.buildPartnerContract(
                buildPartnerUDPC,
                buildPartnerName,
                { from: currentAccount }
            )

            await transaction.wait()

            console.log(`Partner assigned successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't assign partner :(`)
            console.log(`Couldn't assign partner! ${err}`)
        }
    }

    const manufactureDrugLoad = async (
        manufactureUDPC: string,
        manufactureQuantity: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.manufacturDrugsLoud(
                manufactureUDPC,
                manufactureQuantity,
                { from: currentAccount }
            )

            await transaction.wait()

            console.log(`Manufacturer added successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't add manufacturer :(`)
            console.log(`Couldn't add manufacturer! ${err}`)
        }
    }

    const packDrugLoad = async (packSLU: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.packDrugsLoud(packSLU, {
                from: currentAccount,
            })

            await transaction.wait()
            console.log(`Drug load packed successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't pack drug load :(`)
            console.log(`Couldn't pack drug load! ${err}`)
        }
    }

    const addDrugLoad = async (
        addSLU: string,
        price: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const priceInWei = ethers.parseEther(price)
            const transaction = await contract.addDrugsLoud(
                addSLU,
                priceInWei,
                { from: currentAccount }
            )

            await transaction.wait()
            console.log(`Drug load added successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't add drug load :(`)
            console.log(`Couldn't add drug load! ${err}`)
        }
    }
    const buyDrugLoad = async (
        retailerAddress: string,
        buySLU: string,
        value: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const valueInWei = ethers.parseEther(value)
            const retailerAccount = ethers.getAddress(retailerAddress)
            const transaction = await contract.buyDrugsLoud(
                buySLU,
                retailerAccount,
                {
                    from: currentAccount,
                    value: valueInWei,
                }
            )

            await transaction.wait()

            console.log(`Drug load bought successfully :)`)
        } catch (err) {
            setError(`Couldn't buy drug load :(`)
            console.log(`Couldn't buy drug load! ${err}`)
        }
    }

    const shipDrugLoad = async (shipSLU: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.shipDrugsLoud(shipSLU, {
                from: currentAccount,
            })

            await transaction.wait()

            console.log(`Drug load shipped successfully :)`)
        } catch (err) {
            setError(`Couldn't ship drug load :(`)
            console.log(`Couldn't ship drug load! ${err}`)
        }
    }

    const receiveDrugLoad = async (receiveSLU: string): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.receiveDrugsLoud(receiveSLU, {
                from: currentAccount,
            })

            await transaction.wait()

            console.log(`Drug load received successfully :)`)
        } catch (err) {
            setError(`Couldn't drug load received :(`)
            console.log(`Couldn't add role! ${err}`)
        }
    }

    const updateShipEnv = async (
        shipEnvSLU: string,
        shipEnvHumidity: string,
        shipEnvTemperature: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.updateDrugsLoudShippmentEnv(
                shipEnvSLU,
                shipEnvHumidity,
                shipEnvTemperature,
                { from: currentAccount }
            )

            await transaction.wait()
            console.log(`Updated ship environment successfully :)`)
        } catch (err) {
            setError(`Couldn't updated ship environment :(`)
            console.log(`Couldn't updated ship environment! ${err}`)
        }
    }

    const updateStockEnv = async (
        stockEnvSLU: string,
        stockEnvHumidity: string,
        stockEnvTemperature: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.updateDrugsLoudStockEnv(
                stockEnvSLU,
                stockEnvHumidity,
                stockEnvTemperature,
                { from: currentAccount }
            )

            await transaction.wait()
            console.log(`Updated stock environment successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't update stock environment :(`)
            console.log(`Couldn't update stock environment! ${err}`)
        }
    }

    const purchaseDrug = async (
        purchasePKU: string,
        value: string
    ): Promise<void> => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(signer)

        setError('')
        if (!contract) return

        try {
            const valueInWei = ethers.parseEther(value)
            const transaction = await contract.purchaseDrug(purchasePKU, {
                from: currentAccount,
                value: valueInWei,
            })

            await transaction.wait()
            console.log(`Purchased drug successfully :(`)
            console.log(transaction)
            // addTxToLogs(transaction)
        } catch (err) {
            setError(`Couldn't purchase drug :(`)
            console.log(`Couldn't purchase drug! ${err}`)
        }
    }

    const fetchDrugDesignData = async (udpc: string): Promise<void> => {
        const provider = new ethers.JsonRpcProvider()
        const contract = fetchContract(provider)

        setError('')
        if (!contract) return

        try {
            const drugDesignData = await contract.fetchDrugDesignData(udpc, {
                from: currentAccount,
            })

            const extractedData = extractProxyResult(drugDesignData)

            setDrugDesignData(JSON.stringify(extractedData))
            console.log(`Fetched drug design successfully :)`)
            console.log(drugDesignData)
        } catch (err) {
            setError(`Couldn't fetch drug design :(`)
            console.log(`Couldn't fetch drug design! ${err}`)
        }
    }

    const fetchDrugLoadData = async (slu: string): Promise<void> => {
        const provider = new ethers.JsonRpcProvider()
        const contract = fetchContract(provider)

        setError('')
        if (!contract) return

        try {
            const drugLoadData = await contract.fetchDrugLoaudData(slu, {
                from: currentAccount,
            })
            const extractedData = extractProxyResult(drugLoadData)
            setDrugLoadData(JSON.stringify(extractedData))

            console.log(`Fetched drug load data successfully :)`)
            console.log(drugLoadData)
        } catch (err) {
            setError(`Couldn't fetched drug load data :(`)
            console.log(`Couldn't  fetched drug load data! ${err}`)
        }
    }

    const getDrugLoadPKUs = async (slu: string): Promise<void> => {
        const provider = new ethers.JsonRpcProvider()
        const contract = fetchContract(provider)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.fetchLoudPKUs(slu, {
                from: currentAccount,
            })

            console.log(`Fetched drug load pku's successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't fetched drug load pku's :)`)
            console.log(`Couldn't fetched drug load pku's! ${err}`)
        }
    }

    const fetchDrugData = async (fetchDrugPKU: string): Promise<void> => {
        const provider = new ethers.JsonRpcProvider()
        const contract = fetchContract(provider)

        setError('')
        if (!contract) return

        try {
            const drugData = await contract.fetchDrugItemData(fetchDrugPKU, {
                from: currentAccount,
            })

            const extractedData = extractProxyResult(drugData)
            setDrugData(JSON.stringify(extractedData))
            console.log(extractedData)
            console.log(`Fetched drug data successfully :)`)
            console.log(drugData)
        } catch (err) {
            setError(`Couldn't fetch drug data :(`)
            console.log(`Couldn't fetch drug data! ${err}`)
        }
    }

    const fetchEnvHistory = async (fetchDrugPKU: string): Promise<void> => {
        const provider = new ethers.JsonRpcProvider()
        const contract = fetchContract(provider)

        setError('')
        if (!contract) return

        try {
            const transaction = await contract.fetchEnvHistory(fetchDrugPKU, {
                from: currentAccount,
            })

            console.log(`Fetched env history successfully :)`)
            console.log(transaction)
        } catch (err) {
            setError(`Couldn't fetch env history :(`)
            console.log(`Couldn't fetch env history! ${err}`)
        }
    }

    return (
        <MainchainContext.Provider
            value={{
                title,
                roles,
                drugData,
                drugDesignData,
                drugLoadData,
                error,
                currentAccount,
                connectWallet,
                disconnectWallet,
                currentAccountRoles,
                checkIfWalletIsConnected,
                addRoleToMe,
                removeRoleFromMe,
                addDesigner,
                addDistributor,
                addRegulator,
                addRetailer,
                addDrugDesign,
                addDrugTest,
                addDrugTestByRegulator,
                approveDrug,
                sellDrugDesign,
                buyDrugDesign,
                updatePartnerState,
                addPartner,
                assignPartner,
                manufactureDrugLoad,
                packDrugLoad,
                addDrugLoad,
                buyDrugLoad,
                shipDrugLoad,
                receiveDrugLoad,
                updateShipEnv,
                updateStockEnv,
                purchaseDrug,
                fetchDrugDesignData,
                fetchDrugLoadData,
                getDrugLoadPKUs,
                fetchDrugData,
                fetchEnvHistory,
            }}
        >
            {children}
        </MainchainContext.Provider>
    )
}
