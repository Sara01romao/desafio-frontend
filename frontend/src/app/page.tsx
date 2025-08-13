'use client'
import { useEffect, useState } from "react";
import { Button } from "./_components/button";
import { Modal } from "./_components/modal";
import { Input } from "./_components/input";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Tooltip } from "./_components/tooltip";

interface walletTypes {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  valor_carteira: number;
}

interface dataType {
  data: walletTypes[];
  first: number;
  items: number;
  last: number;
  pages: number;
  prev: number | null;
  next: number | null;
}

export default function Home() {
  const [activeModal, setActiveModal] = useState(false);
  const [dataWallet, setDataWallet] = useState<dataType>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(1);

  useEffect(() => {
    async function dataWallet() {
      const response = await fetch(`http://localhost:3004/users?_page=${page}&_per_page=10`);
      if (!response.ok) {
        throw new Error("Erro na requisição da carteira");
      }
      const data: dataType = await response.json();
      setDataWallet(data);
      setTotalPage(data.pages)
    }
    dataWallet()
  }, [page]);

  function handleButtonPage() {
    let buttonsPage = [];

    for (let i = 1; i <= totalPages; i++) {
      buttonsPage.push(
        <button
          key={i}
          onClick={() => { setPage(i) }}
          className={` ${page === i ? "bg-[#007BFF] hover:bg-[#0C9BF2] border-[#D8D8D8] text-white" : "hover:bg-[#F5F6F8]"} transition duration-700 cursor-pointer border border-[#D8D8D8] text-sm p-1 px-2 rounded text-[#3A3A3A]`}
        >
          {i}
        </button>
      );
    }

    return buttonsPage;
  }

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

      <div className="bg-white rounded-md mt-10 py-4 py-10">
        <div className="flex items-center px-8">
          <h3 className="text-md font-bold text-lg text-[#3A3A3A]">Carteiras</h3>
          <Button
            onClick={() => alert("teste")}
            type="submit"
            className="flex mr-0 ml-auto items-center justify-center lg:justify-start gap-2 border-2 border-solid border-[#007BFF] px-4 py-2 font-w text-[#007BFF] rounded-sm font-medium cursor-pointer hover:text-[#0C9BF2] hover:border-[#0C9BF2]">
            Exportar CSV
          </Button>
        </div>

        <div className="px-8 mt-10">
          <table className="table-auto w-full border-b-2 border-[#D8D8D8] ">
            <thead className="border-b-2 border-[#D8D8D8] p-4">
              <tr>
                <th className="text-[#3A3A3A] text-start pb-2">Nome</th>
                <th className="text-[#3A3A3A] text-start pb-2">Sobrenome</th>
                <th className="text-[#3A3A3A] text-start pb-2">Email</th>
                <th className="text-[#3A3A3A] text-start pb-2">Bitcoin</th>
                <th className="text-[#3A3A3A] text-start pb -2"></th>
              </tr>
            </thead>
            <tbody className="">
              {dataWallet && (
                dataWallet.data.map(wallet => (
                  <tr key={wallet.id} className="odd:bg-white even:bg-[#F5F6F8] hover:bg-[#FAFDFF]  ">
                    <td className="p-2">{wallet.nome}</td>
                    <td className="p-2">{wallet.sobrenome}</td>
                    <td className="p-2">{wallet.email}</td>
                    <td className="p-2">{wallet.valor_carteira}</td>
                    <td className="flex gap-2 p-2 justify-end">

                      <div className="relative flex flex-col group">
                        <button className="p-1 relative cursor-pointer group hover:bg-[#F5F6F8] transition duration-700 ease-in-out rounded-full p-2">
                          <MdOutlineModeEdit size={18} className='text-[#767676]' />
                        </button>
                        <Tooltip>Editar</Tooltip>
                      </div>
                     
                     <div className="relative flex flex-col group">
                      <button className="p-1 cursor-pointer group hover:bg-[#F5F6F8] transition duration-700 ease-in-out rounded-full p-2">
                        <FiTrash size={18} className='text-[#767676]' />
                        <Tooltip>Excluir</Tooltip>
                      </button>
                     </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mr-0 ml-auto border-t-1 mt-4 border-[#D8D8D8] pt-4 px-8 flex justify-end gap-1">
          <button onClick={() => setPage(dataWallet?.prev ?? 1)} className=" cursor-pointer hover:bg-[#F5F6F8] text-sm p-1 px-2 rounded text-[#3A3A3A]">
            <IoIosArrowBack />
          </button>
          {handleButtonPage()}
          <button onClick={() => setPage(dataWallet?.next ?? totalPages)} className="cursor-pointer hover:bg-[#F5F6F8] text-sm p-1 px-2 rounded text-[#3A3A3A]">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {activeModal && (
        <Modal setActiveModal={setActiveModal} />
      )}
    </div>
  );
}