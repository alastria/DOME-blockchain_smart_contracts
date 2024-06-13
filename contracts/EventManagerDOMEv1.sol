// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.21;

import "./IEventManagerDOMEv1.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventManagerDOMEv1 is IEventManagerDOMEv1 {

    uint256 public index;

    function emitNewEvent(
      bytes32  _publisherAddress,
      bytes32  _authorAdress,
      bytes32  _entityIDHash,
      bytes32  _previousEntityHash,
      string   memory _eventType,
      string   memory _dataLocation,
      string[] memory _metadata
    ) external override onlyOwner returns (bool) {

        emit EventDOMEv1(
            index,
            block.timestamp,
            _origin,
            _entityIDHash,
            _previousEntityHash,
            _eventType,
            _dataLocation,
            _metadata
        );

        index++;
        return true;
    }

}
