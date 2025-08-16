'use server'

import { walletTypes } from "@/app/page";

export async function updatedWallet(wallet: walletTypes) {
  const response = await fetch(`http://localhost:3004/users/${wallet.id}`, {
    method: "PUT",
    body: JSON.stringify(wallet)
  });
  return response.ok;
}

export async function deleteWallet(id: string) {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}