'use client'
import { SetStateAction, useState } from "react";
import { Button } from "./button"
import { deleteWallet } from "../api/wallets/routes";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuTrash } from "react-icons/lu";

type deleteModalProps = {
  openDeleteModal: (value: SetStateAction<boolean>) => void;
  setDelete: (value: SetStateAction<boolean>) => void;
  id: string;
}

export function DeleteModal({ openDeleteModal, setDelete, id }: deleteModalProps) {
  const [toast, setToast] = useState(false);

  async function handleDelete(id: string) {
    if (id) {
      const response = await deleteWallet(id);
      if (response) {
        setToast(true);
        setDelete(true);
        setTimeout(() => {
          openDeleteModal(false);
        }, 1000);
      }
    }
  }

  return (
    <div className="bg-gray-950/70 fixed top-0 left-0 h-full max-w-[100%] z-50 w-full flex justify-center items-center p-2">
      <div className="bg-white flex items-center flex-col max-w-[600px] w-full rounded-lg p-12 relative">
        <div className="border-3 border-[#E22849] p-4 w-fit rounded-full flex items-center justify-center">
          <LuTrash size={50} className="text-[#E22849]" />
        </div>
        <h2 className="font-bold text-[#3A3A3A] text-xl mt-8">Excluir Carteira</h2>
        <p>Tem certeza que deseja excluir essa Carteira?</p>
        <p>Esta ação não poderá ser desfeita. </p>

        <div className=" max-w-[350px] w-full flex justify-end flex-col gap-4 mt-4">
          <Button type="button" onClick={() => handleDelete(id)} className="bg-[#E22849] text-white py-2 px-6 rounded-sm cursor-pointer hover:shadow-xl/50 shadow-red-500/50 transition duration-700 ease-in-out " >
            Excluir
          </Button>
          <Button type="button" onClick={() => openDeleteModal(false)} className={`  text-[#007BFF] font-bold text-base cursor-pointer hover:text-[#0C9BF2]`} >
            Cancelar
          </Button>
        </div>

        {toast && (
          <div className="bg-white rounded-lg z-40 border absolute w-full left-0 top-0 h-full flex items-center justify-center flex-col gap-2">
            <IoMdCheckmarkCircleOutline size={50} className="text-green-600 animate-pulse" />
            <h3 className="text-xl font-bold text-gray-600 font-weight">
              Concluído
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}