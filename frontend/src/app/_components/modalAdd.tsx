'use client';
import { SetStateAction, useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { cripto_value } from "../util/cripto_value";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { postWallet } from "../api/wallets/routes";

type ModalProps = {
  setActiveModal: (value: SetStateAction<boolean>) => void;
  setItem: (value: SetStateAction<boolean>) => void;
}

export function ModalAdd({ setActiveModal, setItem }: ModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    valor_carteira: 0,
  });
  const [cotacaoBtc, setCotacaoBtc] = useState(0);
  const [btnSubmit, setBtnSubmit] = useState(false);
  const [qtd, setQtd] = useState(0);
  const [toast, setToast] = useState(false);
  const [isError, setIserror] = useState(false);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'valor_carteira') {
      handleQtdCripto(parseFloat(value));
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'valor_carteira' ? parseFloat(value) || 0 : value
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
    });
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBtnSubmit(true);

    for (const [key, value] of Object.entries(formData)) {
      if (value === 0 || value === "") {
        setBtnSubmit(false);
        setIserror(true);
        return
      }
    }
    setIserror(false);

    if (qtd) {
      formData.valor_carteira = qtd;
      const response = await postWallet(formData);

      if (response) {
        setBtnSubmit(false);
        setToast(true);
        setItem(true);
        setTimeout(() => {
          setActiveModal(false);
          setBtnSubmit(false);
        }, 1000);
      }
     
      if (!response) {
        setTimeout(() => {
          setBtnSubmit(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-gray-950/70 fixed top-0 left-0 h-full max-w-[100%] z-50 w-full flex justify-center items-center p-2">
      <div className="bg-white max-w-[600px] w-full rounded-lg p-12 relative">
        <h2 className="font-bold border-b-1 border-[#F1F1F2] text-[#3A3A3A] text-xl mb-10 pb-4">Adicionar Carteira</h2>

        {toast && (
          <div className="bg-white rounded-lg z-40 border absolute w-full left-0 top-0 h-full flex items-center justify-center flex-col gap-2">
            <IoMdCheckmarkCircleOutline size={50} className="text-green-600 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-600 font-weight">
              Concluído
            </h3>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" name="nome" onChange={handleChangeInput} label="Nome" placeholder="Nome" />
          <Input type="text" name="sobrenome" onChange={handleChangeInput} label="Sobrenome" placeholder="Sobrenome" />
          <Input type="email" autoComplete="off" name="email" onChange={handleChangeInput} label="Email" placeholder="Email" />

          <div className="flex gap-6 items-center">
            <Input type="number" name="valor_carteira" onChange={handleChangeInput} label="Quantidade BTC" placeholder="0.00000000" />
            <h2 className="font-bold text-xl text-[#3A3A3A] max-w-[300px] w-full">BTC {qtd ? qtd.toFixed(8) : 0}</h2>
          </div>
          {isError && (<p className="text-red-500">Preencha todos os campos</p>)}

          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" onClick={() => setActiveModal(false)} className={`  text-[#007BFF] font-bold text-base cursor-pointer hover:text-[#0C9BF2]`} >
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