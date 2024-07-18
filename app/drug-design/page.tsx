'use client'

import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
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
            <div>
                <div>
                    <span>Add new drug design</span>
                    <span className="text-red-600"> Only desginger </span>
                    <input
                        type="text"
                        placeholder="Designer name"
                        name="drugDesignerName"
                        onChange={handleChangeOne}
                        value={formDataOne.drugDesignerName}
                    />
                    <input
                        type="text"
                        placeholder="Drug name"
                        name="drugDesignName"
                        onChange={handleChangeOne}
                        value={formDataOne.drugDesignName}
                    />
                    <textarea
                        rows={2}
                        placeholder="Description"
                        name="drugDesignDesc"
                        onChange={handleChangeOne}
                        value={formDataOne.drugDesignDesc}
                    />
                    <textarea
                        rows={2}
                        placeholder="Add notes"
                        name="drugDesignNotes"
                        onChange={handleChangeOne}
                        value={formDataOne.drugDesignNotes}
                    />
                    <button
                        onClick={() =>
                            addDrugDesign(
                                formDataOne.drugDesignerName,
                                formDataOne.drugDesignName,
                                formDataOne.drugDesignDesc,
                                formDataOne.drugDesignNotes
                            )
                        }
                    >
                        {' '}
                        Add drug design{' '}
                    </button>
                </div>
                <div>
                    <span>Add drug test</span>
                    <span className="text-red-600">
                        {' '}
                        Only regulator or owner{' '}
                    </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="drugTestUDPC"
                        onChange={handleChangeTwo}
                        value={formDataTwo.drugTestUDPC}
                    />
                    <textarea
                        rows={2}
                        placeholder="Description"
                        name="drugTestDesc"
                        onChange={handleChangeTwo}
                        value={formDataTwo.drugTestDesc}
                    />
                    <label> Passed? </label>
                    <input
                        type="checkbox"
                        name="drugTestPass"
                        checked={formDataTwo.drugTestPass}
                        onChange={handleChangeTwo}
                    />
                    <textarea
                        rows={2}
                        placeholder="Add notes"
                        name="drugTestNotes"
                        onChange={handleChangeTwo}
                        value={formDataTwo.drugTestNotes}
                    />
                    <button
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
                    </button>
                    <button
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
                    </button>
                </div>
                <div>
                    <span>Approve drug</span>
                    <span className="text-red-600"> Only regulator </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="drugApproveUDPC"
                        value={formDataThree.drugApproveUDPC}
                        onChange={handleChangeThree}
                    />
                    <button
                        onClick={() =>
                            approveDrug(formDataThree.drugApproveUDPC)
                        }
                    >
                        {' '}
                        Approve{' '}
                    </button>
                </div>
                <div>
                    <span>Sell drug design</span>
                    <span className="text-red-600">
                        {' '}
                        Only owner of drug design{' '}
                    </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="sellDrugUDPC"
                        value={formDataFour.sellDrugUDPC}
                        onChange={handleChangeFour}
                    />
                    <input
                        type="text"
                        placeholder="Ether value"
                        name="sellDrugPrice"
                        value={formDataFour.sellDrugPrice}
                        onChange={handleChangeFour}
                    />
                    <button
                        onClick={() =>
                            sellDrugDesign(
                                formDataFour.sellDrugUDPC,
                                formDataFour.sellDrugPrice
                            )
                        }
                    >
                        {' '}
                        Up for sale{' '}
                    </button>
                </div>
                <div>
                    <span>Buy drug design</span>
                    <span className="text-red-600">
                        {' '}
                        Only manufacturer or designer{' '}
                    </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="buyDrugUDPC"
                        value={formDataFive.buyDrugUDPC}
                        onChange={handleChangeFive}
                    />
                    <input
                        type="text"
                        placeholder="Ether value"
                        name="buyDrugPrice"
                        value={formDataFive.buyDrugPrice}
                        onChange={handleChangeFive}
                    />
                    <button
                        onClick={() =>
                            buyDrugDesign(
                                formDataFive.buyDrugUDPC,
                                formDataFive.buyDrugPrice
                            )
                        }
                    >
                        {' '}
                        Buy{' '}
                    </button>
                </div>
                <div>
                    <span>Update manaufacturer partnership state</span>
                    <span className="text-red-600">
                        {' '}
                        Only owner of drug design{' '}
                    </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="partnerStateUDPC"
                        value={formDataSix.partnerStateUDPC}
                        onChange={handleChangeSix}
                    /> 

                    <input
                        type="text"
                        placeholder="Partner share 100%"
                        name="partnerStateShare"
                        value={formDataSix.partnerStateShare}
                        onChange={handleChangeSix}
                    />
                   
                    <button
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
                    </button>
                    <button
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
                    </button>
                   
                    <button
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
                    </button>
                </div>
                <div>
                    <span>Add Manufacture Partner </span>
                    <span className="text-red-600">
                        Only owner of drug design
                    </span>
                    <span className="text-red-600">
                        When partnership state is restricted only
                    </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="addPatnerUDPC"
                        value={formDataSeven.addPartnerUDPC}
                        onChange={handleChangeSeven}
                    />
                    <input
                        type="text"
                        placeholder="Partner Address"
                        name="addPatnerAddress"
                        value={formDataSeven.addPartnerAddress}
                        onChange={handleChangeSeven}
                    />
                    <input
                        type="text"
                        placeholder="Mabufacturer Name"
                        name="addPatnerName"
                        value={formDataSeven.addPartnerName}
                        onChange={handleChangeSeven}
                    />
                    <input
                        type="text"
                        placeholder="Partner Share 100%"
                        name="addPartnerShare"
                        value={formDataSeven.addPartnerShare}
                        onChange={handleChangeSeven}
                    />
                    <Button
                        onClick={() => {
                            addPartner(
                                formDataSeven.addPartnerUDPC,
                                formDataSeven.addPartnerAddress,
                                formDataSeven.addPartnerName,
                                formDataSeven.addPartnerShare
                            )
                        }}
                    >
                        Add Partner
                    </Button>
                </div>
                <div>
                    <span>Build Manufactur Partnership </span>
                    <span className="text-red-600"> only manufacturer</span>
                    <span className="text-red-600">
                        When partnership state is open only
                    </span>
                    <input
                        type="text"
                        placeholder="UDPC"
                        name="buildPartnerUDPC"
                        value={formDataEight.buildPartnerUDPC}
                        onChange={handleChangeEight}
                    />
                    <input
                        type="text"
                        placeholder="Mabufacturer Name"
                        name="buildPartnerName"
                        value={formDataEight.buildPartnerName}
                        onChange={handleChangeEight}
                    />
                    <Button
                        onClick={() => {
                            assignPartner(
                                formDataEight.buildPartnerUDPC,
                                formDataEight.buildPartnerName
                            )
                        }}
                    >
                        Build Partnership
                    </Button>
                </div>
            </div>
        </>
    )
}
