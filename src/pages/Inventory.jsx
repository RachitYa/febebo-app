import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Data ───────────────────────────────────────────────────────
const USERS = [
  { id: 1, name: 'Ravi Kumar',  phone: '+91 9234567681', bed: 'Bed No. 4', room: 'Room No. 15', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&face' },
  { id: 2, name: 'Priya Sharma',phone: '+91 9234567682', bed: 'Bed No. 2', room: 'Room No. 10', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&face' },
  { id: 3, name: 'Amit Verma',  phone: '+91 9234567683', bed: 'Bed No. 1', room: 'Room No. 5',  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&face' },
  { id: 4, name: 'Sneha Kapoor',phone: '+91 9234567684', bed: 'Bed No. 3', room: 'Room No. 8',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&face' },
  { id: 5, name: 'Karan Singh', phone: '+91 9234567685', bed: 'Bed No. 2', room: 'Room No. 12', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&face' },
];

const STAFF = [
  { id: 1, name: 'Sachin Kumar', empId: '#1234567', role: 'Manager',       phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&face' },
  { id: 2, name: 'Rahul Mehta',  empId: '#1234568', role: 'Cafe',          phone: '+91 9234567682', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&face' },
  { id: 3, name: 'Deepak Nair',  empId: '#1234569', role: 'Laundry Wala',  phone: '+91 9234567683', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop&face' },
  { id: 4, name: 'Vijay Sharma', empId: '#1234570', role: 'House Keeping', phone: '+91 9234567684', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&face' },
  { id: 5, name: 'Suresh Rao',   empId: '#1234571', role: 'House Keeping', phone: '+91 9234567685', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&face' },
];

const ALLOTTED_ITEMS = [
  { name: 'Bed',       icon: 'bed',                qty: 1 },
  { name: 'Mattress',  icon: 'airline_seat_flat',  qty: 1 },
  { name: 'Bedsheet',  icon: 'layers',             qty: 2 },
  { name: 'Pillow',    icon: 'weekend',            qty: 4 },
  { name: 'Chair',     icon: 'chair',              qty: 2 },
  { name: 'Almirah',   icon: 'door_sliding',       qty: 1 },
  { name: 'Kettle',    icon: 'coffee_maker',       qty: 1 },
  { name: 'Table',     icon: 'table_restaurant',   qty: 1 },
];

const PG_ITEMS = [
  { name: 'Bed',              icon: 'bed',                   qty: 100 },
  { name: 'Mattress',         icon: 'airline_seat_flat',     qty: 100 },
  { name: 'Bedsheet',         icon: 'layers',                qty: 100 },
  { name: 'Pillow',           icon: 'weekend',               qty: 100 },
  { name: 'Washing Machine',  icon: 'local_laundry_service', qty: 100 },
  { name: 'Chair',            icon: 'chair',                 qty: 100 },
  { name: 'Almirah',          icon: 'door_sliding',          qty: 100 },
  { name: 'Kettle',           icon: 'coffee_maker',          qty: 100 },
  { name: 'Table',            icon: 'table_restaurant',      qty: 100 },
  { name: 'Chilled R.O Water',icon: 'water_drop',            qty: 100 },
  { name: 'Wi-fi',            icon: 'wifi',                  qty: 100 },
  { name: 'Fridge',           icon: 'kitchen',               qty: 100 },
  { name: 'Attach Balcony',   icon: 'balcony',               qty: 100 },
  { name: 'T.V',              icon: 'tv',                    qty: 100 },
  { name: 'Dining Table',     icon: 'table_bar',             qty: 100 },
  { name: 'Living Area',      icon: 'living',                qty: 100 },
  { name: 'Microwave',        icon: 'microwave',             qty: 100 },
  { name: 'Pillow Cover',     icon: 'king_bed',              qty: 100 },
  { name: 'Gas Stove',        icon: 'outdoor_grill',         qty: 100 },
  { name: 'Attach Bathroom',  icon: 'bathroom',              qty: 100 },
];

const MODULES = [
  { id: 'user-inventory',    label: 'User\nInventory',    icon: 'groups',       gradient: 'linear-gradient(135deg,#0ea5e9,#0891b2)' },
  { id: 'kitchen-inventory', label: 'Kitchen\nInventory', icon: 'kitchen',      gradient: 'linear-gradient(135deg,#6366f1,#4f46e5)' },
  { id: 'pg-inventory',      label: 'PG\nInventory',      icon: 'apartment',    gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
  { id: 'room-inventory',    label: 'Room\nInventory',    icon: 'meeting_room', gradient: 'linear-gradient(135deg,#10b981,#059669)' },
  { id: 'staff-inventory',   label: 'Staff\nInventory',   icon: 'badge',        gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { id: 'kitchen-report',    label: 'Kitchen\nReport',    icon: 'bar_chart',    gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
];

const s = { base: { maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 } };

// ─── Header component ─────────────────────────────────────────────
function Header({ title, onBack, action }) {
  return (
    <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0891b2', display: 'flex', alignItems: 'center' }}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0, flex: 1, textAlign: 'center' }}>{title}</p>
      {action || <div style={{ width: 32 }} />}
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: 'relative', marginBottom: 16 }}>
      <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
      <input value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 12, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  );
}

// ─── Allotted Inventory Detail (shared for user + staff) ──────────
function AllottedInventory({ person, isStaff, onBack }) {
  const [items, setItems] = useState(ALLOTTED_ITEMS.map(i => ({ ...i })));

  const updateQty = (idx, delta) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + delta) } : it));
  };

  return (
    <div style={s.base}>
      <Header
        title="Allotted Inventory"
        onBack={onBack}
        action={
          <button style={{ background: '#0891b2', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Save
          </button>
        }
      />
      <div style={{ padding: 16 }}>
        {/* Person card */}
        <div style={{ background: '#0891b2', borderRadius: 16, padding: '16px', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
          <img src={person.img} alt={person.name} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'white', margin: '0 0 4px' }}>{person.name}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>phone</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{person.phone}</span>
            </div>
            {isStaff ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>badge</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{person.empId}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>person</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{person.role}</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>bed</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{person.bed}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>meeting_room</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{person.room}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Items list */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {items.map((item, idx) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#0891b2' }}>{item.icon}</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>{item.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => updateQty(idx, -1)} style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>remove</span>
                </button>
                <div style={{ width: 44, height: 36, border: '1.5px solid #0891b2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#0f172a' }}>
                  {item.qty}
                </div>
                <button onClick={() => updateQty(idx, 1)} style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAB */}
        <button style={{ position: 'fixed', right: 24, bottom: 32, width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#0891b2,#0e7490)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(8,145,178,0.4)', cursor: 'pointer', zIndex: 40 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>add</span>
        </button>
      </div>
    </div>
  );
}

// ─── User Inventory ────────────────────────────────────────────────
function UserInventoryView({ onBack }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  if (selected) return <AllottedInventory person={selected} isStaff={false} onBack={() => setSelected(null)} />;

  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={s.base}>
      <Header title="User List" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search User" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(user => (
            <div key={user.id} onClick={() => setSelected(user)}
              style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '12px', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s' }}
            >
              <img src={user.img} alt={user.name} style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', margin: 0 }}>{user.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#0891b2' }}>phone</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{user.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#0891b2' }}>bed</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{user.bed}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#0891b2' }}>meeting_room</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{user.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Staff Inventory ───────────────────────────────────────────────
function StaffInventoryView({ onBack }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  if (selected) return <AllottedInventory person={selected} isStaff={true} onBack={() => setSelected(null)} />;

  const filtered = STAFF.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={s.base}>
      <Header title="Staff List" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Staff Name" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(staff => (
            <div key={staff.id} onClick={() => setSelected(staff)}
              style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '12px', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <img src={staff.img} alt={staff.name} style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', margin: 0 }}>{staff.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#0891b2' }}>badge</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{staff.empId}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#0891b2' }}>person</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{staff.role}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#0891b2' }}>phone</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{staff.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PG Inventory ─────────────────────────────────────────────────
function PGInventoryView({ onBack }) {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(PG_ITEMS.map(i => ({ ...i })));

  const updateQty = (idx, delta) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + delta) } : it));
  };

  const filtered = items.filter(it => it.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={s.base}>
      <Header
        title="PG Inventory"
        onBack={onBack}
        action={
          <button style={{ background: '#0891b2', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            Save
          </button>
        }
      />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Product" />
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {filtered.map((item, idx) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: idx < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#0891b2' }}>{item.icon}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{item.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateQty(idx, -1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>remove</span>
                </button>
                <div style={{ width: 48, height: 34, border: '1.5px solid #0891b2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>
                  {item.qty}
                </div>
                <button onClick={() => updateQty(idx, 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAB */}
        <button style={{ position: 'fixed', right: 24, bottom: 32, width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#0891b2,#0e7490)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(8,145,178,0.4)', cursor: 'pointer', zIndex: 40 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>add</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main Inventory Page ───────────────────────────────────────────
export default function Inventory() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null);
  const [search, setSearch] = useState('');

  const handleModule = (id) => { setActiveModule(id); setSearch(''); };

  // Route to specific sub-views
  if (activeModule === 'user-inventory') return <UserInventoryView onBack={() => setActiveModule(null)} />;
  if (activeModule === 'staff-inventory') return <StaffInventoryView onBack={() => setActiveModule(null)} />;
  if (activeModule === 'pg-inventory') return <PGInventoryView onBack={() => setActiveModule(null)} />;

  // Generic placeholder for remaining sub-views
  if (activeModule) {
    const mod = MODULES.find(m => m.id === activeModule);
    return (
      <div style={s.base}>
        <Header title={mod?.label.replace('\n', ' ')} onBack={() => setActiveModule(null)} />
        <div style={{ padding: 16 }}>
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', padding: '48px 20px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: mod?.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 30, color: 'white' }}>{mod?.icon}</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#64748b', margin: '0 0 4px' }}>{mod?.label.replace('\n', ' ')}</p>
            <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>Coming soon</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Overview grid ──
  const visibleModules = MODULES.filter(m => m.label.toLowerCase().replace('\n', ' ').includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif" }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/admin-dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>Inventory</p>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ padding: '20px 16px' }}>
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
          <input placeholder="Search inventories..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {visibleModules.map(mod => (
            <button key={mod.id} onClick={() => handleModule(mod.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
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
