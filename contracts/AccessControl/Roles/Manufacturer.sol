// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Manufacturer is AccessControl {
  bytes32 public immutable MANUFACTURER_ROLE = keccak256("MANUFACTURER");

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
       return hasRole(MANUFACTURER_ROLE,account); 
    }

    function amIManufacturer() public view returns (bool) {
       return hasRole( MANUFACTURER_ROLE,msg.sender);
    }

    function assignMeAsManufacturer() public {
      _addManufacturer(msg.sender);
    }

    function renounceMeFromManufacturer() public {
      _removeManufacturer(msg.sender);
    }

    function _addManufacturer(address account) internal {
        _grantRole(MANUFACTURER_ROLE,account);
        emit ManufacturerAdded(account);
    }

    function _removeManufacturer(address account) internal {
        _revokeRole(MANUFACTURER_ROLE,account);
        emit ManufacturerRemoved(account);
    }
}
