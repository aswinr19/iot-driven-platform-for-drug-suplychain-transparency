//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library Partnerships {

    enum PartnershipState {
        Restricted,
        Opened,
        Closed
    }

    struct Partnership {
        address payable owner;
        uint defultSharesPresntage;
        PartnershipState state;
        uint partnersIndex;
        mapping (uint => Partner) partners;
        mapping (address => bool) bearer;
        mapping (address => uint) indexOfPartners;
    }

    struct Partner {
        address payable partnerID;
        string name;
        uint shares;
    }

    event testing(uint shares);

    function add(
        Partnership storage partnership,
        address payable account,
        string memory name,
        uint _shares
    )
        public
    {
        uint shares = partnership.defultSharesPresntage;
        require(account != address(0));
        require(!has(partnership, account));
        if (partnership.state == PartnershipState.Restricted) {
            require(msg.sender == partnership.owner);
            shares = _shares;
        }
        if (partnership.state == PartnershipState.Closed)
            return;

        partnership.bearer[account] = true;

        Partnerships.Partner memory newPartner;
        newPartner.partnerID = account;
        newPartner.name = name;
        newPartner.shares = shares;
        
        partnership.partners[partnership.partnersIndex] = newPartner;
        partnership.indexOfPartners[account] = partnership.partnersIndex;
        partnership.partnersIndex += 1;
    }

    function remove(Partnership storage partnership, address account) public {
        require(account != address(0));
        require(has(partnership, account));

        partnership.bearer[account] = false;
        delete partnership.partners[partnership.indexOfPartners[account]];
        delete partnership.indexOfPartners[account];
    }

    function has(Partnership storage partnership, address account) public view returns(bool) {
        require(account != address(0));

        return partnership.bearer[account];
    }

    function allActive(Partnership storage partnership) public view returns(Partner[] memory) {
        Partner[] memory _partners = new Partner[](partnership.partnersIndex);
        uint _index = 0;
        for (uint i = 1; i < partnership.partnersIndex; i++) {
            if (partnership.partners[i].partnerID != address(0)) {
                _partners[_index] = partnership.partners[i];
                _index += 1;
            }
        }
        return _partners;
    }

    function sharesOf(Partnership storage partnership, address account) public view returns(uint) {
        require(account != address(0));
        require(has(partnership, account));
        uint indexOfPartner = partnership.indexOfPartners[account];
        return partnership.partners[indexOfPartner].shares;
    }

    function partnershipState(Partnership storage partnership) public view returns(string memory) {
        if (partnership.state == PartnershipState.Opened)
            return 'Open';
        else if (partnership.state == PartnershipState.Closed)
            return 'Close';
        else if (partnership.state == PartnershipState.Restricted)
            return 'Restrict'; 
    }

    function numberOfActive(Partnership storage partnership) public view returns(uint) {
        uint count = 0;
        for (uint i = 0; i < partnership.partnersIndex; i++) {
            if (partnership.partners[i].partnerID != address(0)) {
                count++;
            }
        }
        return count;
    }
}

