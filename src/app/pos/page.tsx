'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface CartItem extends MenuItem {
  cartItemId: string;
  quantity: number;
  note?: string;
}

// Interface untuk Diskon Tersimpan (Preset)
interface SavedDiscount {
  id: string;
  name: string;
  type: 'percent' | 'fixed';
  value: number;
}

interface TransactionReceipt {
  id: string;
  date: string;
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  subtotal: number;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  discountAmount: number;
  discountName?: string;
  tax: number;
  total: number;
  paymentMethod: 'Cash' | 'QRIS' | 'ShopeeFood';
  cashGiven?: number;
  change?: number;
  isReprint?: boolean;
}

// Data Dummy Diskon Tersimpan (Nanti bisa di-fetch dari database/backend)
const SAVED_DISCOUNTS: SavedDiscount[] = [
  { id: 'disc-ktm', name: 'Diskon KTM (10%)', type: 'percent', value: 10 },
  { id: 'disc-jumat', name: 'Promo Jumat Berkah (Rp 5.000)', type: 'fixed', value: 5000 },
  { id: 'disc-vip', name: 'Member VIP (15%)', type: 'percent', value: 15 },
  { id: 'disc-voucher', name: 'Voucher Pelanggan (Rp 2.000)', type: 'fixed', value: 2000 },
];

// Menu Dasar
const BASE_MENU: MenuItem[] = [
  // Espresso Based
  { id: 'eb-1', name: 'Ice Kopi Susu', category: 'Espresso Based', price: 18000 },
  { id: 'eb-2', name: 'Breakfree Aren Latte', category: 'Espresso Based', price: 22000 },
  { id: 'eb-3', name: 'Caramel Macchiato', category: 'Espresso Based', price: 24000 },
  { id: 'eb-4', name: 'Americano', category: 'Espresso Based', price: 18000 },
  // Hot Coklat
  { id: 'hc-1', name: 'Hot Choco Ori', category: 'Hot Coklat', price: 15000 },
  { id: 'hc-2', name: 'Choco Milk', category: 'Hot Coklat', price: 18000 },
  { id: 'hc-3', name: 'Choco Coffee', category: 'Hot Coklat', price: 20000 },
  // Seneng Teh
  { id: 'st-1', name: 'Seneng Teh Ori', category: 'Seneng Teh', price: 8000 },
  { id: 'st-2', name: 'Leci Tea', category: 'Seneng Teh', price: 12000 },
  { id: 'st-3', name: 'Lemon Tea', category: 'Seneng Teh', price: 12000 },
  { id: 'st-4', name: 'Milk Tea', category: 'Seneng Teh', price: 15000 },
  // Signature
  { id: 'sg-1', name: 'Signature Ori', category: 'Signature', price: 22000 },
  { id: 'sg-2', name: 'Signature Coklat', category: 'Signature', price: 24000 },
  { id: 'sg-3', name: 'Signature Taro', category: 'Signature', price: 24000 },
  { id: 'sg-4', name: 'Signature Matcha', category: 'Signature', price: 25000 },
  { id: 'sg-5', name: 'Signature Red Velvet', category: 'Signature', price: 25000 },
  { id: 'sg-6', name: 'Signature Moca', category: 'Signature', price: 25000 },
  // Herbal
  { id: 'hr-1', name: 'Wedang Jahe', category: 'Herbal', price: 12000 },
  { id: 'hr-2', name: 'Susu Jahe', category: 'Herbal', price: 15000 },
  { id: 'hr-3', name: 'Wedang Uwuh', category: 'Herbal', price: 12000 },
  { id: 'hr-4', name: 'Bramasta', category: 'Herbal', price: 15000 },
  // Hot Coffe
  { id: 'hcf-1', name: 'Kopi Susu', category: 'Hot Coffe', price: 15000 },
  { id: 'hcf-2', name: 'Kopi Hitam', category: 'Hot Coffe', price: 10000 },
  { id: 'hcf-3', name: 'Kopi Ijo', category: 'Hot Coffe', price: 12000 },
  { id: 'hcf-4', name: 'Kopi Ijo Susu', category: 'Hot Coffe', price: 16000 },
  { id: 'hcf-5', name: 'Kopi Tulup', category: 'Hot Coffe', price: 12000 },
  { id: 'hcf-6', name: 'Kopi Tulup Susu', category: 'Hot Coffe', price: 16000 },
  // Ice Cube
  { id: 'ic-1', name: 'Cube Ori', category: 'Ice Cube', price: 20000 },
  { id: 'ic-2', name: 'Cube Moca', category: 'Ice Cube', price: 22000 },
  { id: 'ic-3', name: 'Cube Tiramisu', category: 'Ice Cube', price: 22000 },
  // Indomie
  { id: 'indo-1', name: 'Indomie Goreng', category: 'Indomie', price: 12000 },
  { id: 'indo-2', name: 'Indomie Nyemek', category: 'Indomie', price: 14000 },
  // Nasi
  { id: 'ns-1', name: 'Nasi Telur Barendo', category: 'Nasi', price: 18000 },
  { id: 'ns-2', name: 'Nasi Goreng', category: 'Nasi', price: 20000 },
  { id: 'ns-3', name: 'Nasi Ayam Crispy', category: 'Nasi', price: 25000 },
  // Paket Hemat
  { id: 'ph-1', name: 'Nasi Ayam Paket', category: 'Paket Hemat', price: 22000 },
  { id: 'ph-2', name: 'Nasi Telur Paket', category: 'Paket Hemat', price: 15000 },
  { id: 'ph-3', name: 'Mie Goreng Paket', category: 'Paket Hemat', price: 15000 },
  { id: 'ph-4', name: 'Mie Nyemek Paket', category: 'Paket Hemat', price: 17000 },
  // Snack
  { id: 'snk-1', name: 'Mix Platter', category: 'Snack', price: 25000 },
  { id: 'snk-2', name: 'Mini Pau', category: 'Snack', price: 18000 },
  { id: 'snk-3', name: 'Bakso Tahu', category: 'Snack', price: 18000 },
  { id: 'snk-4', name: 'Gyoza', category: 'Snack', price: 22000 },
  { id: 'snk-5', name: 'Cireng', category: 'Snack', price: 15000 },
  // Adds Ons
  { id: 'ao-1', name: 'Nasi', category: 'Adds Ons', price: 5000 },
  { id: 'ao-2', name: 'Mineral', category: 'Adds Ons', price: 5000 },
  { id: 'ao-3', name: 'Telur', category: 'Adds Ons', price: 5000 },
];

