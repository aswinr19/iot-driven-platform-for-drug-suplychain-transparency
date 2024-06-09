// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Designer is AccessControl {
  bytes32 public immutable DESIGNER_ROLE = keccak256("DESIGNER");
  
  event DesignerAdded(address indexed account);
  event DesignerRemoved(address indexed account);

  constructor() {
    _addDesigner(msg.sender);
  }

  modifier onlyDesigner() {
    require(isDesigner(msg.sender),'Not a designer!');
    _;
  }

  function isDesigner(address account) public view returns (bool) {
    return hasRole(DESIGNER_ROLE,account);
  }

  function amIDesigner() public view returns (bool) {
    return hasRole(DESIGNER_ROLE,msg.sender);
  }

  function assignMeAsDesigner() public {
    _addDesigner(msg.sender);
  }

  function renounceMeFromDesigner() public {
    _removeDesigner(msg.sender);
  }

  function _addDesigner(address account) internal {
    _grantRole(DESIGNER_ROLE,account);
    emit DesignerAdded(account);
  }

  function _removeDesigner(address account) internal {
    _revokeRole(DESIGNER_ROLE,account);
    emit DesignerRemoved(account);
  }
}
