'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Input Order (POS)', href: '/pos', icon: '🛒' },
    { name: 'Live Tracking Order', href: '/tracking', icon: '📡' },
    { name: 'Rekap Shift & Kas', href: '/rekap-shift', icon: '📊' },
    { name: 'Riwayat & Void Transaksi', href: '/riwayat', icon: '📜' },
    { name: 'Kelola Menu & Harga', href: '/menu-management', icon: '🍽️' },
    { name: 'Kelola Diskon', href: '/discounts', icon: '🏷️' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 z-30 p-2 bg-white border border-[#EBE6DF] rounded-xl text-[#2C221E] hover:border-[#6E5545] transition-colors shadow-xs cursor-pointer"
        aria-label="Menu Navigasi"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs transition-opacity"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-[#EBE6DF] z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#EBE6DF]">
            <div>
              <h2 className="font-bold text-lg text-[#2C221E]">Breakfree POS</h2>
              <p className="text-xs text-[#7B6E65]">Panel Navigasi Kasir</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#7B6E65] hover:text-[#2C221E] rounded-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6E5545] text-white shadow-xs'
                      : 'text-[#7B6E65] hover:bg-[#FDFBF7] hover:text-[#2C221E]'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#EBE6DF]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#2C221E]">Kasir 1 (Pagi)</p>
              <p className="text-[10px] text-[#6E5545]">Shift Aktif</p>
            </div>
            <Link
              href="/"
              className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
            >
              Keluar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}