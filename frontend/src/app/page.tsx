'use client'
import { useState } from "react";
import { Button } from "./_components/button";
import { Modal } from "./_components/modal";
import { Input } from "./_components/input";
import { IoMdSearch } from "react-icons/io";

export default function Home() {
  const [activeModal, setActiveModal] = useState(false);

  return (
    <div className="max-w-[1220px] w-full m-auto mt-20 px-4">
      <div className=" flex items-center justify-between">
        <h1 className="font-bold text-2xl text-[#3A3A3A]">BTC Carteiras</h1>
        <Button
          onClick={() => { setActiveModal(true) }}
          className="bg-[#007BFF] px-4 py-2 text-white rounded-sm font-medium cursor-pointer hover:bg-[#0C9BF2]">
          Adicionar Carteira
        </Button>
      </div>


      <form action="" className="flex flex-col lg:flex-row gap-4 bg-white p-4 mt-10 rounded-md shadow-xl">
        <div className="flex w-full flex-col  lg:flex-row gap-4">
          <Input type="text" name="name" label="Nome" placeholder="Nome" />
          <Input type="text" name="sobrenome" label="Sobrenome" placeholder="Sobrenome" />
          <Input type="email" name="email" label="Email" placeholder="Email" />
        </div>
        <Button
          onClick={() => alert("teste")}
          type="submit"
          className="flex items-center justify-center lg:justify-start gap-2 border-2 border-solid border-[#007BFF] px-4 py-2 font-w text-[#007BFF] rounded-sm font-medium cursor-pointer hover:text-[#0C9BF2] hover:border-[#0C9BF2]">
          <IoMdSearch />  
          Buscar
        </Button>
      </form>

      {activeModal && (
        <Modal setActiveModal={setActiveModal} />
      )}
    </div>
  );
}