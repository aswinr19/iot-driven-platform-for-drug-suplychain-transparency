'use client'

import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { MainchainContext } from '../../context/Mainchain'
import { MainchainContextType } from '../../types/types'
import { Label } from '@/components/ui/label'

type FormDataOne = {
    manufactureUDPC: ''
    manufactureQuantity: ''
}

type FormDataTwo = {
    packSLU: ''
}

type FormDataThree = {
    addSLU: ''
    addPrice: ''
}

type FormDataFour = {
    buyRetailerAddress: ''
    buySLU: ''
    buyPrice: ''
}

type FormDataFive = {
    shipSLU: ''
}

type FormDataSix = {
    receiveSLU: ''
}

type FormDataSeven = {
    shipEnvSLU: ''
    shipEnvHumidity: ''
    shipEnvTemprture: ''
}

type FormDataEight = {
    stockEnvSLU: ''
    stockEnvHumidity: ''
    stockEnvTemprture: ''
}

export default function DrugLoads() {
    const {
        error,
        currentAccount,
        connectWallet,
        disconnectWallet,
        packDrugLoad,
        addDrugLoad,
        buyDrugLoad,
        shipDrugLoad,
        receiveDrugLoad,
        updateShipEnv,
        updateStockEnv,
        manufactureDrugLoad,
    } = useContext<MainchainContextType>(MainchainContext)

    const [formDataOne, setFormDataOne] = useState<FormDataOne>({
        manufactureUDPC: '',
        manufactureQuantity: '',
    })
    const [formDataTwo, setFormDataTwo] = useState<FormDataTwo>({
        packSLU: '',
    })
    const [formDataThree, setFormDataThree] = useState<FormDataThree>({
        addSLU: '',
        addPrice: '',
    })
    const [formDataFour, setFormDataFour] = useState<FormDataFour>({
        buyRetailerAddress: '',
        buySLU: '',
        buyPrice: '',
    })
    const [formDataFive, setFormDataFive] = useState<FormDataFive>({
        shipSLU: '',
    })
    const [formDataSix, setFormDataSix] = useState<FormDataSix>({
        receiveSLU: '',
    })
    const [formDataSeven, setFormDataSeven] = useState<FormDataSeven>({
        shipEnvSLU: '',
        shipEnvHumidity: '',
        shipEnvTemprture: '',
    })
    const [formDataEight, setFormDataEight] = useState<FormDataEight>({
        stockEnvSLU: '',
        stockEnvHumidity: '',
        stockEnvTemprture: '',
    })

    const handleChangeOne = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataOne((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeTwo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataTwo((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeThree = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataThree((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeFour = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataFour((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeFive = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataFive((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeSix = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataSix((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeSeven = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataSeven((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleChangeEight = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataEight((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <>
            <header className="flex items-center justify-between h-16 px-4 border-b md:px-6">
                <nav className="flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        href="/"
                    >
                        <span>Drug Supplychain</span>
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-400" href="/">
                        My Roles
                    </Link>
                    <Link
                        className="text-gray-500 dark:text-gray-400"
                        href="/drug-design"
                    >
                        Drug Design
                    </Link>
                    <Link className="font-bold" href="/drug-loads">
                        Drug Loads
                    </Link>
                    <Link
                        className="text-gray-500 dark:text-gray-400"
                        href="/drug"
                    >
                        Drug
                    </Link>
                    <Link
                        className="text-gray-500 dark:text-gray-400"
                        href="/fetch-data"
                    >
                        Fetch Data
                    </Link>
                </nav>

                {!currentAccount && (
                    <Button onClick={() => connectWallet()}>
                        Connect Wallet
                    </Button>
                )}
                {currentAccount && (
                    <Button
                        onClick={() => disconnectWallet()}
                        size="sm"
                        variant="outline"
                    >
                        Connected
                    </Button>
                )}
            </header>
            <div className="container mx-auto max-w-4xl py-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Pack Drug Load
                        </h3>
                        <div className="flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder="SLU"
                                name="packSLU"
                                value={formDataTwo.packSLU}
                                onChange={handleChangeTwo}
                            />
                            <Button
                                onClick={() => {
                                    packDrugLoad(formDataTwo.packSLU)
                                }}
                            >
                                Pack
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Receive Drug Load{' '}
                        </h3>
                        <div className="flex items-center gap-2">
                            <Input
                                type="text"
                                placeholder="SLU"
                                name="receiveSLU"
                                value={formDataSix.receiveSLU}
                                onChange={handleChangeSix}
                            />
                            <Button
                                onClick={() => {
                                    receiveDrugLoad(formDataSix.receiveSLU)
                                }}
                            >
                                Receive
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Manufacture Drug Load
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="UDPC"
                                name="manufactureUDPC"
                                value={formDataOne.manufactureUDPC}
                                onChange={handleChangeOne}
                            />
                            <Input
                                placeholder="Quantity"
                                name="manufactureQuantity"
                                onChange={handleChangeOne}
                                value={formDataOne.manufactureQuantity}
                            />
                            <Button
                                className="col-span-2"
                                onClick={() => {
                                    manufactureDrugLoad(
                                        formDataOne.manufactureUDPC,
                                        formDataOne.manufactureQuantity
                                    )
                                }}
                            >
                                {' '}
                                Manufacture
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Sell Drug Load
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="SLU"
                                name="addSLU"
                                value={formDataThree.addSLU}
                                onChange={handleChangeThree}
                            />
                            <Input
                                placeholder="Unit Price"
                                name="addPrice"
                                value={formDataThree.addPrice}
                                onChange={handleChangeThree}
                            />
                            <Button
                                className="col-span-2"
                                onClick={() => {
                                    addDrugLoad(
                                        formDataThree.addSLU,
                                        formDataThree.addPrice
                                    )
                                }}
                            >
                                {' '}
                                Sell Drug Load
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Buy Drug Load</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="SLU"
                                name="buySLU"
                                value={formDataFour.buySLU}
                                onChange={handleChangeFour}
                            />
                            <Input
                                placeholder="Retailer Address"
                                name="buyRetailerAddress"
                                value={formDataFour.buyRetailerAddress}
                                onChange={handleChangeFour}
                            />
                            <Input
                                placeholder="Ether Value"
                                name="buyPrice"
                                value={formDataFour.buyPrice}
                                onChange={handleChangeFour}
                            />
                            <Button
                                className="col-span-2"
                                onClick={() => {
                                    buyDrugLoad(
                                        formDataFour.buyRetailerAddress,
                                        formDataFour.buySLU,
                                        formDataFour.buyPrice
                                    )
                                }}
                            >
                                {' '}
                                Buy Drug Load
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Update Shipment Environment
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="SLU"
                                name="shipEnvSLU"
                                value={formDataSeven.shipEnvSLU}
                                onChange={handleChangeSeven}
                            />
                            <Input
                                placeholder="Humidity"
                                name="shipEnvHumidity"
                                value={formDataSeven.shipEnvHumidity}
                                onChange={handleChangeSeven}
                            />
                            <Input
                                placeholder="Temprture"
                                name="shipEnvTemprture"
                                value={formDataSeven.shipEnvTemprture}
                                onChange={handleChangeSeven}
                            />
                            <Button
                                className="col-span-2"
                                onClick={() => {
                                    updateShipEnv(
                                        formDataSeven.shipEnvSLU,
                                        formDataSeven.shipEnvHumidity,
                                        formDataSeven.shipEnvTemprture
                                    )
                                }}
                            >
                                Update Ship Env
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Update Stocking Environment
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="SLU"
                                name="stockEnvSLU"
                                value={formDataEight.stockEnvSLU}
                                onChange={handleChangeEight}
                            />
                            <Input
                                placeholder="Humidity"
                                name="stockEnvHumidity"
                                value={formDataEight.stockEnvHumidity}
                                onChange={handleChangeEight}
                            />
                            <Input
                                placeholder="Temprture"
                                name="stockEnvTemprture"
                                value={formDataEight.stockEnvTemprture}
                                onChange={handleChangeEight}
                            />
                            <Button
                                className="col-span-2"
                                onClick={() => {
                                    updateStockEnv(
                                        formDataEight.stockEnvSLU,
                                        formDataEight.stockEnvHumidity,
                                        formDataEight.stockEnvTemprture
                                    )
                                }}
                            >
                                Update Stock Env
                            </Button>
                        </div>
                    </div>
                    {error && (
                        <span className="block text-red-600">{error} </span>
                    )}
                </div>
            </div>
        </>
    )
}
