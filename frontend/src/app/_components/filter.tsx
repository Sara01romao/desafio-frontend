import { SetStateAction, useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { IoMdSearch } from "react-icons/io";
import { walletTypes } from "../page";
import { searchWallet } from "../api/wallets/routes";

type SearchProps = {
  setSearch: (value: walletTypes[]) => void;
  setResponse: (value: SetStateAction<boolean>) => void
}

export default function Filter({ setSearch, setResponse }: SearchProps) {
  const [isError, setError] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
  });

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    noSearch();
  };

  function noSearch() {
    const emptySearch = Object.values(formData).every(value => value === "");
    if (!emptySearch) {
      setResponse(true);
      setError(false)
      setSearch([]);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const emptySearch = Object.values(formData).every(value => value === "");

    if (emptySearch) {
      setResponse(true);
      setSearch([]);
      return
    }

    const data = await searchWallet(formData);
    if (data.length === 0) {
      setError(true);
    } else {
      setError(false);
      setSearch(data);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 bg-white p-4 mt-10 rounded-md shadow-xl">
        <div className="flex w-full flex-col  lg:flex-row gap-4">
          <Input type="text" name="nome" onChange={handleChangeInput} label="Nome" placeholder="Nome" />
          <Input type="text" name="sobrenome" onChange={handleChangeInput} label="Sobrenome" placeholder="Sobrenome" />
          <Input type="email" name="email" onChange={handleChangeInput} label="Email" placeholder="Email" />
        </div>
        <Button
          type="submit"
          className="flex items-center justify-center lg:justify-start gap-2 border-2 border-solid border-[#007BFF] px-4 py-2 font-w text-[#007BFF] rounded-sm font-medium cursor-pointer hover:text-[#0C9BF2] hover:border-[#0C9BF2]">
          <IoMdSearch />
          Buscar
        </Button>
      </form>
      {isError && (<p className="text-red-500/80 pl-4">Resultado não encontrado</p>)}
    </div>
  )
}