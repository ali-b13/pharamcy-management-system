"use client"
import {navBarLabelsMobile} from '@/labels/label'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logo from '@/public/assests/logo.jpeg'
import PrimaryButton from '../buttons/PrimaryButton';
import { BiLogOut } from 'react-icons/bi';

const MovileView = () => {
  const [isOpen, setIsOpen] = useState(false);
     const pathname= usePathname()
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-4  ">
        <div className="text-3xl cursor-pointer" onClick={toggleNavbar}>
          
        <span className='text-white'>&#9776;</span>

        </div>
        <Image src={logo} alt="Logo" className="w-10 h-10  rounded-lg" />
      </div>

      <div
        className={`fixed top-0 right-full w-64 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-full":"translate-x-0"
        }`}
      >
        <ul className="w-full flex flex-col items-center p-4 space-y-4 overflow-y-auto h-full">
            <li className='text-4xl absolute right-0 top-0  text-neutral-400 '><button onClick={toggleNavbar}>&times;</button></li>
          <li className='border-b-2 h-1 mb-2 w-full'></li>
          {
            navBarLabelsMobile.map((item)=>{
                return <li className='w-full' key={item.label}>
                <Link href={item.href} onClick={toggleNavbar} className={`${pathname==item.href?"bg-blue-200":""} block p-2 text-lg  hover:bg-neutral-200/70 text-center`}>
                  {item.label}
                </Link>
              </li>
            })
          }
          <hr className=' w-full border-t-2 border-neutral-200'/>
        <PrimaryButton icon={BiLogOut} label='تسجيل الخروج' className='bg-blue-600 rounded-lg text-white text-center   hover:bg-blue-800 p-2 '/>
        </ul>
      </div>
    
    </>
  );
}

export default MovileView