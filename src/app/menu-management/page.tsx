'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
}

const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Ice Kopi Susu',
    category: 'Espresso Based',
    price: 18000,
    description: 'Espresso segar dengan susu pilihan dan gula aren alami.',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Breakfree Aren Latte',
    category: 'Espresso Based',
    price: 22000,
    description: 'Signature kopi susu gula aren ekstra creamy.',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Caramel Macchiato',
    category: 'Espresso Based',
    price: 24000,
    description: 'Espresso halus disiram saus karamel manis gurih.',
    isAvailable: false,
  },
  {
    id: '4',
    name: 'Hot Choco Ori',
    category: 'Hot Coklat',
    price: 15000,
    description: 'Coklat hangat pekat rasanya kaya dan menenangkan.',
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Leci Tea',
    category: 'Seneng Teh',
    price: 12000,
    description: 'Teh manis dingin rasa buah leci segar dengan topping buah.',
    isAvailable: true,
  },
];

const CATEGORIES = ['Semua', 'Espresso Based', 'Hot Coklat', 'Seneng Teh', 'Signature', 'Herbal', 'Ice Cube'];

export default function MenuManagementPage() {
  const [menuList, setMenuList] = useState<MenuItem[]>(INITIAL_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Espresso Based',
    price: '',
    description: '',
  });

  const handleToggleStatus = (id: string) => {
    setMenuList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'Espresso Based', price: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingItem) {
      setMenuList((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                description: formData.description,
              }
            : item
        )
      );
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        isAvailable: true,
      };
      setMenuList((prev) => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteMenu = (id: string) => {
    if (confirm('Yakin ingin menghapus menu ini?')) {
      setMenuList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredMenu = menuList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTAINER KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER / NAVBAR ATAS - Ditambahkan pl-14 / md:pl-16 agar teks tidak tertutup tombol navbar 3 garis */}
        <header className="p-4 md:p-6 pl-14 md:pl-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Menu</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Kelola katalog produk, harga, dan atur status <span className="font-semibold text-orange-600">Sold Out</span> secara langsung.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer w-fit"
          >
            <span>+</span> Tambah Menu Baru
          </button>
        </header>

        {/* KONTEN UTAMA */}
        <main className="p-6 md:p-8 space-y-6">
          
          {/* FILTER & PENCARIAN */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white font-bold shadow'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Cari nama menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-gray-900 rounded-xl text-xs text-gray-800 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          {/* KARTU MENU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all shadow-sm space-y-4 ${
                  item.isAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mt-1.5">{item.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {item.isAvailable ? 'Tersedia' : 'Sold Out'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {item.description || 'Tidak ada deskripsi.'}
                  </p>

                  <p className="text-sm font-bold text-gray-900 mt-3">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* TOGGLE & AKSI */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.isAvailable}
                      onChange={() => handleToggleStatus(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600 relative"></div>
                    <span className="text-[11px] font-medium text-gray-600">
                      {item.isAvailable ? 'Aktif' : 'Habis'}
                    </span>
                  </label>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(item.id)}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Tidak ada menu yang ditemukan.</p>
            </div>
          )}
        </main>
      </div>

      {/* MODAL TAMBAH / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 w-full max-w-md rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">
                {editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMenu} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Nama Menu</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Matcha Latte"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl text-xs text-gray-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl text-xs text-gray-900 outline-none"
                >
                  {CATEGORIES.filter((c) => c !== 'Semua').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="20000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl text-xs text-gray-900 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Deskripsi</label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi singkat produk..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-gray-900 rounded-xl text-xs text-gray-900 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm"
                >
                  {editingItem ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}