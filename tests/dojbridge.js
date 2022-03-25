"use strict";
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
        while (_) try {
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
exports.__esModule = true;
var anchor_1 = require("@project-serum/anchor");
// var toWallet = web3.Keypair.generate();
// var fromWallet = web3.Keypair.generate();
//  describe("dojbridge", () => {
//   let program: Program<Dojbridge>
//   let balance: number
//   let connection: web3.Connection
//   before(async () => {
//     connection = new web3.Connection(
//       web3.clusterApiUrl("devnet"),
//       "confirmed"
//     );
//     // Generate key pair
//     const programID = new web3.PublicKey(idl.metadata.address);
//     const opts = Provider.defaultOptions();
//     const wallet = new 
//     console.log(fromWallet.publicKey.toString());
//     console.log(fromWallet.secretKey);
//     let balance = await connection.getBalance(fromWallet.publicKey);
//     console.log("Balance: ", balance);
//     var fromAirdropSignature = await connection.requestAirdrop(
//       fromWallet.publicKey,
//       web3.LAMPORTS_PER_SOL //A lamport has a value of 0.000000001 SOL.
//     );
//     // Wait for airdrop confirmation
//     await connection.confirmTransaction(fromAirdropSignature);
//     balance = await connection.getBalance(fromWallet.publicKey);
//     console.log("Balance after adding 1 SOL: ", balance);
//   })
//   // we are making a connection to solana devnet
//   it("can send tokens", async () => {
//     // Before sending the transaction to the blockchain.
//     const amount = 1000;
//     await program.rpc.transferNatTokens(new anchor.BN(amount), {
//       accounts: {
//         // Accounts here...
//         from: fromWallet.publicKey,
//         to: toWallet.publicKey,
//         systemProgram: web3.SystemProgram.programId,
//       },
//     });
//     // After sending the transaction to the blockchain.
//     balance = await connection.getBalance(fromWallet.publicKey);
//     console.log("Balance after sending 1000 lamports: ", balance);
//     expect(balance).to.deep.equal(90);
//     balance = await connection.getBalance(toWallet.publicKey);
//     console.log("Balance after adding 1000 lamports: ", balance);
//   });
//  });
//  (async () => {
//   const solana = new web3.Connection("https://api.mainnet-beta.solana.com");
// //the public solana address
//   const accountPublicKey = new web3.PublicKey(
//     "3uTzTX5GBSfbW7eM9R9k95H7Txe32Qw3Z25MtyD2dzwC"
//   );
// //mintAccount = the token mint address
//   const mintAccount = new web3.PublicKey(
//     "6VoZt2RiNHEF7zw39Cv2yeeQ9QDB7hXEi1rZk5xqcKbt"
//   );
//   const account = await solana.getTokenAccountsByOwner(accountPublicKey, {
//       mint: mintAccount});
//       console.log(account.value[0].pubkey.toString());
// })();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var solana, accountPublicKey, mintAccount, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                solana = new anchor_1.web3.Connection("https://api.mainnet-beta.solana.com");
                accountPublicKey = new anchor_1.web3.PublicKey("3uTzTX5GBSfbW7eM9R9k95H7Txe32Qw3Z25MtyD2dzwC");
                mintAccount = new anchor_1.web3.PublicKey("6VoZt2RiNHEF7zw39Cv2yeeQ9QDB7hXEi1rZk5xqcKbt");
                return [4 /*yield*/, solana.getTokenAccountsByOwner(accountPublicKey, {
                        mint: mintAccount
                    })];
            case 1:
                account = _a.sent();
                console.log(account.value[0].pubkey.toString());
                return [2 /*return*/];
        }
    });
}); })();
