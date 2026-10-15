import { CATEGORIES, MenuItem } from './menuData';

interface MenuListProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredMenu: MenuItem[];
  addToCart: (item: MenuItem) => void;
}

export default function MenuList({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredMenu,
  addToCart,
}: MenuListProps) {
  return (
    <main className="flex-1 p-6 overflow-y-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 px-4 flex items-center justify-center rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#2C221E] text-white border-[#2C221E]'
                  : 'bg-white border-[#EBE6DF] text-[#7B6E65] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64 shrink-0">
          <input
            type="text"
            placeholder={selectedCategory === 'Semua' ? '🔍 Cari semua menu...' : `🔍 Cari di ${selectedCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 px-3.5 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] outline-none focus:border-[#6E5545] shadow-xs"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-sm text-[#2C221E]">
            {selectedCategory} <span className="text-xs font-normal text-[#7B6E65]">({filteredMenu.length} menu ditemukan)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-xs border border-[#EBE6DF] hover:border-[#6E5545] flex flex-col justify-between space-y-3 transition-colors"
            >
              <div>
                <h3 className="font-bold text-xs text-[#2C221E]">{item.name}</h3>
                <p className="text-[10px] mt-0.5 font-semibold text-[#7B6E65]">{item.category}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#EBE6DF]">
                <span className="font-bold text-xs text-[#2C221E]">Rp {item.price.toLocaleString('id-ID')}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer bg-[#F5F2EC] hover:bg-[#6E5545] hover:text-white text-[#2C221E] border-[#EBE6DF]"
                >
                  + Tambah
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#EBE6DF] text-xs text-[#7B6E65]">
            Menu tidak ditemukan di kategori ini.
          </div>
        )}
      </div>
    </main>
  );
}