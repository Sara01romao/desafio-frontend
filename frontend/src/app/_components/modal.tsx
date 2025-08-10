import { SetStateAction } from "react";
import { Button } from "./button";
import { Input } from "./input";

type ModalProps = {
  setActiveModal: (value: SetStateAction<boolean>) => void
}

export function Modal({ setActiveModal }: ModalProps) {
  return (
    <div className="bg-gray-950/70 fixed top-0 left-0 h-full max-w-[100%] w-full flex justify-center items-center p-2">
      <div className="bg-white max-w-[600px] w-full rounded-lg p-12">
        <h2 className="font-bold border-b-1 border-[#F1F1F2] text-[#3A3A3A] text-xl mb-10 pb-4">Adicionar Carteira</h2>

        <form action="" className="flex flex-col gap-4">
          <Input type="text" name="name" label="Nome" placeholder="Nome" />
          <Input type="text" name="sobrenome" label="Sobrenome" placeholder="Sobrenome" />
          <Input type="email" name="email" label="Email" placeholder="Email" />
          <div className="flex gap-6 items-center">
            <Input type="text" name="valueBuy" label="Valor de compra" placeholder="Valor de compra" />
            <h2 className="font-bold text-lg text-[#3A3A3A]">BTC 0.12345</h2>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" onClick={() => { setActiveModal(false) }} className="text-[#007BFF] font-bold text-base cursor-pointer hover:text-[#0C9BF2]" >
              Cancelar
            </Button>

            <Button type="button" className="bg-[#007BFF] text-white py-2 px-4 rounded-sm cursor-pointer hover:bg-[#0C9BF2]" >
              Adicionar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}