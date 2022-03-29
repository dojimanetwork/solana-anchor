import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Dojima } from "../target/types/dojima";

describe("dojima", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Dojima as Program<Dojima>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.transferNativeTokens({});
    console.log("Your transaction signature", tx);
  });
});
