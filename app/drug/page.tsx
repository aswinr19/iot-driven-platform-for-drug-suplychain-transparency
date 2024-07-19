'use client'

import React, { useState, useContext, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { MainchainContext } from '../../context/Mainchain'
import { MainchainContextType, Role } from '../../types/types'

type FormData = {
    pku: string
    value: string
}

export default function Drug() {
    const { currentAccount, connectWallet, disconnectWallet, purchaseDrug } =
        useContext<MainchainContextType>(MainchainContext)

    const [roles, setRoles] = useState<Role[]>([])

    const [formData, setFormData] = useState<FormData>({
        pku: '',
        value: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
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
                    <Link className="font-bold" href="/drug">
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
            <div className="space-y-4 mx-10 my-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold mb-4">Purchase Drug</h2>
                    <Label htmlFor="purchasePKU">Drug UDPC</Label>
                    <Input
                        placeholder="PKU"
                        name="purchasePKU"
                        value={formData.pku}
                        onChange={handleChange}
                    />

                    <Label htmlFor="purchaseValue">Drug Price</Label>
                    <Input
                        placeholder="Ether Value"
                        name="purchaseValue"
                        value={formData.value}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    onClick={() => {
                        purchaseDrug(formData.pku, formData.value)
                    }}
                >
                    Fetch Drug Data
                </Button>
            </div>
        </>
    )
}

/*
<div>
         <span>Purchase Drug</span>
         <span className="text-red-600">only consumer</span>
         <input
             type="text"
             placeholder="PKU"
             name="purchasePKU"
             value={formData.pku}
             onChange={handleChange}
         />
         <input
             type="text"
             placeholder="Ether Value"
             name="purchaseValue"
             value={formData.value}
             onChange={handleChange}
         />
         <Button
             onClick={() => {
                 purchaseDrug(formData.pku, formData.value)
             }}
         >
             Purchase
         </Button>
     </div>
*/
