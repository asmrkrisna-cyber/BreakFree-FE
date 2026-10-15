'use client';
import { Transaction } from '@/data/riwayatData';

interface TransactionDetailProps {
  selectedTx: Transaction | undefined;
  onOpenPrintModal: () => void;
  onOpenVoidModal: () => void;
}

export default function TransactionDetail({
  selectedTx,
  onOpenPrintModal,
  onOpenVoidModal,
}: TransactionDetailProps) {
  return (
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

          {selectedTx.voidReason && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-0.5">
              <p className="font-bold">Keterangan Void / Batal:</p>
              <p>{selectedTx.voidReason}</p>
            </div>
          )}

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

      {/* TOMBOL AKSI (SELALU MUNCUL UNTUK CETAK, VOID HANYA JIKA SUKSES) */}
      <div className="pt-4 border-t border-[#EBE6DF] space-y-2">
        {selectedTx && (
          <button
            onClick={onOpenPrintModal}
            className="w-full py-2.5 bg-[#F5F2EC] hover:bg-[#EBE6DF] text-[#2C221E] rounded-xl text-xs font-bold border border-[#EBE6DF] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            🖨️ Cetak Struk Ulang / Checker
          </button>
        )}
        {selectedTx?.status === 'SUKSES' && (
          <button
            onClick={onOpenVoidModal}
            className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold border border-red-200 transition-colors cursor-pointer"
          >
            ⚠️ Batalkan / Void Transaksi Ini
          </button>
        )}
      </div>
    </div>
  );
}