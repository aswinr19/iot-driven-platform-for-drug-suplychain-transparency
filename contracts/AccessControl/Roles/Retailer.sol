// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Retailer is AccessControl { 
  bytes32 public constant Retailer = keccak256("RETAILER");

  event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);

  constructor () {
    _addRetailer(msg.sender);
  }

  modifier onlyRetailer() {
    require(isRetailer(msg.sender), 'Not a retailer!');
    _; 
  }

    function isRetailer(address account) public view returns (bool) {
       return hasRole(Retailer,account); 
    }

    function amIRetailer() public view returns (bool) {
       return hasRole(Retailer,msg.sender);
    }

    function assignMeAsRetailer() public {
      _addRetailer(msg.sender);
    }

    function renounceMeFromRetailer() public {
      _removeRetailer(msg.sender);
    }

    function _addRetailer(address account) internal {
        _grantRole(Retailer,account);
        emit RetailerAdded(account);
    }

    function _removeRetailer(address account) internal {
        _revokeRole(Retailer,account);
        emit RetailerRemoved(account);
    }
}
