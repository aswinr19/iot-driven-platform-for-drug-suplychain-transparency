'use client'

import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => disconnectWallet()}
                    >
                        Connected
                    </Button>
                )}
            </header>
            <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground">
                <main className="container px-4 py-12 md:px-6 md:py-16">
                    <div className="space-y-8">
                        <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl">
                            Drug Supplychain
                        </h1>
                        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                            {roles.map((role) => (
                                <div key={role.id}>
                                    {!role.isAssign ? (
                                        <Button
                                            onClick={() =>
                                                addRoleToMe(role.role)
                                            }
                                        >
                                            Assign {role.role}{' '}
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                removeRoleFromMe(role.role)
                                            }
                                        >
                                            Remove {role.role}{' '}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </section>
                        <section>
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
                                    <div className="" key={role.id}>
                                        <span>
                                            {' '}
                                            {role.isAssign && role.role}{' '}
                                        </span>
                                    </div>
                                ))}
                            {!hasRole && (
                                <span>
                                    {' '}
                                    You don't have any role assigned :({' '}
                                </span>
                            )}
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold mb-4">
                                Add new regulator{' '}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="regulatorToBeAdded">
                                        Regulator Address
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder=" Enter regulator address (hex)"
                                        name="regulatorToBeAdded"
                                        value={regulator}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button
                                    onClick={() => {
                                        addRegulator(regulator)
                                    }}
                                >
                                    Add Regulator
                                </Button>
                            </div>
                        </section>
                        <section>
                            {error && (
                                <span className="text-red-600"> {error} </span>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}
