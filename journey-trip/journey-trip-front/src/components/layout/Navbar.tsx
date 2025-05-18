'use client';

import { Megrim } from 'next/font/google';
import { useAuthStore } from '@/store/authStore';
import { FaUser } from 'react-icons/fa';

const megrim = Megrim({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();

  const handleRedirect = (path: string) => {
    window.location.href = path;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-sm p-4 flex justify-between items-center z-50">
      <button onClick={() => handleRedirect('/')} className={`text-xl font-bold text-white ${megrim.className}`}>
        JT.
      </button>
      <div className="flex space-x-6 items-center">
        <button onClick={() => handleRedirect('/')} className="text-white hover:text-gray-300 transition-colors duration-200">
          Home
        </button>
        <button onClick={() => handleRedirect('/countries/azerbaijan')} className="text-white hover:text-gray-300 transition-colors duration-200">
          Azerbaijan
        </button>
        <button onClick={() => handleRedirect('/countries/japan')} className="text-white hover:text-gray-300 transition-colors duration-200">
          Japan
        </button>

        {!isAuthenticated ? (
          <>
            <button onClick={() => handleRedirect('/auth/login')} className="text-white hover:text-gray-300 transition-colors duration-200">
              Log in
            </button>
            <button onClick={() => handleRedirect('/auth/register')} className="text-white hover:text-gray-300 transition-colors duration-200">
              Register
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                logout();
                handleRedirect('/');
              }}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              Logout
            </button>
            <button
              onClick={() => handleRedirect('/account/user')}
              className="text-white hover:text-gray-300 transition-colors duration-200 text-xl"
              title="Profile"
            >
              <FaUser />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
