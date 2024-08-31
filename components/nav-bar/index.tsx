"use client";
import { navBarLabels } from '@/labels/label';
import Link from 'next/link';
import MobileView from './mobileView';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/public/assests/logo.jpeg';
import OutlinedButton from '../buttons/OutlinedButton';
import { logOut } from '@/app/actions/user/action';

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState(false);

  // Close submenu after a delay when user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.user-profile')) {
        setTimeout(() => setShowSubMenu(false), 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    const res = await logOut();
    if (res.ok) {
      router.push('/auth/login');
    }
  };

  // Return null early if pathname starts with "/auth"
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <nav className="w-full bg-teal-700 shadow-lg">
      <div className="hidden lg:flex container mx-auto justify-between items-center p-4">
        <div className="flex items-center">
          <div className="flex gap-6">
            <div className="relative user-profile" onClick={() => setShowSubMenu(!showSubMenu)}>
              <FaUserCircle className="text-white text-3xl cursor-pointer ml-6" />
              {showSubMenu && (
                <div className="absolute top-10 right-0 mt-2 bg-white rounded-lg shadow-xl py-2 overflow-hidden min-w-32 z-40">
                  <Link href="/dashboard/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    الطلبات
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    الاعدادات
                  </Link>
                  <OutlinedButton onClick={handleLogOut} label="تسجيل الخروج" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" />
                </div>
              )}
            </div>
            {navBarLabels.map((item) => (
              <Link
                className={`${pathname === item.href ? "bg-white text-teal-700" : "text-white"
                  } hover:bg-white hover:text-teal-700 transition-colors duration-300 border-2 border-white rounded-lg px-4 py-2`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Image src={logo} alt="Logo" className="w-12 h-12 rounded-lg" />
      </div>
      <div className='w-full flex lg:hidden'>
        <MobileView />
      </div>
    </nav>
  );
}

export default NavBar;
