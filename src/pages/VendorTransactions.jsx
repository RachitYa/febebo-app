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

const MONTHLY_DATA = [
  'January 2025','February 2025','March 2025','April 2025','May 2025','June 2025',
  'July 2025','August 2025','September 2025','October 2025','November 2025','December 2025',
].map(m => ({ month: m, amount: '25,000' }));

// ─── Purchase Modal (per vendor) — multi-item ────────────────────────
function PurchaseModal({ vendor, onClose, onSave }) {
  const items = CATEGORY_ITEMS[vendor.category] || [];
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const emptyRow = () => ({ item: '', qty: '', unit: 'kg', price: '' });
  const [rows, setRows] = useState([emptyRow()]);

  const updateRow = (idx, field, value) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  };

  const addRow = () => setRows(prev => [...prev, emptyRow()]);
  const removeRow = (idx) => setRows(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = rows.filter(r => r.item && r.qty && r.price);
    if (!valid.length) return;
    valid.forEach(r => onSave({ date, ...r, vendorId: vendor.id }));
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 70px 26px', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', paddingLeft: 4 }}>ITEM</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textAlign: 'center' }}>QTY / UNIT</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textAlign: 'right', paddingRight: 4 }}>PRICE (₹)</span>
          <span />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            {rows.map((row, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* Item dropdown */}
                <div style={{ flex: 1, position: 'relative' }}>
                  {items.length > 0 ? (
                    <select value={row.item} onChange={e => updateRow(idx, 'item', e.target.value)}
                      style={{ width: '100%', padding: '10px 28px 10px 10px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', appearance: 'none', background: 'white', color: row.item ? '#0f172a' : '#94a3b8', cursor: 'pointer' }}>
                      <option value="">Select item…</option>
                      {items.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  ) : (
                    <input value={row.item} onChange={e => updateRow(idx, 'item', e.target.value)} placeholder="Item name"
                      style={{ width: '100%', padding: '10px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  )}
                  <span className="material-symbols-outlined" style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 16, pointerEvents: 'none' }}>expand_more</span>
                </div>

                {/* Qty + unit toggle */}
                <div style={{ width: 90, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <input type="number" min="0" step="0.1" value={row.qty} onChange={e => updateRow(idx, 'qty', e.target.value)} placeholder="0"
                    style={{ width: '100%', padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, textAlign: 'center', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', borderRadius: 8, border: `1.5px solid ${cyan2}`, overflow: 'hidden' }}>
                    {['kg', 'g'].map(u => (
                      <button key={u} type="button" onClick={() => updateRow(idx, 'unit', u)}
                        style={{ flex: 1, padding: '4px 0', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, fontFamily: 'inherit', background: row.unit === u ? cyan2 : 'white', color: row.unit === u ? 'white' : cyan2, transition: 'all 0.15s' }}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div style={{ width: 70, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 7, top: '50%', transform: 'translateY(-50%)', color: cyan2, fontWeight: 700, fontSize: 13, pointerEvents: 'none' }}>₹</span>
                  <input type="number" min="0" value={row.price} onChange={e => updateRow(idx, 'price', e.target.value)} placeholder="0"
                    style={{ width: '100%', padding: '10px 6px 10px 20px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', fontWeight: 700, outline: 'none', boxSizing: 'border-box', color: '#0f172a' }} />
                </div>

                {/* Remove row */}
                {rows.length > 1 ? (
                  <button type="button" onClick={() => removeRow(idx)} style={{ background: '#fee2e2', border: 'none', borderRadius: 8, padding: 5, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#ef4444' }}>remove</span>
                  </button>
                ) : <div style={{ width: 26 }} />}
              </div>
            ))}
          </div>

          {/* Add more row */}
          <button type="button" onClick={addRow}
            style={{ width: '100%', padding: '10px', background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: 10, color: '#64748b', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Add More Items
          </button>

          {/* Total preview */}
          {rows.some(r => r.price) && (
            <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: '#0e7490', fontWeight: 600 }}>Total ({rows.filter(r => r.price).length} items)</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0891b2' }}>
                ₹ {rows.reduce((s, r) => s + (parseFloat(r.price) || 0), 0).toLocaleString('en-IN')}
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
  const [logs, setLogs] = useState([]);

  const handleAddCategory = () => {
    const newCat = window.prompt('Enter new category name:');
    if (newCat && newCat.trim() && !categories.includes(newCat.trim())) {
      setCategories([...categories, newCat.trim()]);
    }
    if (newCat) setActiveCategory(newCat.trim());
  };

  const filtered = VENDORS.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.store.toLowerCase().includes(search.toLowerCase());
    return matchSearch && v.category === activeCategory;
  });

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const total = MONTHLY_DATA.reduce((s, m) => s + parseInt(m.amount.replace(',', '')), 0);

  // ── Detail View (monthly payment list) ──
  if (selectedVendor) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Monthly Payments</p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: 16 }}>
          {/* Vendor chip */}
          <div style={{ background: 'white', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg,#0891b2,#0e7490)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'white' }}>store</span>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 2px' }}>{selectedVendor.name}</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{selectedVendor.store}</p>
            </div>
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
            {MONTHLY_DATA.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < MONTHLY_DATA.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 18 }}>calendar_month</span>
                  <span style={{ fontSize: 14, color: '#1e293b', fontWeight: 500 }}>{row.month}</span>
                </div>
                <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 700, color: '#0f172a' }}>₹ {row.amount}</span>
              </div>
            ))}
          </div>
        </div>
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

                {/* Per-vendor Log Purchase button */}
                <div style={{ borderTop: '1px solid #f1f5f9', padding: '10px 16px' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setPurchaseModalVendor(v); }}
                    style={{ width: '100%', padding: '10px', background: '#ecfeff', border: '1.5px solid #a5f3fc', borderRadius: 10, color: '#0891b2', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add_shopping_cart</span>
                    Log Daily Purchase
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recent purchase logs */}
        {logs.filter(l => VENDORS.find(v => v.id === l.vendorId)?.category === activeCategory).length > 0 && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 10 }}>Recent Logs — {activeCategory}</p>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              {logs.filter(l => VENDORS.find(v => v.id === l.vendorId)?.category === activeCategory).map((log, i, arr) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: '0 0 2px' }}>{log.item}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>{fmtDate(log.date)} · {log.qty}{log.unit}</p>
                    </div>
                    <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 14, color: '#0891b2' }}>₹ {parseInt(log.price).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Per-vendor Purchase Modal */}
      {purchaseModalVendor && (
        <PurchaseModal
          vendor={purchaseModalVendor}
          onClose={() => setPurchaseModalVendor(null)}
          onSave={(entry) => setLogs(prev => [entry, ...prev])}
        />
      )}
    </div>
  );
}
