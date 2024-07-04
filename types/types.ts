export interface MainchainContextType {
  currentAccount: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkIfWalletIsConnected: () => Promise<void>;
  addRoleToMe: (role: string) => Promise<void>;
  removeRoleFromMe: (role: string) => Promise<void>;
  addRegulator: (regulatorToBeAdded: string) => Promise<void>;
  addDrugDesign: (drugDesgignerName: string, drugDesignName: string, drugDesignDescription: string, drugDrsignNotes: string) => Promise<void>;
  addDrugTest: (drugTestUDPC: string, drugTestDesc: string, drugTestPass: string, drugTestNotes: string) => Promise<void>;
  addDrugTestByRegulator: (drugTestUDPC: string, drugTestDesc: string, drugTestPass: string, DrugTestNotes: string) => Promise<void>;
  approveDrug: (drugApproveUDPC: string) => Promise<void>;
  sellDrugDesign: (sellDrugUDPC: string, price: number) => Promise<void>;
  buyDrugDesign: (buyDrugUDPC: string, price: number) => Promise<void>;
  updatePartnerState: (state: string, partnerStateUDPC: string, partnerStateShare: string) => Promise<void>;
  addPartner: (addPartnerUDPC: string, addPartnerAddress: string, addPartnerName: string, addPartnerShare: string) => Promise<void>;
  assignPartner: (buildPartnerUDPC: string, buildPartnerName: string) => Promise<void>;
  manufactureDrugLoad: (manufactureUDPC: string, manufactureQuantity: string) => Promise<void>;
  packDrugLoad: (packSLU: string) => Promise<void>;
  addDrugLoad: (addSLU: string, price: number) => Promise<void>;
  buyDrugLoad: (retailerAddress: string, buySLU: string, price: number) => Promise<void>;
  shipDrugLoad: (shipSLU: string) => Promise<void>;
  receiveDrugLoad: (receiveSLU: string) => Promise<void>;
  updateShipEnv: (shipEnvSLU: string, shipEnvHumidity: string, shipEnvTemperature: string) => Promise<void>;
  updateStockEnv: (stockEnvSLU: string, stockEnvHumidity: string, stockEnvTemperature: string) => Promise<void>;
  purchaseDrug: (purchasePKU: string, price: number) => Promise<void>;
  fetchDrugDesignData: (udpc: string) => Promise<void>;
  fetchDrugLoadData: (slu: string) => Promise<void>;
  getDrugLoadPKUs: (slu: string) => Promise<void>;
  fetchDrugData: (fetchDrugPKU: string) => Promise<void>;
  fetchEnvHistory: (fetchDrugPKU: string) => Promise<void>;
};

export type Role = {
  role: string,
  isAssign: boolean
};

