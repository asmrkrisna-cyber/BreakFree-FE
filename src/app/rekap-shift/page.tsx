'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface SoldItem {
  name: string;
  qty: number;
  price: number;
}

interface ShiftRecord {
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
  const [cashierName] = useState('Asep (Kasir 1)');
  const [startTime] = useState('07:00 WIB');
  const [startingCash] = useState(500000);
  const [additionalCashIn] = useState(50000);
  const [cashOut] = useState(120000);

  const [revenueCash] = useState(1250000);
  const [revenueQRIS] = useState(1850000);
  const [revenueShopeeFood] = useState(940000);

  // State Modal Struk Thermal
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Data Rincian Menu Terjual Selama Shift (Bisa di-fetch dari Database)
  const [soldItems] = useState<SoldItem[]>([
    { name: 'Ice Kopi Susu', qty: 25, price: 18000 },
    { name: 'Breakfree Aren Latte', qty: 18, price: 22000 },
    { name: 'Americano', qty: 10, price: 18000 },
    { name: 'Seneng Teh Ori', qty: 15, price: 8000 },
    { name: 'Nasi Goreng', qty: 12, price: 20000 },
    { name: 'Mix Platter', qty: 8, price: 25000 },
    { name: 'SF - Ice Kopi Susu', qty: 10, price: 18000 },
  ]);

  // Kalkulasi Keuangan
  const totalOmset = revenueCash + revenueQRIS + revenueShopeeFood;
  const regularRevenue = revenueCash + revenueQRIS;
  const totalTax = Math.round(regularRevenue * 0.1);
  const netRevenue = totalOmset - totalTax;
  const estimatedPhysicalCash = startingCash + additionalCashIn + revenueCash - cashOut;

  // Total Item Terjual
  const totalItemsSold = soldItems.reduce((sum, item) => sum + item.qty, 0);

