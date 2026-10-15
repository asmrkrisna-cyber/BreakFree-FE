'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { INITIAL_KITCHEN_ORDERS, KitchenOrder } from '@/data/trackingData';

import OrderCard from './components/OrderCard';
import CancelOrderModal from './components/CancelOrderModal';

export default function KitchenTrackingPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_KITCHEN_ORDERS);
  const [selectedCancelOrder, setSelectedCancelOrder] = useState<KitchenOrder | null>(null);

  const newOrders = orders.filter((o) => o.status === 'Baru');
  const processingOrders = orders.filter((o) => o.status === 'Diproses');
  const readyOrders = orders.filter((o) => o.status === 'Siap Diambil');

  const handleUpdateStatus = (id: string, nextStatus: KitchenOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
    );
  };

  const handlePickupOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleConfirmCancel = (reason: string) => {
    if (!selectedCancelOrder) return;
    setOrders((prev) => prev.filter((o) => o.id !== selectedCancelOrder.id));
    setSelectedCancelOrder(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E] flex flex-col relative">
      <Sidebar />

      <header className="p-4 border-b border-[#EBE6DF] bg-white flex items-center justify-between shadow-xs sticky top-0 z-20 pl-20">
        <div>
          <h1 className="text-lg font-bold text-[#2C221E]">Live Tracking Dapur</h1>
          <p className="text-[11px] text-[#7B6E65]">Monitoring pesanan Dapur & Aplikasi BreakFree</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
            Baru: {newOrders.length}
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold border border-blue-200">
            Diproses: {processingOrders.length}
          </span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
            Siap: {readyOrders.length}
          </span>
        </div>
      </header>

      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {/* Kolom 1: Pesanan Baru */}
        <div className="space-y-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE6DF]">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <div>
              <h2 className="font-bold text-sm text-[#2C221E]">Baru</h2>
              <p className="text-[10px] text-[#7B6E65]">Konfirmasi & mulai produksi</p>
            </div>
            <span className="w-6 h-6 rounded-full bg-[#2C221E] text-white flex items-center justify-center text-xs font-bold">
              {newOrders.length}
            </span>
          </div>
          <div className="space-y-3">
            {newOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onOpenCancelModal={(ord) => setSelectedCancelOrder(ord)}
                onPickupOrder={handlePickupOrder}
              />
            ))}
          </div>
        </div>

        {/* Kolom 2: Pesanan Diproses */}
        <div className="space-y-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE6DF]">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <div>
              <h2 className="font-bold text-sm text-[#2C221E]">Diproses</h2>
              <p className="text-[10px] text-[#7B6E65]">Sedang dikerjakan dapur</p>
            </div>
            <span className="w-6 h-6 rounded-full bg-[#2C221E] text-white flex items-center justify-center text-xs font-bold">
              {processingOrders.length}
            </span>
          </div>
          <div className="space-y-3">
            {processingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onOpenCancelModal={(ord) => setSelectedCancelOrder(ord)}
                onPickupOrder={handlePickupOrder}
              />
            ))}
          </div>
        </div>

        {/* Kolom 3: Pesanan Siap Diambil */}
        <div className="space-y-4 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE6DF]">
          <div className="flex justify-between items-center border-b border-[#EBE6DF] pb-3">
            <div>
              <h2 className="font-bold text-sm text-[#2C221E]">Siap Diambil</h2>
              <p className="text-[10px] text-[#7B6E65]">Menunggu pelanggan mengambil pesanan</p>
            </div>
            <span className="w-6 h-6 rounded-full bg-[#2C221E] text-white flex items-center justify-center text-xs font-bold">
              {readyOrders.length}
            </span>
          </div>
          <div className="space-y-3">
            {readyOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onOpenCancelModal={(ord) => setSelectedCancelOrder(ord)}
                onPickupOrder={handlePickupOrder}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedCancelOrder && (
        <CancelOrderModal
          orderId={selectedCancelOrder.id}
          customerName={selectedCancelOrder.customerName}
          onClose={() => setSelectedCancelOrder(null)}
          onConfirmCancel={handleConfirmCancel}
        />
      )}
    </div>
  );
}