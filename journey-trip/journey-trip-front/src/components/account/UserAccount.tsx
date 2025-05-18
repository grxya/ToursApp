import React, { useState } from 'react';
import { User } from '@/interfaces';

const UserAccount: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tours'>('profile');
  
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent"></div>
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#222] to-transparent"></div>
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#222] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent"></div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#1a1a1a] to-black rounded-3xl opacity-60 blur-[50px] -z-10"></div>
        
        <div className="relative bg-[#0e0e0e] rounded-2xl overflow-hidden border border-[#252525] backdrop-blur-[2px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="p-8 bg-gradient-to-b from-[#111111] to-[#0a0a0a] border-b border-[#252525]">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-[#151515] rounded-full flex items-center justify-center text-3xl font-bold text-gray-300 border border-[#333] shadow-lg">
                  {user.nickname.charAt(0).toUpperCase()}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#333] animate-spin-slow opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ animationDuration: '30s' }}></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-200 tracking-tight">{user.nickname}</h1>
                <p className="text-[#777] text-sm font-mono mt-2 flex items-center">
                  <span className="w-2 h-2 bg-[#444] rounded-full mr-2 animate-pulse"></span>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="flex bg-[#0d0d0d] border-b border-[#252525]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`relative flex-1 py-4 font-medium text-sm tracking-wider transition-all duration-300 group ${
                activeTab === 'profile' 
                  ? 'text-gray-200' 
                  : 'text-[#666] hover:text-gray-300'
              }`}
            >
              <span className="relative z-10">Account</span>
              {activeTab === 'profile' && (
                <>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400"></span>
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white blur-[4px]"></span>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`relative flex-1 py-4 font-medium text-sm tracking-wider transition-all duration-300 group ${
                activeTab === 'tours' 
                  ? 'text-gray-200' 
                  : 'text-[#666] hover:text-gray-300'
              }`}
            >
              <span className="relative z-10">My tours/excursions</span>
              {activeTab === 'tours' && (
                <>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400"></span>
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white blur-[4px]"></span>
                </>
              )}
            </button>
          </div>

          <div className="p-8 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                <div className="bg-[#151515] rounded-xl p-6 border border-[#252525] shadow-inner">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-[#252525]">
                      <span className="text-[#777] text-sm font-mono tracking-wider">Nickname</span>
                      <span className="text-gray-300 font-medium text-lg">{user.nickname}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[#777] text-sm font-mono tracking-wider">Email</span>
                      <span className="text-gray-300 font-medium text-lg">{user.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#333] to-transparent relative">
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-px bg-white blur-[1px]"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#151515] rounded-xl p-8 text-center border-2 border-dashed border-[#252525] hover:border-[#333] transition-colors duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-full mb-4 border border-[#252525]">
                    <svg className="w-8 h-8 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-gray-400 font-medium mb-1">The list of tours is empty</h3>
                  <p className="text-[#666] text-sm font-mono">Once you buy a tour, it will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;