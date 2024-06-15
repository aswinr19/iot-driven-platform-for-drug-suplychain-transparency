import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { mainChainABI, mainChainAddress } from './constants';

const fetchContract = (signerOrProvider) => {
  new ethers.Contract( mainChainAddress, mainChainABI, signerOrProvider);
};

export const MainChainContext = React.createContext();

export const MainChainProvider = ({ children }) => {
  const title: string = 'Supply Chain Contract';
  const [currentAccount, setCurrentAccount] = useState<string | null>('');

  const checkIfWalletIsConnected = async () => {
  
    try {
      if( !window.ethereum) return setOpenError(true), setError('Install metamask');

      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts'
      });

      if(accounts.length) setCurrentAccount(accounts[0]);
      else console.log('No account found!');

    } catch(err) {
      console.log('Something went wrong while connecting to account!');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
        if(!window.ethereum) return console.log('Install metamask!');
        
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts'
      }); 
      setCurrentAccount(accounts[0]);
    } catch(err) {
      console.log('Error while connecting to account!');
    }
  };
  const disconnectWallet = () => {
      setCurrentAccount(null);
  };
  const currentAccountRoles = async () => {
    
  };

  const addRoleToMe = async (role: string) => {

  };

  const removeRoleFromMe = async (role: string) => {

  };

  const addRegulator = async () => {};

  const addDrugDesign = async () => {};

  const addDrugTest = async () => {};

  const addDrugTestByRegulator = async () => {};

  const approveDrug = async () => {};

  const sellDrugDesign = async () => {};

  const buyDrugDesign = async () => {};

  const updatePartnerState = async () => {};

  const addPartner = async () => {};

  const assignPartner = async () => {};

  const manufactureDrugLoad = async () => {};

  const packDrugLoad = async () => {};

  const buyDrugLoad = async () => {};
  
  const shipDrugLoad = async () => {};

  const receiveDrugLoad = async () => {};

  const updateShipEnv = async () => {};

  const updateStockEnv = async () => {};

  const purchaseDrug = async () => {};

  const fetchDrugDesignData = async () => {};

  const fetchDrugLoadData = async () => {};

  const getDrugLoadPKUs = async () => {};

  const fetchDrugData = async () => {};

  const fetchEnvHistory = async () => {};

  const addTxToLogs = async () => {};

  const addToLogs = async () => {};

  return (
      <MainChainContext.Provider
        value={{}}
    >
        {children}
      </MainChainContext.Provider >
  );
};

