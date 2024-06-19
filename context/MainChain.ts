import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { mainChainABI, mainChainAddress } from './Constants';

const fetchContract = (signerOrProvider) => {
  new ethers.Contract( mainChainAddress, mainChainABI, signerOrProvider);
};

export const MainChainContext = React.createContext(null);

export const MainChainProvider = ({ children }) => {
  const title: string = 'Supply Chain Contract';
  const [currentAccount, setCurrentAccount] = useState<string | null>('');
  const [logs, setLogs] = useState<string[] | null>([]);

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
  
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.whoAmI(currentAccount);

      await transaction.wait();

      addToLogs(transaction);
    } catch(err) {
      console.log(`Contract call failed ${ err }`);
    }
  };

  const addRoleToMe = async (role: string) => {
   
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    let transaction;

    try {
      switch(role){
        case 'designer': 
          transaction = await contract.assignMeAsDesigner(currentAccount);
          break;
        case 'regulator':
          transaction = await contract.addRegulator(currentAccount);
          break;
        case 'manufacturer':
          transaction = await contract.assignMeAsManufacturer(currentAccount);
        break;
        case 'distributor':
          transaction = await contract.assignMeAsDistributor(currentAccount);
        break;
        case 'retailer':
          transaction = await contract.assignMeAsRetailer(currentAccount);
        break;
        case 'consumer':
          transaction = await contract.assignMeAsConsumer(currentAccount);
        break;
      }

      await transaction.wait();
      
      addTxToLogs(transaction);
      currentAccountRoles();
    } catch(err) {
      setErrMessage(err.message);
    }
  };

  const removeFromMe = async (role: string) => {
    
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    let transaction;

    try {
      switch(role){
        case 'designer': 
          transaction = await contract.renounceMeFromDesigner(currentAccount);
          break;
        case 'regulator':
          transaction = await contract.renounceMeFromRegulator(currentAccount);
          break;
        case 'manufacturer':
          transaction = await contract.renounceMeFromManufacturer(currentAccount);
        break;
        case 'distributor':
          transaction = await contract.renounceMeFromDistributor(currentAccount);
        break;
        case 'retailer':
          transaction = await contract.renounceMeFromRetailer(currentAccount);
        break;
        case 'consumer':
          transaction = await contract.renounceMeFromConsumer(currentAccount);
        break;
      }

      await transaction.wait();
      
      addTxToLogs(transaction);
      currentAccountRoles();
    } catch(err) {
      setErrMessage(err.message);
    }

  };

  const addRegulator = async () => {
    
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.addRegulator(regulatorToBeAdded);
      await transaction.wait();

      addTxToLogs(transaction);

    } catch(err) { setErrMessage(err.message); }
  };

  const addDrugDesign = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
        const transaction = await contract.designDrug(
        drugDesgignerName,
        drugDesignName,
        drugDesignDescription,
        drugDrsignNotes
      );

        await transaction.wait();
    } catch(err) { setErrMessage(err.message); }
  };

  const addDrugTest = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);



    try {
      const transaction = await contract.addTestCase(
        drugTestUDPC,
        drugTestDesc,
        drugTestPass,
        drugTestNotes
      );

      await transaction.wait();
      addTxToLogs(transaction);

    } catch(err) { 
      setErrMessage(err.message);
    }
  };

  const addDrugTestByRegulator = async () => {};

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);



  try{
      const transaction = await contract.addTestCaseByRegulator(
        drugTestUDPC,
      drugTestDesc,
      drugTestPass,
      DrugTestNotes
    );
    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
  
  const approveDrug = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);



    try{
      const transaction = await contract.approveDrug(drugApproveUDPC);
    await transaction.wait();
      addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
  };

  const sellDrugDesign = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try{
      const priceInWei = await ethers.parseEther("");
      const transaction = await contract.upForSale(sellDrugUDPC, priceInWei);
      await transaction.wait();
      addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
  };

  const buyDrugDesign = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

  
    try{
      const priceInWei = await ethers.parseEther("");
      const transaction = await contract.purchaseDrugDesign(buyDrugUDPC);

    await transaction.wait();
  } catch(err) {
    seErrMessage(err.message);
  }
  };

  const updatePartnerState = async (state: string) => {
  
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try{

      let transaction;

      switch(state) {
        case 'close': 
          transaction = await contract.closeManufactPartnership(partnerStateUDPC, currentAccount);
          break;
        case 'open':
         transaction = await contract.openManufacPartnership(
            partnerStateUDPC,
            partnerStateShare,
            currentAccount
          );
          break;
        case 'restrict':
          transaction = await contract.restrictManufactPartnership(partnerStateUDPC, currentAccount);
        break;
      }
    
      await transaction.wait();

      addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
  };

  const addPartner = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);


    try{
      const transaction = await contract.buildRestrictPartnerContract(
        addPartnerUDPC,
        addPartnerAddress,
        addPartnerName,
        addPartnerShare
        );
    await transaction.wait();
      addtxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
};

  const assignPartner = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try{
      const transaction = await contract.buildPartnerContract(
        buildPartnerUDPC,
        buildPartnerName,
        currentAccount
      );

    await transaction.wait();

    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
  };

  const manufactureDrugLoad = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

  try{
      const transaction = await contract.manufacureDrugsLoud(
        manufactureUDPC
        manufactureQuantity
        currentAccount
      );

    await transaction.wait();

    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
};

  const packDrugLoad = async () => {

     const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
 
    try{
      const transaction = await contract.packDrugsLoud(
        packSLU,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
};

  const addDrugLoad = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

  try {
      const priceInWei = await ethers.parseEther("");
      const transaction = await contract.addDrugsLoud(
        addSLU,
      priceInWei,
      currentAccount
      );
      
      await transaction.wait();
      addTxToLogs(transaction);
    } catch(err) {
    setErrMessage(err.message);
    }
 };
  const buyDrugLoad = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const valueInWei = await ethers.parseEther("");
      const retailerAccount;
      const retailerAddress;
      const transaction = await contract.buyDrugsLoud(
        buySLU,
        retailerAccount,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
    } catch(err) {
    seErrMessage(err.message);
  }
 };
  
  const shipDrugLoad = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.shipDrugsLoud(
        shipSLU,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const receiveDrugLoad = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.receiveDrugsLoud(
        receiveSLU,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const updateShipEnv = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.updateDrugsLoudShippmentEnv(
        shipEnvSLU,
        shipEnvHumidity,
        shipEnvTemperature,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
};

  const updateStockEnv = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.updateDrugsLoudStockEnv(
        stockEnvSLU,
        stockEnvHumidity,
        stockEnvTemperature,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transation);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const purchaseDrug = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
 
    try {
      const valueInWei = ;
      const transaction = await contract.purchaseDrug(
        purchasePKU,
        currentAccount,
        valueInWei
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const fetchDrugDesignData = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.fetchDrugDesignData(
        udpc,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const fetchDrugLoadData = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.fetchDrugLoudData(
        slu,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const getDrugLoadPKUs = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.fetchLoudPKUs(
        slu,
        currentAccount
      );

    await transaction.wait();
    addTxToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const fetchDrugData = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.fetchDrugItemData(
        fetchDrugPKU,
        currentAddress
      );

    await transaction.wait();
    addToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
};

  const fetchEnvHistory = async () => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.fetchEnvHistory(
        fetchDrugPKU,
        currentAccount
      );
    await transaction.wait();
    addToLogs(transaction);
  } catch(err) {
    seErrMessage(err.message);
  }
 };

  const addTxToLogs = async (tx) => {

    const txHash = tx.transactionHash;
    const eventName = Object.keys(tx.events)[0];
    const eventValueName = Object.keys(tx.events[eventName]['returnValues'])[1];
    const eventValue = tx.events[eventName]['returnValues'][eventValueName];

    let updatedLogs = []
    const newLogHash = `$|>>Transaction Hash: ${txHash}`
    const newLogEvent = `|----|Event: ${eventName} (${eventValueName}: ${eventValue})`;

    updatedLogs.push(newLogHash + newLogEvent, ...logs);
    setLogs(updatedLogs);
  };

  const addToLogs = async (logObject) => {
    
    let updatedLogs = [];
    const dataKeys = Object.keys(logObject);
    const numberOfData = dataKeys.length;
    let logy = ''

    for(let i = (numberOfData / 2); i< numberOfData; i++) {
      logy += dataKeys[i] + ': ' + logObject[dataKeys[i]] + ', ';
    }

    updatedLogs.push(logy, ...logs);
    setLogs(updatedLogs);
  };

  return (
    <> </> 
  );
};

