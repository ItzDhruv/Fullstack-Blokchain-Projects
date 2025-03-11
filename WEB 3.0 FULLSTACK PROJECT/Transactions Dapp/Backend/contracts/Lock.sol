// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transaction {
    event EtherSent(address indexed from, address indexed to, uint256 amount);

    function sendEther(address payable _to) public payable {
        require(msg.value > 0, "amount should be greater than zero");
        _to.transfer(msg.value);
        emit EtherSent(msg.sender, _to, msg.value);
    }

    function sendEther2(address payable _to) public payable {
        require(msg.value > 0, "amount should be greater than zero");
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        emit EtherSent(msg.sender, _to, msg.value);
    }
}
