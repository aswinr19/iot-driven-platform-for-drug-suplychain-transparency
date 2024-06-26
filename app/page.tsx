"use client";

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainchainContext } from "../context/Mainchain";

export default function Home() {
  const { 
        currentAccount, 
        connectWallet, 
        disconnectWallet,
        checkIfWalletIsConnected,
        addRoleToMe,
        removeFromMe,
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
 } = useContext(MainchainContext);
 
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");
  // const [activeTab, setActiveTab] = useState("1");
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
            href="#"
          >
            <span>Drug Supplychain</span>
          </Link>
          <Link className="font-bold" href="#">
           My Roles 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
           Drug Design 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="#">
            Drug Loads 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/create">
            Drug 
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/create">
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
        {roles.map((role) => {
          <div>
            <Button onClick={ () => addRoleToMe(role.role) }>Assign {role.role} </Button>
            <Button onClick={ () => removeRoleFromMe(role.role) }>Remove {role.role} </Button>
            <Button onClick={ () => currentAccountRoles() }>Who am i ?</Button>
          </div>
        })}
    </div> 
    </>
  );
}
