import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export const MainChainContext = React.createContext();
export const MainChainProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState<string |null>('');

  const connectWallet = async () => {
    try {} catch(err) {}
  };
  const disconnectWallet = () => {
      setCurrentAccount(null);
  };

  return (
      <div>
      </div>
  );
};

