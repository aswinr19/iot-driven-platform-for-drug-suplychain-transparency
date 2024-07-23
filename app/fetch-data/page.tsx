'use client'

import React, { useState, useContext, ChangeEvent } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MainchainContext } from '../../context/Mainchain'
import { MainchainContextType } from '../../types/types'

type FormDataOne = {
    fetchDrugUDPC: string
}
type FormDataTwo = {
    fetchDrugSLU: string
}
type FormDataThree = {
    fetchDrugPKU: string
}

export default function FetchData() {
    const {
        drugData,
        drugDesignData,
        drugLoadData,
        error,
        currentAccount,
        connectWallet,
        disconnectWallet,
        fetchDrugDesignData,
        fetchDrugLoadData,
        getDrugLoadPKUs,
        fetchDrugData,
        fetchEnvHistory,
    } = useContext<MainchainContextType>(MainchainContext)

    const [formDataOne, setFormDataOne] = useState<FormDataOne>({
        fetchDrugUDPC: '',
    })

    const [formDataTwo, setFormDataTwo] = useState<FormDataTwo>({
        fetchDrugSLU: '',
    })

    const [formDataThree, setFormDataThree] = useState<FormDataThree>({
        fetchDrugPKU: '',
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
                    <Link
                        className="text-gray-500 dark:text-gray-400"
                        href="/drug-loads"
                    >
                        Drug Loads
                    </Link>
                    <Link
                        className="text-gray-500 dark:text-gray-400"
                        href="/drug"
                    >
                        Drug
                    </Link>
                    <Link className="font-bold" href="/fetch-data">
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

            <div className="space-y-4 mx-10 my-6">
                <div className="space-y-2">
                    <Label htmlFor="fetchDrugUDPC">Drug UDPC</Label>
                    <Input
                        placeholder="UDPC"
                        name="fetchDrugUDPC"
                        value={formDataOne.fetchDrugUDPC}
                        onChange={handleChangeOne}
                    />
                </div>
                <Button
                    onClick={() => {
                        fetchDrugDesignData(formDataOne.fetchDrugUDPC)
                    }}
                >
                    Fetch Drug Data
                </Button>
                {drugDesignData && (
                    <div>
                        <span className="block text-xl pb-4">Drug Data</span>{' '}
                        <span className="block">
                            {' '}
                            {`Designer Name: ${
                                JSON.parse(drugDesignData)[2]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Design Name: ${
                                JSON.parse(drugDesignData)[3]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Passed: ${JSON.parse(drugDesignData)[5]}`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Approval status: ${
                                JSON.parse(drugDesignData)[4]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Price: ${JSON.parse(drugDesignData)[6]}`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Partnership state: ${
                                JSON.parse(drugDesignData)[7]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Quantity: ${JSON.parse(drugDesignData)[8]}`}{' '}
                        </span>{' '}
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="fetchDrugSLU">Drug SLU</Label>
                    <Input
                        placeholder="SLU"
                        name="fetchDrugSLU"
                        value={formDataTwo.fetchDrugSLU}
                        onChange={handleChangeTwo}
                    />
                </div>
                <Button
                    onClick={() => {
                        fetchDrugLoadData(formDataTwo.fetchDrugSLU)
                    }}
                >
                    Fetch Drug Load Data
                </Button>
                {drugLoadData && (
                    <div>
                        <span className="block text-xl pb-4">
                            Drug Load Data
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Drug Load SLU: ${
                                JSON.parse(drugLoadData)[1]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Drug Load Quantity: ${
                                JSON.parse(drugLoadData)[0]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Drug Load Status: ${
                                JSON.parse(drugLoadData)[2]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Manufacturer Address: ${
                                JSON.parse(drugLoadData)[3]
                            }`}{' '}
                        </span>{' '}
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="fetchDrugPKU">Drug PKU </Label>
                    <Input
                        placeholder="PKU"
                        name="fetchDrugPKU"
                        onChange={handleChangeThree}
                        value={formDataThree.fetchDrugPKU}
                    />
                </div>
                <Button
                    onClick={() => {
                        fetchDrugData(formDataThree.fetchDrugPKU)
                    }}
                >
                    Fetch Drug Data
                </Button>{' '}
                <Button
                    onClick={() => {
                        fetchEnvHistory(formDataThree.fetchDrugPKU)
                    }}
                >
                    Fetch Environment History
                </Button>
                {drugData && (
                    <div>
                        <span className="block text-xl pb-4">
                            Drug Load Data
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Drug Load PKU: ${JSON.parse(drugData)[1]}`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Drug Load Status: ${
                                JSON.parse(drugData)[2]
                            }`}{' '}
                        </span>{' '}
                        <span className="block">
                            {' '}
                            {`Manufacturer Address: ${
                                JSON.parse(drugData)[3]
                            }`}{' '}
                        </span>{' '}
                    </div>
                )}
                {error && <span className="block text-red-600">{error} </span>}
            </div>
        </>
    )
}
