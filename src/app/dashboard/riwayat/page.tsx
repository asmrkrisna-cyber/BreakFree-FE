'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { INITIAL_TRANSACTIONS, Transaction } from '@/data/riwayatData';

import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import ReprintModal from './components/ReprintModal';
import VoidModal from './components/VoidModal';

export default function RiwayatPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTxId, setSelectedTxId] = useState<string>('#TRX-0912');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showVoidModal, setShowVoidModal] = useState(false);

  const selectedTx = transactions.find((t) => t.id === selectedTxId);

  const handleVoidSubmit = (reason: string) => {
    if (!selectedTx) return;
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === selectedTx.id
          ? { ...tx, status: 'VOID / BATAL', voidReason: reason }
          : tx
      )
    );
    setShowVoidModal(false);
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
        <TransactionList
          transactions={transactions}
          selectedTxId={selectedTxId}
          onSelectTx={setSelectedTxId}
        />

        <TransactionDetail
          selectedTx={selectedTx}
          onOpenPrintModal={() => setShowPrintModal(true)}
          onOpenVoidModal={() => setShowVoidModal(true)}
        />
      </div>

      {showPrintModal && selectedTx && (
        <ReprintModal
          selectedTx={selectedTx}
          onClose={() => setShowPrintModal(false)}
          onPrint={handlePrint}
        />
      )}

      {showVoidModal && selectedTx && (
        <VoidModal
          txId={selectedTx.id}
          onClose={() => setShowVoidModal(false)}
          onSubmitVoid={handleVoidSubmit}
        />
      )}
    </div>
  );
}