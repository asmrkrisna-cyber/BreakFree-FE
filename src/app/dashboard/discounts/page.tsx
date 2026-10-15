'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { INITIAL_DISCOUNTS, DiscountItem } from '@/data/discountData';
import DiscountCard from './components/DiscountCard';
import AddDiscountForm from './components/AddDiscountForm';

export default function DiscountPage() {
  const [discounts, setDiscounts] = useState<DiscountItem[]>(INITIAL_DISCOUNTS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleActive = (id: string) => {
    setDiscounts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  const handleAddDiscount = (formData: {
    code: string;
    name: string;
    type: 'PERCENTAGE' | 'FIXED';
    value: string;
    minPurchase: string;
  }) => {
    const newDiscount: DiscountItem = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      name: formData.name,
      type: formData.type,
      value: Number(formData.value),
      minPurchase: Number(formData.minPurchase) || 0,
      isActive: true,
    };

    setDiscounts((prev) => [newDiscount, ...prev]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setDiscounts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col relative">
      <Sidebar />

      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Manajemen Diskon & Voucher</h1>
          <p className="text-[11px] text-[#7B6E65]">Kelola kode promo, diskon persentase, atau potongan harga langsung untuk pelanggan</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <span>+</span> Buat Diskon Baru
        </button>
      </header>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discounts.map((item) => (
            <DiscountCard
              key={item.id}
              item={item}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <AddDiscountForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDiscount}
      />
    </div>
  );
}