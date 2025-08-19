'use server'
import { walletTypes } from "@/app/page";
import { randomUUID } from "crypto";

export interface NewWalletTypes {
  nome: string;
  sobrenome: string;
  email: string;
  valor_carteira: number;
}

export async function postWallet(wallet: NewWalletTypes) {
  const id = randomUUID();
  const infoUse = {
    "id": id,
    "endereco": "72100 Mockingbird Lane",
    "data_nascimento": "1997-09-06T14:03:52Z",
    "data_abertura": "2017-02-18T01:10:29Z",
    "endereco_carteira": "1MqurpDATqHNDUPMVbR7L3BW1hz2DcM29"
  }

  const response = await fetch(`http://localhost:3004/users`, {
    method: "POST",
    body: JSON.stringify(Object.assign(infoUse, wallet))
  });
  return response.ok;
}

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

interface SearchType {
  nome: string;
  sobrenome: string;
  email: string;
}

export async function searchWallet(searh: SearchType) {
  let listSearch: walletTypes[] = [];

  const params = Object.entries(searh)
  .filter(([key, value]) => value) 
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) 
  .join('&'); 

  if (params) {
    const response = await fetch(`http://localhost:3004/users?${params}`, {
      method: "GET",
    });
    
    const data = await response.json();
    listSearch = data;
  }
  return listSearch;
}
