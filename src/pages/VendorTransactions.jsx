import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Category-specific item lists ───────────────────────────────────
const CATEGORY_ITEMS = {
  Groceries: [
    'Rice (Basmati)', 'Rice (Regular)', 'Wheat Flour (Aata)', 'Maida', 'Besan',
    'Cooking Oil (Sunflower)', 'Cooking Oil (Mustard)', 'Sugar', 'Salt', 'Tea Leaves',
    'Coffee Powder', 'Turmeric Powder', 'Red Chilli Powder', 'Coriander Powder',
    'Cumin Seeds', 'Mustard Seeds', 'Garam Masala', 'Dal (Toor)', 'Dal (Moong)',
    'Dal (Chana)', 'Rajma', 'Poha', 'Sooji', 'Vermicelli', 'Biscuits',
  ],
  Vegetables: [
    'Potato (Aalu)', 'Onion (Pyaaz)', 'Tomato', 'Cauliflower (Gobhi)', 'Cabbage (Patta Gobhi)',
    'Peas (Matar)', 'Carrot (Gajar)', 'Spinach (Palak)', 'Bitter Gourd (Karela)',
    'Lady Finger (Bhindi)', 'Brinjal (Baingan)', 'Bottle Gourd (Lauki)', 'Ridge Gourd (Tori)',
    'Green Beans (Beans)', 'Capsicum', 'Ginger (Adrak)', 'Garlic (Lehsun)',
    'Green Chilli', 'Lemon (Nimbu)', 'Coriander Leaves',
  ],
  Dairy: [
    'Milk (Full Cream)', 'Milk (Toned)', 'Paneer', 'Curd (Dahi)', 'Butter',
    'Ghee', 'Cheese Slices', 'Cream', 'Lassi', 'Buttermilk (Chaas)',
    'Condensed Milk', 'Whey Protein', 'Skimmed Milk Powder',
  ],
  Groceries2: [],
};

const VENDORS = [
  { id: 1, name: 'Sunil Kumar', store: 'The Local Market',    phone: '+91 9234876543', amount: '5,000',  status: 'Paid',    category: 'Groceries' },
  { id: 2, name: 'Akash Kumar', store: 'Daily Harvest Store', phone: '+91 9123456789', amount: '3,000',  status: 'Paid',    category: 'Vegetables' },
  { id: 3, name: 'Sunil Kumar', store: 'The Local Market',    phone: '+91 9234876543', amount: '5,000',  status: 'Paid',    category: 'Laundry' },
  { id: 4, name: 'Meena Devi',  store: 'Shree Dairy Farm',   phone: '+91 9876543210', amount: '3,000',  status: 'Paid',    category: 'Dairy' },
  { id: 5, name: 'Raju Verma',  store: 'Fresh Picks',        phone: '+91 9345678901', amount: '5,000',  status: 'Paid',    category: 'Groceries' },
  { id: 6, name: 'Pintu Sahu',  store: 'Green Valley Farm',  phone: '+91 9456789012', amount: '3,000',  status: 'Pending', category: 'Vegetables' },
];

// ─── Dummy Initial State ──────────────────────────────────────────────
const MONTHS_LIST = [
  'January 2025','February 2025','March 2025','April 2025','May 2025','June 2025',
  'July 2025','August 2025','September 2025','October 2025','November 2025','December 2025'
];

const INITIAL_VENDOR_DATA = {};
VENDORS.forEach(v => {
  INITIAL_VENDOR_DATA[v.id] = { months: {} };
  MONTHS_LIST.forEach(m => {
    INITIAL_VENDOR_DATA[v.id].months[m] = { totalAmount: 25000, days: {} };
  });
  
  // Prep January dummy days
  const janDays = {};
  for (let i = 1; i <= 15; i++) {
    const dStr = `${i} January 2025`;
    janDays[dStr] = {
      amount: 5300,
      mode: 'Cash',
      status: i % 3 === 0 ? 'Pending' : 'Paid',
      items: [
        { item: 'Garam Masala', qty: '50', unit: 'g', rate: 2, price: 100 },
        { item: 'Rice', qty: '5', unit: 'kg', rate: 50, price: 250 },
        { item: 'Dal', qty: '2', unit: 'kg', rate: 140, price: 280 },
        { item: 'Ghee', qty: '4', unit: 'kg', rate: 300, price: 1200 },
      ]
    };
  }
  INITIAL_VENDOR_DATA[v.id].months['January 2025'].days = janDays;
});

