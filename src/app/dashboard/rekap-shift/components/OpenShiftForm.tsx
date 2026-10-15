'use client';
import { useState } from 'react';

interface OpenShiftFormProps {
  onStartShift: (cashier: string, category: 'Opening' | 'Closing', cash: number) => void;
}

export default function OpenShiftForm({ onStartShift }: OpenShiftFormProps) {
  const [inputCashier, setInputCashier] = useState('pasha');
  const [inputCategory, setInputCategory] = useState<'Opening' | 'Closing'>('Opening');
  const [inputStartingCash, setInputStartingCash] = useState('500000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCashier || !inputStartingCash) return;
    onStartShift(inputCashier, inputCategory, Number(inputStartingCash));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EBE6DF] shadow-xs max-w-xl mx-auto space-y-4">
      <h2 className="text-sm font-bold text-[#2C221E] border-b border-[#EBE6DF] pb-3">
        🟢 Buka Shift Baru
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#7B6E65]">Kategori Shift</label>
          <select
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value as 'Opening' | 'Closing')}
            className="w-full px-3.5 py-2.5 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] font-medium outline-none focus:border-[#6E5545]"
          >
            <option value="Opening">Opening</option>
            <option value="Closing">Closing</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#7B6E65]">Nama / ID Kasir</label>
          <input
            type="text"
            required
            value={inputCashier}
            onChange={(e) => setInputCashier(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] font-medium outline-none focus:border-[#6E5545] placeholder:text-gray-400"
            placeholder="Masukkan nama kasir"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#7B6E65]">Modal Kas Awal di Laci (Rp)</label>
          <input
            type="number"
            required
            value={inputStartingCash}
            onChange={(e) => setInputStartingCash(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] font-medium outline-none focus:border-[#6E5545] placeholder:text-gray-400"
            placeholder="500000"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#2C221E] hover:bg-[#42352E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer mt-2"
        >
          Mulai Shift Sekarang
        </button>
      </form>
    </div>
  );
}