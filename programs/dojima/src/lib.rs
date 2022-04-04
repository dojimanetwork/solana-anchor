use anchor_lang::emit;
use anchor_lang::event;
use anchor_lang::prelude::*;
use anchor_lang::solana_program;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::system_program;
use anchor_spl::token;

declare_id!("4vhGdPhZcFSbGveMd5VqXwuz2fttxU6r7B9M7upiM3k7");

#[program]
mod dojima {
    use super::*;

    pub fn transfer_non_native_tokens(
        ctx: Context<TransferNonNative>,
        token_amount: u64,
        source_chain: String,
        destination_chain: String,
        token_locked: String,
    ) -> ProgramResult {
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
            token_amount,
        )?;

        emit!(LockEvent {
            source_blockchain: source_chain,
            destination_blockchain: destination_chain, //dest_blockchain,
            sender: ctx.accounts.from.key(),
            amount: token_amount,
            asset: token_locked,
        });
        return Ok(());
    }

    pub fn transfer_native_tokens(
        ctx: Context<TransferNative>,
        token_amount: u64,
        source_chain: String,
        destination_chain: String,
        token_locked: String,
    ) -> ProgramResult {
        let ix = system_instruction::transfer(
            &ctx.accounts.from.key(),
            &ctx.accounts.to.key(),
            token_amount,
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
            source_blockchain: source_chain,
            destination_blockchain: destination_chain, //dest_blockchain,
            sender: ctx.accounts.from.key(),
            amount: token_amount,
            asset: token_locked,
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
    /// CHECK: This is not dangerous because it's passed to CPI which does necessary checks.
    pub from: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: This is not dangerous because it's passed to CPI which does necessary checks.
    pub to: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    /// CHECK: This is not dangerous because it is the system program developed by Solana.
    pub system_program: AccountInfo<'info>,
}

#[event]
pub struct LockEvent {
    pub source_blockchain: String,
    pub destination_blockchain: String,
    #[index]
    pub sender: Pubkey,
    pub amount: u64,
    pub asset: String,
}

#[event]
pub struct PoolLockEvent {
    pub source_blockchain: String,
    pub token_a: String,
    pub token_b: String,
    #[index]
    pub sender: Pubkey,
    pub amount_token_a: u64,
    pub amount_token_b: u64,
}
