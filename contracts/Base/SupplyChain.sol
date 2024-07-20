//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/Pausable.sol";
import './Storage/Drug.sol';
import './Storage/DrugDesign.sol';
import '../AccessControl/Rolable.sol';

//Err 9 - Not enough (price too low)!
contract SupplyChain is Pausable, Drug, DrugDesign, Rolable {

   constructor() {
   }

    function designDrug(
        string memory _designerName,
        string memory _drugName,
        string memory _description,
        string memory _notes
    )
        public
        virtual
        override
        onlyDesigner()
        whenNotPaused()
    {
        super.designDrug(
            _designerName,
            _drugName,
            _description,
            _notes
        );
    }

    function addTestCaseByRegulaor(
        uint _udpc,
        string memory _description,
        bool _isPassed,
        string memory _notes
    )
        public
        virtual
        override
        onlyRegulator()
    {
        super.addTestCaseByRegulaor(
            _udpc,
            _description,
            _isPassed,
            _notes
        );
    }

    function approveDrug(uint _udpc)
        public
        virtual
        override
        onlyRegulator()
        whenNotPaused()
    {
        super.approveDrug(_udpc);
    }

    function purchaseDrugDesign(uint _udpc)
        public
        virtual
        override
        payable
        onlyManufacturer()
    {
        super.purchaseDrugDesign(_udpc);
    }

    function buildPartnerContract(uint _udpc, string memory _name)
        public
        virtual
        override
        onlyManufacturer()
        whenNotPaused()
    {
        super.buildPartnerContract(_udpc, _name);
    }

    function manufacturDrugsLoud(uint _udpc, uint quantity)
        public
        virtual
        override
        onlyManufacturer()
        onlyManufacturPartnerOf(_udpc)
    {
        super.manufacturDrugsLoud(_udpc, quantity);
    }

    function buyDrugsLoud(uint _slu, address _receiver)
        public
        virtual
        override
        payable
        onlyDistributor()
        whenNotPaused()
    {
        require(isRetailer(_receiver));
        DrugItem storage sampleUnit = dItems[stockLouds[_slu][0]];
        uint _udpc = sampleUnit.udpc;
        uint price = sampleUnit.price;
        uint quantity = stockLouds[_slu].length;
        uint totalPrice = price * quantity;

        address payable sallerId = payable(address(sampleUnit.currentOwnerId));

        require(msg.value >= totalPrice, 'Not enough (price too low)!');
        uint amountToReturn = msg.value - totalPrice;
        if (amountToReturn != 0)
            payable(address(msg.sender)).transfer(amountToReturn);

        super.buyDrugsLoud(_slu, _receiver);

        if (sallerId == dDItems[_udpc].currentOwner){
            sallerId.transfer(totalPrice);
        }
        else {
       //     uint shareOfSellerPersentage = dDItems[_udpc].manufacturers.sharesOf(sallerId);
        //    uint shareOfSeller = (shareOfSellerPersentage * totalPrice) / 100;
         //   address payable orignalSallerId = dDItems[_udpc].manufacturers.owner;
          //  sallerId.transfer(shareOfSeller);
           // orignalSallerId.transfer(totalPrice - shareOfSeller);
        }

    }

    function purchaseDrug (uint _pku)
        public
        virtual
        override
        payable
        onlyConsumer()
        whenNotPaused()
    {
        uint price = dItems[_pku].price;
        address payable sallerId = dItems[_pku].currentOwnerId;

        address payable retailerId = payable(address(uint160(dItems[_pku].retailerId)));
        uint retialerBounty = (price * 5) / 100;
        uint developerBounty = (price * 1) / 100;

        require(msg.value >= price, 'Not enough (price too low)!');
        uint amountToReturn = msg.value - price;
        if (amountToReturn != 0)
            payable(address(msg.sender)).transfer(amountToReturn);

        super.purchaseDrug(_pku);

        sallerId.transfer(price - (retialerBounty + developerBounty));
        retailerId.transfer(retialerBounty);
    }
}
