'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import MenuList from '@/app/pos/MenuList';
import CartPanel from '@/app/pos/CartPanel';
import PaymentModal from '@/app/pos/PaymentModal';
import ReceiptModal from '@/app/pos/ReceiptModal';
import ShiftModal from '@/app/pos/ShiftModal';
import { ALL_MENU, SAVED_DISCOUNTS, MenuItem, CartItem, TransactionReceipt, SavedDiscount } from '@/app/pos/menuData';

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // State Shift Aktif
  const [activeShiftInfo, setActiveShiftInfo] = useState<string>('• Shift Opening Aktif (pasha)');
  const [isShiftModalOpen, setIsShiftModalOpen] = useState<boolean>(false);
  const [selectedKasir, setSelectedKasir] = useState<string>('pasha');
  const [selectedShiftType, setSelectedShiftType] = useState<string>('Shift Opening Aktif');

  useEffect(() => {
    const savedShift = localStorage.getItem('active_shift_status');
    if (savedShift) {
      setActiveShiftInfo(savedShift);
    } else {
      setIsShiftModalOpen(true);
    }
  }, []);

  const handleSaveShift = () => {
    const newShiftText = `• ${selectedShiftType} (${selectedKasir})`;
    setActiveShiftInfo(newShiftText);
    localStorage.setItem('active_shift_status', newShiftText);
    setIsShiftModalOpen(false);
  };

  const [discountMode, setDiscountMode] = useState<'preset' | 'custom'>('custom');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');
  const [discountInput, setDiscountInput] = useState<string>('');
  
  const [customerName, setCustomerName] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'QRIS' | 'ShopeeFood'>('Cash');
  const [cashGiven, setCashGiven] = useState<string>('');
  const [completedReceipt, setCompletedReceipt] = useState<TransactionReceipt | null>(null);

  const isShopeeFoodCart = cart.some((item: CartItem) => item.category === 'ShopeeFood');
  
  const filteredMenu = ALL_MENU.filter((item: MenuItem) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (menu: MenuItem) => {
    setCart((prevCart: CartItem[]) => {
      const existing = prevCart.find((item: CartItem) => item.id === menu.id && !item.note);
      if (existing) {
        return prevCart.map((item: CartItem) =>
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
    setCart((prevCart: CartItem[]) =>
      prevCart
        .map((item: CartItem) => {
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
    setCart((prevCart: CartItem[]) =>
      prevCart.map((item: CartItem) =>
        item.cartItemId === cartItemId ? { ...item, note } : item
      )
    );
  };

  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  let activeDiscountType: 'percent' | 'fixed' = discountType;
  let activeDiscountVal = 0;
  let activeDiscountName = '';
  if (subtotal > 0) {
    if (discountMode === 'preset') {
      const selectedPreset = SAVED_DISCOUNTS.find((d: SavedDiscount) => d.id === selectedPresetId);
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

  const handleProcessPayment = (methodOverride?: 'Cash' | 'QRIS' | 'ShopeeFood' | React.MouseEvent) => {
    const finalMethod = typeof methodOverride === 'string' ? methodOverride : paymentMethod;
    
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
    setCompletedReceipt({ ...completedReceipt, isReprint: true });
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
    <div className="h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col overflow-hidden relative">
      <Sidebar />
      
      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs z-20 pl-20 shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">BreakFree POS</h1>
          <p className="text-[11px] text-[#7B6E65]">Malang, Indonesia • Kelola Transaksi Kasir</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsShiftModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#E6F4EA] text-[#137333] hover:bg-[#d9ede0] rounded-full text-xs font-semibold border border-[#CEEAD6] transition-colors cursor-pointer"
          >
            {activeShiftInfo} 🔄
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <MenuList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredMenu={filteredMenu}
          addToCart={addToCart}
        />

        <CartPanel
          cart={cart}
          isShopeeFoodCart={isShopeeFoodCart}
          customerName={customerName}
          setCustomerName={setCustomerName}
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
          updateQuantity={updateQuantity}
          updateNote={updateNote}
          discountMode={discountMode}
          setDiscountMode={setDiscountMode}
          selectedPresetId={selectedPresetId}
          setSelectedPresetId={setSelectedPresetId}
          discountType={discountType}
          setDiscountType={setDiscountType}
          discountInput={discountInput}
          setDiscountInput={setDiscountInput}
          subtotal={subtotal}
          discountAmount={discountAmount}
          activeDiscountName={activeDiscountName}
          activeDiscountType={activeDiscountType}
          activeDiscountVal={activeDiscountVal}
          tax={tax}
          total={total}
          handleStartProcess={handleStartProcess}
        />
      </div>

      {isShiftModalOpen && (
        <ShiftModal
          selectedShiftType={selectedShiftType}
          setSelectedShiftType={setSelectedShiftType}
          selectedKasir={selectedKasir}
          setSelectedKasir={setSelectedKasir}
          handleSaveShift={handleSaveShift}
        />
      )}

      {isPaymentOpen && (
        <PaymentModal
          total={total}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cashGiven={cashGiven}
          setCashGiven={setCashGiven}
          changeAmount={changeAmount}
          setIsPaymentOpen={setIsPaymentOpen}
          handleProcessPayment={handleProcessPayment}
        />
      )}

      {completedReceipt && (
        <ReceiptModal
          completedReceipt={completedReceipt}
          handleReprintReceipt={handleReprintReceipt}
          handleResetTransaction={handleResetTransaction}
        />
      )}
    </div>
  );
}