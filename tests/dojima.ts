import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, Wallet } from "@project-serum/anchor";
import { IDL, Dojima } from "../target/types/dojima";
import idl from "./idl.json"

const fromWallet = web3.Keypair.generate();
const toWallet = web3.Keypair.generate();

const opts = {
  preflightCommitment: "processed"
}

const programID = new web3.PublicKey(idl.metadata.address);
const endpoint = "https://api.devnet.solana.com"

async function getProvider() {
  const connection = new web3.Connection(endpoint, "processed");
  // @ts-ignore 
  const provider = new Provider(connection, new Wallet(fromWallet), opts);
  return provider;
}

describe("dojima", () => {

  //Test to transfer Sol token
  it("Sol token is transferred!", async () => {
    const connection = new web3.Connection(endpoint, "processed");

    let airdropSignature = await connection.requestAirdrop(
      fromWallet.publicKey,
      web3.LAMPORTS_PER_SOL, // 10000000 Lamports in 1 SOL
    );
    await connection.confirmTransaction(airdropSignature);

    const provider = await getProvider()
    const program = new Program(IDL, programID, provider);

    // Add your test here.
    const tx = await program.rpc.transferNativeTokens(new anchor.BN(1000), {
      accounts: {
        from: fromWallet.publicKey,
        to: toWallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [fromWallet],
    });

    // await connection.confirmTransaction(tx);
    console.log("Your transaction signature", tx);
    const fromBalance1 = await connection.getBalance(fromWallet.publicKey);
    console.log(fromBalance1);
  });
})