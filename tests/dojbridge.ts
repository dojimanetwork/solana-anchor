// import * as anchor from "@project-serum/anchor";
// import { Dojbridge } from "../target/types/dojbridge";
// import { expect } from "chai";

// import { Connection, PublicKey, SendTransactionError, AccountMeta } from '@solana/web3.js';
// import {
//   Program, Provider, web3,BN
// } from '@project-serum/anchor';
// import {IDL} from "./types/dojbridge"
// import idl from "./idl.json"

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

import { PublicKey } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';

(async () => {
  const connection = new web3.Connection("https://api.mainnet-beta.solana.com");

//the public solana address
  const accountPublicKey = new web3.PublicKey(
    "3uTzTX5GBSfbW7eM9R9k95H7Txe32Qw3Z25MtyD2dzwC"
  );

//mintAccount = the token mint address
  const mintAccount = new web3.PublicKey(
    "6VoZt2RiNHEF7zw39Cv2yeeQ9QDB7hXEi1rZk5xqcKbt"
  );
  const account = await connection.getTokenAccountsByOwner(accountPublicKey, {
      mint: mintAccount});

      const balance = await connection.getTokenAccountBalance(
        new PublicKey(account.toString())
      );
    
      console.log(balance.value.amount);
      console.log(account.value[0].pubkey.toString());

})();