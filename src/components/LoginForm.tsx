'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('kasir@breakcoffee.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('cashierName', 'Asep (Kasir 1)');
      
      // Langsung masuk ke halaman POS
      router.push('/pos');
    } else {
      setError('Email dan password harus diisi!');
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-3 bg-red-900/40 border border-red-700/50 text-red-200 text-xs rounded-xl text-center">
          {error}
        </div>
      )}

      {/* FORM INPUT */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
            EMAIL / ID KASIR
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kasir@breakcoffee.com"
            className="w-full px-4 py-3 bg-[#121212] border border-[#2A2A2D] focus:border-[#D97706] rounded-xl text-xs text-white outline-none transition-all placeholder-[#48484A]"
            required
          />
        </div>

        <div className="space-y-1.5 text-left">
          <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-[#121212] border border-[#2A2A2D] focus:border-[#D97706] rounded-xl text-xs text-white outline-none transition-all placeholder-[#48484A]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#E65100] hover:bg-[#D84315] text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer mt-2"
        >
          Masuk Dashboard Kasir
        </button>
      </form>
    </div>
  );
}