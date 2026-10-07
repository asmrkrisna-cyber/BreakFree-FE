'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface TransactionItem {
  name: string;
  qty: number;
  price: number;
}

interface Transaction {
  id: string;
  customerName: string;
  time: string;
  paymentMethod: string;
  status: 'SUKSES' | 'VOID / BATAL';
  items: TransactionItem[];
  total: number;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#TRX-0912',
    customerName: 'Alya P.',
    time: 'Hari ini, 14:20 WIB',
    paymentMethod: 'QRIS',
    status: 'SUKSES',
    items: [
      { name: 'Kopi Susu Gula Aren', qty: 2, price: 24000 },
      { name: 'Croissant Almond', qty: 1, price: 20000 },
    ],
    total: 68000,
  },
  {
    id: '#TRX-0911',
    customerName: 'Kadir',
    time: 'Hari ini, 13:45 WIB',
    paymentMethod: 'Cash / Tunai',
    status: 'SUKSES',
    items: [
      { name: 'Nasi Goreng Spesial', qty: 1, price: 35000 },
      { name: 'Es Teh Manis', qty: 2, price: 10000 },
    ],
    total: 55000,
  },
  {
    id: '#TRX-0910',
    customerName: 'Budi S.',
    time: 'Hari ini, 12:10 WIB',
    paymentMethod: 'App BreakFree',
    status: 'VOID / BATAL',
    items: [
      { name: 'Signature Matcha', qty: 1, price: 38000 },
    ],
    total: 38000,
  },
];

export default function RiwayatPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTxId, setSelectedTxId] = useState<string>('#TRX-0912');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const selectedTx = transactions.find((t) => t.id === selectedTxId);

  const handleVoid = (id: string) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: 'VOID / BATAL' } : tx))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col relative">
      <Sidebar />

      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Riwayat & Void Transaksi</h1>
          <p className="text-[11px] text-[#7B6E65]">Daftar transaksi pembayaran sukses serta kelola pembatalan (Void)</p>
        </div>
        <span className="px-3 py-1 bg-[#F5F2EC] text-[#7B6E65] rounded-full text-xs font-semibold border border-[#EBE6DF]">
          Total Transaksi: {transactions.length}
        </span>
      </header>

      <div className="flex-1 p-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        {/* DAFTAR TRANSAKSI */}
        <div className="flex-1 bg-white border border-[#EBE6DF] rounded-2xl p-5 shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-[#2C221E] border-b border-[#EBE6DF] pb-3">
            Daftar Transaksi Selesai
          </h2>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTxId(tx.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                  selectedTxId === tx.id
                    ? 'border-[#6E5545] bg-[#FAF7F2]'
                    : 'border-[#EBE6DF] bg-[#FDFBF7] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#2C221E]">{tx.id}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        tx.status === 'SUKSES'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#2C221E] font-medium mt-1">{tx.customerName}</p>
                  <p className="text-[10px] text-[#7B6E65]">{tx.time} • {tx.paymentMethod}</p>
                </div>
                <span className="font-bold text-xs text-[#2C221E]">
                  Rp {tx.total.toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL TRANSAKSI & AKSI */}
        <div className="w-full lg:w-96 bg-white border border-[#EBE6DF] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          {selectedTx ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-[#EBE6DF] pb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#2C221E]">{selectedTx.id}</h3>
                  <p className="text-xs text-[#2C221E] font-medium">{selectedTx.customerName} ({selectedTx.paymentMethod})</p>
                  <p className="text-[10px] text-[#7B6E65]">Waktu: {selectedTx.time}</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedTx.status === 'SUKSES'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedTx.status}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-bold text-[#7B6E65] mb-2">Rincian Item Pesanan:</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedTx.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-[#2C221E]">{item.qty}× {item.name}</span>
                      <span className="text-[#7B6E65]">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#EBE6DF] flex justify-between items-center text-sm font-bold text-[#2C221E]">
                <span>Total Pembayaran</span>
                <span>Rp {selectedTx.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-xs text-[#7B6E65]">
              Pilih transaksi untuk melihat rincian
            </div>
          )}

          {/* TOMBOL AKSI (VOID & CETAK STRUK ULANG) */}
          <div className="pt-4 border-t border-[#EBE6DF] space-y-2">
            {selectedTx?.status === 'SUKSES' && (
              <button
                onClick={() => setShowPrintModal(true)}
                className="w-full py-2.5 bg-[#F5F2EC] hover:bg-[#EBE6DF] text-[#2C221E] rounded-xl text-xs font-bold border border-[#EBE6DF] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                🖨️ Cetak Struk Ulang / Checker
              </button>
            )}

            {selectedTx?.status === 'SUKSES' && (
              <button
                onClick={() => handleVoid(selectedTx.id)}
                className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold border border-red-200 transition-colors cursor-pointer"
              >
                ⚠️ Batalkan / Void Transaksi Ini
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL PREVIEW CETAK STRUK ULANG */}
      {showPrintModal && selectedTx && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF]">
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold text-center py-1 rounded-lg uppercase tracking-wider">
              ⚠️ CETAK ULANG / CHECKER (REPRINT)
            </div>

            <div className="text-center space-y-1 border-b border-dashed border-[#EBE6DF] pb-4">
              <h3 className="font-bold text-sm text-[#2C221E]">BREAKFREE COFFEE</h3>
              <p className="text-[10px] text-[#7B6E65]">Malang, Indonesia</p>
            </div>

            <div className="text-[11px] text-[#7B6E65] space-y-0.5 border-b border-dashed border-[#EBE6DF] pb-3">
              <p><span className="font-bold text-[#2C221E]">No. Transaksi:</span> {selectedTx.id}</p>
              <p><span className="font-bold text-[#2C221E]">Pelanggan:</span> {selectedTx.customerName}</p>
              <p><span className="font-bold text-[#2C221E]">Metode:</span> {selectedTx.paymentMethod}</p>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto text-xs border-b border-dashed border-[#EBE6DF] pb-3">
              {selectedTx.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} x{item.qty}</span>
                  <span className="font-medium">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm font-bold text-[#2C221E] border-b border-dashed border-[#EBE6DF] pb-3">
              <span>Total</span>
              <span>Rp {selectedTx.total.toLocaleString('id-ID')}</span>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handlePrint}
                className="w-full py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                🖨️ Cetak ke Printer Thermal
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
                className="w-full py-2 bg-white border border-[#EBE6DF] hover:bg-gray-100 text-[#7B6E65] rounded-xl text-xs font-bold cursor-pointer"
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