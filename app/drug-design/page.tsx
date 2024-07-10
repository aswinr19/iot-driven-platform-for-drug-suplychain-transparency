'use client';

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainchainContext } from "../../context/Mainchain";
import { MainchainContextType } from '../../types/types';

export default function DrugDesign() {
  const { 
        currentAccount, 
        connectWallet, 
        disconnectWallet,
        checkIfWalletIsConnected,
        addRoleToMe,
        removeRoleFromMe,
        addRegulator,
        addDrugDesign,
        addDrugTest,
        addDrugTestByRegulator,
        approveDrug,
        sellDrugDesign,
        buyDrugDesign,
        updatePartnerState,
        addPartner,
 } = useContext<MainchainContextType>(MainchainContext);
 
  const [roles, setRoles] = useState<string[]>([]);
  const [drugDesignName, setDrugDesignName] = useState<string>('');
  const [drugDesignerName, setDrugDesignerName] = useState<string>('');
  const [drugDesignDescription, setDrugDesignDescription] = useState<string>('');
  const [drugDesignNotes, setDrugDesignNotes] = useState<string>(''); 
  const [drugTestUDPC, setDrugTestUDPC] = useState<string>('');
  const [drugTestDescription, setDrugTestDescription] = useState<string>('');
  const [drugTestPass, setDrugTestPass] = useState<boolean>(false);
  const [drugTestNotes, setDrugTestNotes] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");
  
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
          <Link className="font-bold" href="/drug-design">
           Drug Design 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/drug-loads">
            Drug Loads 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/drug">
            Drug 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/fetch-data">
           Fetch Data 
          </Link>
        </nav>

        {!currentAccount && (
          <Button onClick={() => connectWallet()}>Connect Wallet</Button>
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
          <span className='text-red-600'> Only desginger </span> 
          <input type='text' placeholder='Designer name' name='drugDesignerName' />
          <input type='text' placeholder='Drug name' name='drugDesignName' />
          <textarea rows={2} placeholder='Description' name='drugDesignDesc' />
          <textarea rows={2} placeholder='Add notes' name='drugDesignNotes' />
          <button onClick={ () => addDrugDesign() } > Add drug design </button>
        </div>
         <div>
          <span>Add drug test</span>
          <span className='text-red-600'> Only regulator or owner </span> 
          <input type='text' placeholder='UDPC' name='drugTestUDPC' />
          <textarea rows={2} placeholder='Description' name='drugTestDesc' />
          <label> Passed? </label> 
          <input type='checkbox' name='drugTestPass' />
          <textarea rows={2} placeholder='Add notes' name='drugTestNotes' />
          <button onClick={ () => addDrugTest() }> Add test by owner </button>
          <button onClick={ () => addDrugTestByRegulator() }> Add test by regulator </button>
        </div>
        <div>
          <span>Approve drug</span>
          <span className='text-red-600'> Only regulator </span> 
          <input type='text' placeholder='UDPC' name='drugApproveUDPC' />
          <button onClick={ () => approveDrug() }> Approve </button>
        </div>
        <div>
          <span>Sell drug design</span>
          <span className='text-red-600'> Only owner of drug design </span> 
          <input type='text' placeholder='UDPC' name='sellDrugUDPC' />
          <input type='text' placeholder='Ether value' name='sellDrugPrice' />
          <button onClick={ () => sellDrugDesign() }> Up for sale </button>
        </div>
       <div>
          <span>Buy drug design</span>
          <span className='text-red-600'> Only manufacturer or designer </span> 
          <input type='text' placeholder='UDPC' name='buyDrugUDPC' />
          <input type='text' placeholder='Ether value' name='buyDrugPrice' />
          <button onClick={ () => buyDrugDesign() }> Buy </button>
        </div>
        <div>
          <span>Sell drug design</span>
          <span className='text-red-600'> Only owner of drug design </span> 
          <input type='text' placeholder='UDPC' name='sellDrugUDPC' />
          <input type='text' placeholder='Ether value' name='sellDrugPrice' />
          <button onClick={ () => sellDrugDesign() }> Up for sale </button>
        </div>
        <div>
          <span>Update manaufacturer partnership state</span>
          <span className='text-red-600'> Only owner of drug design </span> 
          <input type='text' placeholder='UDPC' name='partnerStateUDPC' />
          <button onClick={ () => updatePartnerState('close') }> Close partnership </button>
          <button onClick={ () => updatePartnerState('restrict') }> Restrict partnership </button>
          <input type='text' placeholder='Partner share 100%' name='partnerStateShare' />
          <button onClick={ () => updatePartnerState('open') }> Open partnership </button>
        </div>
        <div>
									<span>Add Manufacture Partner </span>
									<span className='text-red-600'>Only owner of drug design</span>
									<span className='text-red-600'>When partnership state is restricted only</span>
									<input type='text' placeholder='UDPC' name='addPatnerUDPC'/>
									<input type='text' placeholder='Partner Address' name='addPatnerAddress'/>
									<input type='text' placeholder='Mabufacturer Name' name='addPatnerName'/>
									<input type='text' placeholder='Partner Share 100%' name='addPartnerShare'/>
									<Button  onClick={()=> {addPartner()}}>Add Partner</Button>
								</div>	
								<div>
									<span>Build Manufactur Partnership </span>
									<span className='text-red-600'> only manufacturer</span>
									<span  className='text-red-600'>When partnership state is open only</span>
									<input type='text' placeholder='UDPC' name='buildPartnerUDPC'/>
									<input type='text' placeholder='Mabufacturer Name' name='buildPartnerName'/>
									<Button onClick={()=> {assignPartner()}}>Build Partnership</Button>
								</div>	
    </div> 
    </>
  );
}
