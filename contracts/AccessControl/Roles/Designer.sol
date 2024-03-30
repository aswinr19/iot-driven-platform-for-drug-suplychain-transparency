// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import 'openzeppelin/contracts/access/AccessControl.sol'

contract Designer is AccessControl {
  bytes32 public constant  Designer = keccak256("DESIGNER");
  
  event DesignerAdded(address indexed account);
  event DesignerRemoved(address indexed account);

  constructor() internal {
    _addDesigner(msg.sender);
  }

  modifier onlyDesigner() {
    require(isDesigner(msg.sender),'Not a designer!');
    _;
  }

  function isDesigner(address account) public view returns (bool) {
    return hasRole(Designer,account);
  }

  function amIDesigner() public view returns (bool) {
    return hasRole(msg.sender,Designer);
  }

  function assignMeAsDesigner() public {
    _addDesigner(msg.sender);
  }

  function renounceMeFromConsumer() public {
    _removeDesigner(msg.sender);
  }

  function _addDesigner(address account) internal {
    _grantRole(Designer,account);
    emit DesignerAdded(account);
  }

  function _removeDesigner(address account) internal {
    _revokeRole(Designer,account);
    emit DesignerRemoved(account);
  }
}
