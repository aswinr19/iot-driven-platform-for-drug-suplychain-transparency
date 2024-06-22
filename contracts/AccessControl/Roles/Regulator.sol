// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

//Err 5 - Not a regulator!
contract Regulator is AccessControl {
  bytes32 public immutable REGULATOR_ROLE = keccak256("REGULATOR");

  event RegulatorAdded(address indexed account);
  event RegulatorRemoved(address indexed account);

  constructor () {
    _addRegulator(msg.sender);
  }

  modifier onlyRegulator() {
    require(isRegulator(msg.sender), '5');
    _; 
  }

    function isRegulator(address account) public view returns (bool) {
       return hasRole( REGULATOR_ROLE,account); 
    }

    function amIRegulator() public view returns (bool) {
       return hasRole(REGULATOR_ROLE,msg.sender);
    }

    function assignMeAsRegulator() public {
      _addRegulator(msg.sender);
    }

    function renounceMeFromRegulator() public {
      _removeRegulator(msg.sender);
    }

    function _addRegulator(address account) internal {
        _grantRole(REGULATOR_ROLE,account);
        emit RegulatorAdded(account);
    }

    function _removeRegulator(address account) internal {
        _revokeRole(REGULATOR_ROLE,account);
        emit RegulatorRemoved(account);
    }
}
