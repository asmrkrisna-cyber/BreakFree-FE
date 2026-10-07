'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface OrderItem {
  qty: number;
  name: string;
  note?: string;
}

interface Order {
  id: string;
  customerName: string;
  timeAgo: string;
  paymentType: string;
  serviceType: string;
  status: 'baru' | 'diproses' | 'siap';
  isAppBreakFree?: boolean; // Menandai pesanan dari Aplikasi BreakFree (terhubung live tracking)
  isLate?: boolean;
  items: OrderItem[];
  specialNote?: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: '#BF-031B',
    customerName: 'Alya P.',
    timeAgo: '18 mnt',
    paymentType: 'QRIS',
    serviceType: 'Takeaway',
    status: 'baru',
    isAppBreakFree: true,
    isLate: true,
    items: [
      { qty: 2, name: 'Kopi Susu Gula Aren', note: 'Regular - Less sugar - Oatmilk' },
      { qty: 1, name: 'Croissant Almond', note: 'Hangatkan' }
    ],
    specialNote: 'Tanpa sedotan. Pisahkan minuman dan pastry.'
  },
  {
    id: '#BF-0321',
    customerName: 'Kadir',
    timeAgo: '4 mnt',
    paymentType: 'Kasir',
    serviceType: 'Dine-in - M02',
    status: 'baru',
    isAppBreakFree: false,
    items: [
      { qty: 1, name: 'Caramel Macchiato', note: 'Large - Normal sugar - Extra shot' },
      { qty: 1, name: 'Kentang Truffle', note: 'Saus terpisah' }
    ]
  },
  {
    id: '#BF-0314',
    customerName: 'Ricky',
    timeAgo: '12 mnt',
    paymentType: 'App BreakFree',
    serviceType: 'Pickup App',
    status: 'diproses',
    isAppBreakFree: true,
    items: [
      { qty: 1, name: 'Signature Matcha', note: 'Regular - No sugar' },
      { qty: 2, name: 'Kopi Hitam Sarijan', note: 'Panas - tanpa gula' }
    ],
    specialNote: 'Cek segel dan label nama sebelum diserahkan.'
  },
  {
    id: '#BF-0316',
    customerName: 'Nadia',
    timeAgo: '8 mnt',
    paymentType: 'QRIS',
    serviceType: 'Dine-in - M10',
    status: 'diproses',
    isAppBreakFree: false,
    items: [
      { qty: 2, name: 'Ice Kopi Susu', note: 'Regular - normal sugar' },
      { qty: 1, name: 'Banana Bread', note: 'Hangatkan 30 detik' }
    ]
  },
  {
    id: '#BF-0311',
    customerName: 'Dimas',
    timeAgo: '3 mnt',
    paymentType: 'Kasir',
    serviceType: 'Takeaway',
    status: 'siap',
    isAppBreakFree: false,
    items: [
      { qty: 1, name: 'Kopi Ijo Susu', note: 'Regular - Less sugar' },
      { qty: 1, name: 'Butter Croissant', note: 'Hangatkan' }
    ]
  },
  {
    id: '#BF-0312',
    customerName: 'Nadia',
    timeAgo: '6 mnt',
    paymentType: 'App BreakFree',
    serviceType: 'Pickup App',
    status: 'siap',
    isAppBreakFree: true,
    items: [
      { qty: 2, name: 'BreakFree Aren Latte', note: 'Large - Oatmilk' }
    ]
  }
];

