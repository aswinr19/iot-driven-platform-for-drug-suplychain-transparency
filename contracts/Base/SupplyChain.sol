//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Pausable.sol";
import './Storage/Drug.sol';
import './Storage/DrugDesign.sol';
import '../AccessControl/Rolable.sol';

contract SupplyChain is Pausable, Drug, DrugDesign, Rolable {

   constructor() public {
    }

    function designDrug(
        string memory _designerName,
        string memory _drugName,
        string memory _description,
        string memory _notes
    )
        public
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
        onlyRegulator()
        whenNotPaused()
    {
        super.approveDrug(_udpc);
    }

    function purchaseDrugDesign(uint _udpc)
        public
        payable
        onlyManufacturer()
    {
        super.purchaseDrugDesign(_udpc);
    }

    function buildPartnerContract(uint _udpc, string memory _name)
        public
        onlyManufacturer()
        whenNotPaused()
    {
        super.buildPartnerContract(_udpc, _name);
    }

    function manufacturDrugsLoud(uint _udpc, uint quantity)
        public
        onlyManufacturer()
        onlyManufacturPartnerOf(_udpc)
    {
        super.manufacturDrugsLoud(_udpc, quantity);
    }

    function buyDrugsLoud(uint _slu, address _receiver)
        public
        payable
        onlyDistributor()
        whenNotPaused()
    {
        require(isRetailer(_receiver));
        DrugItem memory sampleUnit = dItems[stockLouds[_slu][0]];
        uint _udpc = sampleUnit.udpc;
        uint price = sampleUnit.price;
        uint quantity = stockLouds[_slu].length;
        uint totalPrice = price*quantity;
        
        address payable sallerId = address(sampleUnit.currentOwnerId);

        require(msg.value >= totalPrice, "Not Enough!");
        uint amountToReturn = msg.value - totalPrice;
        if (amountToReturn != 0)
            address(msg.sender).transfer(amountToReturn);

        super.buyDrugsLoud(_slu, _receiver);
        
        if (sallerId == dDItems[_udpc].currentOwner){
            sallerId.transfer(totalPrice);
        }
        else {
            uint shareOfSallerPresntage = dDItems[_udpc].manufacturers.sharesOf(sallerId);
            uint shareOfSaller = (shareOfSallerPresntage*totalPrice)/100;
            address payable orignalSallerId = dDItems[_udpc].manufacturers.owner;
            sallerId.transfer(shareOfSaller);
            orignalSallerId.transfer(totalPrice - shareOfSaller);
        }
        
    }

    function purchaseDrug (uint _pku)
        public
        payable
        onlyConsumer()
        whenNotPaused()
    {
        uint price = dItems[_pku].price;
        address payable sallerId = dItems[_pku].currentOwnerId;

        address payable retailerId = address(uint160(dItems[_pku].retailerId));
        uint retialerBounty = (price*5) /100;
        uint developerBounty = (price*1) /100; 

        require(msg.value >= price, "Not Enough!");
        uint amountToReturn = msg.value - price;
        if (amountToReturn != 0)
            address(msg.sender).transfer(amountToReturn);

        super.purchaseDrug(_pku);

        sallerId.transfer(price - (retialerBounty + developerBounty));
        retailerId.transfer(retialerBounty);
    }
}
