export type Dojbridge = {
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
          "name": "amount",
          "type": "u64"
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

export const IDL: Dojbridge = {
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
          "name": "amount",
          "type": "u64"
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
