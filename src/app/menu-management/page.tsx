'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
}

export default function MenuManagementPage() {
  const [menuList, setMenuList] = useState<MenuItem[]>([
    { id: '1', name: 'Espresso', category: 'Espresso Based', price: 18000, isAvailable: true },
    { id: '2', name: 'Americano', category: 'Espresso Based', price: 22000, isAvailable: true },
    { id: '3', name: 'Croissant Cokelat', category: 'Makanan', price: 25000, isAvailable: true },
  ]);

  // Form Tambah
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Espresso Based');
  const [price, setPrice] = useState('');

  // Form Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // Tambah Menu Baru
  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      category,
      price: Number(price),
      isAvailable: true,
    };

    setMenuList([...menuList, newItem]);
    setName('');
    setPrice('');
  };

  // Mulai Edit
  const handleStartEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditPrice(item.price.toString());
  };

  // Batal Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCategory('');
    setEditPrice('');
  };

  // Simpan Hasil Edit
  const handleSaveEdit = (id: string) => {
    if (!editName || !editPrice) return;

    setMenuList(
      menuList.map((item) =>
        item.id === id
          ? { ...item, name: editName, category: editCategory, price: Number(editPrice) }
          : item
      )
    );
    handleCancelEdit();
  };

  // Hapus Menu
  const handleDeleteMenu = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      setMenuList(menuList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col">
      {/* SIDEBAR OVERLAY DAN TOMBOL GARIS TIGA */}
      <Sidebar />

      {/* HEADER ATAS */}
      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Kelola Menu & Harga</h1>
          <p className="text-[11px] text-[#7B6E65]">Tambah, edit, dan hapus menu serta penetapan harga jual</p>
        </div>

        <span className="px-3 py-1 bg-[#F5F2EC] text-[#7B6E65] rounded-full text-xs font-semibold border border-[#EBE6DF]">
          Total Menu: {menuList.length}
        </span>
      </header>

      {/* CONTENT */}
      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* FORM TAMBAH MENU BARU */}
        <form onSubmit={handleAddMenu} className="bg-white border border-[#EBE6DF] p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <h2 className="font-bold text-sm text-[#2C221E]">➕ Tambah Menu Baru</h2>
            <span className="text-xs text-[#7B6E65]">Isi detail produk di bawah</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">Nama Menu</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Matcha Latte"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E]"
              >
                <option value="Espresso Based">Espresso Based</option>
                <option value="Coklat & Herbal">Coklat & Herbal</option>
                <option value="Teh & Buah">Teh & Buah</option>
                <option value="Signature">Signature</option>
                <option value="Makanan">Makanan</option>
                <option value="Camilan Favorit">Camilan Favorit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7B6E65] mb-1">Harga (Rp)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25000"
                className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs focus:outline-none focus:border-[#6E5545] text-[#2C221E]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              Simpan Menu Baru
            </button>
          </div>
        </form>

        {/* DAFTAR MENU AKTIF */}
        <div className="bg-white border border-[#EBE6DF] p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <h2 className="font-bold text-sm text-[#2C221E]">📋 Daftar Menu Aktif</h2>
            <span className="text-xs text-[#7B6E65]">Terhubung dengan POS</span>
          </div>

          <div className="space-y-3">
            {menuList.length === 0 ? (
              <p className="text-center py-8 text-xs text-[#7B6E65]">Belum ada menu. Silakan tambah menu baru di atas.</p>
            ) : (
              menuList.map((item) => {
                const isEditing = editingId === item.id;

                if (isEditing) {
                  return (
                    <div
                      key={item.id}
                      className="p-4 border-2 border-[#6E5545] bg-[#FDFBF7] rounded-xl space-y-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Nama Menu</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Kategori</label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                          >
                            <option value="Espresso Based">Espresso Based</option>
                            <option value="Coklat & Herbal">Coklat & Herbal</option>
                            <option value="Teh & Buah">Teh & Buah</option>
                            <option value="Signature">Signature</option>
                            <option value="Makanan">Makanan</option>
                            <option value="Camilan Favorit">Camilan Favorit</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">Harga (Rp)</label>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 bg-white border border-[#EBE6DF] text-[#7B6E65] hover:bg-gray-100 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(item.id)}
                          className="px-3 py-1.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          Simpan Perubahan
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
                      <p className="font-bold text-xs text-[#2C221E]">{item.name}</p>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-white text-[#6E5545] rounded-md border border-[#EBE6DF]">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-xs text-[#2C221E]">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                        <span className="text-[10px] text-emerald-600 font-semibold">Tersedia</span>
                      </div>

                      {/* TOMBOL EDIT & HAPUS */}
                      <div className="flex items-center gap-2 border-l border-[#EBE6DF] pl-4">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 bg-white border border-[#EBE6DF] hover:border-[#6E5545] text-[#2C221E] rounded-lg text-xs font-medium transition-colors"
                          title="Edit Menu"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(item.id)}
                          className="p-1.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-colors"
                          title="Hapus Menu"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}