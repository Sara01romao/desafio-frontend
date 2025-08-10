import Image from 'next/image';
import logo from '../../../public/logo-oliveira-trust.png';
import Link from 'next/link';
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export function Header() {
  return (
    <header className='bg-white p-4'>
      <nav className='max-w-[1200px] w-full m-auto flex items-center justify-between'>
        <Image src={logo} alt="Logo Oliveira Trust" />

        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <FaUserCircle size={35} />
            <p className='text-[#3A3A3A] text-base font-semibold'>Otávio Oliveira</p>
          </div>

          <Link href="#" className='p-1 group hover:bg-[#F5F6F8] transition duration-700 ease-in-out rounded-full p-2'>
            <FiLogOut size={20} className='text-[#767676]  ' />
          </Link>
        </div>
      </nav>
    </header>
  )
}