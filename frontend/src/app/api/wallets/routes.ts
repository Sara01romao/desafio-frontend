'use server'

import { walletTypes } from "@/app/page";

export async function updatedWallet(wallet: walletTypes) {
  const response = await fetch(`http://localhost:3004/users/${wallet.id}`, {
    method: "PUT",
    body: JSON.stringify(wallet)
  });
  return response.ok;
}