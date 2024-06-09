// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Distributor is AccessControl {
  bytes32 public immutable DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR");

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
   return hasRole(DISTRIBUTOR_ROLE,account);
 }

 function amIDistributor() public view returns (bool) {
   return hasRole(DISTRIBUTOR_ROLE,msg.sender);
 }

 function assignMeAsDistributor() public {
   _addDistributor(msg.sender);
 }

 function renounceMeromDistributor() public {
   _removeDistributor(msg.sender);
 }

 function _addDistributor(address account) internal {
   _grantRole(DISTRIBUTOR_ROLE,account);
   emit DistributorAdded(account);
 }

 function _removeDistributor(address account) internal {
   _revokeRole(DISTRIBUTOR_ROLE,account);
   emit DistributorRemoved(account);
 }
}
