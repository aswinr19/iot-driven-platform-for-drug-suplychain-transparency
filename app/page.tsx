'use client';

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainchainContext } from "../context/Mainchain";
import { MainchainContextType } from '../types/types';

export default function Home() {
  const { 
        currentAccount, 
        connectWallet, 
        disconnectWallet,
        checkIfWalletIsConnected,
        addRoleToMe,
        removeRoleFromMe,
        addRegulator,
 } = useContext<MainchainContextType>(MainchainContext);
 
  const [roles, setRoles] = useState<string[]>([]);
  const [regulator, setRegulator] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegulator(e.target.value);
    console.log(regulator);
  };

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
          <Link className="text-gray-500 dark:text-gray-400" href="/drug-design">
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
        {/* {roles.map((role) => {
          <div key={role.id}>
            <Button onClick={ () => addRoleToMe(role.role) }>Assign {role.role} </Button>
            <Button onClick={ () => removeRoleFromMe(role.role) }>Remove {role.role} </Button>
          </div>
        })} */}
        {/*
          <div>
            <Button onClick={ () => currentAccountRoles() }>Who am i ?</Button>
          </div>
          <div>
            <span> Add new regulator </span>
            <span className='text-red-600'> Only regulator </span> 
            <input type='text' 
                placeholder='Regulator address' 
                name='regulatorToBeAdded' 
                value={ regulator }
                onChange={ handleChange }
                />
            <Button onClick={ addRegulator(regulator) }> Add </Button>
          </div>
        */}
    </div> 
    </>
  );
}
