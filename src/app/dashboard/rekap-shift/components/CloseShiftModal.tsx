'use client';

interface CloseShiftModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function CloseShiftModal({ onClose, onConfirm }: CloseShiftModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF]">
        <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
          <h3 className="font-bold text-sm text-[#2C221E]">⚠️ Konfirmasi Tutup Shift</h3>
          <button
            onClick={onClose}
            className="text-[#7B6E65] hover:text-[#2C221E] font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-[#7B6E65]">
          Yakin ingin menyelesaikan dan menutup shift ini? Pastikan seluruh perhitungan kas fisik laci dan laporan transaksi sudah sesuai.
        </p>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-[#EBE6DF] hover:bg-gray-100 text-[#7B6E65] rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-[#6E5545] hover:bg-[#584336] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Ya, Tutup Shift
          </button>
        </div>
      </div>
    </div>
  );
}