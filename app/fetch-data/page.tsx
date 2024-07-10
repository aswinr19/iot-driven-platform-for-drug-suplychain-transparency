"use client";

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainchainContext } from "../../context/Mainchain";
import { MainchainContextType } from "../../types/types";

export default function FetchData() {
  const {
    currentAccount,
    connectWallet,
    disconnectWallet,
    checkIfWalletIsConnected,
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
    fetchEnvHistory,
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
          <Link
            className="text-gray-500 dark:text-gray-400"
            href="/drug-design"
          >
            Drug Design
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/drug-loads">
            Drug Loads
          </Link>
          <Link className="text-gray-500 dark:text-gray-400" href="/drug">
            Drug
          </Link>
          <Link className="font-bold" href="/fetch-data">
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
          <span>Drug Design</span>
          <input
            type="text"
            p={3}
            m={1}
            placeholder="UDPC"
            name="fetchDrugUDPC"
          />
          <Button
            onClick={() => {
              fetchDrugDesignData();
            }}
          >
            Fetch Data
          </Button>
          <span className="text-green-600">see logs </span>
        </div>
        <div>
          <span>Drug Load</span>
          <input type="text" placeholder="SLU" name="fetchDrugSLU" />
          <Button
            onClick={() => {
              fetchDrugLoadData();
            }}
          >
            Fetch Load Data
          </Button>
          <Button
            onClick={() => {
              getDrugLoadPKUs();
            }}
          >
            Fetch Load PKUs
          </Button>
          <span className="text-green-660"> see logs </span>
        </div>
        <div>
          <span>Drug Design</span>
          <input type="text" placeholder="PKU" name="fetchDrugPKU" />
          <Button
            onClick={() => {
              fetchDrugData();
            }}
          >
            Fetch Data
          </Button>
          <Button
            onClick={() => {
              fetchEnvHistory();
            }}
          >
            Fetch Enviurment History
          </Button>
          <span className="text-green-600">see logs </span>
        </div>
      </div>
    </>
  );
}
