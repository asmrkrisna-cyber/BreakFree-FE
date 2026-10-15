interface ShiftModalProps {
  selectedShiftType: string;
  setSelectedShiftType: (type: string) => void;
  selectedKasir: string;
  setSelectedKasir: (name: string) => void;
  cashInAddition: string;
  setCashInAddition: (val: string) => void;
  handleSaveShift: () => void;
}

export default function ShiftModal({
  selectedShiftType,
  setSelectedShiftType,
  selectedKasir,
  setSelectedKasir,
  cashInAddition,
  setCashInAddition,
  handleSaveShift,
}: ShiftModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-[#EBE6DF]">
        <div className="text-center space-y-1 border-b border-dashed border-[#EBE6DF] pb-3">
          <h3 className="font-bold text-sm text-[#2C221E]">🕒 Pilih Shift & Kasir Aktif</h3>
          <p className="text-[11px] text-[#7B6E65]">Tentukan shift sebelum mulai melayani transaksi</p>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-[#7B6E65] mb-1">Status Shift</label>
            <select
              value={selectedShiftType}
              onChange={(e) => setSelectedShiftType(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
            >
              <option value="Shift Opening Aktif">Shift Opening Aktif</option>
              <option value="Shift Closing Aktif">Shift Closing Aktif</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-[#7B6E65] mb-1">Nama Kasir</label>
            <input
              type="text"
              placeholder="Contoh: pasha"
              value={selectedKasir}
              onChange={(e) => setSelectedKasir(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
            />
          </div>
          <div>
            <label className="block font-bold text-[#7B6E65] mb-1">Kas Masuk Tambahan</label>
            <input
              type="number"
              placeholder="Contoh: 100000"
              value={cashInAddition}
              onChange={(e) => setCashInAddition(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#EBE6DF] rounded-xl text-xs text-[#2C221E] focus:outline-none focus:border-[#6E5545]"
            />
          </div>
        </div>
        <div className="pt-2">
          <button
            onClick={handleSaveShift}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer bg-[#6E5545] hover:bg-[#584336]"
          >
            Simpan & Mulai Shift
          </button>
        </div>
      </div>
    </div>
  );
}