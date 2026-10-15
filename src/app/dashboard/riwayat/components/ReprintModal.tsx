'use client';
import { Transaction } from '@/data/riwayatData';

interface ReprintModalProps {
  selectedTx: Transaction;
  onClose: () => void;
  onPrint: () => void;
}

export default function ReprintModal({ selectedTx, onClose, onPrint }: ReprintModalProps) {
  const isVoid = selectedTx.status === 'VOID / BATAL';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF]">
        <div className={`border text-[10px] font-bold text-center py-1 rounded-lg uppercase tracking-wider ${
          isVoid ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          {isVoid ? '⚠️ RESI VOID / PEMBATALAN TRANSAKSI' : '⚠️ CETAK ULANG / CHECKER (REPRINT)'}
        </div>
        <div className="text-center space-y-1 border-b border-dashed border-[#EBE6DF] pb-4">
          <h3 className="font-bold text-sm text-[#2C221E]">BREAKFREE COFFEE</h3>
          <p className="text-[10px] text-[#7B6E65]">Malang, Indonesia</p>
        </div>
        <div className="text-[11px] text-[#7B6E65] space-y-0.5 border-b border-dashed border-[#EBE6DF] pb-3">
          <p><span className="font-bold text-[#2C221E]">No. Transaksi:</span> {selectedTx.id}</p>
          <p><span className="font-bold text-[#2C221E]">Pelanggan:</span> {selectedTx.customerName}</p>
          <p><span className="font-bold text-[#2C221E]">Metode:</span> {selectedTx.paymentMethod}</p>
          {isVoid && selectedTx.voidReason && (
            <p className="text-red-600 pt-1 font-medium"><span className="font-bold">Alasan Void:</span> {selectedTx.voidReason}</p>
          )}
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
            onClick={onPrint}
            className="w-full py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            🖨️ Cetak ke Printer Thermal
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 bg-white border border-[#EBE6DF] hover:bg-gray-100 text-[#7B6E65] rounded-xl text-xs font-bold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}