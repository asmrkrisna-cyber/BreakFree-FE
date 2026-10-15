'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

import OpenShiftForm from './components/OpenShiftForm';
import ShiftActiveCard from './components/ShiftActiveCard';
import RevenueDetailCard from './components/RevenueDetailCard';
import ActionCard from './components/ActionCard';
import ShiftHistoryTable from './components/ShiftHistoryTable';
import ThermalReceiptModal from './components/ThermalReceiptModal';
import CloseShiftModal from './components/CloseShiftModal';

export interface SoldItem {
  name: string;
  qty: number;
  price: number;
}

export interface ShiftRecord {
  id: string;
  shiftCategory: string;
  cashierName: string;
  timeRange: string;
  startingCash: number;
  totalCash: number;
  totalQRIS: number;
  totalShopeeFood: number;
  taxAmount: number;
  netRevenue: number;
  finalPhysicalCash: number;
}

export default function RekapShiftPage() {
  const [isShiftActive, setIsShiftActive] = useState(true);
  const [cashierName, setCashierName] = useState('Asep (Kasir 1)');
  const [shiftCategory, setShiftCategory] = useState<'Opening' | 'Closing'>('Opening');
  const [startTime] = useState('07:00 WIB');
  const [startingCash, setStartingCash] = useState(500000);
  const [additionalCashIn] = useState(50000);
  const [cashOut] = useState(120000);
  const [revenueCash] = useState(1250000);
  const [revenueQRIS] = useState(1850000);
  const [revenueShopeeFood] = useState(940000);

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const [soldItems] = useState<SoldItem[]>([
    { name: 'Ice Kopi Susu', qty: 25, price: 18000 },
    { name: 'Breakfree Aren Latte', qty: 18, price: 22000 },
    { name: 'Americano', qty: 10, price: 18000 },
    { name: 'Seneng Teh Ori', qty: 15, price: 8000 },
    { name: 'Nasi Goreng', qty: 12, price: 20000 },
    { name: 'Mix Platter', qty: 8, price: 25000 },
    { name: 'SF - Ice Kopi Susu', qty: 10, price: 18000 },
  ]);

  const totalOmset = revenueCash + revenueQRIS + revenueShopeeFood;
  const regularRevenue = revenueCash + revenueQRIS;
  const totalTax = Math.round(regularRevenue * 0.1);
  const netRevenue = totalOmset - totalTax;
  const estimatedPhysicalCash = startingCash + additionalCashIn + revenueCash - cashOut;
  const totalItemsSold = soldItems.reduce((sum, item) => sum + item.qty, 0);

  const [history, setHistory] = useState<ShiftRecord[]>([
    {
      id: 'rec-1',
      shiftCategory: 'Closing',
      cashierName: 'Budi',
      timeRange: '15:00 WIB - 23:00 WIB (Kemarin)',
      startingCash: 500000,
      totalCash: 2100000,
      totalQRIS: 3200000,
      totalShopeeFood: 1500000,
      taxAmount: 530000,
      netRevenue: 6270000,
      finalPhysicalCash: 2515000,
    },
  ]);

  const handleConfirmCloseShift = () => {
    const closedShiftData: ShiftRecord = {
      id: Date.now().toString(),
      shiftCategory: shiftCategory,
      cashierName: cashierName,
      timeRange: `${startTime} - Sekarang`,
      startingCash: startingCash,
      totalCash: revenueCash,
      totalQRIS: revenueQRIS,
      totalShopeeFood: revenueShopeeFood,
      taxAmount: totalTax,
      netRevenue: netRevenue,
      finalPhysicalCash: estimatedPhysicalCash,
    };
    setHistory([closedShiftData, ...history]);
    setIsShiftActive(false);
    setIsCloseModalOpen(false);
  };

  const handleStartShift = (cashier: string, category: 'Opening' | 'Closing', cash: number) => {
    setCashierName(cashier);
    setShiftCategory(category);
    setStartingCash(cash);
    setIsShiftActive(true);
  };

  const handlePrintThermal = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col relative">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #thermal-receipt-modal,
          #thermal-receipt-modal * {
            visibility: visible;
          }
          #thermal-receipt-modal {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      
      <Sidebar />

      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-25 pl-20 no-print">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Rekap Shift & Kas</h1>
          <p className="text-[11px] text-[#7B6E65]">
            Kelola Pergantian Shift Opening/Closing & Transaksi Laci Kasir
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            isShiftActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {isShiftActive ? `• Shift ${shiftCategory} Aktif (${cashierName})` : '• Shift Nonaktif (Belum Buka)'}
        </span>
      </header>

      <main className="p-6 space-y-6 flex-1 pl-20 no-print">
        {!isShiftActive ? (
          <OpenShiftForm onStartShift={handleStartShift} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ShiftActiveCard
              shiftCategory={shiftCategory}
              cashierName={cashierName}
              startTime={startTime}
              startingCash={startingCash}
              additionalCashIn={additionalCashIn}
              cashOut={cashOut}
              estimatedPhysicalCash={estimatedPhysicalCash}
            />

            <RevenueDetailCard
              revenueCash={revenueCash}
              revenueQRIS={revenueQRIS}
              revenueShopeeFood={revenueShopeeFood}
              totalTax={totalTax}
              totalOmset={totalOmset}
              netRevenue={netRevenue}
            />

            <ActionCard
              onOpenReceipt={() => setIsReceiptOpen(true)}
              onFinishShift={() => setIsCloseModalOpen(true)}
            />
          </div>
        )}

        <ShiftHistoryTable history={history} />
      </main>

      {isReceiptOpen && (
        <ThermalReceiptModal
          shiftCategory={shiftCategory}
          cashierName={cashierName}
          startTime={startTime}
          soldItems={soldItems}
          totalItemsSold={totalItemsSold}
          revenueCash={revenueCash}
          revenueQRIS={revenueQRIS}
          revenueShopeeFood={revenueShopeeFood}
          totalTax={totalTax}
          totalOmset={totalOmset}
          netRevenue={netRevenue}
          estimatedPhysicalCash={estimatedPhysicalCash}
          onClose={() => setIsReceiptOpen(false)}
          onPrint={handlePrintThermal}
        />
      )}

      {isCloseModalOpen && (
        <CloseShiftModal
          onClose={() => setIsCloseModalOpen(false)}
          onConfirm={handleConfirmCloseShift}
        />
      )}
    </div>
  );
}