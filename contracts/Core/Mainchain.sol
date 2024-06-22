//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import '@openzeppelin/contracts/access/Ownable.sol';
import '../Base/SupplyChain.sol';

contract Mainchain is Ownable, SupplyChain {
 
  constructor() Ownable(msg.sender) SupplyChain()  {}

  //function kill() public onlyOwner {
  //  selfdestruct(msg.sender);
  //}

  function purchaseDrug (uint _pku)
        public
        payable
        override
    {
        super.purchaseDrug(_pku);

        uint price = dItems[_pku].price;
        address payable developerId = payable(owner());
        uint developerBounty = price * 1 / 100;
        developerId.transfer(developerBounty);
    }
}