// ─── Purchase Modal (per vendor) — multi-item ────────────────────────
function PurchaseModal({ vendor, onClose, onSave }) {
  const items = CATEGORY_ITEMS[vendor.category] || [];
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const emptyRow = () => ({ item: '', qty: '', unit: 'kg', rate: '' });
  const [rows, setRows] = useState([emptyRow()]);

  const updateRow = (idx, field, value) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);
  const removeRow = (idx) => setRows(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = rows.filter(r => r.item && r.qty && r.rate);
    if (!valid.length) return;
    
    const itemsToSave = valid.map(r => ({
      ...r,
      price: parseFloat(r.qty) * parseFloat(r.rate)
    }));
    onSave({ date, items: itemsToSave, vendorId: vendor.id });
    onClose();
  };

  const cyan2 = '#0891b2';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '20px 20px 0 0', padding: '20px 20px 32px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Handle bar */}
        <div style={{ width: 40, height: 4, background: '#e2e8f0', borderRadius: 99, margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 17, color: '#0f172a', margin: '0 0 2px' }}>Log Daily Purchase</p>
            <p style={{ fontSize: 12, color: cyan2, fontWeight: 600, margin: 0 }}>{vendor.name} · {vendor.store}</p>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', borderRadius: 8, padding: 6, display: 'flex' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#64748b' }}>close</span>
          </button>
        </div>

        {/* Date picker */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Date</label>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: cyan2, fontSize: 18, pointerEvents: 'none' }}>calendar_today</span>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              style={{ width: '100%', padding: '11px 12px 11px 40px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', color: '#0f172a' }} />
          </div>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 70px 70px 26px', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', paddingLeft: 4 }}>ITEM</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textAlign: 'center' }}>QTY/UNIT</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textAlign: 'center' }}>RATE (₹)</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textAlign: 'right', paddingRight: 4 }}>TOTAL (₹)</span>
          <span />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            {rows.map((row, idx) => {
              const rowTotal = (parseFloat(row.qty) || 0) * (parseFloat(row.rate) || 0);
              return (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 70px 70px 26px', gap: 6, alignItems: 'center' }}>
                  {/* Item dropdown */}
                  <div style={{ position: 'relative' }}>
                    {items.length > 0 ? (
                      <select value={row.item} onChange={e => updateRow(idx, 'item', e.target.value)}
                        style={{ width: '100%', padding: '10px 24px 10px 8px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', appearance: 'none', background: 'white', color: row.item ? '#0f172a' : '#94a3b8', cursor: 'pointer' }}>
                        <option value="">Select item…</option>
                        {items.map(i => <option key={i} value={i}>{i}</option>)}
                      </select>
                    ) : (
                      <input value={row.item} onChange={e => updateRow(idx, 'item', e.target.value)} placeholder="Item name"
                        style={{ width: '100%', padding: '10px 8px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    )}
                    <span className="material-symbols-outlined" style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 16, pointerEvents: 'none' }}>expand_more</span>
                  </div>

                  {/* Qty + unit dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <input type="number" min="0" step="0.1" value={row.qty} onChange={e => updateRow(idx, 'qty', e.target.value)} placeholder="Qty"
                      style={{ width: '100%', padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, textAlign: 'center', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
                    <select value={row.unit} onChange={e => updateRow(idx, 'unit', e.target.value)}
                      style={{ width: '100%', padding: '4px', border: `1.5px solid ${cyan2}`, borderRadius: 8, fontSize: 11, fontWeight: 700, color: cyan2, background: 'white', outline: 'none', textAlign: 'center', appearance: 'none', cursor: 'pointer' }}>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="litre">litre</option>
                      <option value="piece">piece</option>
                    </select>
                  </div>

                  {/* Rate */}
                  <div style={{ position: 'relative' }}>
                    <input type="number" min="0" value={row.rate} onChange={e => updateRow(idx, 'rate', e.target.value)} placeholder="Rate"
                      style={{ width: '100%', padding: '10px 4px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', fontWeight: 700, outline: 'none', boxSizing: 'border-box', color: '#0f172a', textAlign: 'center' }} />
                  </div>

                  {/* Calculated Price */}
                  <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '10px 4px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{rowTotal > 0 ? rowTotal.toFixed(0) : '-'}</span>
                  </div>

                  {/* Remove row */}
                  {rows.length > 1 ? (
                    <button type="button" onClick={() => removeRow(idx)} style={{ background: '#fee2e2', border: 'none', borderRadius: 8, padding: 5, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#ef4444' }}>remove</span>
                    </button>
                  ) : <div />}
                </div>
              );
            })}
          </div>

          {/* Add more row */}
          <button type="button" onClick={addRow}
            style={{ width: '100%', padding: '10px', background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: 10, color: '#64748b', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Add More Items
          </button>

          {/* Total preview */}
          {rows.some(r => r.qty && r.rate) && (
            <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: '#0e7490', fontWeight: 600 }}>Total ({rows.filter(r => r.qty && r.rate).length} items)</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0891b2' }}>
                ₹ {rows.reduce((s, r) => s + ((parseFloat(r.qty) || 0) * (parseFloat(r.rate) || 0)), 0).toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </span>
            </div>
          )}

          <button type="submit"
            style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#0891b2,#0e7490)', color: 'white', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 16px rgba(8,145,178,0.3)' }}>
            Save All Purchases
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function VendorTransactions() {
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('2025-02-02');
  const [toDate, setToDate] = useState('2025-02-02');
  const [categories, setCategories] = useState(['Groceries', 'Laundry', 'Vegetables', 'Dairy']);
  const [activeCategory, setActiveCategory] = useState('Groceries');
  const [purchaseModalVendor, setPurchaseModalVendor] = useState(null);
  const [vendorData, setVendorData] = useState(INITIAL_VENDOR_DATA);
  
  // Drill-down states
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Filter states
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All Payments');

  const handleAddCategory = () => {
    const newCat = window.prompt('Enter new category name:');
    if (newCat && newCat.trim() && !categories.includes(newCat.trim())) {
      setCategories([...categories, newCat.trim()]);
    }
    if (newCat) setActiveCategory(newCat.trim());
  };

  const filtered = VENDORS.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.store.toLowerCase().includes(search.toLowerCase());
    const matchCat = v.category === activeCategory;
    const matchStatus = filterStatus === 'All Payments' ? true : (filterStatus === 'Paid Payments' ? v.status === 'Paid' : v.status === 'Pending');
    return matchSearch && matchCat && matchStatus;
  });

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  
  const currentVendorData = selectedVendor ? vendorData[selectedVendor.id] : null;
  const monthlyList = currentVendorData ? Object.keys(currentVendorData.months).map(m => ({ month: m, amount: currentVendorData.months[m].totalAmount })) : [];
  const total = monthlyList.reduce((s, m) => s + m.amount, 0);

  // ── Detail View 3: Payment Details (Itemized Bill) ──
  if (selectedDate && selectedMonth && currentVendorData) {
    const dayData = currentVendorData.months[selectedMonth].days[selectedDate] || { items: [], amount: 0, status: 'Pending' };
    const receiptDetails = dayData.items;
    const totalReceipt = receiptDetails.reduce((s, r) => s + r.price, 0);
    const paidReceipt = dayData.status === 'Paid' ? totalReceipt : (totalReceipt > 2000 ? 2000 : 0);
    const pendingReceipt = totalReceipt - paidReceipt;

    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setSelectedDate(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Payment Details</p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: 16 }}>
          {/* Top Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
            <div style={{ background: 'white', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#16a34a', fontSize: 20, marginBottom: 4 }}>check_circle</span>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#16a34a', margin: '0 0 2px' }}>₹ {paidReceipt.toLocaleString('en-IN')}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#4ade80', margin: 0 }}>Paid Amount</p>
            </div>
            <div style={{ background: 'white', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: 20, marginBottom: 4 }}>error</span>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#ef4444', margin: '0 0 2px' }}>₹ {pendingReceipt.toLocaleString('en-IN')}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#f87171', margin: 0 }}>Pending Amount</p>
            </div>
            <div style={{ background: 'white', border: '1px solid #a5f3fc', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 20, marginBottom: 4 }}>account_balance_wallet</span>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>₹ {totalReceipt.toLocaleString('en-IN')}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
            </div>
          </div>

          <div style={{ background: '#0891b2', padding: '10px 16px', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <p style={{ margin: 0, color: 'white', fontSize: 14, fontWeight: 700 }}>{selectedDate.replace('January', '01').replace(' 2025', '/2025').replace(' ', '/')}</p>
          </div>
          <div style={{ background: 'white', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px solid #e2e8f0', borderTop: 'none', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {receiptDetails.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flex: 1 }}>
                    <span style={{ fontSize: 14, color: '#475569', fontWeight: 500, width: '45%' }}>{r.item} <span style={{color: '#cbd5e1'}}>:</span></span>
                    <span style={{ fontSize: 14, color: '#0f172a', fontWeight: 600 }}>{r.qty}{r.unit}</span>
                  </div>
                  <span style={{ fontSize: 14, color: '#0f172a', fontWeight: 700 }}>₹ {r.price}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px dashed #cbd5e1', margin: '16px 0', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 15, color: '#0f172a', fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 16, color: '#0f172a', fontWeight: 800 }}>₹ {totalReceipt.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: '#16a34a', fontWeight: 600 }}>Paid</span>
                <span style={{ fontSize: 14, color: '#16a34a', fontWeight: 700 }}>₹ {paidReceipt.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 600 }}>Pending</span>
                <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>₹ {pendingReceipt.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Detail View 2: Vendor Transactions (Day List) ──
  if (selectedMonth && currentVendorData) {
    const monthData = currentVendorData.months[selectedMonth];
    const dailyList = Object.keys(monthData.days).map(d => ({ date: d, ...monthData.days[d] }));
    
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setSelectedMonth(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Vendor Transaction</p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ background: 'white', border: '1.5px solid #0891b2', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>₹ {monthData.totalAmount.toLocaleString('en-IN')}</p>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            {dailyList.map((txn, i) => (
              <div key={i} onClick={() => setSelectedDate(txn.date)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < dailyList.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ background: '#ecfeff', padding: 8, borderRadius: 10, display: 'flex' }}>
                    <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 18 }}>receipt_long</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{txn.date}</p>
                    <p style={{ fontSize: 12, color: '#64748b', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-symbols-outlined" style={{fontSize: 14}}>payments</span> Payment Mode: {txn.mode}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>₹ {txn.amount.toLocaleString('en-IN')}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, color: txn.status === 'Paid' ? '#16a34a' : '#ef4444' }}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Detail View 1 (monthly payment list) ──
  if (selectedVendor) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Monthly Payment List</p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: 16 }}>
          {/* Vendor chip */}
          <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg,#0891b2,#0e7490)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'white' }}>store</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 2px' }}>{selectedVendor.name}</p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{selectedVendor.store}</p>
              </div>
            </div>
            <button
              onClick={() => setPurchaseModalVendor(selectedVendor)}
              style={{ padding: '8px 12px', background: '#ecfeff', border: '1.5px solid #a5f3fc', borderRadius: 10, color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontWeight: 700, fontSize: 12 }}
              title="Log Daily Purchase"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add_shopping_cart</span>
              Add
            </button>
          </div>

          <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 10 }}>Filter By</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[{ label: 'From Date', val: fromDate, set: setFromDate }, { label: 'To Date', val: toDate, set: setToDate }].map(f => (
              <label key={f.label} style={{ display: 'block', background: 'white', border: '1.5px solid #0891b2', borderRadius: 10, padding: '10px 12px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 18 }}>calendar_month</span>
                  <div>
                    <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>{f.label}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: 0 }}>{fmtDate(f.val)}</p>
                  </div>
                </div>
                <input type="date" value={f.val} onChange={e => f.set(e.target.value)} style={{ display: 'none' }} />
              </label>
            ))}
          </div>

          <div style={{ background: 'white', border: '1.5px solid #0891b2', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>₹ {total.toLocaleString('en-IN')}</p>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            {monthlyList.map((row, i) => (
              <div key={i} onClick={() => setSelectedMonth(row.month)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < monthlyList.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 18 }}>calendar_month</span>
                  <span style={{ fontSize: 14, color: '#1e293b', fontWeight: 500 }}>{row.month}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 700, color: '#0f172a' }}>₹ {row.amount.toLocaleString('en-IN')}</span>
                  <span className="material-symbols-outlined" style={{ color: '#cbd5e1', fontSize: 18 }}>chevron_right</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Purchase Modal */}
        {purchaseModalVendor && (
          <PurchaseModal
            vendor={purchaseModalVendor}
            onClose={() => setPurchaseModalVendor(null)}
            onSave={(data) => {
              const { date, items, vendorId } = data;
              setVendorData(prev => {
                const newData = JSON.parse(JSON.stringify(prev)); // Deep copy for simplicity
                const vData = newData[vendorId];
                
                const d = new Date(date);
                const monthName = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
                const dateString = `${d.getDate()} ${monthName}`; // format matching dummy data (e.g., '1 January 2025')
                
                if (!vData.months[monthName]) {
                  vData.months[monthName] = { totalAmount: 0, days: {} };
                }
                
                const monthData = vData.months[monthName];
                if (!monthData.days[dateString]) {
                  monthData.days[dateString] = { amount: 0, mode: 'Cash', status: 'Pending', items: [] };
                }
                
                const dayData = monthData.days[dateString];
                const totalNewPrice = items.reduce((s, it) => s + it.price, 0);
                
                dayData.items.push(...items);
                dayData.amount += totalNewPrice;
                monthData.totalAmount += totalNewPrice;
                
                return newData;
              });
            }}
          />
        )}
      </div>
    );
  }

  // ── List View ──
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/manage-account')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Vendor Account</p>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b', margin: 0 }}>Payment History</p>
          <button onClick={() => setFilterOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', border: '1px solid #cbd5e1', borderRadius: 20, padding: '6px 12px', fontSize: 13, fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}>
            {filterStatus} <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#0891b2' }}>expand_more</span>
          </button>
        </div>

        <div style={{ background: 'white', border: '1.5px solid #0891b2', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>₹ 2,000,000</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Vendor"
            style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12, marginBottom: 16, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: activeCategory === cat ? 'none' : '1px solid #cbd5e1', background: activeCategory === cat ? '#0891b2' : 'white', color: activeCategory === cat ? 'white' : '#64748b', transition: 'all 0.2s', boxShadow: activeCategory === cat ? '0 4px 6px -1px rgba(8,145,178,0.2)' : 'none' }}>
              {cat}
            </button>
          ))}
          <button onClick={handleAddCategory}
            style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: '1.5px dashed #0891b2', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>New Tab
          </button>
        </div>

        {/* Vendor list — each vendor has its own Log Purchase button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ background: 'white', borderRadius: 16, padding: '32px 16px', textAlign: 'center', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
              No vendors found for {activeCategory}
            </div>
          ) : (
            filtered.map(v => (
              <div key={v.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {/* Vendor info row */}
                <div onClick={() => setSelectedVendor(v)}
                  style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 4px' }}>{v.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0891b2' }}>store</span>
                      <span style={{ fontSize: 13, color: '#64748b' }}>{v.store}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0891b2' }}>phone</span>
                      <span style={{ fontSize: 13, color: '#64748b' }}>{v.phone}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                    <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 4px' }}>₹ {v.amount}</p>
                    <span style={{ fontSize: 12, fontWeight: 600, color: v.status === 'Paid' ? '#059669' : '#e11d48', background: v.status === 'Paid' ? '#dcfce7' : '#fee2e2', padding: '3px 10px', borderRadius: 20 }}>{v.status}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      </div>      {/* Filter Bottom Sheet */}
      {filterOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(3px)' }}
          onClick={e => { if (e.target === e.currentTarget) setFilterOpen(false); }}>
          <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '24px 24px 0 0', padding: '24px', animation: 'slideUp 0.3s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#0f172a' }}>Filter by</h2>
              <button onClick={() => setFilterOpen(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#64748b' }}>close</span>
              </button>
            </div>
            
            <p style={{ fontSize: 14, fontWeight: 600, color: '#64748b', marginBottom: 12 }}>Payment Status</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {['All Payments', 'Paid Payments', 'Pending Payments'].map(status => (
                <label key={status} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${filterStatus === status ? '#0891b2' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {filterStatus === status && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0891b2' }} />}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>{status}</span>
                  <input type="radio" name="paymentStatus" checked={filterStatus === status} onChange={() => setFilterStatus(status)} style={{ display: 'none' }} />
                </label>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setFilterOpen(false)} style={{ flex: 1, padding: '14px', background: 'white', border: '1.5px solid #cbd5e1', borderRadius: 12, fontSize: 15, fontWeight: 700, color: '#475569', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setFilterOpen(false)} style={{ flex: 1, padding: '14px', background: '#0891b2', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(8,145,178,0.2)' }}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