  const [history] = useState<ShiftRecord[]>([
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

  const handleFinishShift = () => {
    alert('Shift berhasil diselesaikan dan ditutup!');
  };

  const handlePrintThermal = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col relative">
      {/* CSS Khusus Print Struk Thermal (Menyembunyikan UI Web saat Print) */}
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

      {/* HEADER */}
      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20 no-print">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Rekap Shift & Kas</h1>
          <p className="text-[11px] text-[#7B6E65]">
            Kelola Pergantian Shift Opening/Closing & Transaksi Laci Kasir
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
          • Shift Opening Aktif ({cashierName})
        </span>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 space-y-6 flex-1 pl-20 no-print">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: LACI KASIR */}
          <div className="bg-white p-5 rounded-2xl border border-[#EBE6DF] shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md uppercase tracking-wider">
                  SHIFT OPENING
                </span>
                <span className="text-[11px] font-medium text-[#7B6E65]">
                  Mulai: {startTime}
                </span>
              </div>
              <h2 className="text-base font-bold text-[#2C221E]">{cashierName}</h2>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#7B6E65]">
                  <span>Modal Kas Awal</span>
                  <span className="font-bold text-[#2C221E]">
                    Rp {startingCash.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Kas Masuk Tambahan</span>
                  <span className="font-bold">
                    + Rp {additionalCashIn.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Kas Keluar / Pengeluaran</span>
                  <span className="font-bold">
                    - Rp {cashOut.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EBE6DF] bg-[#FDFBF7] -mx-5 -mb-5 p-5 rounded-b-2xl">
              <span className="text-[10px] uppercase font-bold text-[#7B6E65] tracking-wider block">
                ESTIMASI KAS FISIK DI LACI
              </span>
              <span className="text-xl font-bold text-[#2C221E] block mt-0.5">
                Rp {estimatedPhysicalCash.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* CARD 2: RINCIAN PENDAPATAN SHIFT */}
          <div className="bg-white p-5 rounded-2xl border border-[#EBE6DF] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#2C221E] border-b border-[#EBE6DF] pb-2">
                Rincian Pendapatan Shift
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="flex items-center gap-1.5 text-[#7B6E65]">
                    💵 Cash / Tunai
                  </span>
                  <span className="font-bold text-[#2C221E]">
                    Rp {revenueCash.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="flex items-center gap-1.5 text-[#7B6E65]">
                    📱 Non-Tunai / QRIS
                  </span>
                  <span className="font-bold text-[#2C221E]">
                    Rp {revenueQRIS.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="flex items-center gap-1.5 text-[#7B6E65]">
                    🛵 ShopeeFood
                  </span>
                  <span className="font-bold text-[#2C221E]">
                    Rp {revenueShopeeFood.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 text-red-600 border-t border-dashed border-[#EBE6DF] pt-2">
                  <span>Pajak Resto (10% Excl. Shopee)</span>
                  <span className="font-bold">
                    - Rp {totalTax.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EBE6DF]">
              <div className="flex justify-between items-center text-xs text-[#7B6E65] mb-1">
                <span>TOTAL OMSET BRUTO:</span>
                <span className="font-bold">
                  Rp {totalOmset.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-[#6E5545]">
                <span>PENDAPATAN MURNI:</span>
                <span className="text-base">
                  Rp {netRevenue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: TUTUP / OPER SHIFT */}
          <div className="bg-white p-5 rounded-2xl border border-[#EBE6DF] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#2C221E]">Tutup / Oper Shift</h2>
              <p className="text-xs text-[#7B6E65]">
                Pastikan uang fisik di laci sesuai dengan rekapitulasi sistem sebelum
                menyelesaikan shift.
              </p>
            </div>

            <div className="space-y-2 pt-6">
              <button
                onClick={() => setIsReceiptOpen(true)}
                className="w-full py-2.5 bg-white border border-[#EBE6DF] hover:bg-[#FAF7F2] text-[#2C221E] rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                🖨️ Cetak Struk Rekap Kas
              </button>
              <button
                onClick={handleFinishShift}
                className="w-full py-3 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Selesaikan & Tutup Shift
              </button>
            </div>
          </div>
        </div>

        {/* RIWAYAT REKAP SHIFT SELESAI */}
        <div className="bg-white p-5 rounded-2xl border border-[#EBE6DF] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#2C221E]">
            Riwayat Rekap Shift Selesai
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EBE6DF] text-[#7B6E65] bg-[#FDFBF7]">
                  <th className="py-2.5 px-3 font-semibold">Kategori Shift</th>
                  <th className="py-2.5 px-3 font-semibold">Kasir</th>
                  <th className="py-2.5 px-3 font-semibold">Waktu Mulai - Selesai</th>
                  <th className="py-2.5 px-3 font-semibold">Kas Awal</th>
                  <th className="py-2.5 px-3 font-semibold">Total Tunai</th>
                  <th className="py-2.5 px-3 font-semibold">Total QRIS</th>
                  <th className="py-2.5 px-3 font-semibold">Total ShopeeFood</th>
                  <th className="py-2.5 px-3 font-semibold text-red-600">Pajak (10%)</th>
                  <th className="py-2.5 px-3 font-semibold text-[#6E5545]">
                    Pendapatan Murni
                  </th>
                  <th className="py-2.5 px-3 font-semibold">Kas Fisik Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE6DF] text-[#2C221E]">
                {history.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#FDFBF7]">
                    <td className="py-3 px-3 font-bold">
                      <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[10px]">
                        {rec.shiftCategory}
                      </span>
                    </td>
                    <td className="py-3 px-3">{rec.cashierName}</td>
                    <td className="py-3 px-3 text-[#7B6E65]">{rec.timeRange}</td>
                    <td className="py-3 px-3">
                      Rp {rec.startingCash.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3">
                      Rp {rec.totalCash.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3">
                      Rp {rec.totalQRIS.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3">
                      Rp {rec.totalShopeeFood.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-red-600 font-medium">
                      - Rp {rec.taxAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#6E5545]">
                      Rp {rec.netRevenue.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 font-bold">
                      Rp {rec.finalPhysicalCash.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL POP-UP STRUK THERMAL PENJUALAN */}
      {isReceiptOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs no-print-bg">
          <div
            id="thermal-receipt-modal"
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF] text-[#2C221E]"
          >
            {/* HEADER STRUK */}
            <div className="text-center space-y-1 border-b border-dashed border-[#EBE6DF] pb-4">
              <h3 className="font-bold text-sm">BREAKFREE COFFEE</h3>
              <p className="text-[10px] text-[#7B6E65]">LAPORAN PENJUALAN SHIFT</p>
              <p className="text-[10px] text-[#7B6E65]">
                Kasir: {cashierName} • {startTime}
              </p>
            </div>

            {/* RINCIAN ITEM TERJUAL */}
            <div className="space-y-2 border-b border-dashed border-[#EBE6DF] pb-3">
              <p className="text-[11px] font-bold text-[#6E5545] uppercase tracking-wider">
                📦 Rincian Item Terjual ({totalItemsSold} pcs)
              </p>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                {soldItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-[10px] text-[#7B6E65]">
                        {item.qty} x Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <span className="font-bold">
                      Rp {(item.qty * item.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RINGKASAN REKAP KAS */}
            <div className="text-xs space-y-1.5 border-b border-dashed border-[#EBE6DF] pb-3 text-[#7B6E65]">
              <p className="text-[11px] font-bold text-[#6E5545] uppercase tracking-wider mb-1">
                💰 Rekapitulasi Kas
              </p>

              <div className="flex justify-between">
                <span>Tunai (Cash)</span>
                <span className="font-bold text-[#2C221E]">
                  Rp {revenueCash.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>QRIS</span>
                <span className="font-bold text-[#2C221E]">
                  Rp {revenueQRIS.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ShopeeFood</span>
                <span className="font-bold text-[#2C221E]">
                  Rp {revenueShopeeFood.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-red-600 font-medium pt-1 border-t border-dashed border-[#EBE6DF]">
                <span>Pajak (10%)</span>
                <span>- Rp {totalTax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-[#2C221E] pt-1">
                <span>Total Omset Bruto</span>
                <span>Rp {totalOmset.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-[#6E5545] text-sm pt-0.5">
                <span>Pendapatan Murni</span>
                <span>Rp {netRevenue.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* KAS FISIK LACI */}
            <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#EBE6DF] text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#2C221E]">
                <span>Estimasi Kas Fisik Laci:</span>
                <span>Rp {estimatedPhysicalCash.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* TOMBOL AKSI */}
            <div className="space-y-2 pt-2 no-print">
              <button
                onClick={handlePrintThermal}
                className="w-full py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                🖨️ Print Struk Thermal (Kertas Kasir)
              </button>
              <button
                onClick={() => setIsReceiptOpen(false)}
                className="w-full py-2 bg-white border border-[#EBE6DF] hover:bg-gray-100 text-[#7B6E65] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}