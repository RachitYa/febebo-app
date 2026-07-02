import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VENDORS = [
  { id: 1, name: 'Sunil Kumar Vendor', store: 'The Local Market',    phone: '+919234876543', amount: '5,000',  status: 'Paid', category: 'Groceries' },
  { id: 2, name: 'Akash Kumar Vendor', store: 'Daily Harvest Store', phone: '+919123456789', amount: '3,000',  status: 'Paid', category: 'Vegetables' },
  { id: 3, name: 'Sunil Kumar Vendor', store: 'The Local Market',    phone: '+919234876543', amount: '5,000',  status: 'Paid', category: 'Laundry' },
  { id: 4, name: 'Akash Kumar Vendor', store: 'Daily Harvest Store', phone: '+919123456789', amount: '3,000',  status: 'Paid', category: 'Dairy' },
  { id: 5, name: 'Sunil Kumar Vendor', store: 'The Local Market',    phone: '+919234876543', amount: '5,000',  status: 'Paid', category: 'Groceries' },
  { id: 6, name: 'Akash Kumar Vendor', store: 'Daily Harvest Store', phone: '+919123456789', amount: '3,000',  status: 'Pending', category: 'Vegetables' },
];

const MONTHLY_DATA = [
  { month: 'January 2025',   amount: '25,000' },
  { month: 'February 2025',  amount: '25,000' },
  { month: 'March 2025',     amount: '25,000' },
  { month: 'April 2025',     amount: '25,000' },
  { month: 'May 2025',       amount: '25,000' },
  { month: 'June 2025',      amount: '25,000' },
  { month: 'July 2025',      amount: '25,000' },
  { month: 'August 2025',    amount: '25,000' },
  { month: 'September 2025', amount: '25,000' },
  { month: 'October 2025',   amount: '25,000' },
  { month: 'November 2025',  amount: '25,000' },
  { month: 'December 2025',  amount: '25,000' },
];

export default function VendorTransactions() {
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('2025-02-02');
  const [toDate, setToDate] = useState('2025-02-02');

  const [categories, setCategories] = useState(['Groceries', 'Laundry', 'Vegetables', 'Dairy']);
  const [activeCategory, setActiveCategory] = useState('Groceries');
  
  // State for the new purchase modal
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleAddCategory = () => {
    const newCat = window.prompt("Enter new category name:");
    if (newCat && newCat.trim()) {
      const trimmed = newCat.trim();
      if (!categories.includes(trimmed)) {
        setCategories([...categories, trimmed]);
      }
      setActiveCategory(trimmed);
    }
  };

  const filtered = VENDORS.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.store.toLowerCase().includes(search.toLowerCase());
    const matchCategory = v.category === activeCategory || !v.category; // fallback for unassigned
    return matchSearch && matchCategory;
  });

  // ── Detail View ──
  if (selectedVendor) {
    const fmtDate = (d) => {
      const dt = new Date(d);
      return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    const total = MONTHLY_DATA.reduce((s, m) => s + parseInt(m.amount.replace(',', '')), 0);

    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setSelectedVendor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex', alignItems: 'center' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Monthly Payment List</p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: '16px' }}>
          {/* Filter By */}
          <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 10 }}>Filter By</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[{ label: 'From Date', key: 'from', val: fromDate, set: setFromDate }, { label: 'To Date', key: 'to', val: toDate, set: setToDate }].map(f => (
              <label key={f.key} style={{ display: 'block', background: 'white', border: '1.5px solid #0891b2', borderRadius: 10, padding: '10px 12px', cursor: 'pointer' }}>
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

          {/* Total Amount */}
          <div style={{ background: 'white', border: '1.5px solid #0891b2', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>₹ {total.toLocaleString('en-IN')}</p>
          </div>

          {/* Monthly List */}
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
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/manage-account')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Vendor Account</p>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        
        {/* Log Purchase Button */}
        <button
          onClick={() => setShowPurchaseModal(true)}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #0891b2, #0e7490)', color: 'white', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 12px rgba(8,145,178,0.2)' }}
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
          Log Daily Purchase
        </button>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Vendor"
            style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Sub Tabs */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 16, marginBottom: 16, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                whiteSpace: 'nowrap',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                border: activeCategory === cat ? 'none' : '1px solid #cbd5e1',
                background: activeCategory === cat ? '#0891b2' : 'white',
                color: activeCategory === cat ? 'white' : '#64748b',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat ? '0 4px 6px -1px rgba(8,145,178,0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={handleAddCategory}
            style={{
              whiteSpace: 'nowrap',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              border: '1.5px dashed #0891b2',
              background: '#ecfeff',
              color: '#0891b2',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            New Tab
          </button>
        </div>

        {/* Vendor List */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: '#94a3b8' }}>
              No vendors found for this category
            </div>
          ) : (
            filtered.map((v, i) => (
              <div
                key={v.id}
                onClick={() => setSelectedVendor(v)}
                style={{ padding: '14px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
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
                  <span style={{ fontSize: 13, fontWeight: 600, color: v.status === 'Paid' ? '#059669' : '#e11d48' }}>{v.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Daily Purchase Modal */}
      {showPurchaseModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '20px 20px 0 0', padding: '24px 20px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0 }}>Log {activeCategory} Purchase</p>
              <button onClick={() => setShowPurchaseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              setShowPurchaseModal(false); 
              alert('Purchase logged successfully! Vendor balance and Kitchen Report have been updated.'); 
            }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Date</label>
                <input type="date" required defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Vendor Name</label>
                <select required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', appearance: 'auto' }}>
                  <option value="">Select Vendor</option>
                  {VENDORS.filter(v => v.category === activeCategory).map(v => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Item Purchased</label>
                <input placeholder="e.g., Potatoes, Milk, Detergent" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Quantity</label>
                  <input placeholder="e.g., 5 kg" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Total Price (₹)</label>
                  <input type="number" placeholder="0" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <button type="submit" style={{ width: '100%', padding: '16px', background: '#0891b2', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Save & Update Records
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
