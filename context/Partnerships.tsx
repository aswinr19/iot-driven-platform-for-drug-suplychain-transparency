import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {  partnershipABI, partnershipAddress } from './Constants';

const fetchContract = (signerOrProvider: any) => {
  new ethers.Contract( partnershipAddress, partnershipAddress, signerOrProvider);
};

export const PartnershipsContext = React.createContext(null);

export const PartnershipsProvider = ({ children }) => {

}; 
