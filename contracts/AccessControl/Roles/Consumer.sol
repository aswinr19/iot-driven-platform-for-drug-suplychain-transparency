// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Consumer is AccessControl {
  bytes32 public constant  Consumer = keccak256("CONSUMER");

  event ConsumerAdded(address indexed account);
  event ConsumerRemoved(address indexed account);

  constructor () {
    _addConsumer(msg.sender);
  }

  modifier onlyConsumer() {
    require(isConsumer(msg.sender), 'Not a consumer!');
    _;
  }

    function isConsumer(address account) public view returns (bool) {
       return hasRole(Consumer,account); 
    }

    function amIConsumer() public view returns (bool) {
       return hasRole(Consumer,msg.sender);
    }

    function assignMeAsConsumer() public {
      _addConsumer(msg.sender);
    }

    function renounceMeFromConsumer() public {
      _removeConsumer(msg.sender);
    }

    function _addConsumer(address account) internal {
        _grantRole(Consumer,account);
        emit ConsumerAdded(account);
    }

    function _removeConsumer(address account) internal {
        _revokeRole(Consumer,account);
        emit ConsumerRemoved(account);
    }
}
