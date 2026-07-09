import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MODULES = [
  { id: 'total-rents',   label: 'Total\nRents',         icon: 'account_balance_wallet', gradient: 'linear-gradient(135deg,#0ea5e9,#0891b2)' },
  { id: 'vendor',        label: 'Vendor\nAccount',       icon: 'local_shipping',         gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
  { id: 'profit-loss',   label: 'Profit-Loss\nAccount', icon: 'trending_up',            gradient: 'linear-gradient(135deg,#10b981,#059669)' },
  { id: 'user-account',  label: 'User\nAccount',         icon: 'groups',                 gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { id: 'staff-account', label: 'Staff\nAccount',        icon: 'badge',                  gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
  { id: 'lease-account', label: 'Lease\nAccount',        icon: 'receipt_long',           gradient: 'linear-gradient(135deg,#64748b,#475569)' },
];

const RENT_DATA = {
  upcoming: [
    { name: 'Rahul Rastogi',  room: '103', amount: '8,000',  date: 'Due: 10 Jul 2025', initials: 'RR', color: '#6366f1' },
    { name: 'Priya Sharma',   room: '202', amount: '6,500',  date: 'Due: 12 Jul 2025', initials: 'PS', color: '#0891b2' },
    { name: 'Ravi Mehta',     room: '301', amount: '7,000',  date: 'Due: 15 Jul 2025', initials: 'RM', color: '#059669' },
    { name: 'Sneha Kapoor',   room: '205', amount: '9,000',  date: 'Due: 18 Jul 2025', initials: 'SK', color: '#d97706' },
  ],
  pending: [
    { name: 'Amit Sachdeva',  room: '104', amount: '10,000', date: 'Was Due: 5 Jun 2025',  initials: 'AS', color: '#e11d48' },
    { name: 'Nikhil Bose',    room: '108', amount: '8,000',  date: 'Was Due: 10 Jun 2025', initials: 'NB', color: '#dc2626' },
    { name: 'Karan Singh',    room: '201', amount: '7,500',  date: 'Was Due: 15 Jun 2025', initials: 'KS', color: '#b91c1c' },
  ],
  collected: [
    { name: 'Deepak Verma',   room: '102', amount: '8,000',  date: 'Paid: 2 Jun 2025',  initials: 'DV', color: '#059669' },
    { name: 'Anjali Rao',     room: '106', amount: '6,000',  date: 'Paid: 5 Jun 2025',  initials: 'AR', color: '#10b981' },
    { name: 'Suresh Nair',    room: '304', amount: '9,500',  date: 'Paid: 8 Jun 2025',  initials: 'SN', color: '#34d399' },
    { name: 'Meena Joshi',    room: '401', amount: '7,000',  date: 'Paid: 10 Jun 2025', initials: 'MJ', color: '#059669' },
  ],
};

const TABS = [
  { key: 'upcoming',  label: 'Upcoming Rent',  color: '#0891b2' },
  { key: 'pending',   label: 'Pending',         color: '#e11d48' },
  { key: 'collected', label: 'Collected',        color: '#059669' },
];

const PROFIT_LOSS_DATA = [
  { id: 'jul25', month: 'July 2025', net: 5000, type: 'profit', details: { rent: 25000, staff: 10000, inventory: 5000, maintenance: 5000 } },
  { id: 'aug25', month: 'August 2025', net: -2000, type: 'loss', details: { rent: 20000, staff: 10000, inventory: 8000, maintenance: 4000 } },
  { id: 'sep25', month: 'September 2025', net: 8000, type: 'profit', details: { rent: 28000, staff: 10000, inventory: 6000, maintenance: 4000 } },
];

const USER_DATA = [
  { id: 1, name: 'Ravi Kumar', room: '102', bed: '2', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
  { id: 2, name: 'Ravi Kumar', room: '103', bed: '3', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 3, name: 'Ravi Kumar', room: '102', bed: '2', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop' },
];

const STAFF_DATA = [
  { id: 1, name: 'Sachin Kumar', empId: '#1234567', role: 'House Keeping', email: 'sachin@gmail.com', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
  { id: 2, name: 'Sachin Kumar', empId: '#1234567', role: 'House Keeping', email: 'sachin@gmail.com', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
];

const LEASE_DATA = [
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
];

export default function ManageAccount() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null); // 'total-rents' or 'profit-loss' or null
  const [rentTab, setRentTab] = useState('upcoming');
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleModule = (id) => {
    if (id === 'vendor') { navigate('/vendor-transactions'); return; }
    if (['total-rents', 'profit-loss', 'user-account', 'staff-account', 'lease-account'].includes(id)) {
      setActiveModule(id);
      setSearch('');
      setSelectedMonth(null);
      return;
    }
  };

  const currentData = (RENT_DATA[rentTab] || []).filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.room.includes(search)
  );

  const activeTab = TABS.find(t => t.key === rentTab) || TABS[0];

  if (activeModule === 'total-rents') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Total Rents</p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: '16px' }}>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tenant or room..."
              style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setRentTab(tab.key); setSearch(''); }}
                style={{
                  flex: 1, padding: '10px 4px',
                  border: `1.5px solid ${rentTab === tab.key ? tab.color : '#e2e8f0'}`,
                  borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit',
                  background: rentTab === tab.key ? tab.color : 'white',
                  color: rentTab === tab.key ? 'white' : '#64748b',
                  transition: 'all 0.2s', whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Summary pill */}
          <div style={{ background: `${activeTab.color}15`, border: `1px solid ${activeTab.color}40`, borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: activeTab.color, fontSize: 18 }}>
                {rentTab === 'pending' ? 'pending_actions' : rentTab === 'collected' ? 'check_circle' : 'upcoming'}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: activeTab.color }}>{activeTab.label}</span>
            </div>
            <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: activeTab.color }}>
              ₹ {currentData.reduce((s, t) => s + parseInt((t.amount || '0').replace(/,/g, '')), 0).toLocaleString('en-IN')}
            </span>
          </div>

          {/* List */}
          {currentData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', background: 'white', borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 8, color: '#cbd5e1' }}>search_off</span>
              <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>No results found</p>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              {currentData.map((t, i) => (
                <div key={i} onClick={() => navigate(`/user/${t.id || i+1}`, { state: { user: { id: t.id || i+1, name: t.name, room: t.room, img: t.img, pending: rentTab === 'pending' ? parseInt((t.amount || '0').replace(/,/g, '')) : 0, token: parseInt((t.amount || '0').replace(/,/g, '')) } } })} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 16px', borderBottom: i < currentData.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: t.color || '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, margin: 0 }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>Room {t.room}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 15, margin: 0, color: rentTab === 'pending' ? '#e11d48' : rentTab === 'collected' ? '#059669' : '#0f172a' }}>₹ {t.amount}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 'profit-loss') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => selectedMonth ? setSelectedMonth(null) : setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>
            {selectedMonth ? selectedMonth.month : 'Profit & Loss'}
          </p>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: '16px' }}>
          {selectedMonth ? (
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', background: selectedMonth.type === 'profit' ? '#f0fdf4' : '#fff1f2' }}>
                 <p style={{ fontSize: 13, fontWeight: 600, color: selectedMonth.type === 'profit' ? '#059669' : '#e11d48', marginBottom: 4 }}>Net {selectedMonth.type === 'profit' ? 'Profit' : 'Loss'}</p>
                 <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: selectedMonth.type === 'profit' ? '#059669' : '#e11d48', margin: 0 }}>
                   ₹{Math.abs(selectedMonth.net).toLocaleString('en-IN')}
                 </p>
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Breakdown</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, color: '#64748b' }}>Rent Collected</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#059669' }}>+ ₹{selectedMonth.details.rent.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, color: '#64748b' }}>Paid to Staff</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e11d48' }}>- ₹{selectedMonth.details.staff.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, color: '#64748b' }}>Inventory</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e11d48' }}>- ₹{selectedMonth.details.inventory.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, color: '#64748b' }}>Maintenance</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e11d48' }}>- ₹{selectedMonth.details.maintenance.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              {PROFIT_LOSS_DATA.map((item, i) => (
                <div key={item.id} onClick={() => setSelectedMonth(item)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: i < PROFIT_LOSS_DATA.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                     <div style={{ width: 40, height: 40, borderRadius: 10, background: item.type === 'profit' ? '#ecfdf5' : '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <span className="material-symbols-outlined" style={{ color: item.type === 'profit' ? '#059669' : '#e11d48' }}>{item.type === 'profit' ? 'trending_up' : 'trending_down'}</span>
                     </div>
                     <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>{item.month}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, margin: 0, color: item.type === 'profit' ? '#059669' : '#e11d48' }}>
                      ₹{Math.abs(item.net).toLocaleString('en-IN')}
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0', textTransform: 'capitalize' }}>{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeModule === 'user-account') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <p style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>User Account</p>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Product" style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {USER_DATA.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
              <div key={u.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px', display: 'flex', gap: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <img src={u.img} alt={u.name} style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                  <p style={{ fontWeight: 600, fontSize: 16, color: '#000', margin: 0 }}>{u.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>door_front</span> Room No: {u.room}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>bed</span> Bed No: {u.bed}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>phone_in_talk</span> {u.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 'staff-account') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <p style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>Staff Account</p>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Product" style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {STAFF_DATA.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
              <div key={u.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px', display: 'flex', gap: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <img src={u.img} alt={u.name} style={{ width: 100, height: 120, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                  <p style={{ fontWeight: 600, fontSize: 16, color: '#000', margin: 0 }}>{u.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>badge</span> {u.empId}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>person</span> {u.role}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>mail</span> {u.email}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}><span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>phone_in_talk</span> {u.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === 'lease-account') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => setActiveModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <p style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>Lease Amount</p>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ padding: '16px' }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Filter By</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[{ label: 'From Date', val: '2025-02-02' }, { label: 'To Date', val: '2025-02-02' }].map((f, idx) => (
              <label key={idx} style={{ display: 'block', background: 'white', border: '1.5px solid #0891b2', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 22, fontWeight: 300 }}>calendar_month</span>
                  <div>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{f.label}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0891b2', margin: 0 }}>2 Feb 2025</p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div style={{ background: 'white', border: '1.5px solid #0891b2', borderRadius: 8, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: '#333', margin: 0 }}>₹ 2,000,000</p>
          </div>

          <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            {LEASE_DATA.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: i < LEASE_DATA.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 18, fontWeight: 300 }}>calendar_month</span>
                  <span style={{ fontSize: 15, color: '#000', fontWeight: 500 }}>{row.month}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>₹ {row.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Main Account Overview ──
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif" }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/admin-dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>Account</p>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
          <input
            placeholder="Search accounts..."
            style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Module Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {MODULES.map(mod => (
            <button
              key={mod.id}
              onClick={() => handleModule(mod.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(0.96)'}
              onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: mod.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'white' }}>{mod.icon}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{mod.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
