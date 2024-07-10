'use client';

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainchainContext } from "../../context/Mainchain";
import { MainchainContextType } from '../../types/types';

export default function DrugLoads() {
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
        assignPartner,
        manufactureDrugLoad,
        packDrugLoad,
        addDrugLoad,
        buyDrugLoad,
        shipDrugLoad,
        receiveDrugLoad,
        updateShipEnv,
        updateStockEnv,
        purchaseDrug,
        fetchDrugDesignData,
        fetchDrugLoadData,
        getDrugLoadPKUs,
        fetchDrugData,
        fetchEnvHistory
 } = useContext<MainchainContextType>(MainchainContext);
 
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");
  // const [logs, setLogs] = useState<string[]>([]);

  //   useEffect(() => {
  //      const checkWallet = async () => {
  //       await checkIfWalletIsConnected();
  //     }

  //   checkWallet();
  // }, []);


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
          <Link className="text-gray-500 dark:text-gray-400" href="/drug-design">
           Drug Design 
          </Link>
          <Link className="font-bold" href="/drug-loads">
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
									<span>Manufactur Drugs Load </span>
									<span className='text-red-600'>only manufacturer</span>
									<span  className='text-red-600'>only partner or owner of drug design</span>
									<input type='number' placeholder='UDPC' name='manufacturUDPC'/>
									<input type='number' placeholder='Quantity' name='manufacturQuantity'/>
									<p/>
									<Button onClick={()=> {manufactDrugLoad()}}>Manufactur</Button>
								</div>	
								<div>
									<span>Pack Drugs Load </span>
									<span className='text-red-600'>only manufacturer of drugs load</span>
									<input type='text' placeholder='SLU' name='packSLU'/>
									<p/>
									<Button onClick={()=> {packDrugLoad()}}>Pack</Button>
								</div>
								<div>
									<span>Sell Drugs Load </span>
									<span className='text-red-600'> only manufacturer of drugs load</span>
									<input type='text' placeholder='SLU' name='addSLU'/>
									<input type='text' placeholder='Unit Price' name='addPrice'/>
									<p/>
									<Button onClick={()=> {addDrugLoad()}}>Up For Sale</Button>
								</div>		
								<div>
									<span>Buy Drugs Loud</span>
									<span className='text-red-600'>only distributor</span>
									<input type='text' placeholder='SLU' name='buySLU'/>
									<input type='text' placeholder='Retailer Address' name='buyRetailerAddress'/>
									<input type='text' placeholder='Ether Value' name='buyValue'/>
									<p/>
									<Button onClick={()=> {buyDrugLoad()}}>Buy</Button>
								</div>	
								<div>
									<span>Ship Drugs Load </span>
									<span>only manufacturer of drugs load</Text>
									<input type='text' placeholder='SLU' name='shipSLU'/>
									<p/>
									<Button onClick={()=> {shipDrugLoad()}}>Ship</Button>
								</div>
								<div> 
									<span>Receive Drugs Load </span>
									<span className='text-red-600'>only retailer of drugs load</Text>
									<span className='text-red-600'>only drugs load shippment envuirment updated</Text>
									<input type='text' placeholder='SLU' name='receiveSLU'/>
									<p/>
									<Button p ={3} m={1} onClick={()=> {receiveDrugLoad()}}>Recieve</Button>
								</div>		
								<div>
									<span>Update Shippment Envuirment</span>
									<span className='red'>only manufacturer or distributor of drugs load</span>
									<input type='text' placeholder='SLU' name='shipEnvSLU'/>
									<input type='text' placeholder='Humidity' name='shipEnvHumidity'/>
									<input type='text' placeholder='Temprture' name='shipEnvTemprture'/>
									<p/>
									<Button onClick={()=> {updateShipEnv()}}>Add</Button>
								</div>	
								<div>
									<span>Update Stocking Envuirment</span>
									<span className='text-red-600'>only Retailer of drugs load</span>
									<input type='text' placeholder='SLU' name='stockEnvSLU'/>
									<input type='text' placeholder='Humidity' name='stockEnvHumidity'/>
									<input type='text'  placeholder='Temprture' name='stockEnvTemprture'/>
									<p/>
									<Button onClick={()=> {updateStockEnv()}}>Add</Button>
								</div>	
    </div> 
    </>
  );
}
