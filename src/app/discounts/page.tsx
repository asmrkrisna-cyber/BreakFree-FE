'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export interface DiscountItem {
  id: string;
  name: string;
  code: string;
  type: 'percentage' | 'fixed'; // Diskon persentase (%) atau potongan nominal (Rp)
  value: number;
  isActive: boolean;
}

export default function DiscountManagementPage() {
  const [discounts, setDiscounts] = useState<DiscountItem[]>([
    { id: '1', name: 'Promo Soft Opening', code: 'SOFTOPENING', type: 'percentage', value: 10, isActive: true },
    { id: '2', name: 'Potongan Hemat Kasir', code: 'HEMAT10K', type: 'fixed', value: 10000, isActive: true },
  ]);

  // Form Tambah
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('');

  // Form Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editType, setEditType] = useState<'percentage' | 'fixed'>('percentage');
  const [editValue, setEditValue] = useState('');

  // Tambah Diskon
  const handleAddDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !value) return;

    const newDiscount: DiscountItem = {
      id: Date.now().toString(),
      name,
      code: code.toUpperCase().trim(),
      type,
      value: Number(value),
      isActive: true,
    };

    setDiscounts([...discounts, newDiscount]);
    setName('');
    setCode('');
    setValue('');
  };

  // Mulai Edit
  const handleStartEdit = (item: DiscountItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditCode(item.code);
    setEditType(item.type);
    setEditValue(item.value.toString());
  };

  // Simpan Edit
  const handleSaveEdit = (id: string) => {
    if (!editName || !editCode || !editValue) return;

    setDiscounts(
      discounts.map((item) =>
        item.id === id
          ? {
              ...item,
              name: editName,
              code: editCode.toUpperCase().trim(),
              type: editType,
              value: Number(editValue),
            }
          : item
      )
    );
    setEditingId(null);
  };

  // Hapus Diskon
  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus diskon ini?')) {
      setDiscounts(discounts.filter((item) => item.id !== id));
    }
  };

  // Toggle Status Aktif
  const handleToggleActive = (id: string) => {
    setDiscounts(
      discounts.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col">
      <Sidebar />

      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Kelola Diskon & Promo</h1>
          <p className="text-[11px] text-[#7B6E65]">Atur skema diskon persentase (%) atau potongan harga (Rp)</p>
        </div>
        <span className="px-3 py-1 bg-[#F5F2EC] text-[#7B6E65] rounded-full text-xs font-semibold border border-[#EBE6DF]">
          Total Diskon: {discounts.length}
        </span>
      </header>

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* FORM TAMBAH DISKON */}
        <form onSubmit={handleAddDiscount} className="bg-white border border-[#EBE6DF] p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <h2 className="font-bold text-sm text-[#2C221E]">🏷️ Tambah Diskon Baru</h2>
            <span className="text-xs text-[#7B6E65]">Tentukan tipe dan nominal diskon</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">Nama Diskon</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Diskon Pelajar"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">Kode Promo</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Contoh: PELAJAR10"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E] uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">Jenis Diskon</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'percentage' | 'fixed')}
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E]"
              >
                <option value="percentage">Persentase (%)</option>
                <option value="fixed">Nominal Potongan (Rp)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">
                {type === 'percentage' ? 'Nilai Persen (%)' : 'Nilai Potongan (Rp)'}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={type === 'percentage' ? '10' : '5000'}
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              Simpan Diskon
            </button>
          </div>
        </form>

        {/* DAFTAR DISKON */}
        <div className="bg-white border border-[#EBE6DF] p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <h2 className="font-bold text-sm text-[#2C221E]">📋 Daftar Diskon Aktif</h2>
            <span className="text-xs text-[#7B6E65]">Terhubung ke Transaksi POS</span>
          </div>

          <div className="space-y-3">
            {discounts.map((item) => {
              const isEditing = editingId === item.id;

              if (isEditing) {
                return (
                  <div key={item.id} className="p-4 border-2 border-[#6E5545] bg-[#FDFBF7] rounded-xl space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Nama</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Kode</label>
                        <input
                          type="text"
                          value={editCode}
                          onChange={(e) => setEditCode(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Jenis</label>
                        <select
                          value={editType}
                          onChange={(e) => setEditType(e.target.value as 'percentage' | 'fixed')}
                          className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs"
                        >
                          <option value="percentage">Persentase (%)</option>
                          <option value="fixed">Nominal Potongan (Rp)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Nilai</label>
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 bg-white border border-[#EBE6DF] text-[#7B6E65] hover:bg-gray-100 rounded-lg text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item.id)}
                        className="px-3 py-1.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-lg text-xs font-semibold"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#EBE6DF] bg-[#FDFBF7] rounded-xl hover:bg-[#FAF7F2] transition-colors gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xs text-[#2C221E]">{item.name}</p>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#EBE6DF] text-[#2C221E] rounded-md">
                        {item.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7B6E65]">
                      Potongan:{' '}
                      <span className="font-bold text-[#6E5545]">
                        {item.type === 'percentage' ? `${item.value}%` : `Rp ${item.value.toLocaleString('id-ID')}`}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        item.isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-500 border-gray-300'
                      }`}
                    >
                      {item.isActive ? '• Aktif' : '• Nonaktif'}
                    </button>

                    <div className="flex items-center gap-2 border-l border-[#EBE6DF] pl-4">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 bg-white border border-[#EBE6DF] hover:border-[#6E5545] text-[#2C221E] rounded-lg text-xs font-medium cursor-pointer"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium cursor-pointer"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}