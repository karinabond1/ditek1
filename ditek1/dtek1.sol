pragma solidity ^0.5.11;

contract Dtek1 {
    uint[] info;
    address[] public owners;
    address[] public companys;
    mapping(address => bool) public isOwner;
    struct EnergyInfo {
        uint et;
        uint kgt;
        bool availability;
    }
    
    struct BalanceEnergyNode {
        uint et;
        uint kgt;
        address addrnode;
    }

    
    struct SpecEnergyBlock {
        address owner;
        string spec_energy;
        string current_addr;
        bool availability;
    }
    
    mapping(address => BalanceEnergyNode) balance_from_node;
    mapping(address => BalanceEnergyNode[]) balance_company;
    
    mapping(address => SpecEnergyBlock) energy_node;
    
    mapping(address => EnergyInfo) balance;
    
     modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }
    
    constructor(address[] memory _owners ) public {
        require(_owners.length > 0, "owners required");
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
    }
    
    function add_company(address _addr) public onlyOwner{
        companys.push(_addr);
    }
    
    function add_energy_node(address _owner, string memory _spec_energy, string memory _current_addr) public onlyOwner{
       energy_node[msg.sender] = SpecEnergyBlock( {
        owner: _owner,
        spec_energy: _spec_energy,
        current_addr: _current_addr,
        availability: true
    });
    }
    
    function edit(uint el_token, uint kg_token) public{
        
        if (energy_node[msg.sender].availability){
            balance[energy_node[msg.sender].owner].et += el_token;
            balance[energy_node[msg.sender].owner].kgt += kg_token;
            balance_company[energy_node[msg.sender].owner].push(BalanceEnergyNode({
                et: el_token,
                kgt: kg_token,
                addrnode: msg.sender
            }));
        }
    }
    
    function transfer(address _reciver, uint el_token, uint kg_token) public {
        if (balance[msg.sender].availability && balance[msg.sender].et >= el_token && balance[msg.sender].kgt >= kg_token){
            balance[msg.sender].et -=el_token;
            balance[msg.sender].kgt -=kg_token;
            if (balance[_reciver].availability){
            balance[_reciver].et += el_token;
            balance[_reciver].kgt += kg_token;
            }else{
                balance[_reciver] = EnergyInfo({
                    et: el_token,
                    kgt: kg_token,
                    availability: true
                });
            }
            //to to send to _reciver mapping info kg co2 from nodes
        }
    }
    
    function balanceOff(address _addr) view public returns(uint enegy_token, uint kg_co2_token){
        return (balance[_addr].et, balance[_addr].kgt);
    }
    
}