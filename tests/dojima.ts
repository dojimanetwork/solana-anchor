import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider, Wallet } from "@project-serum/anchor";
import { IDL, Dojima } from "../target/types/dojima";
import idl from "./idl.json"
import { createMint, getAccount, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import * as splToken from '@solana/spl-token';

const programID = new web3.PublicKey(idl.metadata.address);
const endpoint = "https://api.devnet.solana.com"
const connection = new web3.Connection(endpoint, "processed");

const fromWallet = web3.Keypair.generate();
const toWallet = web3.Keypair.generate();
const payer = fromWallet;
const mintAuthority = fromWallet;
const freezeAuthority = fromWallet;

const opts = {
  preflightCommitment: "processed"
}

async function getProvider() {
  const connection = new web3.Connection(endpoint, "processed");
  // @ts-ignore 
  const provider = new Provider(connection, new Wallet(fromWallet), opts);
  return provider;
}

describe("dojima", () => {

  //Test to transfer Sol token
  it("Sol token is transferred!", async () => {

    let airdropSignature = await connection.requestAirdrop(
      fromWallet.publicKey,
      2 * web3.LAMPORTS_PER_SOL, // 10000000 Lamports in 1 SOL
    );
    await connection.confirmTransaction(airdropSignature);

    const provider = await getProvider()
    const program = new Program(IDL, programID, provider);

    // Add your test here.
    const tx = await program.rpc.transferNativeTokens(new anchor.BN(1000),"Solana", "Ethereum","Solana", {
      accounts: {
        from: fromWallet.publicKey,
        to: toWallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [fromWallet],
    });

    // await connection.confirmTransaction(tx);
    // console.log("Your transaction signature", tx);
    // const fromWalletBalance = await connection.getBalance(fromWallet.publicKey);
    // console.log(fromWalletBalance);
  });

  //Test to transfer non native token
  it("Non native token is transferred!", async () => {

    const provider = await getProvider()
    const program = new Program(IDL, programID, provider);

    //Create a new spl token
    const mint = await createMint(
      connection,
      payer,
      mintAuthority.publicKey,
      freezeAuthority.publicKey,
      6
    );

    //Create a token account for the payer wallet
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    )

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      toWallet.publicKey
    )

    //Mint the supply to the payer's token address 
    await mintTo(
      connection,
      payer,
      mint,
      fromTokenAccount.address,
      mintAuthority,
      100000000000
    )

    console.log("Token mint address: ", mint.toBase58());
    console.log("Token address: ", fromTokenAccount.address.toBase58());

    const tx = await program.rpc.transferNonNativeTokens(new anchor.BN(10000000),"Solana", "Ethereum", "New Mint", {
      accounts: {
        from: fromWallet.publicKey,
        fromTokenAccount: fromTokenAccount.address,
        toTokenAccount: toTokenAccount.address,
        mint: mint,
        tokenProgram: splToken.TOKEN_PROGRAM_ID
      },
      signers: [fromWallet],
    });

    // const fromTokenAccountInfo = await getAccount(
    //   connection,
    //   fromTokenAccount.address
    // )
    // console.log(fromTokenAccountInfo.amount);

    // const toTokenAccountInfo = await getAccount(
    //   connection,
    //   toTokenAccount.address
    // )
    // console.log(toTokenAccountInfo.amount);
  });

})