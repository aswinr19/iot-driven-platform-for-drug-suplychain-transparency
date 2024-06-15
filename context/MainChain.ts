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
    } catch(err) {}
  };

  const connectWallet = async () => {
    try {} catch(err) {}
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
};

