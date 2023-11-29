// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.21;


interface IEventManagerDOMEv1 {

    event EventDOMEv1(
        uint256  index,
        uint256  timestamp,
        //
        bytes32  indexed origin,
        bytes32  indexed entityIDHash,
        //string  indexed origin,
        //string  indexed entityIDHash,
        //
        string   eventType,
        string   dataLocation,
        string[] metadata,
        bool     indexed active
    );

    function emitNewEvent(
        bytes32  origin,
        bytes32  entityIDHash,
        //string   memory origin,
        //string   memory entityIDHash,
        //
        string   memory eventType,
        string   memory dataLocation,
        string[] memory metadata
    ) external returns (bool);

}