export default function LiveTrackingPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const moveOrder = (id: string, nextStatus: 'baru' | 'diproses' | 'siap' | 'selesai') => {
    setOrders(prev =>
      prev
        .map(order => {
          if (order.id === id) {
            if (nextStatus === 'selesai') return null; // Hapus dari daftar jika pesanan diambil/selesai
            return { ...order, status: nextStatus };
          }
          return order;
        })
        .filter(Boolean) as Order[]
    );
  };

  const baruOrders = orders.filter(o => o.status === 'baru');
  const diprosesOrders = orders.filter(o => o.status === 'diproses');
  const siapOrders = orders.filter(o => o.status === 'siap');

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-[#2C221E] overflow-hidden relative">
      <Sidebar />

      {/* KONTEN UTAMA KITCHEN DISPLAY SYSTEM */}
      <div className="flex-1 flex flex-col p-6 pl-20 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-[#2C221E]">Live Tracking Dapur</h1>
            <p className="text-xs text-[#7B6E65] mt-0.5">Monitoring pesanan Dapur & Aplikasi BreakFree</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-700 rounded-xl text-xs font-semibold">
              Baru: {baruOrders.length}
            </span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-700 rounded-xl text-xs font-semibold">
              Diproses: {diprosesOrders.length}
            </span>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 rounded-xl text-xs font-semibold">
              Siap: {siapOrders.length}
            </span>
          </div>
        </div>

        {/* 3 KOLOM KANBAN BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          
          {/* KOLOM 1: BARU */}
          <div className="bg-[#F5F2EC]/60 border border-[#EBE6DF] rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-[#EBE6DF]">
              <div>
                <h2 className="font-bold text-sm text-[#2C221E]">Baru</h2>
                <p className="text-[11px] text-[#7B6E65]">Konfirmasi & mulai produksi</p>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#6E5545] text-white flex items-center justify-center text-xs font-bold">
                {baruOrders.length}
              </span>
            </div>

            <div className="space-y-4">
              {baruOrders.map(order => (
                <div key={order.id} className={`bg-white rounded-2xl p-4 border transition-all shadow-sm ${order.isLate ? 'border-red-400' : 'border-[#EBE6DF]'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-[#2C221E]">{order.id}</h3>
                        {order.isAppBreakFree && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                            ● App Live
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#7B6E65]">{order.customerName}</p>
                    </div>
                    <span className="text-[11px] bg-[#F5F2EC] text-[#6E5545] px-2 py-0.5 rounded-md font-medium">
                      ⏱ {order.timeAgo}
                    </span>
                  </div>

                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    <span className="text-[10px] bg-[#F5F2EC] text-[#2C221E] px-2 py-0.5 rounded font-semibold">{order.paymentType}</span>
                    <span className="text-[10px] bg-[#F5F2EC] text-[#2C221E] px-2 py-0.5 rounded font-semibold">{order.serviceType}</span>
                    {order.isLate && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">TERLAMBAT</span>}
                  </div>

                  <div className="space-y-2 border-t border-b border-[#F5F2EC] py-3 my-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-medium text-[#2C221E]">
                          <span>{item.qty}× {item.name}</span>
                        </div>
                        {item.note && <p className="text-[10px] text-[#7B6E65] pl-4">{item.note}</p>}
                      </div>
                    ))}
                  </div>

                  {order.specialNote && (
                    <div className="bg-[#FAF7F2] border border-[#EBE6DF] p-2 rounded-xl text-[10px] text-[#6E5545] mb-3">
                      💬 {order.specialNote}
                    </div>
                  )}

                  <button
                    onClick={() => moveOrder(order.id, 'diproses')}
                    className="w-full bg-[#6E5545] hover:bg-[#594436] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    Mulai Proses
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM 2: DIPROSES */}
          <div className="bg-[#F5F2EC]/60 border border-[#EBE6DF] rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-[#EBE6DF]">
              <div>
                <h2 className="font-bold text-sm text-[#2C221E]">Diproses</h2>
                <p className="text-[11px] text-[#7B6E65]">Sedang dikerjakan dapur</p>
              </div>
              <span className="w-6 h-6 rounded-full bg-[#6E5545] text-white flex items-center justify-center text-xs font-bold">
                {diprosesOrders.length}
              </span>
            </div>

            <div className="space-y-4">
              {diprosesOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-4 border border-[#EBE6DF] shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-[#2C221E]">{order.id}</h3>
                        {order.isAppBreakFree && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                            ● App Live
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#7B6E65]">{order.customerName}</p>
                    </div>
                    <span className="text-[11px] bg-[#F5F2EC] text-[#6E5545] px-2 py-0.5 rounded-md font-medium">
                      ⏱ {order.timeAgo}
                    </span>
                  </div>

                  <div className="flex gap-1.5 mb-3">
                    <span className="text-[10px] bg-[#F5F2EC] text-[#2C221E] px-2 py-0.5 rounded font-semibold">{order.paymentType}</span>
                    <span className="text-[10px] bg-[#F5F2EC] text-[#2C221E] px-2 py-0.5 rounded font-semibold">{order.serviceType}</span>
                  </div>

                  <div className="space-y-2 border-t border-b border-[#F5F2EC] py-3 my-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-medium text-[#2C221E]">
                          <span>{item.qty}× {item.name}</span>
                        </div>
                        {item.note && <p className="text-[10px] text-[#7B6E65] pl-4">{item.note}</p>}
                      </div>
                    ))}
                  </div>

                  {order.specialNote && (
                    <div className="bg-[#FAF7F2] border border-[#EBE6DF] p-2 rounded-xl text-[10px] text-[#6E5545] mb-3">
                      💬 {order.specialNote}
                    </div>
                  )}

                  <button
                    onClick={() => moveOrder(order.id, 'siap')}
                    className="w-full bg-[#6E5545] hover:bg-[#594436] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    Tandai Siap
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM 3: SIAP DIAMBIL */}
          <div className="bg-[#F5F2EC]/60 border border-[#EBE6DF] rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-[#EBE6DF]">
              <div>
                <h2 className="font-bold text-sm text-[#2C221E]">Siap Diambil</h2>
                <p className="text-[11px] text-[#7B6E65]">Menunggu pelanggan mengambil pesanan</p>
              </div>
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                {siapOrders.length}
              </span>
            </div>

            <div className="space-y-4">
              {siapOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-4 border border-[#EBE6DF] shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-[#2C221E]">{order.id}</h3>
                        {order.isAppBreakFree && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            ● App Live
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#7B6E65]">{order.customerName}</p>
                    </div>
                    <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium">
                      ⏱ {order.timeAgo}
                    </span>
                  </div>

                  <div className="flex gap-1.5 mb-3">
                    <span className="text-[10px] bg-[#F5F2EC] text-[#2C221E] px-2 py-0.5 rounded font-semibold">{order.paymentType}</span>
                    <span className="text-[10px] bg-[#F5F2EC] text-[#2C221E] px-2 py-0.5 rounded font-semibold">{order.serviceType}</span>
                  </div>

                  <div className="space-y-2 border-t border-b border-[#F5F2EC] py-3 my-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-medium text-[#2C221E]">
                          <span>{item.qty}× {item.name}</span>
                        </div>
                        {item.note && <p className="text-[10px] text-[#7B6E65] pl-4">{item.note}</p>}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => moveOrder(order.id, 'selesai')}
                    className="w-full bg-[#FAF7F2] border border-[#EBE6DF] hover:bg-[#F5F2EC] text-[#6E5545] text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    Pesanan Diambil
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}