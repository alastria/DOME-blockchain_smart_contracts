var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require('express');
var app = express();
var fs = require('fs');
var ethers = require("ethers").ethers;
var port = 3000;
require('dotenv').config();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
var provider = new ethers.providers.JsonRpcProvider(process.env.NODE_ENDPOINT);
console.log(provider);
var signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
/*
let abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "origin",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "eventType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "dataLocation",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string[]",
                "name": "metadata",
                "type": "string[]"
            }
        ],
        "name": "EventDOMEv1",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_origin",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_eventType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_dataLocation",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_metadata",
                "type": "string[]"
            }
        ],
        "name": "emitNewEvent",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "index",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
*/
var metadata = JSON.parse(fs.readFileSync('../artifacts/contracts/EventManagerDOMEv1.sol/EventManagerDOMEv1.json').toString());
var abi = metadata.abi;
var domeContractAddress = process.env.CONTRACT_ADDRESS;
var domeContract = new ethers.Contract(domeContractAddress, abi, provider);
var blocknum;
(function prueba() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.getBlockNumber()];
                case 1:
                    blocknum = _a.sent();
                    console.log("block number is " + blocknum);
                    return [2 /*return*/];
            }
        });
    });
})();
var domeContractWithSigner = domeContract.connect(signer);
domeContractWithSigner.emitNewEvent("0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5", "eventtype", "dataLocation", ["meta", "data"]);
// Receive an event when ANY transfer occurs
domeContract.on("EventDOMEv1", function (index, timestamp, origin, eventType, dataLocation, metadata) {
    console.log("index: ".concat(index, " - timestamp: ").concat(timestamp, " - origin: ").concat(origin, " - eventType: ").concat(eventType, " - dataLocation: ").concat(dataLocation, " - metadata: ").concat(metadata, " "));
});
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function () {
        var events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, domeContract.queryFilter("*", 115041499, blocknum)];
                case 1:
                    events = _a.sent();
                    console.log("Events received from block 115041499 to block " + blocknum);
                    console.log(events);
                    return [2 /*return*/];
            }
        });
    });
}
getAllEvents();
