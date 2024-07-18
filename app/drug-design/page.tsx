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
    drugTestPass: string
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

type FormDataSeven = {
    partnerStateUDPC: string
    partnerStateShare: string
}

type FormDataEight = {
    partnerStateShare: string
}

type FormDataNine = {
    addPartnerUDPC: string
    addPartnerName: string
    addPartnerAddress: string
    addPartnerShare: string
}

type FormDataTen = {
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
        drugTestPass: '',
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

    const [formDataSeven, setFormDataSeven] = useState<FormDataSeven>({
        partnerStateUDPC: '',
        partnerStateShare: ''
    })
    const [formDataEight, setFormDataEight] = useState<FormDataEight>({
        partnerStateShare: '',
    })
    const [formDataNine, setFormDataNine] = useState<FormDataNine>({
        addPartnerUDPC: '',
        addPartnerName: '',
        addPartnerAddress: '',
        addPartnerShare: '',
    })
    const [formDataTen, setFormDataTen] = useState<FormDataTen>({
        buildPartnerUDPC: '',
        buildPartnerName: '',
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
    const handleChangeNine = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormDataNine((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleChangeTen = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormDataTen((prevState) => ({
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
                    />
                    <input
                        type="text"
                        placeholder="Drug name"
                        name="drugDesignName"
                    />
                    <textarea
                        rows={2}
                        placeholder="Description"
                        name="drugDesignDesc"
                    />
                    <textarea
                        rows={2}
                        placeholder="Add notes"
                        name="drugDesignNotes"
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
                    <input type="text" placeholder="UDPC" name="drugTestUDPC" />
                    <textarea
                        rows={2}
                        placeholder="Description"
                        name="drugTestDesc"
                    />
                    <label> Passed? </label>
                    <input type="checkbox" name="drugTestPass" />
                    <textarea
                        rows={2}
                        placeholder="Add notes"
                        name="drugTestNotes"
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
                    <input type="text" placeholder="UDPC" name="sellDrugUDPC" />
                    <input
                        type="text"
                        placeholder="Ether value"
                        name="sellDrugPrice"
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
                    <input type="text" placeholder="UDPC" name="buyDrugUDPC" />
                    <input
                        type="text"
                        placeholder="Ether value"
                        name="buyDrugPrice"
                    />
                    <button onClick={() => buyDrugDesign(formDataFive.buyDrugUDPC , formDataFive.buyDrugPrice)}> Buy </button>
                </div>
                {/*<div>
                    <span>Sell drug design</span>
                    <span className="text-red-600">
                        {' '}
                        Only owner of drug design{' '}
                    </span>
                    <input type="text" placeholder="UDPC" name="sellDrugUDPC" />
                    <input
                        type="text"
                        placeholder="Ether value"
                        name="sellDrugPrice"
                    />
                    <button onClick={() => sellDrugDesign()}>
                        {' '}
                        Up for sale{' '}
                    </button>
                </div>
                */}
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
                    />
                    <button onClick={() => updatePartnerState('close', formDataSeven.partnerStateUDPC, formDataSeven.partnerStateShare)}>
                        {' '}
                        Close partnership{' '}
                    </button>
                    <button onClick={() => updatePartnerState('restrict',  formDataSeven.partnerStateUDPC, formDataSeven.partnerStateShare)}>
                        {' '}
                        Restrict partnership{' '}
                    </button>
                    <input
                        type="text"
                        placeholder="Partner share 100%"
                        name="partnerStateShare"
                    />
                    <button onClick={() => updatePartnerState('open', formDataSeven.partnerStateUDPC, formDataSeven.partnerStateShare)}>
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
                    />
                    <input
                        type="text"
                        placeholder="Partner Address"
                        name="addPatnerAddress"
                    />
                    <input
                        type="text"
                        placeholder="Mabufacturer Name"
                        name="addPatnerName"
                    />
                    <input
                        type="text"
                        placeholder="Partner Share 100%"
                        name="addPartnerShare"
                    />
                    <Button
                        onClick={() => {
                            addPartner(formDataNine.addPartnerUDPC,formDataNine.
    addPartnerAddress, formDataNine.
    addPartnerName,  formDataNine.
    addPartnerShare)
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
                    />
                    <input
                        type="text"
                        placeholder="Mabufacturer Name"
                        name="buildPartnerName"
                    />
                    <Button
                        onClick={() => {
                            assignPartner(formDataTen.buildPartnerUDPC, formDataTen.
    buildPartnerName)
                        }}
                    >
                        Build Partnership
                    </Button>
                </div>
            </div>
        </>
    )
}
