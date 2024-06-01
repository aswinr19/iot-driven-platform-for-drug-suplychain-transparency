// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Regulator is AccessControl {
  bytes32 public immutable Regulator = keccak256("REGULATOR");

  event RegulatorAdded(address indexed account);
  event RegulatorRemoved(address indexed account);

  constructor () {
    _addRegulator(msg.sender);
  }

  modifier onlyRegulator() {
    require(isRegulator(msg.sender), 'Not a regulator!');
    _; 
  }

    function isRegulator(address account) public view returns (bool) {
       return hasRole(Regulator,account); 
    }

    function amIRegulator() public view returns (bool) {
       return hasRole(Regulator,msg.sender);
    }

    function assignMeAsRegulator() public {
      _addRegulator(msg.sender);
    }

    function renounceMeFromRegulator() public {
      _removeRegulator(msg.sender);
    }

    function _addRegulator(address account) internal {
        _grantRole(Regulator,account);
        emit RegulatorAdded(account);
    }

    function _removeRegulator(address account) internal {
        _revokeRole(Regulator,account);
        emit RegulatorRemoved(account);
    }
}
