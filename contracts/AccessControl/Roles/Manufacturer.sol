// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'openzeppelin/contracts/access/AccessControl.sol'

contract Manufacturer is AccessControl { 
  bytes32 public constant  Consumer = keccak256("CONSUMER");

  event ManufacturerAdded(address indexed account);
  event ManufacturerRemoved(address indexed account);

  constructor () internal {
    _addManufacturer(rmsg.sender);
  }

  modifier onlyManufacturer() {
    require(isManufacturer(msg.sender), 'Not a manufacturer!');
    _; 
  }

    function isManufacturer(address account) public view returns (bool) {
       return hasRole(account,Manufacturer); 
    }

    function amIManufacturer() public view returns (bool) {
       return hasRole(msg.sender,Manufacturer);
    }

    function assignMeAsManufacturer() public {
      _addManufacturer(msg.sender);
    }

    function renounceMeFromManufacturer() public {
      _removeManufacturer(msg.sender);
    }

    function _addManufacturer(address account) internal {
        _grantRole(Manufacturer,account);
        emit ManufacturerAdded(account);
    }

    function _removeManufacturer(address account) internal {
        _revokeRole(Manufacturer,account);
        emit ManufacturerRemoved(account);
    }
}
