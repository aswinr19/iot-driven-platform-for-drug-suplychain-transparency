// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Distributor is AccessControl {
  bytes32 public constant  Distributor = keccak256("DISTRIBUTOR");

 event DistributorAdded(address indexed account);
 event DistributorRemoved(address indexed account);

 constructor() {
    _addDistributor(msg.sender);
 }

 modifier onlyDistributor() {
   require(isDistributor(msg.sender), 'Not a distributor!');
  _;
 }

 function isDistributor(address account) public view returns (bool) {
   return hasRole(Distributor,account);
 }

 function amIDistributor() public view returns (bool) {
   return hasRole(Distributor,msg.sender);
 }

 function assignMeAsDistributor() public {
   _addDistributor(msg.sender);
 }

 function renounceMeromDistributor() public {
   _removeDistributor(msg.sender);
 }

 function _addDistributor(address account) internal {
   _grantRole(Distributor,account);
   emit DistributorAdded(account);
 }

 function _removeDistributor(address account) internal {
   _revokeRole(Distributor,account);
   emit DistributorRemoved(account);
 }
}
