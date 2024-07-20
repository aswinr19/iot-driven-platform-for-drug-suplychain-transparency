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
                {drugData && <span> {drugData} </span>}
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
                {drugLoadData && <span> {drugLoadData} </span>}
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
                {error && <span className="block text-red-600">{error} </span>}
            </div>
        </>
    )
}
