'use client';
import { Transaction } from '@/data/riwayatData';

interface TransactionListProps {
  transactions: Transaction[];
  selectedTxId: string;
  onSelectTx: (id: string) => void;
}

export default function TransactionList({
  transactions,
  selectedTxId,
  onSelectTx,
}: TransactionListProps) {
  return (
    <div className="flex-1 bg-white border border-[#EBE6DF] rounded-2xl p-5 shadow-xs space-y-4">
      <h2 className="font-bold text-sm text-[#2C221E] border-b border-[#EBE6DF] pb-3">
        Daftar Transaksi Selesai
      </h2>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            onClick={() => onSelectTx(tx.id)}
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
  );
}