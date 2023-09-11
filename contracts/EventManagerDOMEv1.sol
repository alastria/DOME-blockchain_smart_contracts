// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IEventManagerDOMEv1.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventManagerDOMEv1 is IEventManagerDOMEv1, Ownable {

    uint256 public index;

    function emitNewEvent(
        address _origin,
        string memory _eventType,
        string memory _dataLocation,
        string[] memory _metadata
    ) external override onlyOwner returns (bool) {

        emit EventDOMEv1(
            index,
            block.timestamp,
            _origin,
            _eventType,
            _dataLocation,
            _metadata
        );

        index++;
        return true;
    }

}
