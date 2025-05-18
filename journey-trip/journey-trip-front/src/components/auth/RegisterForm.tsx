'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation'; 

export default function RegisterForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const authenticate = useAuthStore((state) => state.authenticate);
  const router = useRouter();

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeToken = 'fake-token-123';

    gsap.to(formRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        authenticate({ nickname, email }, fakeToken);
        console.log('Registered:', { nickname, email, password });
        router.push('/');
      },
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#0d0d0d]/95 backdrop-blur-md p-10 rounded-2xl border border-[#1f1f1f] shadow-2xl w-full max-w-md relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/20 to-black/20 rounded-2xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#1f2937]/40 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-black/30 rounded-full filter blur-3xl" />

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
          Create Account
        </h2>

        <div className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="nickname" className="text-sm font-medium text-gray-300">
              Nickname
            </label>
            <Input
              id="nickname"
              type="text"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2c2c2c] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] rounded-xl py-3 px-4 transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2c2c2c] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] rounded-xl py-3 px-4 transition-all duration-200"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2c2c2c] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#3b82f6] rounded-xl py-3 px-4 pr-12 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-[#111111] hover:bg-[#1a1a1a] text-gray-100 rounded-xl py-3.5 px-4 font-medium transition-all duration-300 shadow-lg hover:shadow-[#1a1a1a]/40"
          >
            Sign Up
          </Button>
        </div>

        <div className="flex items-center justify-between mt-6 text-sm">
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 bg-[#1a1a1a] text-[#3b82f6] focus:ring-[#3b82f6]"
            />
            <label htmlFor="terms" className="ml-2 text-gray-400">
              I agree to terms
            </label>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{' '}
          <a href="#" className="text-[#3b82f6] hover:text-blue-400 font-medium transition-colors duration-200">
            Sign in
          </a>
        </div>
      </div>
    </form>
  );
}