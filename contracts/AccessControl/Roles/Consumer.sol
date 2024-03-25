// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'openzeppelin/contracts/access/AccessControl.sol'

contract Consumer {
  bytes32 public constant  Consumer = keccak256("CONSUMER");

  event ConsumerAdded(address indexed account);
  event ConsumerRemoved(address indexed account);
}
