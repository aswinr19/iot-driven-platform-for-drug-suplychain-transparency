'use client';

import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { mainChainABI, mainChainAddress } from './Constants';
import { MainchainContextType, Role } from '../types/types';

const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider): ethers.Contract => {
  return new ethers.Contract(mainChainAddress, mainChainABI, signerOrProvider);
};

export const MainchainContext = React.createContext<MainchainContextType>({} as MainchainContextType);

export const MainchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const title: string = 'Drug supply Chain Contract';
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [openError, setOpenError] = useState<boolean>(false);

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const prvdr = new ethers.BrowserProvider(connection);
        const sgnr = await prvdr.getSigner();
        const cntrct = fetchContract(sgnr);
  
        setProvider(prvdr);
        setSigner(sgnr);
        setContract(cntrct);

        console.log('successfully fetched provider');
        console.log(prvdr);
        console.log(sgnr);
        console.log(cntrct);
      } catch(err){
        console.log(`Failed to initialize app! ${err}`);
        setError('Failed to initialize app!')
      }
    }
    initializeWeb3()
  }, []
  );

  useEffect(() => {
    console.log(`current account ${currentAccount}`);
  }, [currentAccount]);
  
  const addTxToLogs = async (tx: any) => {

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

  const addToLogs = async (logObject: any) => {

    let updatedLogs = [];
    const dataKeys = Object.keys(logObject);
    const numberOfData = dataKeys.length;
    let logy = ''

    for (let i = (numberOfData / 2); i < numberOfData; i++) {
      logy += dataKeys[i] + ': ' + logObject[dataKeys[i]] + ', ';
    }

    updatedLogs.push(logy, ...logs);
    setLogs(updatedLogs);
  };


  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setOpenError(true), setError('Install metamask'), console.log('Install metamask!');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setCurrentAccount(accounts[0]);

      console.log('connected to wallet');
    } catch (err) {
      console.log(`Error while connecting to account! ${err}`);
    }
  };
  const disconnectWallet = () => {
    setCurrentAccount(null);
    console.log('disconnected from wallet');
  };

  const currentAccountRoles = async (): Promise<void> => {

    if (!contract) return;

    try {
      const myRoles = await contract.whoAmI({ from: currentAccount });
      await myRoles.wait();

      addToLogs(myRoles);

      const keys: string[] = Object.keys(myRoles);
      const values: boolean[] = Object.values(myRoles);
      let updatedRoles: Role[] = [];
      for (var i = 6; i < 12; i++) {
        updatedRoles.push({ role: keys[i], isAssign: values[i] })
      }

      /* 
       const updatedRoles: Role[] = Object.entries(myRoles)
       .slice(6,12)
       .map(([role,isAssign]) => ({ role, isAssign }));
       */
      setRoles(updatedRoles)

      console.log(`Roles fetched successfully - ${myRoles}`);
    } catch (err) {
      setError(`Roles fetch failed!`);
      console.log(`Roles fetch failed! - ${err}`);
    }
  };

  const addRoleToMe = async (role: string): Promise<void> => {

    if (!contract) return;

    let transaction;

    try {
      switch (role) {
        case 'designer':
          transaction = await contract.assignMeAsDesigner({ from: currentAccount });
          break;
        case 'regulator':
          transaction = await contract.addRegulator({ from: currentAccount });
          break;
        case 'manufacturer':
          transaction = await contract.assignMeAsManufacturer({ from: currentAccount });
          break;
        case 'distributor':
          transaction = await contract.assignMeAsDistributor({ from: currentAccount });
          break;
        case 'retailer':
          transaction = await contract.assignMeAsRetailer({ from: currentAccount });
          break;
        case 'consumer':
          transaction = await contract.assignMeAsConsumer({ from: currentAccount });
          break;
        default:
          throw new Error(`Unknown role - ${role}`);
      }

      await transaction.wait();

      console.log(`Added role successfully ${transaction}`);
      addTxToLogs(transaction);
      currentAccountRoles();
    } catch (err) {
      setError(`Couldn't add role!`);
      console.log(`Couldn't add role! ${err}`);
    }
  };

  const removeRoleFromMe = async (role: string): Promise<void> => {

    if (!contract) return;
    let transaction;

    try {
      switch (role) {
        case 'designer':
          transaction = await contract.renounceMeFromDesigner(currentAccount);
          break;
        case 'regulator':
          transaction = await contract.renounceMeFromRegulator({ from: currentAccount });
          break;
        case 'manufacturer':
          transaction = await contract.renounceMeFromManufacturer({ from: currentAccount });
          break;
        case 'distributor':
          transaction = await contract.renounceMeFromDistributor({ from: currentAccount });
          break;
        case 'retailer':
          transaction = await contract.renounceMeFromRetailer({ from: currentAccount });
          break;
        case 'consumer':
          transaction = await contract.renounceMeFromConsumer({ from: currentAccount });
          break;
      }

      await transaction.wait();
      console.log(`Successfully removed role ${transaction}`);

      addTxToLogs(transaction);
      currentAccountRoles();
    } catch (err) {
      console.log(`Role removal failed! ${err}`);
      setError(`Role romoval failed!`);
    }
  };

  const addRegulator = async (regulatorToBeAdded: string): Promise<void> => {

    if (!contract) return;

    try {
      const transaction = await contract.addRegulator(regulatorToBeAdded, { from: currentAccount });
      await transaction.wait();

      console.log(`Successfully added regulator ${transaction}`);
      addTxToLogs(transaction);

    } catch (err) {
      console.log(`Failed to add regulator ${err}`);
      setError(`Failed to add regulator`);
    }
  };

  const addDrugDesign = async (drugDesgignerName: string, drugDesignName: string,
    drugDesignDescription: string, drugDrsignNotes: string) => {

    if (!contract) return;

    try {
      const transaction = await contract.designDrug(
        drugDesgignerName,
        drugDesignName,
        drugDesignDescription,
        drugDrsignNotes,
        { from: currentAccount }
      );

      await transaction.wait();

      console.log(`Drug design added successfully ${transaction}`);
    } catch (err) {
      console.log(`Failed to add drug design ${err}`);
      setError(`Failed to add drug design!`);
    }
  };

  const addDrugTest = async (drugTestUDPC: string, drugTestDesc: string,
    drugTestPass: string, drugTestNotes: string): Promise<void> => {

    if (!contract) return;

    try {
      const transaction = await contract.addTestCase(
        drugTestUDPC,
        drugTestDesc,
        drugTestPass,
        drugTestNotes,
        { from: currentAccount }
      );

      await transaction.wait();
      addTxToLogs(transaction);

      console.log(`Drug test added successfully ${transaction}`);
    } catch (err) {
      console.log(`Failed to add drug test ${err}`);
      setError(`Failed to add regulator`);
    }
  };

  const addDrugTestByRegulator = async (drugTestUDPC: string, drugTestDesc: string,
    drugTestPass: string, DrugTestNotes: string,): Promise<void> => {

    if (!contract) return;

    try {
      const transaction = await contract.addTestCaseByRegulator(
        drugTestUDPC,
        drugTestDesc,
        drugTestPass,
        DrugTestNotes,
        { from: currentAccount }
      );
      await transaction.wait();
      console.log(`Drug test by regulator added successfully ${transaction}`);
      addTxToLogs(transaction);
    } catch (err) {
      console.log(`Failed to add regulator ${err}`);
      setError(`Failed to add regulator`);
    }
    };

    const approveDrug = async (drugApproveUDPC: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.approveDrug(drugApproveUDPC, { from: currentAccount });
        await transaction.wait();

        console.log(`Drug approved successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        console.log(`Failed to add regulator ${err}`);
        setError(`Failed to add regulator`);
      }
    };

    const sellDrugDesign = async (sellDrugUDPC: string, price: number): Promise<void> => {

      if (!contract) return;

      try {
        const priceInWei = ethers.parseEther(price.toString());
        const transaction = await contract.upForSale(sellDrugUDPC, priceInWei, { from: currentAccount });
        await transaction.wait();

        console.log(`Drug design sold successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        console.log(`Failed to add regulator ${err}`);
        setError(`Failed to add regulator`);
      }
    };

    const buyDrugDesign = async (buyDrugUDPC: string, price: number): Promise<void> => {

      if (!contract) return;

      try {
        const priceInWei = ethers.parseEther(price.toString());
        const transaction = await contract.purchaseDrugDesign(buyDrugUDPC, { from: currentAccount, value: priceInWei });

        await transaction.wait();
        console.log(`Drug desugn bought successfully ${transaction}`);
      } catch (err) {
        console.log(`Failed to add regulator ${err}`);
        setError(`Failed to add regulator`);
      }
    };

    const updatePartnerState = async (state: string, partnerStateUDPC: string, partnerStateShare: string): Promise<void> => {

      if (!contract) return;

      try {

        let transaction;

        switch (state) {
          case 'close':
            transaction = await contract.closeManufactPartnership(partnerStateUDPC, { from: currentAccount });
            break;
          case 'open':
            transaction = await contract.openManufacPartnership(
              partnerStateUDPC,
              partnerStateShare,
              { from: currentAccount }
            );
            break;
          case 'restrict':
            transaction = await contract.restrictManufactPartnership(partnerStateUDPC, { from: currentAccount });
            break;
        }

        await transaction.wait();

        console.log(`Updated partner state successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't add partner state!`);
        console.log(`Couldn't add role! ${err}`);
      }
    };

    const addPartner = async (addPartnerUDPC: string, addPartnerAddress: string,
      addPartnerName: string, addPartnerShare: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.buildRestrictPartnerContract(
          addPartnerUDPC,
          addPartnerAddress,
          addPartnerName,
          addPartnerShare,
          { from: currentAccount }
        );
        await transaction.wait();
        console.log(`Partner added successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't add partner!`);
        console.log(`Couldn't add partner! ${err}`);
      }
    };

    const assignPartner = async (buildPartnerUDPC: string, buildPartnerName: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.buildPartnerContract(
          buildPartnerUDPC,
          buildPartnerName,
          { from: currentAccount }
        );

        await transaction.wait();

        console.log(`Partner assigned successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't assign partner`);
        console.log(`Couldn't assign partner! ${err}`);
      }
    };

    const manufactureDrugLoad = async (manufactureUDPC: string, manufactureQuantity: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.manufacureDrugsLoud(
          manufactureUDPC,
          manufactureQuantity,
          { from: currentAccount }
        );

        await transaction.wait();

        console.log(`Manufacturer added successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't add manufacturer!`);
        console.log(`Couldn't add manufacturer! ${err}`);
      }
    };

    const packDrugLoad = async (packSLU: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.packDrugsLoud(
          packSLU,
          { from: currentAccount }
        );

        await transaction.wait();
        console.log(`Drug load packed successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't pack drug load!`);
        console.log(`Couldn't pack drug load! ${err}`);
      }
    };

    const addDrugLoad = async (addSLU: string, price: number): Promise<void> => {

      if (!contract) return;

      try {
        const priceInWei = ethers.parseEther(price.toString());
        const transaction = await contract.addDrugsLoud(
          addSLU,
          priceInWei,
          { from: currentAccount }
        );

        await transaction.wait();
        console.log(`Drug load added successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't add drug load!`);
        console.log(`Couldn't add drug load! ${err}`);
      }
    };
    const buyDrugLoad = async (retailerAddress: string, buySLU: string,value: number): Promise<void> => {

      if (!contract) return;

      try {
        const valueInWei = ethers.parseEther(value.toString());
        // const retailerAddress;
        const retailerAccount = ethers.getAddress(retailerAddress);
        const transaction = await contract.buyDrugsLoud(
          buySLU,
          retailerAccount,
          {
            from: currentAccount,
            value: valueInWei
          }
        );

        await transaction.wait();

        console.log(`Drug load bought successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't buy drug load!`);
        console.log(`Couldn't buy drug load! ${err}`);
      }
    };

    const shipDrugLoad = async (shipSLU: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.shipDrugsLoud(
          shipSLU,
          { from: currentAccount }
        );

        await transaction.wait();

        console.log(`Drug load shipped successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't ship drug load!`);
        console.log(`Couldn't ship drug load! ${err}`);
      }
    };

    const receiveDrugLoad = async (receiveSLU: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.receiveDrugsLoud(
          receiveSLU,
          { from: currentAccount }
        );

        await transaction.wait();

        console.log(`Drug load received successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't drug load received!`);
        console.log(`Couldn't add role! ${err}`);
      }
    };

    const updateShipEnv = async (shipEnvSLU: string, shipEnvHumidity: string, shipEnvTemperature: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.updateDrugsLoudShippmentEnv(
          shipEnvSLU,
          shipEnvHumidity,
          shipEnvTemperature,
          { from: currentAccount });

        await transaction.wait();
        console.log(`Updated ship environment successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't updated ship environment!`);
        console.log(`Couldn't updated ship environment! ${err}`);
      }
    };

    const updateStockEnv = async (stockEnvSLU: string, stockEnvHumidity: string, stockEnvTemperature: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.updateDrugsLoudStockEnv(
          stockEnvSLU,
          stockEnvHumidity,
          stockEnvTemperature,
          { from: currentAccount }
        );

        await transaction.wait();
        console.log(`Updated stock environment successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't update stock environment!`);
        console.log(`Couldn't update stock environment! ${err}`);
      }
    };

    const purchaseDrug = async (purchasePKU: string, value: number): Promise<void> => {

      if (!contract) return;

      try {
        const valueInWei = ethers.parseEther(value.toString());
        const transaction = await contract.purchaseDrug(
          purchasePKU,
          {
            from: currentAccount,
            value: valueInWei
          }
        );

        await transaction.wait();
        console.log(`Purchased drug successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't purchase drug!`);
        console.log(`Couldn't purchase drug! ${err}`);
      }
    };

    const fetchDrugDesignData = async (udpc: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.fetchDrugDesignData(
          udpc,
          { from: currentAccount }
        );

        await transaction.wait();
        console.log(`Fetched drug design successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't fetch drug design!`);
        console.log(`Couldn't fetch drug design! ${err}`);
      }
    };

    const fetchDrugLoadData = async (slu: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.fetchDrugLoudData(
          slu,
          { from: currentAccount }
        );

        await transaction.wait();

        console.log(`Fetched drug load data successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't fetched drug load data!`);
        console.log(`Couldn't  fetched drug load data! ${err}`);
      }
    };

    const getDrugLoadPKUs = async (slu: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.fetchLoudPKUs(
          slu,
          { from: currentAccount }
        );

        await transaction.wait();
        console.log(`Fetched drug load pku's successfully ${transaction}`);
        addTxToLogs(transaction);
      } catch (err) {
        setError(`Couldn't fetched drug load pku's!`);
        console.log(`Couldn't fetched drug load pku's! ${err}`);
      }
    };

    const fetchDrugData = async (fetchDrugPKU: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.fetchDrugItemData(
          fetchDrugPKU,
          { from: currentAccount }
        );

        await transaction.wait();
        console.log(`Fetched drug data successfully ${transaction}`);
        addToLogs(transaction);
      } catch (err) {
        setError(`Couldn't fetch drug data !`);
        console.log(`Couldn't fetch drug data! ${err}`);
      }
    };

    const fetchEnvHistory = async (fetchDrugPKU: string): Promise<void> => {

      if (!contract) return;

      try {
        const transaction = await contract.fetchEnvHistory(
          fetchDrugPKU,
          { from: currentAccount }
        );
        await transaction.wait();
        console.log(`Fetched env history successfully ${transaction}`);
        addToLogs(transaction);
      } catch (err) {
        setError(`Couldn't fetched env history`);
        console.log(`Couldn't fetch env history! ${err}`);
      }
    };

    const checkIfWalletIsConnected = async () => {

      try {
        if (!window.ethereum) return setOpenError(true), setError('Install metamask'), console.log('Install metamask!');
        //    if( !window.ethereum) return console.log('Install metamask!');
  
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
  
        if (accounts.length) setCurrentAccount(accounts[0]);
        else console.log('No account found!');
  
      } catch (err) {
        console.log(`Something went wrong while connecting to account! ${err}`);
      }
    };
  
  return (
    <MainchainContext.Provider
      value={{
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
    }}>
    { children }
    </MainchainContext.Provider>
  );
}
