// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Manufacturer is AccessControl {
  bytes32 public constant Manufacturer = keccak256("MANUFACTURER");

    event ManufacturerAdded(address indexed account);
    event ManufacturerRemoved(address indexed account);


  constructor ()  {
    _addManufacturer(msg.sender);
  }

  modifier onlyManufacturer() {
    require(isManufacturer(msg.sender), 'Not a manufacturer!');
    _; 
  }

    function isManufacturer(address account) public view returns (bool) {
       return hasRole(Manufacturer,account); 
    }

    function amIManufacturer() public view returns (bool) {
       return hasRole(Manufacturer,msg.sender);
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
