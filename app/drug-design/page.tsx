'use client'

import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { MainchainContext } from '../../context/Mainchain'
import { MainchainContextType } from '../../types/types'

type FormDataOne = {
    drugDesignerName: string
    drugDesignName: string
    drugDesignDesc: string
    drugDesignNotes: string
}

type FormDataTwo = {
    drugTestUDPC: string
    drugTestDesc: string
    drugTestPass: boolean
    drugTestNotes: string
}

type FormDataThree = {
    drugApproveUDPC: string
}

type FormDataFour = {
    sellDrugUDPC: string
    sellDrugPrice: string
}

type FormDataFive = {
    buyDrugUDPC: string
    buyDrugPrice: string
}

type FormDataSix = {
    partnerStateUDPC: string
    partnerStateShare: string
}

type FormDataSeven = {
    addPartnerUDPC: string
    addPartnerName: string
    addPartnerAddress: string
    addPartnerShare: string
}

type FormDataEight = {
    buildPartnerUDPC: string
    buildPartnerName: string
}

export default function DrugDesign() {
    const {
        error,
        currentAccount,
        connectWallet,
        disconnectWallet,
        addDrugDesign,
        addDrugTest,
        addDrugTestByRegulator,
        approveDrug,
        sellDrugDesign,
        buyDrugDesign,
        updatePartnerState,
        addPartner,
        assignPartner,
    } = useContext<MainchainContextType>(MainchainContext)

    const [formDataOne, setFormDataOne] = useState<FormDataOne>({
        drugDesignerName: '',
        drugDesignName: '',
        drugDesignDesc: '',
        drugDesignNotes: '',
    })
    const [formDataTwo, setFormDataTwo] = useState<FormDataTwo>({
        drugTestUDPC: '',
        drugTestDesc: '',
        drugTestPass: false,
        drugTestNotes: '',
    })
    const [formDataThree, setFormDataThree] = useState<FormDataThree>({
        drugApproveUDPC: '',
    })
    const [formDataFour, setFormDataFour] = useState<FormDataFour>({
        sellDrugUDPC: '',
        sellDrugPrice: '',
    })
    const [formDataFive, setFormDataFive] = useState<FormDataFive>({
        buyDrugUDPC: '',
        buyDrugPrice: '',
    })

    const [formDataSix, setFormDataSix] = useState<FormDataSix>({
        partnerStateUDPC: '',
        partnerStateShare: '',
    })

    const [formDataSeven, setFormDataSeven] = useState<FormDataSeven>({
        addPartnerUDPC: '',
        addPartnerName: '',
        addPartnerAddress: '',
        addPartnerShare: '',
    })
    const [formDataEight, setFormDataEight] = useState<FormDataEight>({
        buildPartnerUDPC: '',
        buildPartnerName: '',
    })

    const handleChangeOne = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target

        setFormDataOne((prevState) => ({
            ...prevState,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }))
    }
    const handleChangeTwo = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target

        setFormDataTwo((prevState) => ({
            ...prevState,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
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
                    <Link
                        className="text-gray-500 dark:text-gray-400"
                        href="/"
                    ></Link>
                    <Link className="text-gray-500 dark:text-gray-400" href="/">
                        My Roles
                    </Link>
                    <Link className="font-bold" href="/drug-design">
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
                        onClick={() => disconnectWallet()}
                        size="sm"
                        variant="outline"
                    >
                        Connected
                    </Button>
                )}
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Drug Design</CardTitle>
                        <CardDescription className="text-red-600">
                            Only accounts with role designer can add new drug
                            design
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="drugDesignerName">
                                        Designer Name
                                    </Label>
                                    <Input
                                        placeholder="Designer name"
                                        name="drugDesignerName"
                                        onChange={handleChangeOne}
                                        value={formDataOne.drugDesignerName}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Drug Name</Label>
                                    <Input
                                        type="email"
                                        placeholder="Drug name"
                                        name="drugDesignName"
                                        onChange={handleChangeOne}
                                        value={formDataOne.drugDesignName}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Description</Label>
                                <Textarea
                                    id="drugDesignDesc"
                                    rows={3}
                                    placeholder="Description"
                                    name="drugDesignDesc"
                                    onChange={handleChangeOne}
                                    value={formDataOne.drugDesignDesc}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Add Notes</Label>
                                <Textarea
                                    id="drugDesignNotes"
                                    rows={3}
                                    placeholder="Add notes"
                                    name="drugDesignNotes"
                                    onChange={handleChangeOne}
                                    value={formDataOne.drugDesignNotes}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                addDrugDesign(
                                    formDataOne.drugDesignerName,
                                    formDataOne.drugDesignName,
                                    formDataOne.drugDesignDesc,
                                    formDataOne.drugDesignNotes
                                )
                            }
                        >
                            Add Drug Design
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Add Drug Test</CardTitle>
                        <CardDescription className="text-red-600">
                            Only accounts with role regulator or owner can add
                            new drug test
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="drugTestUDPC">
                                        Drug Test UDPC
                                    </Label>
                                    <Input
                                        placeholder="UDPC"
                                        name="drugTestUDPC"
                                        onChange={handleChangeTwo}
                                        value={formDataTwo.drugTestUDPC}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="drugTestPass"
                                        checked={formDataTwo.drugTestPass}
                                        onChange={handleChangeTwo}
                                    />
                                    <span>Passed?</span>
                                </Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="drugtestDesc">
                                    Description
                                </Label>
                                <Textarea
                                    placeholder="Description"
                                    name="drugTestDesc"
                                    onChange={handleChangeTwo}
                                    value={formDataTwo.drugTestDesc}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="drugTestNotes">Add Notes</Label>
                                <Textarea
                                    placeholder="Add notes"
                                    name="drugTestNotes"
                                    onChange={handleChangeTwo}
                                    value={formDataTwo.drugTestNotes}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                addDrugTest(
                                    formDataTwo.drugTestUDPC,
                                    formDataTwo.drugTestDesc,
                                    formDataTwo.drugTestPass,
                                    formDataTwo.drugTestNotes
                                )
                            }
                        >
                            {' '}
                            Add test by owner{' '}
                        </Button>{' '}
                    </CardFooter>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                addDrugTestByRegulator(
                                    formDataTwo.drugTestUDPC,
                                    formDataTwo.drugTestDesc,
                                    formDataTwo.drugTestPass,
                                    formDataTwo.drugTestNotes
                                )
                            }
                        >
                            {' '}
                            Add test by regulator{' '}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Approve Drug</CardTitle>
                        <CardDescription className="text-red-600">
                            Only accounts with role regulator can add new drug
                            design
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="drugApproveUDPC">
                                        Drug UDPC
                                    </Label>
                                    <Input
                                        placeholder="UDPC"
                                        name="drugApproveUDPC"
                                        value={formDataThree.drugApproveUDPC}
                                        onChange={handleChangeThree}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                approveDrug(formDataThree.drugApproveUDPC)
                            }
                        >
                            Approve Drug Design
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sell Drug Design</CardTitle>
                        <CardDescription className="text-red-600">
                            Only owner of drug design can add new drug design
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sellDrugUDPC">
                                        Drug UDPC
                                    </Label>
                                    <Input
                                        placeholder="UDPC"
                                        name="sellDrugUDPC"
                                        value={formDataFour.sellDrugUDPC}
                                        onChange={handleChangeFour}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sellDrugPrice">
                                        Drug Price
                                    </Label>
                                    <Input
                                        placeholder="Ether value"
                                        name="sellDrugPrice"
                                        value={formDataFour.sellDrugPrice}
                                        onChange={handleChangeFour}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                sellDrugDesign(
                                    formDataFour.sellDrugUDPC,
                                    formDataFour.sellDrugPrice
                                )
                            }
                        >
                            {' '}
                            Sell Drug Design
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Buy drug design</CardTitle>
                        <CardDescription className="text-red-600">
                            Only accounts with the role of manufacturer or
                            designer can buy drug design
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="buyDrugUDPC">
                                        Drug UDPC
                                    </Label>
                                    <Input
                                        placeholder="UDPC"
                                        name="buyDrugUDPC"
                                        value={formDataFive.buyDrugUDPC}
                                        onChange={handleChangeFive}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="buyDrugPrice">
                                        Drug Price
                                    </Label>
                                    <Input
                                        placeholder="Ether value"
                                        name="buyDrugPrice"
                                        value={formDataFive.buyDrugPrice}
                                        onChange={handleChangeFive}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                buyDrugDesign(
                                    formDataFive.buyDrugUDPC,
                                    formDataFive.buyDrugPrice
                                )
                            }
                        >
                            {' '}
                            Buy Drug Design
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Update manaufacturer partnership state
                        </CardTitle>
                        <CardDescription className="text-red-600">
                            Only owner of drug design can update manufacturer
                            partnership state
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="partnerStateUDPC">
                                        Partner State UDPC
                                    </Label>
                                    <Input
                                        placeholder="UDPC"
                                        name="partnerStateUDPC"
                                        value={formDataSix.partnerStateUDPC}
                                        onChange={handleChangeSix}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="partnerStateShare">
                                        Partner State Share
                                    </Label>
                                    <Input
                                        placeholder="Partner share 100%"
                                        name="partnerStateShare"
                                        value={formDataSix.partnerStateShare}
                                        onChange={handleChangeSix}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                updatePartnerState(
                                    'close',
                                    formDataSix.partnerStateUDPC,
                                    formDataSix.partnerStateShare
                                )
                            }
                        >
                            {' '}
                            Close partnership{' '}
                        </Button>
                    </CardFooter>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                updatePartnerState(
                                    'restrict',
                                    formDataSix.partnerStateUDPC,
                                    formDataSix.partnerStateShare
                                )
                            }
                        >
                            {' '}
                            Restrict partnership{' '}
                        </Button>
                    </CardFooter>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                updatePartnerState(
                                    'open',
                                    formDataSix.partnerStateUDPC,
                                    formDataSix.partnerStateShare
                                )
                            }
                        >
                            {' '}
                            Open partnership{' '}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Add Manufacture Partner </CardTitle>
                        <CardDescription className="text-red-600">
                            Only owner of drug design can assign manufacturing
                            partner
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="addPartnerUDPC">
                                        Partner UDPC
                                    </Label>
                                    <Input
                                        placeholder="UDPC"
                                        name="addPartnerUDPC"
                                        value={formDataSeven.addPartnerUDPC}
                                        onChange={handleChangeSeven}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="addPartnerAddress">
                                        Partner Address
                                    </Label>
                                    <Input
                                        placeholder="Partner Address"
                                        name="addPartnerAddress"
                                        value={formDataSeven.addPartnerAddress}
                                        onChange={handleChangeSeven}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="addPartnerName">
                                        Partner Name
                                    </Label>
                                    <Input
                                        placeholder="Partner Name"
                                        name="addPartnerName"
                                        value={formDataSeven.addPartnerName}
                                        onChange={handleChangeSeven}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="addPartnerShare">
                                        Partner Share
                                    </Label>
                                    <Input
                                        placeholder="Partner Share 100%"
                                        name="addPartnerShare"
                                        value={formDataSeven.addPartnerShare}
                                        onChange={handleChangeSeven}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                addPartner(
                                    formDataSeven.addPartnerUDPC,
                                    formDataSeven.addPartnerAddress,
                                    formDataSeven.addPartnerName,
                                    formDataSeven.addPartnerShare
                                )
                            }
                        >
                            Add Partner
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Build Manufacture Partnership </CardTitle>
                        <CardDescription className="text-red-600">
                            Only owner of drug design can assign manufacturing
                            partner
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="buildPartnerUDPC">
                                        Partner UDPC
                                    </Label>
                                    <Input
                                        placeholder="Partner UDPC"
                                        name="buildPartnerUDPC"
                                        value={formDataEight.buildPartnerUDPC}
                                        onChange={handleChangeEight}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="buildPartnerName">
                                        Partner Name
                                    </Label>
                                    <Input
                                        placeholder="Manufacturer Name"
                                        name="buildPartnerName"
                                        value={formDataEight.buildPartnerName}
                                        onChange={handleChangeEight}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                assignPartner(
                                    formDataEight.buildPartnerUDPC,
                                    formDataEight.buildPartnerName
                                )
                            }
                        >
                            Build Partnership
                        </Button>
                    </CardFooter>
                </Card>
                {error && <span className="block text-red-600">{error} </span>}
            </div>
        </>
    )
}
