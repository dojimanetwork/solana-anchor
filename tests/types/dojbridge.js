"use strict";
exports.__esModule = true;
exports.IDL = void 0;
exports.IDL = {
    "version": "0.1.0",
    "name": "dojbridge",
    "instructions": [
        {
            "name": "transferNatTokens",
            "accounts": [
                {
                    "name": "from",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "to",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "destBlockchain",
                    "type": "string"
                },
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "asset",
                    "type": "string"
                }
            ]
        }
    ],
    "events": [
        {
            "name": "LockEvent",
            "fields": [
                {
                    "name": "sourceBlockchain",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "destBlockchain",
                    "type": "string",
                    "index": false
                },
                {
                    "name": "sender",
                    "type": "publicKey",
                    "index": true
                },
                {
                    "name": "amount",
                    "type": "u64",
                    "index": false
                },
                {
                    "name": "asset",
                    "type": "string",
                    "index": false
                }
            ]
        }
    ]
};
