'use client'
import { SetStateAction, use, useEffect, useState } from "react";
import { Button } from "./button"
import { Input } from "./input"
import { walletTypes } from "../page";
import { cripto_value } from "../util/cripto_value";
import { updatedWallet } from "../api/wallets/routes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type editModalProps = {
  openEditModal: (value: SetStateAction<boolean>) => void;
  wallet?: walletTypes;
}

export function EditModal({ openEditModal, wallet }: editModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    valor_btc: 0,
  });
  const [cotacaoBtc, setCotacaoBtc] = useState(0);
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [qtd, setQtd] = useState(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (wallet) {
      setFormData({
        nome: wallet.nome,
        sobrenome: wallet.sobrenome,
        email: wallet.email,
        valor_btc: wallet.valor_carteira,
      });
    }
  }, [wallet]);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'valor_btc') {
      handleQtdCripto(parseFloat(value));
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor_btc' ? parseFloat(value) || 0 : value
    }));
  };

  function handleQtdCripto(value: number) {
    const calculo = (((value * 100) / cotacaoBtc) / 100);
    setQtd(calculo);
    return (calculo.toFixed(8));
  }

  useEffect(() => {
    cripto_value().then((result) => {
      const cotacao = Number(result);
      setCotacaoBtc(cotacao);

      if (wallet?.valor_carteira) {
        setQtd(wallet.valor_carteira)
        setFormData(prev => ({
          ...prev,
          valor_btc: cotacao * wallet.valor_carteira
        }))
      }
    });
  }, [wallet])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBtnSubmit(true)
    if (wallet) {
      wallet.nome = formData.nome;
      wallet.sobrenome = formData.sobrenome;
      wallet.email = formData.email;
      wallet.valor_carteira = qtd;

      const response = await updatedWallet(wallet);
      if (response) {
        setToast(true)
        setTimeout(()=>{
           openEditModal(false);
           setBtnSubmit(false);
        }, 1000)
        
      }

      if(!response){
        setTimeout(()=>{
          setBtnSubmit(false);
        }, 1000)
      }
    }
  };


  return (
    <div className="bg-gray-950/70 fixed top-0 left-0 h-full max-w-[100%] z-50 w-full flex justify-center items-center p-2">
      <div className="bg-white max-w-[600px] w-full rounded-lg p-12 relative">
        <h2 className="font-bold border-b-1 border-[#F1F1F2] text-[#3A3A3A] text-xl mb-10 pb-4">Editar Carteira</h2>

        {toast && (
          <div className="bg-white rounded-lg z-40 border absolute w-full left-0 top-0 h-full flex items-center justify-center flex-col gap-2">
            <IoMdCheckmarkCircleOutline size={50} className="text-green-600 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-600 font-weight">
              Concluído
            </h3>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" name="nome" value={formData.nome} onChange={handleChangeInput} label="Nome" placeholder="Nome" />
          <Input type="text" name="sobrenome" value={formData.sobrenome} onChange={handleChangeInput} label="Sobrenome" placeholder="Sobrenome" />
          <Input type="email" name="email" value={formData.email} onChange={handleChangeInput} label="Email" placeholder="Email" />

          <div className="flex gap-6 items-center">
            <Input type="number" name="valor_btc" value={formData.valor_btc} onChange={handleChangeInput} label="Quantidade BTC" placeholder="0.00000000" />
            <h2 className="font-bold text-xl text-[#3A3A3A] max-w-[300px] w-full">BTC {qtd !== undefined ? qtd.toFixed(6) : 0}</h2>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" onClick={() => openEditModal(false)} className={`  text-[#007BFF] font-bold text-base cursor-pointer hover:text-[#0C9BF2]`} >
              Cancelar
            </Button>

            {btnSubmit
              ?
              <Button type="submit" disabled className="bg-[#3588e1]  flex items-center text-white py-2 px-6 rounded-sm" >
                <AiOutlineLoading3Quarters className="mr-3 size-5 animate-spin ..." />
                Enviando
              </Button>
              :
              <Button type="submit" className="bg-[#007BFF] text-white py-2 px-6 rounded-sm cursor-pointer hover:bg-[#0C9BF2]" >
                Adicionar
              </Button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}