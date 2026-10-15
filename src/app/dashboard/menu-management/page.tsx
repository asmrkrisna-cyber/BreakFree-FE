'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { INITIAL_MENU, CATEGORIES, MenuItem } from '@/data/menuData';

import MenuFilterAndSearch from './components/MenuFilterAndSearch';
import MenuCard from './components/MenuCard';
import MenuFormModal from './components/MenuFormModal';
import DeleteMenuModal from './components/DeleteMenuModal';

export default function MenuManagementPage() {
  const [menuList, setMenuList] = useState<MenuItem[]>(INITIAL_MENU);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const confirmDeleteMenu = () => {
    if (deleteId) {
      setMenuList((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  const filteredMenu = menuList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
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

        <main className="p-6 md:p-8 space-y-6">
          <MenuFilterAndSearch
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMenu.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onToggleStatus={handleToggleStatus}
                onOpenEditModal={handleOpenEditModal}
                onDeleteRequest={(id) => setDeleteId(id)}
              />
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Tidak ada menu yang ditemukan.</p>
            </div>
          )}
        </main>
      </div>

      <MenuFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        categories={CATEGORIES}
        handleSaveMenu={handleSaveMenu}
      />

      {deleteId && (
        <DeleteMenuModal
          onClose={() => setDeleteId(null)}
          onConfirm={confirmDeleteMenu}
        />
      )}
    </div>
  );
}