// Minimal ERC20 Token for demo (no tests)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ERC20Token {
    string public name = "VibeToken";
    string public symbol = "VIBE";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        emit Transfer(address(0), msg.sender, initialSupply);
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "invalid to");
        uint256 bal = balanceOf[from];
        require(bal >= value, "insufficient");
        unchecked {
            balanceOf[from] = bal - value;
            balanceOf[to] += value;
        }
        emit Transfer(from, to, value);
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= value, "not allowed");
        unchecked { allowance[from][msg.sender] = allowed - value; }
        _transfer(from, to, value);
        return true;
    }
}

