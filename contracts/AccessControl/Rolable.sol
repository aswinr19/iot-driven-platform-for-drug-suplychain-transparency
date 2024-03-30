pragma solidity ^0.8.9;

import './Roles/Consumer.sol';
import './Roles/Designer.sol';
import './Roles/Distributor.sol';
import './Roles/Manufacturer.sol';
import './Roles/Regulator.sol';
import './Roles/Retailer.sol';

contract Rolable is Consumer, Designer, Distributor, Manufacturer, Regulator, Retailer {
  
  function whoAmI() public view returns (
    bool consumer, 
    bool designer, 
    bool distributor, 
    bool manufacturer, 
    bool regulator, 
    bool retailer
  ) {
    consumer = amIConsumer();
    designer = amIDesigner();
    distributor = amiIDistributor();
    manufacturer = amIManufacturer();
    regulator = amIRegulator();
    retailer = amIRetailer();
   }
}
