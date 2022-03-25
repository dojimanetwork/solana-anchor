use anchor_lang::prelude::*;
use anchor_lang::solana_program;
use anchor_lang::solana_program::system_program;
use anchor_lang::solana_program::system_instruction;
use anchor_spl::token;
use anchor_lang::event;
use anchor_lang::emit;

declare_id!("8fK3EArbLPuao6tZVAn6te9yJkxAHay2JcBcauk61cBN");

#[program]
mod dojbridge {
    use super::*;

    pub fn transfer_tokens(ctx: Context<TransferNonNative>, amount: u64) -> ProgramResult {
        let sender = &ctx.accounts.from;
        let sender_tokens = &ctx.accounts.from_token_account;
        let recipient_tokens = &ctx.accounts.to_token_account;
        let token_program = &ctx.accounts.token_program;
    
        token::transfer(
            CpiContext::new(
                token_program.to_account_info(),
                token::Transfer {
                    from: sender_tokens.to_account_info(),
                    to: recipient_tokens.to_account_info(),
                    authority: sender.to_account_info(),
                    },
                ),
                amount,
            )?;
    
        return Ok(());
    }

    pub fn transfer_nat_tokens(ctx: Context<TransferNative>, dest_blockchain: String, amount: u64, asset: String) -> ProgramResult {
        let ix = system_instruction::transfer(
            &ctx.accounts.from.key(),
            &ctx.accounts.to.key(),
            amount,
        );
        solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.from.to_account_info(),
                ctx.accounts.to.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        emit!(LockEvent {
           source_blockchain: "Solana".to_string(),
           dest_blockchain: dest_blockchain,
           sender: ctx.accounts.from.key(),
           amount: amount,
           asset: asset,
        });

        return Ok(());
    }

}


#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct TransferNonNative<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub from_token_account: Account<'info, token::TokenAccount>,
    #[account(mut)]
    pub to_token_account: Account<'info, token::TokenAccount>,
    pub mint: Account<'info, token::Mint>,
    pub token_program: Program<'info, token::Token>,
}


#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct TransferNative<'info> {
    #[account(mut, signer)]
    pub from: AccountInfo<'info>,
    #[account(mut)]
    pub to: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[event]
pub struct LockEvent {
    pub source_blockchain: String,
    pub dest_blockchain: String,
    #[index]
    pub sender: Pubkey,
    pub amount: u64,
    pub asset: String,
}