export interface TransactionItem {
  name: string;
  qty: number;
  price: number;
}

export interface Transaction {
  id: string;
  customerName: string;
  paymentMethod: string;
  time: string;
  status: 'SUKSES' | 'VOID / BATAL';
  items: TransactionItem[];
  total: number;
  voidReason?: string; // Alasan void/pembatalan
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '#TRX-0912',
    customerName: 'Alya P.',
    paymentMethod: 'QRIS',
    time: 'Hari ini, 14:20 WIB',
    status: 'SUKSES',
    items: [
      { name: 'Kopi Susu Gula Aren', qty: 2, price: 24000 },
      { name: 'Croissant Almond', qty: 1, price: 20000 },
    ],
    total: 68000,
  },
  {
    id: '#TRX-0911',
    customerName: 'Kadir',
    paymentMethod: 'Cash / Tunai',
    time: 'Hari ini, 13:45 WIB',
    status: 'VOID / BATAL',
    items: [
      { name: 'Breakfree Aren Latte', qty: 2, price: 22000 },
      { name: 'Mineral', qty: 1, price: 5000 },
      { name: 'Nasi', qty: 1, price: 6000 },
    ],
    total: 55000,
    voidReason: 'Salah input menu pesanan',
  },
  {
    id: '#TRX-0910',
    customerName: 'Budi S.',
    paymentMethod: 'App BreakFree',
    time: 'Hari ini, 12:10 WIB',
    status: 'VOID / BATAL',
    items: [
      { name: 'Signature Matcha', qty: 1, price: 25000 },
      { name: 'Cireng', qty: 1, price: 13000 },
    ],
    total: 38000,
    voidReason: 'Pelanggan batal bayar',
  },
];