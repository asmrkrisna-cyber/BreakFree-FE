'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeShiftInfo, setActiveShiftInfo] = useState('• Shift Opening Aktif (pasha)');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedShift = localStorage.getItem('active_shift_status');
    if (savedShift) {
      setActiveShiftInfo(savedShift);
    }
  }, []);

  // Rute menu yang sudah disesuaikan dengan struktur folder /dashboard/
  const menuItems = [
    { name: 'Input Order (POS)', href: '/pos', icon: '🛒' },
    { name: 'Live Tracking Order', href: '/dashboard/tracking', icon: '📡' },
    { name: 'Rekap Shift & Kas', href: '/dashboard/rekap-shift', icon: '📊' },
    { name: 'Riwayat & Void Transaksi', href: '/dashboard/riwayat', icon: '📜' },
    { name: 'Kelola Menu & Harga', href: '/dashboard/menu-management', icon: '🍽️' },
    { name: 'Kelola Diskon', href: '/dashboard/discounts', icon: '🏷️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('active_shift_status');
    localStorage.removeItem('isLoggedIn');
    router.push('/auth/login');
  };

  return (
    <>
      {/* Tombol Hamburger Line Tiga di Kiri Atas */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 z-30 p-2 bg-white border border-[#EBE6DF] rounded-xl text-[#2C221E] hover:border-[#6E5545] transition-colors shadow-xs cursor-pointer"
        aria-label="Menu Navigasi"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay Backdrop Saat Sidebar Terbuka */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Drawer Navigation Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-[#EBE6DF] z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Sidebar */}
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

          {/* List Menu Navigasi */}
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

        {/* Footer Sidebar (Info Kasir & Logout) */}
        <div className="pt-4 border-t border-[#EBE6DF] space-y-3">
          <div className="p-2.5 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl flex items-center justify-between shadow-xs">
            <div>
              <p className="text-xs font-semibold text-[#2C221E]">Kasir Aktif</p>
              <p className="text-[10px] text-[#6E5545] truncate max-w-[170px]">{activeShiftInfo}</p>
            </div>
            <span className="text-xs bg-white p-1.5 rounded-lg border border-[#EBE6DF]">👤</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
          >
            Keluar / Ganti Shift
          </button>
        </div>
      </div>
    </>
  );
}