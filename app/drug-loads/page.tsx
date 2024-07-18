'use client'

import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MainchainContext } from '../../context/Mainchain'
import { MainchainContextType } from '../../types/types'

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
            <div>
                <div>
                    <span>Manufactur Drugs Load </span>
                    <span className="text-red-600">only manufacturer</span>
                    <span className="text-red-600">
                        only partner or owner of drug design
                    </span>
                    <input
                        type="number"
                        placeholder="UDPC"
                        name="manufactureUDPC"
                        value={formDataOne.manufactureUDPC}
                        onChange={handleChangeOne}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="manufactureQuantity"
                        onChange={handleChangeOne}
                        value={formDataOne.manufactureQuantity}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            manufactureDrugLoad(
                                formDataOne.manufactureUDPC,
                                formDataOne.manufactureQuantity
                            )
                        }}
                    >
                        Manufactur
                    </Button>
                </div>
                <div>
                    <span>Pack Drugs Load </span>
                    <span className="text-red-600">
                        only manufacturer of drugs load
                    </span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="packSLU"
                        value={formDataTwo.packSLU}
                        onChange={handleChangeTwo}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            packDrugLoad(formDataTwo.packSLU)
                        }}
                    >
                        Pack
                    </Button>
                </div>
                <div>
                    <span>Sell Drugs Load </span>
                    <span className="text-red-600">
                        {' '}
                        only manufacturer of drugs load
                    </span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="addSLU"
                        value={formDataThree.addSLU}
                        onChange={handleChangeThree}
                    />
                    <input
                        type="text"
                        placeholder="Unit Price"
                        name="addPrice"
                        value={formDataThree.addPrice}
                        onChange={handleChangeThree}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            addDrugLoad(
                                formDataThree.addSLU,
                                formDataThree.addPrice
                            )
                        }}
                    >
                        Up For Sale
                    </Button>
                </div>
                <div>
                    <span>Buy Drugs Loud</span>
                    <span className="text-red-600">only distributor</span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="buySLU"
                        value={formDataFour.buySLU}
                        onChange={handleChangeFour}
                    />
                    <input
                        type="text"
                        placeholder="Retailer Address"
                        name="buyRetailerAddress"
                        value={formDataFour.buyRetailerAddress}
                        onChange={handleChangeFour}
                    />
                    <input
                        type="text"
                        placeholder="Ether Value"
                        name="buyPrice"
                        value={formDataFour.buyPrice}
                        onChange={handleChangeFour}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            buyDrugLoad(
                                formDataFour.buyRetailerAddress,
                                formDataFour.buySLU,
                                formDataFour.buyPrice
                            )
                        }}
                    >
                        Buy
                    </Button>
                </div>
                <div>
                    <span>Ship Drugs Load </span>
                    <span>only manufacturer of drugs load</span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="shipSLU"
                        value={formDataFive.shipSLU}
                        onChange={handleChangeFive}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            shipDrugLoad(formDataFive.shipSLU)
                        }}
                    >
                        Ship
                    </Button>
                </div>
                <div>
                    <span>Receive Drugs Load </span>
                    <span className="text-red-600">
                        only retailer of drugs load
                    </span>
                    <span className="text-red-600">
                        only drugs load shippment envuirment updated
                    </span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="receiveSLU"
                        value={formDataSix.receiveSLU}
                        onChange={handleChangeSix}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            receiveDrugLoad(formDataSix.receiveSLU)
                        }}
                    >
                        Recieve
                    </Button>
                </div>
                <div>
                    <span>Update Shippment Envuirment</span>
                    <span className="red">
                        only manufacturer or distributor of drugs load
                    </span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="shipEnvSLU"
                        value={formDataSeven.shipEnvSLU}
                        onChange={handleChangeSeven}
                    />
                    <input
                        type="text"
                        placeholder="Humidity"
                        name="shipEnvHumidity"
                        value={formDataSeven.shipEnvHumidity}
                        onChange={handleChangeSeven}
                    />
                    <input
                        type="text"
                        placeholder="Temprture"
                        name="shipEnvTemprture"
                        value={formDataSeven.shipEnvTemprture}
                        onChange={handleChangeSeven}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            updateShipEnv(
                                formDataSeven.shipEnvSLU,
                                formDataSeven.shipEnvHumidity,
                                formDataSeven.shipEnvTemprture
                            )
                        }}
                    >
                        Add
                    </Button>
                </div>
                <div>
                    <span>Update Stocking Envuirment</span>
                    <span className="text-red-600">
                        only Retailer of drugs load
                    </span>
                    <input
                        type="text"
                        placeholder="SLU"
                        name="stockEnvSLU"
                        value={formDataEight.stockEnvSLU}
                        onChange={handleChangeEight}
                    />
                    <input
                        type="text"
                        placeholder="Humidity"
                        name="stockEnvHumidity"
                        value={formDataEight.stockEnvHumidity}
                        onChange={handleChangeEight}
                    />
                    <input
                        type="text"
                        placeholder="Temprture"
                        name="stockEnvTemprture"
                        value={formDataEight.stockEnvTemprture}
                        onChange={handleChangeEight}
                    />
                    <p />
                    <Button
                        onClick={() => {
                            updateStockEnv(
                                formDataEight.stockEnvSLU,
                                formDataEight.stockEnvHumidity,
                                formDataEight.stockEnvTemprture
                            )
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </>
    )
}
