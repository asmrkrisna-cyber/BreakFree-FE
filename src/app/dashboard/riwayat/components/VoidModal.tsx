'use client';
import { useState } from 'react';

interface VoidModalProps {
  txId: string;
  onClose: () => void;
  onSubmitVoid: (reason: string) => void;
}

export default function VoidModal({ txId, onClose, onSubmitVoid }: VoidModalProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onSubmitVoid(reason);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF]">
        <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
          <h3 className="font-bold text-sm text-red-600">⚠️ Konfirmasi Pembatalan (Void)</h3>
          <button onClick={onClose} className="text-[#7B6E65] hover:text-[#2C221E] font-bold text-sm cursor-pointer">✕</button>
        </div>
        <p className="text-xs text-[#7B6E65]">
          Anda akan membatalkan transaksi <span className="font-bold text-[#2C221E]">{txId}</span>. Masukkan alasan pembatalan di bawah ini untuk keperluan audit:
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            required
            rows={3}
            placeholder="Contoh: Salah input pesanan / Pelanggan batal bayar"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] outline-none focus:border-[#6E5545]"
          />
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-white border border-[#EBE6DF] hover:bg-gray-100 text-[#7B6E65] rounded-xl text-xs font-bold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Ya, Void Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}