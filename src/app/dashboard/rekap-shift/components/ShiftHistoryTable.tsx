'use client';
import { ShiftRecord } from '../page'; // atau interface terpisah

interface ShiftHistoryTableProps {
  history: any[];
}

export default function ShiftHistoryTable({ history }: ShiftHistoryTableProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#EBE6DF] shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-[#2C221E]">Riwayat Rekap Shift Selesai</h2>
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
              <th className="py-2.5 px-3 font-semibold text-[#6E5545]">Pendapatan Murni</th>
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
                <td className="py-3 px-3">Rp {rec.startingCash.toLocaleString('id-ID')}</td>
                <td className="py-3 px-3">Rp {rec.totalCash.toLocaleString('id-ID')}</td>
                <td className="py-3 px-3">Rp {rec.totalQRIS.toLocaleString('id-ID')}</td>
                <td className="py-3 px-3">Rp {rec.totalShopeeFood.toLocaleString('id-ID')}</td>
                <td className="py-3 px-3 text-red-600 font-medium">- Rp {rec.taxAmount.toLocaleString('id-ID')}</td>
                <td className="py-3 px-3 font-bold text-[#6E5545]">Rp {rec.netRevenue.toLocaleString('id-ID')}</td>
                <td className="py-3 px-3 font-bold">Rp {rec.finalPhysicalCash.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}