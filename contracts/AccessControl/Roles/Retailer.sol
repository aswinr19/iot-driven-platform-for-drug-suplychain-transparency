// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

//Err 6 - Not a retailer!
contract Retailer is AccessControl { 
  bytes32 public immutable RETAILER_ROLE = keccak256("RETAILER");

  event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);

  constructor () {
    _addRetailer(msg.sender);
  }

  modifier onlyRetailer() {
    require(isRetailer(msg.sender), '6');
    _; 
  }

    function isRetailer(address account) public view returns (bool) {
       return hasRole(RETAILER_ROLE,account); 
    }

    function amIRetailer() public view returns (bool) {
       return hasRole(RETAILER_ROLE,msg.sender);
    }

    function assignMeAsRetailer() public {
      _addRetailer(msg.sender);
    }

    function renounceMeFromRetailer() public {
      _removeRetailer(msg.sender);
    }

    function assignThisAccountAsRetailer(address account) public {
      _addRetailer(account);
    }

    function renounceThisAccountFromRetailer(address account) public {
      _removeRetailer(account);
    }

    function _addRetailer(address account) internal {
        _grantRole(RETAILER_ROLE,account);
        emit RetailerAdded(account);
    }

    function _removeRetailer(address account) internal {
        _revokeRole(RETAILER_ROLE,account);
        emit RetailerRemoved(account);
    }
}
