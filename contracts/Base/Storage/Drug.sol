//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Drug {
  uint pku;
  uint slu;

  mapping(uint => DrugItem) dItems;
  mapping(uint => uint[]) stockLouds;

  enum DrugState {
    Manufactured,
    Packed,
    ForSale,
    Sold,
    Shipped,
    Received,
    Purchased
  }

  struct EnvUpdateObj {
    uint timeStamp;
    uint humidity;
    unit temperature;
    address updaterAddress;
  }
  
  struct DrugItem {
    uint udpc;
    uint pku;
    uint slu;
    DrugState state;
    address payable currentOwnerId;
    address manufacturerId;
    address distributerId;
    address retailerId;
    uint price;
    uint packingTimeStamp;
    mapping(uint => EnvUpdateObj) envHistory;
    uint envUpdateCounter;
  }

  event Manufactured(uint slu);
  event Packed(uint slu);
  event ForSale(uint slu);
  event Sold(uint slu);
  event Shipped(uint slu);
  event EnvUpdated(uint slu);
  event Received(uint slu);

  event Purchased(uint pku);

  modifier isManufactured(uint _slu) {
    uint firstPKU = stockLouds[_slu][0];
    require(dItems[firstPKU].state == DrugState.Manufactured);
    _;
  }

  modifier isPacked(uint _slu) {
      uint firstPKU = stockLouds[_slu}[0];
      require(dItems[firstPKU].state == DrugState.Packed);
    _;
  }
  
  modifier drugLoudForSale(uint _slu) {
    uint firstPKU = stockLouds[_slu][0];
    require(dItems[firstPKU].state == DrugState.ForSale);
    _;
 }

  modifier isSold(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        require(dItems[firstPKU].state == DrugState.Sold);
        _;
    }

    modifier isShipped(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        require(dItems[firstPKU].state == DrugState.Shipped);
        _;
    }

    modifier isEnvTracked(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        require(dItems[firstPKU].envUpdateCounter != 0);
        _;
    }

    modifier isReceived(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        require(dItems[firstPKU].state == DrugState.Received);
        _;
    }

    modifier onlyManufacturerOf(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        bool isManuf = dItems[firstPKU].manufacturerId == msg.sender;
        require(isManuf);
        _;
    }

    modifier onlyManufacturerOrDistributorOf(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        bool isManuf = dItems[firstPKU].manufacturerId == msg.sender;
        bool isDistr = dItems[firstPKU].deistributorId == msg.sender;
        require(isManuf || isDistr);
        _;
    }

    modifier onlyRetailerOf(uint _slu) {
        uint firstPKU = stockLouds[_slu][0];
        bool isReta = dItems[firstPKU].retailerId == msg.sender;
        require(isReta);
        _;
    }

    modifier isDrugReceived(uint _pku) {
        require(dItems[_pku].state == DrugState.Received);
        _;
    }

    modifier isDrugEnvTracked(uint _pku) {
        require(dItems[_pku].envUpdateCounter != 0);
        _;
    }

    constructor() public {
        slu = 0;
        pku = 0;
    }

    function manufacturDrugsLoud(uint _udpc, uint quantity) public {
        uint _slu = ++slu;
        DrugItem memory newDrugItem;
        newDrugItem.udpc = _udpc;
        newDrugItem.slu = _slu;
        newDrugItem.state = DrugState.Manufactured;
        newDrugItem.currentOwnerId = msg.sender;
        newDrugItem.manufacturerId = msg.sender;
        newDrugItem.envUpdateCounter = 0;
        for (uint i = 0; i < quantity; i++) {
            uint _pku = ++pku;
            newDrugItem.pku = _pku;
            dItems[_pku] = newDrugItem;
            
            stockLouds[_slu].push(_pku);
        }
        emit Manufactured(_slu);
    }

    function packDrugsLoud(uint _slu)
        public
        isManufactured(_slu)
        onlyManufacturerOf(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];
            dItems[_pku].state = DrugState.Packed;
            dItems[_pku].packingTimeStamp = now;
        }
        emit Packed(_slu);
    }

    function addDrugsLoud(uint _slu, uint _unitPrice)
        public
        isPacked(_slu)
        onlyManufacturerOf(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];
            dItems[_pku].state = DrugState.ForSale;
            dItems[_pku].price = _unitPrice;
        }
        emit ForSale(_slu);
    }

    function buyDrugsLoud(uint _slu, address _receiver)
        public
        payable
        drugLoudforSale(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];
            dItems[_pku].state = DrugState.Sold;
            dItems[_pku].currentOwnerId = msg.sender;
            dItems[_pku].deistributorId = msg.sender;
            dItems[_pku].retailerId = _receiver;

        }
        emit Sold(_slu);
    }

    function shipDrugsLoud(uint _slu)
        public
        isSold(_slu)
        onlyManufacturerOf(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];
            dItems[_pku].state = DrugState.Shipped;
        }
        emit Shipped(_slu);
    }

    function updateDrugsLoudShippmentEnv (
        uint _slu,
        uint _humidity,
        uint _temprture
    )
        public
        isShipped(_slu)
        onlyManufacturerOrDistributorOf(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        EnvUpdateOpj memory _envUpdate = EnvUpdateOpj(
            now,
            _humidity,
            _temprture,
            msg.sender
        );
        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];

            dItems[_pku].envHistory[dItems[_pku].envUpdateCounter] = _envUpdate;
            dItems[_pku].envUpdateCounter ++;
        }
        emit EnvUpdated(_slu);
    }

    function receiveDrugsLoud (
        uint _slu
    )
        public
        isShipped(_slu)
        isEnvTracked(_slu)
        onlyRetailerOf(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];

            dItems[_pku].state = DrugState.Received;
        }
        emit Received(_slu);
    }

    function updateDrugsLoudStockEnv (
        uint _slu,
        uint _humidity,
        uint _temprture
    )
        public
        isReceived(_slu)
        onlyRetailerOf(_slu)
    {
        uint quantity = stockLouds[_slu].length;
        EnvUpdateOpj memory _envUpdate = EnvUpdateOpj(
            now,
            _humidity,
            _temprture,
            msg.sender
        );

        for (uint i = 0; i < quantity; i++) {
            uint _pku = stockLouds[_slu][i];

            if (dItems[_pku].state != DrugState.Purchased) {
                dItems[_pku].envHistory[dItems[_pku].envUpdateCounter] = _envUpdate;
                dItems[_pku].envUpdateCounter ++;
            }
        }
        emit EnvUpdated(_slu);
    }

    function purchaseDrug (uint _pku)
        public
        payable
        isDrugReceived(_pku)
        isDrugEnvTracked(_pku)
    {
        dItems[_pku].state = DrugState.Purchased;
        dItems[_pku].currentOwnerId = msg.sender;

        emit Purchased(_pku);
    }
    
    function fetchDrugLoaudData(uint _slu) 
        external 
        view 
        returns(
            uint quantity,
            uint _udpc,
            string memory state,
            address currentOwner,
            address manufacturerId,
            address deistributorId,
            address retailerId,
            uint price
        )
    {
        require(_slu <= slu && _slu != 0, 'Given SLU Not Created Yet!');

        uint sampleItemPKU = stockLouds[_slu][stockLouds[_slu].length-1];
        (
            _udpc,
            ,
            state,
            currentOwner,
            manufacturerId,
            deistributorId,
            retailerId,
            price,
            ,
            
        ) = fetchDrugItemData(sampleItemPKU);

        quantity = stockLouds[_slu].length;
    }

    function fetchDrugItemData(uint _pku)
        public
        view
        returns(
            uint _udpc,
            uint _slu,
            string memory state,
            address currentOwner,
            address manufacturerId,
            address deistributorId,
            address retailerId,
            uint price,
            uint packingTimeStamp,
            uint numberOfEnvUpdate
        )
    {
        require(_pku <= pku && _pku != 0, 'Given PKU Not Created Yet!');
        DrugItem  storage _drugItem = dItems[_pku];

        _udpc = _drugItem.udpc;
        _slu = _drugItem.slu;

        if (_drugItem.state == DrugState.Manufactured)
            state = 'Manufactured';
        else if (_drugItem.state == DrugState.Packed)
            state = 'Packed';
        else if (_drugItem.state == DrugState.ForSale)
            state = 'ForSale';
        else if (_drugItem.state == DrugState.Sold)
            state = 'Sold';
        else if (_drugItem.state == DrugState.Shipped)
            state = 'Shipped';
        else if (_drugItem.state == DrugState.Received)
            state = 'Received';
        else if (_drugItem.state == DrugState.Purchased)
            state = 'Purchased';

        currentOwner = _drugItem.currentOwnerId;
        manufacturerId = _drugItem.manufacturerId;
        deistributorId = _drugItem.deistributorId;
        retailerId = _drugItem.retailerId;
        price = _drugItem.price;
        packingTimeStamp = _drugItem.packingTimeStamp;
        numberOfEnvUpdate = _drugItem.envUpdateCounter;
    }

    function fetchLoudPKUs(uint _slu)
        external
        view
        returns(
            uint[] memory loadPKUs
        )
    {
        loadPKUs = stockLouds[_slu];
    }

    function fetchEnvHistory(uint _pku)
        external
        view
        isDrugEnvTracked(_pku)
        returns(
            uint numberOfupdate,
            uint[] memory timeStamps,
            uint[] memory temprtures,
            uint[] memory humiditys,
            address[] memory updaterAddresses
        )
    {
        DrugItem  storage _drugItem = dItems[_pku];
        numberOfupdate = _drugItem.envUpdateCounter;
        uint[] memory _timeStamps = new uint[](numberOfupdate);
        uint[] memory _temprtures = new uint[](numberOfupdate);
        uint[] memory _humiditys = new uint[](numberOfupdate);
        address[] memory _updaterAddresses = new address[](numberOfupdate);
        for (uint i = 0; i < _drugItem.envUpdateCounter; i++) {
            EnvUpdateOpj storage _envUpdate = _drugItem.envHistory[i];
            _timeStamps[i] = _envUpdate.timeStamp;
            _temprtures[i] = _envUpdate.temprture;
            _humiditys[i] = _envUpdate.humidity;
            _updaterAddresses[i] = _envUpdate.updaterAddress;
        }
        (timeStamps, temprtures, humiditys, updaterAddresses) = (
            _timeStamps, 
            _temprtures, 
            _humiditys,
            _updaterAddresses
        );
    }

}