// Generate Menu ShopeeFood
const SHOPEEFOOD_MENU: MenuItem[] = BASE_MENU.map((item) => ({
  id: `sf-${item.id}`,
  name: `SF - ${item.name}`,
  category: 'ShopeeFood',
  price: item.price,
}));

const ALL_MENU = [...BASE_MENU, ...SHOPEEFOOD_MENU];

const CATEGORIES = [
  'Semua',
  'Espresso Based',
  'Hot Coklat',
  'Seneng Teh',
  'Signature',
  'Herbal',
  'Hot Coffe',
  'Ice Cube',
  'Indomie',
  'Nasi',
  'Paket Hemat',
  'Snack',
  'Adds Ons',
  'ShopeeFood',
];

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [cart, setCart] = useState<CartItem[]>([]);

  // ==========================================
  // STATE SISTEM DISKON DUAL-MODE
  // ==========================================
  const [discountMode, setDiscountMode] = useState<'preset' | 'custom'>('custom');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');
  const [discountInput, setDiscountInput] = useState<string>('');

  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'QRIS' | 'ShopeeFood'>('Cash');
  const [cashGiven, setCashGiven] = useState<string>('');
  const [completedReceipt, setCompletedReceipt] = useState<TransactionReceipt | null>(null);

  // Cek apakah keranjang berisi menu ShopeeFood
  const isShopeeFoodCart = cart.some((item) => item.category === 'ShopeeFood');

  const filteredMenu =
    selectedCategory === 'Semua'
      ? ALL_MENU
      : ALL_MENU.filter((item) => item.category === selectedCategory);

  const addToCart = (menu: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === menu.id && !item.note);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === existing.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...menu,
          cartItemId: `${menu.id}-${Date.now()}`,
          quantity: 1,
          note: '',
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const updateNote = (cartItemId: string, note: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, note } : item
      )
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ==========================================
  // KALKULASI DISKON (PRESET VS CUSTOM)
  // ==========================================
  let discountAmount = 0;
  let activeDiscountType: 'percent' | 'fixed' = discountType;
  let activeDiscountVal = 0;
  let activeDiscountName = '';

  if (subtotal > 0) {
    if (discountMode === 'preset') {
      const selectedPreset = SAVED_DISCOUNTS.find((d) => d.id === selectedPresetId);
      if (selectedPreset) {
        activeDiscountType = selectedPreset.type;
        activeDiscountVal = selectedPreset.value;
        activeDiscountName = selectedPreset.name;

        if (selectedPreset.type === 'percent') {
          discountAmount = Math.round((subtotal * Math.min(selectedPreset.value, 100)) / 100);
        } else {
          discountAmount = Math.min(subtotal, selectedPreset.value);
        }
      }
    } else {
      const numVal = Number(discountInput) || 0;
      activeDiscountType = discountType;
      activeDiscountVal = numVal;

      if (numVal > 0) {
        if (discountType === 'percent') {
          discountAmount = Math.round((subtotal * Math.min(numVal, 100)) / 100);
        } else {
          discountAmount = Math.min(subtotal, numVal);
        }
      }
    }
  }

  const totalAfterDiscount = Math.max(0, subtotal - discountAmount);
  // Pajak: Jika ShopeeFood = Rp 0, jika reguler = 10%
  const tax = isShopeeFoodCart ? 0 : Math.round(totalAfterDiscount * 0.1);
  const total = totalAfterDiscount + tax;

  const numericCash = Number(cashGiven) || 0;
  const changeAmount = numericCash - total;

  const handleStartProcess = () => {
    if (isShopeeFoodCart) {
      handleProcessPayment('ShopeeFood');
    } else {
      setPaymentMethod('Cash');
      setIsPaymentOpen(true);
    }
  };

  const handleProcessPayment = (methodOverride?: 'Cash' | 'QRIS' | 'ShopeeFood') => {
    const finalMethod = methodOverride || paymentMethod;

    const receiptData: TransactionReceipt = {
      id: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('id-ID'),
      customerName:
        finalMethod === 'ShopeeFood'
          ? customerName || 'Driver ShopeeFood'
          : customerName || 'Tamu / Umum',
      tableNumber: finalMethod === 'ShopeeFood' ? 'Shopee' : tableNumber || '-',
      items: [...cart],
      subtotal,
      discountType: activeDiscountType,
      discountValue: activeDiscountVal,
      discountAmount,
      discountName: activeDiscountName,
      tax,
      total,
      paymentMethod: finalMethod,
      cashGiven: finalMethod === 'Cash' ? numericCash : undefined,
      change: finalMethod === 'Cash' ? changeAmount : undefined,
      isReprint: false,
    };

    setCompletedReceipt(receiptData);
    setIsPaymentOpen(false);
  };

  const handleReprintReceipt = () => {
    if (!completedReceipt) return;
    setCompletedReceipt({
      ...completedReceipt,
      isReprint: true,
    });
    window.print();
  };

  const handleResetTransaction = () => {
    setCart([]);
    setCustomerName('');
    setTableNumber('');
    setDiscountInput('');
    setSelectedPresetId('');
    setCompletedReceipt(null);
    setCashGiven('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col relative">
      <Sidebar />

      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Breakfree POS</h1>
          <p className="text-[11px] text-[#7B6E65]">Malang, Indonesia • Shift Aktif: Kasir 1</p>
        </div>
        <span className="px-3 py-1 bg-[#F5F2EC] text-[#7B6E65] rounded-full text-xs font-semibold border border-[#EBE6DF]">
          • Self-Service Mode
        </span>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* DAFTAR MENU */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2C221E] text-white'
                    : 'bg-white border border-[#EBE6DF] text-[#7B6E65] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-sm text-[#2C221E]">
                {selectedCategory}{' '}
                <span className="text-xs font-normal text-[#7B6E65]">
                  ({filteredMenu.length} menu)
                </span>
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
                    <p className="text-[10px] mt-0.5 font-semibold text-[#7B6E65]">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#EBE6DF]">
                    <span className="font-bold text-xs text-[#2C221E]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
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
          </div>
        </main>

        {/* KERANJANG PESANAN */}
        <aside className="w-full lg:w-96 bg-white border-l border-[#EBE6DF] p-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EBE6DF] pb-3">
              <h2 className="font-bold text-sm text-[#2C221E]">Keranjang Pesanan</h2>
              {isShopeeFoodCart && (
                <span className="text-[10px] font-bold bg-[#F5F2EC] text-[#6E5545] px-2.5 py-0.5 rounded-full border border-[#EBE6DF]">
                  ShopeeFood Order
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EBE6DF]">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">
                  {isShopeeFoodCart ? 'Nama Driver / Order ID' : 'Nama Pelanggan'}
                </label>
                <input
                  type="text"
                  placeholder={isShopeeFoodCart ? 'Contoh: Driver Budi' : 'Nama'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EBE6DF] rounded-lg text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#7B6E65] mb-1">
                  No. Meja
                </label>
                <input
                  type="text"
                  disabled={isShopeeFoodCart}
                  placeholder={isShopeeFoodCart ? 'Shopee' : '01'}
                  value={isShopeeFoodCart ? 'Shopee' : tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className={`w-full px-2 py-1.5 border rounded-lg text-xs text-center focus:outline-none ${
                    isShopeeFoodCart
                      ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-[#2C221E] border-[#EBE6DF] focus:border-[#6E5545]'
                  }`}
                />
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 text-xs text-[#7B6E65]">
                Belum ada menu dipilih
              </div>
            ) : (
              <div className="space-y-3 max-h-[38vh] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 border rounded-xl text-xs space-y-2 bg-[#FDFBF7] border-[#EBE6DF]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#2C221E]">{item.name}</p>
                        <p className="text-[10px] text-[#7B6E65]">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-[#EBE6DF] rounded-lg text-xs font-bold hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-bold text-xs w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-[#EBE6DF] rounded-lg text-xs font-bold hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="📝 Catatan Pesanan"
                        value={item.note || ''}
                        onChange={(e) => updateNote(item.cartItemId, e.target.value)}
                        className="w-full px-2.5 py-1 bg-white border border-[#EBE6DF] rounded-lg text-[11px] text-[#2C221E] placeholder:text-[#A89F91] focus:outline-none focus:border-[#6E5545]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#EBE6DF] space-y-3">
            {/* AREA DUAL-MODE DISKON */}
            <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#EBE6DF] space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-[#7B6E65]">
                  🏷️ Mode Diskon
                </label>

                {/* Switcher Preset vs Custom */}
                <div className="flex bg-[#F5F2EC] p-0.5 rounded-lg border border-[#EBE6DF]">
                  <button
                    type="button"
                    onClick={() => {
                      setDiscountMode('preset');
                      setDiscountInput('');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                      discountMode === 'preset'
                        ? 'bg-[#6E5545] text-white'
                        : 'text-[#7B6E65] hover:text-[#2C221E]'
                    }`}
                  >
                    Tersimpan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDiscountMode('custom');
                      setSelectedPresetId('');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                      discountMode === 'custom'
                        ? 'bg-[#6E5545] text-white'
                        : 'text-[#7B6E65] hover:text-[#2C221E]'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* MODE 1: Pilih Diskon Tersimpan */}
              {discountMode === 'preset' && (
                <select
                  value={selectedPresetId}
                  onChange={(e) => setSelectedPresetId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                >
                  <option value="">-- Pilih Diskon Tersimpan --</option>
                  {SAVED_DISCOUNTS.map((disc) => (
                    <option key={disc.id} value={disc.id}>
                      {disc.name}
                    </option>
                  ))}
                </select>
              )}

              {/* MODE 2: Custom Diskon Sekali Pakai */}
              {discountMode === 'custom' && (
                <div className="flex items-center gap-1.5">
                  <div className="flex bg-[#F5F2EC] rounded-xl p-1 border border-[#EBE6DF]">
                    <button
                      type="button"
                      onClick={() => setDiscountType('fixed')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        discountType === 'fixed'
                          ? 'bg-[#6E5545] text-white'
                          : 'text-[#7B6E65] hover:text-[#2C221E]'
                      }`}
                    >
                      Rp
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType('percent')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        discountType === 'percent'
                          ? 'bg-[#6E5545] text-white'
                          : 'text-[#7B6E65] hover:text-[#2C221E]'
                      }`}
                    >
                      %
                    </button>
                  </div>
                  <input
                    type="number"
                    placeholder={discountType === 'percent' ? 'Contoh: 10' : 'Contoh: 5000'}
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                  />
                </div>
              )}
            </div>

            {/* RINGKASAN SUB-TOTAL */}
            <div className="flex justify-between text-xs text-[#7B6E65]">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-red-600 font-bold">
                <span>
                  Diskon{' '}
                  {discountMode === 'preset'
                    ? `(${activeDiscountName})`
                    : activeDiscountType === 'percent'
                    ? `(${activeDiscountVal}%)`
                    : '(Potongan Direct)'}
                </span>
                <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-[#7B6E65]">
              <span>Pajak (10%){isShopeeFoodCart ? ' - Bebas Pajak' : ''}</span>
              <span>Rp {tax.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between text-sm font-bold text-[#2C221E] pt-2 border-t border-[#EBE6DF]">
              <span>Total Akhir</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={handleStartProcess}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-colors ${
                cart.length > 0
                  ? 'bg-[#6E5545] hover:bg-[#584336] text-white cursor-pointer'
                  : 'bg-[#EBE6DF] text-[#7B6E65] cursor-not-allowed'
              }`}
            >
              {isShopeeFoodCart ? 'Cetak Resi ShopeeFood' : 'Proses Pembayaran'}
            </button>
          </div>
        </aside>
      </div>

      {/* MODAL PEMBAYARAN (Cash / QRIS) */}
      {isPaymentOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-[#EBE6DF]">
            <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
              <h3 className="font-bold text-sm text-[#2C221E]">💳 Pilih Metode Pembayaran</h3>
              <button
                onClick={() => setIsPaymentOpen(false)}
                className="text-[#7B6E65] hover:text-[#2C221E] font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#EBE6DF] space-y-1">
              <p className="text-xs text-[#7B6E65]">Total Tagihan</p>
              <p className="text-xl font-bold text-[#6E5545]">
                Rp {total.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash')}
                className={`py-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  paymentMethod === 'Cash'
                    ? 'bg-[#6E5545] text-white border-[#6E5545]'
                    : 'bg-white text-[#7B6E65] border-[#EBE6DF] hover:bg-[#FAF7F2]'
                }`}
              >
                💵 Cash (Tunai)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('QRIS')}
                className={`py-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  paymentMethod === 'QRIS'
                    ? 'bg-[#6E5545] text-white border-[#6E5545]'
                    : 'bg-white text-[#7B6E65] border-[#EBE6DF] hover:bg-[#FAF7F2]'
                }`}
              >
                📱 QRIS (E-Wallet)
              </button>
            </div>

            {paymentMethod === 'Cash' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#7B6E65] mb-1">
                    Uang Diterima dari Pelanggan
                  </label>
                  <input
                    type="number"
                    placeholder="Contoh: 60000"
                    value={cashGiven}
                    onChange={(e) => setCashGiven(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
                  />
                </div>
                <div className="p-3 bg-[#F5F2EC] rounded-xl flex justify-between items-center text-xs">
                  <span className="font-bold text-[#7B6E65]">Uang Kembalian:</span>
                  <span
                    className={`font-bold ${
                      changeAmount >= 0 ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {changeAmount >= 0
                      ? `Rp ${changeAmount.toLocaleString('id-ID')}`
                      : 'Uang Kurang'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#FDFBF7] border border-[#EBE6DF] rounded-xl text-center space-y-3">
                <div className="w-36 h-36 bg-white mx-auto border border-[#EBE6DF] rounded-lg flex items-center justify-center shadow-xs">
                  <span className="text-xs font-bold text-[#7B6E65]">QRIS Barcode</span>
                </div>
                <p className="text-[11px] text-[#7B6E65]">
                  Minta pelanggan scan QRIS. Pastikan saldo masuk sebelum klik Selesai.
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPaymentOpen(false)}
                className="px-4 py-2.5 bg-white border border-[#EBE6DF] hover:bg-gray-100 text-[#7B6E65] rounded-xl text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={paymentMethod === 'Cash' && changeAmount < 0}
                onClick={() => handleProcessPayment()}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${
                  paymentMethod === 'Cash' && changeAmount < 0
                    ? 'bg-[#EBE6DF] text-[#7B6E65] cursor-not-allowed'
                    : 'bg-[#6E5545] hover:bg-[#584336] cursor-pointer'
                }`}
              >
                Selesai & Cetak Resi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RESI / STRUK */}
      {completedReceipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF]">
            {completedReceipt.paymentMethod === 'ShopeeFood' && (
              <div className="bg-[#F5F2EC] border border-[#EBE6DF] text-[#6E5545] text-[10px] font-bold text-center py-1.5 rounded-lg uppercase tracking-wider">
                RESI ORDER - SHOPEEFOOD
              </div>
            )}
            {completedReceipt.isReprint && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold text-center py-1 rounded-lg uppercase tracking-wider">
                ⚠️ DUPLIKAT / CHECKER DARI SYSTEM
              </div>
            )}
            <div className="text-center space-y-1 border-b border-dashed border-[#EBE6DF] pb-4">
              <h3 className="font-bold text-sm text-[#2C221E]">BREAKFREE COFFEE</h3>
              <p className="text-[10px] text-[#7B6E65]">Malang, Indonesia</p>
              <p className="text-[10px] text-[#7B6E65]">{completedReceipt.date}</p>
            </div>

            <div className="text-[11px] text-[#7B6E65] space-y-0.5 border-b border-dashed border-[#EBE6DF] pb-3">
              <p>
                <span className="font-bold text-[#2C221E]">No. Transaksi:</span>{' '}
                {completedReceipt.id}
              </p>
              <p>
                <span className="font-bold text-[#2C221E]">Pelanggan:</span>{' '}
                {completedReceipt.customerName}
              </p>
              <p>
                <span className="font-bold text-[#2C221E]">Metode Bayar:</span>{' '}
                <span className="font-bold text-[#6E5545]">
                  {completedReceipt.paymentMethod}
                </span>
              </p>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto text-xs border-b border-dashed border-[#EBE6DF] pb-3">
              {completedReceipt.items.map((item) => (
                <div key={item.cartItemId} className="space-y-0.5">
                  <div className="flex justify-between font-medium">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                  {item.note && (
                    <p className="text-[10px] text-[#7B6E65] bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#EBE6DF] font-medium italic">
                      Catatan: {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="text-xs space-y-1 text-[#7B6E65] border-b border-dashed border-[#EBE6DF] pb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {completedReceipt.subtotal.toLocaleString('id-ID')}</span>
              </div>

              {completedReceipt.discountAmount > 0 && (
                <div className="flex justify-between text-red-600 font-medium">
                  <span>
                    Diskon{' '}
                    {completedReceipt.discountName
                      ? `(${completedReceipt.discountName})`
                      : completedReceipt.discountType === 'percent'
                      ? `(${completedReceipt.discountValue}%)`
                      : '(Potongan Rp)'}
                  </span>
                  <span>- Rp {completedReceipt.discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>
                  Pajak ({completedReceipt.paymentMethod === 'ShopeeFood' ? '0%' : '10%'})
                </span>
                <span>Rp {completedReceipt.tax.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#2C221E] pt-1">
                <span>Total Omset</span>
                <span>Rp {completedReceipt.total.toLocaleString('id-ID')}</span>
              </div>

              {completedReceipt.paymentMethod === 'Cash' && (
                <>
                  <div className="flex justify-between pt-1">
                    <span>Tunai</span>
                    <span>Rp {(completedReceipt.cashGiven || 0).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Kembalian</span>
                    <span>
                      Rp {(completedReceipt.change || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleReprintReceipt}
                className="w-full py-2 bg-[#F5F2EC] hover:bg-[#EBE6DF] text-[#2C221E] rounded-xl text-xs font-bold border border-[#EBE6DF] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                🖨️ Cetak Checker / Struk Ulang
              </button>
              <button
                onClick={handleResetTransaction}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer bg-[#6E5545] hover:bg-[#584336]"
              >
                Transaksi Baru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}