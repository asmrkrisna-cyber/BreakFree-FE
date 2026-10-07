// src/app/page.tsx
import LoginForm from '@/components/LoginForm';
import Image from 'next/image'; // Impor komponen Image

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0E0E] px-4">
      <div className="max-w-md w-full bg-[#1A1818] border border-[#2A2626] rounded-2xl shadow-2xl p-8">
        
        {/* === BAGIAN LOGO === */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-[#1A1818] p-3 border border-[#2A2626] rounded-xl mb-3">
            <Image 
              src="/logo.png"       // Path ke file kamu di folder public
              alt="Breakcoffee Logo" 
              width={48}            // Tentukan lebar (disesuaikan)
              height={48}           // Tentukan tinggi (disesuaikan)
              priority             // Biar load logo duluan
              className="h-12 w-auto" // Styling tambahan pakai Tailwind (tinggi 48px, lebar otomatis)
            />
          </div>
          
          <h1 className="text-2xl font-bold text-white tracking-wide">Breakcoffee POS</h1>
          <p className="text-sm text-zinc-400 mt-1">Masuk untuk kelola pesanan & shift kasir</p>
        </div>
        {/* ===================== */}

        <LoginForm />
      </div>
    </div>
  );
}