'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MainchainContext } from '../context/Mainchain'
import { MainchainContextType, Role } from '../types/types'

export default function Home() {
    const {
        roles,
        error,
        currentAccount,
        connectWallet,
        disconnectWallet,
        addRegulator,
        addRoleToMe,
        removeRoleFromMe,
        currentAccountRoles,
    } = useContext<MainchainContextType>(MainchainContext)

    const [regulator, setRegulator] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [hasRole, setHasRole] = useState<boolean>(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const hasAnyRole = (roles: Role[]) => {
        roles.map((role) => {
            if (role.isAssign) setHasRole(true)
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegulator(e.target.value)
        console.log(regulator)
    }

    useEffect(() => {
        currentAccountRoles()
        hasAnyRole(roles)
    }, [currentAccount])

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
                    <Link className="font-bold" href="/">
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
                    <Button onClick={() => disconnectWallet()}>
                        Connected
                    </Button>
                )}
            </header>
            <div className="my-6">
                <span className="font-semibold text-3xl m-6">
                    {' '}
                    Add or remove roles{' '}
                </span>
                <div className="flex m-6">
                    {roles.map((role) => (
                        <div key={role.id} className="m-6">
                            {!role.isAssign ? (
                                <Button onClick={() => addRoleToMe(role.role)}>
                                    Assign {role.role}{' '}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => removeRoleFromMe(role.role)}
                                >
                                    Remove {role.role}{' '}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="m-6">
                    <Button
                        onClick={() => {
                            currentAccountRoles()
                            toggleVisibility()
                        }}
                    >
                        Who am i ?
                    </Button>
                    {isVisible &&
                        roles.map((role) => (
                            <div key={role.id}>
                                <span> {role.isAssign && role.role} </span>
                            </div>
                        ))}
                    {!hasRole && (
                        <span> You don't have any role assigned :( </span>
                    )}
                </div>
                <div className="flex">
                    <span className="font-semibold text-3xl m-6">
                        {' '}
                        Add new regulator{' '}
                    </span>
                    <span className="text-red-600"> Only regulator </span>
                    <input
                        type="text"
                        placeholder="Regulator address"
                        name="regulatorToBeAdded"
                        value={regulator}
                        onChange={handleChange}
                    />
                    <Button
                        onClick={() => {
                            addRegulator(regulator)
                        }}
                    >
                        {' '}
                        Add{' '}
                    </Button>
                </div>
                <div className="m-6">
                    {error && <span className="text-red-600"> {error} </span>}
                </div>
            </div>
        </>
    )
}
