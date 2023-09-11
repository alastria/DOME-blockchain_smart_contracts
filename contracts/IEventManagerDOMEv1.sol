// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


interface IEventManagerDOMEv1 {

    event EventDOMEv1(
        uint256 index,
        uint256 indexed timestamp,
        address indexed origin,
        string indexed eventType,
        string dataLocation,
        string[] metadata
    );

    function emitNewEvent(
        address origin,
        string memory eventType,
        string memory dataLocation,
        string[] memory metadata
    ) external returns (bool);



}
