// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

// Err: 1 - Not a consumer!
contract Consumer is AccessControl {
  bytes32 public immutable CONSUMER_ROLE = keccak256("CONSUMER");

  event ConsumerAdded(address indexed account);
  event ConsumerRemoved(address indexed account);

  constructor () {
    _addConsumer(msg.sender);
  }

  modifier onlyConsumer() {
    require(isConsumer(msg.sender), '1');
    _;
  }

    function isConsumer(address account) public view returns (bool) {
       return hasRole(CONSUMER_ROLE,account); 
    }

    function amIConsumer() public view returns (bool) {
       return hasRole(CONSUMER_ROLE,msg.sender);
    }

    function assignMeAsConsumer() public {
      _addConsumer(msg.sender);
    }

    function renounceMeFromConsumer() public {
      _removeConsumer(msg.sender);
    }

    function _addConsumer(address account) internal {
        _grantRole(CONSUMER_ROLE,account);
        emit ConsumerAdded(account);
    }

    function _removeConsumer(address account) internal {
        _revokeRole(CONSUMER_ROLE,account);
        emit ConsumerRemoved(account);
    }
}
