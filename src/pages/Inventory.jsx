import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Data ─────────────────────────────────────────────────────────
const USERS = [
  { id: 1, name: 'Ravi Kumar',   phone: '+91 9234567681', bed: 'Bed No. 4', room: 'Room No. 15', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop' },
  { id: 2, name: 'Priya Sharma', phone: '+91 9234567682', bed: 'Bed No. 2', room: 'Room No. 10', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
  { id: 3, name: 'Amit Verma',   phone: '+91 9234567683', bed: 'Bed No. 1', room: 'Room No. 5',  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' },
  { id: 4, name: 'Sneha Kapoor', phone: '+91 9234567684', bed: 'Bed No. 3', room: 'Room No. 8',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop' },
  { id: 5, name: 'Karan Singh',  phone: '+91 9234567685', bed: 'Bed No. 2', room: 'Room No. 12', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
];

const STAFF = [
  { id: 1, name: 'Sachin Kumar', empId: '#1234567', role: 'Manager',       phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop' },
  { id: 2, name: 'Rahul Mehta',  empId: '#1234568', role: 'Cafe',          phone: '+91 9234567682', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop' },
  { id: 3, name: 'Deepak Nair',  empId: '#1234569', role: 'Laundry Wala',  phone: '+91 9234567683', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop' },
  { id: 4, name: 'Vijay Sharma', empId: '#1234570', role: 'House Keeping', phone: '+91 9234567684', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop' },
  { id: 5, name: 'Suresh Rao',   empId: '#1234571', role: 'House Keeping', phone: '+91 9234567685', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop' },
];

const USER_ALLOTTED = [
  { name: 'Bed',       icon: 'bed',               qty: 1 },
  { name: 'Mattress',  icon: 'airline_seat_flat', qty: 1 },
  { name: 'Bedsheet',  icon: 'layers',            qty: 2 },
  { name: 'Pillow',    icon: 'weekend',           qty: 4 },
  { name: 'Chair',     icon: 'chair',             qty: 2 },
  { name: 'Almirah',   icon: 'door_sliding',      qty: 1 },
  { name: 'Kettle',    icon: 'coffee_maker',      qty: 1 },
  { name: 'Table',     icon: 'table_restaurant',  qty: 1 },
];

const STAFF_ALLOTTED = [
  { name: 'Uniform',        icon: 'checkroom',         qty: 2 },
  { name: 'ID Card',        icon: 'badge',             qty: 1 },
  { name: 'Apron',          icon: 'dry_cleaning',      qty: 2 },
  { name: 'Gloves',         icon: 'back_hand',         qty: 3 },
  { name: 'Mop',            icon: 'cleaning_services', qty: 2 },
  { name: 'Broom',          icon: 'cleaning',          qty: 1 },
  { name: 'Bucket',         icon: 'water_bucket',      qty: 2 },
  { name: 'Cleaning Spray', icon: 'soap',              qty: 3 },
  { name: 'Safety Shoes',   icon: 'hiking',            qty: 1 },
  { name: 'Dustpan',        icon: 'delete_sweep',      qty: 1 },
];

const PG_ITEMS = [
  { name: 'Bed',               icon: 'bed',                   qty: 100 },
  { name: 'Mattress',          icon: 'airline_seat_flat',     qty: 100 },
  { name: 'Bedsheet',          icon: 'layers',                qty: 100 },
  { name: 'Pillow',            icon: 'weekend',               qty: 100 },
  { name: 'Washing Machine',   icon: 'local_laundry_service', qty: 100 },
  { name: 'Chair',             icon: 'chair',                 qty: 100 },
  { name: 'Almirah',           icon: 'door_sliding',          qty: 100 },
  { name: 'Kettle',            icon: 'coffee_maker',          qty: 100 },
  { name: 'Table',             icon: 'table_restaurant',      qty: 100 },
  { name: 'Chilled R.O Water', icon: 'water_drop',            qty: 100 },
  { name: 'Wi-fi',             icon: 'wifi',                  qty: 100 },
  { name: 'Fridge',            icon: 'kitchen',               qty: 100 },
  { name: 'Attach Balcony',    icon: 'balcony',               qty: 100 },
  { name: 'T.V',               icon: 'tv',                    qty: 100 },
  { name: 'Dining Table',      icon: 'table_bar',             qty: 100 },
  { name: 'Living Area',       icon: 'living',                qty: 100 },
  { name: 'Microwave',         icon: 'microwave',             qty: 100 },
  { name: 'Pillow Cover',      icon: 'king_bed',              qty: 100 },
  { name: 'Gas Stove',         icon: 'outdoor_grill',         qty: 100 },
  { name: 'Attach Bathroom',   icon: 'bathroom',              qty: 100 },
];

const ROOMS = [
  { id: 1, name: 'Staircase Front', type: 'Double Bed Room',  roomNo: 'Room No. 15', beds: 2, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=120&fit=crop' },
  { id: 2, name: 'Staircase Front', type: 'Triple Bed Room',  roomNo: 'Room No. 16', beds: 3, img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&h=120&fit=crop' },
  { id: 3, name: 'Staircase Front', type: 'Four Bed Room',    roomNo: 'Room No. 17', beds: 4, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&h=120&fit=crop' },
  { id: 4, name: 'Staircase Front', type: 'Double Bed Room',  roomNo: 'Room No. 18', beds: 2, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=120&fit=crop' },
  { id: 5, name: 'Staircase Front', type: 'Double Bed Room',  roomNo: 'Room No. 19', beds: 2, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=120&fit=crop' },
];

const ROOM_ITEMS = [
  { name: 'Bed',       icon: 'bed',               qty: 2, clickable: true },
  { name: 'Mattress',  icon: 'airline_seat_flat', qty: 2 },
  { name: 'Bedsheet',  icon: 'layers',            qty: 4 },
  { name: 'Pillow',    icon: 'weekend',           qty: 4 },
  { name: 'Chair',     icon: 'chair',             qty: 2 },
  { name: 'Almirah',   icon: 'door_sliding',      qty: 2 },
  { name: 'Table',     icon: 'table_restaurant',  qty: 1 },
  { name: 'T.V',       icon: 'tv',               qty: 1 },
];

const BED_INVENTORY = [
  { room: 'Room No. 1', beds: 3 }, { room: 'Room No. 2', beds: 3 }, { room: 'Room No. 3', beds: 3 },
  { room: 'Room No. 4', beds: 3 }, { room: 'Room No. 5', beds: 3 }, { room: 'Room No. 6', beds: 3 },
  { room: 'Room No. 7', beds: 3 }, { room: 'Room No. 8', beds: 3 }, { room: 'Room No. 9', beds: 3 },
  { room: 'Room No. 10', beds: 3 },{ room: 'Room No. 11', beds: 3 },
];

const KITCHEN_HARD = [
  { name: 'Peeler',          icon: 'kitchen',        qty: 1 },
  { name: 'Cutting board',   icon: 'space_dashboard', qty: 1 },
  { name: "Chef's knife",    icon: 'restaurant',     qty: 2 },
  { name: 'Whisk',           icon: 'blender',        qty: 4 },
  { name: 'Rolling pin',     icon: 'roller_skating', qty: 2 },
  { name: 'Blender',         icon: 'blender',        qty: 1 },
  { name: 'Pressure cooker', icon: 'outdoor_grill',  qty: 1 },
];

const KITCHEN_SOFT = [
  { name: 'Cooking Oil', qty: 2,   unit: 'Kg' },
  { name: 'Rice',        qty: 2,   unit: 'Kg' },
  { name: 'Turmeric',    qty: 200, unit: 'Gm' },
  { name: 'Tea',         qty: 200, unit: 'Gm' },
  { name: 'Garam Masala',qty: 200, unit: 'Gm' },
  { name: 'Rajma',       qty: 200, unit: 'Gm' },
  { name: 'Aata',        qty: 10,  unit: 'Kg' },
];

const KITCHEN_REPORT_MONTHLY = [
  'January 2025','February 2025','March 2025','April 2025','May 2025','June 2025',
  'July 2025','August 2025','September 2025','October 2025','November 2025','December 2025',
].map(m => ({ month: m, amount: '25,000' }));

const KITCHEN_TRANSACTIONS = [
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Gobhi (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
  { item: 'Aalu (50kg)', date: '2 January 2025', amount: '5,000', status: 'Paid' },
];

const MODULES = [
  { id: 'user-inventory',    label: 'User\nInventory',    icon: 'groups',       gradient: 'linear-gradient(135deg,#0ea5e9,#0891b2)' },
  { id: 'kitchen-inventory', label: 'Kitchen\nInventory', icon: 'kitchen',      gradient: 'linear-gradient(135deg,#6366f1,#4f46e5)' },
  { id: 'pg-inventory',      label: 'PG\nInventory',      icon: 'apartment',    gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
  { id: 'room-inventory',    label: 'Room\nInventory',    icon: 'meeting_room', gradient: 'linear-gradient(135deg,#10b981,#059669)' },
  { id: 'staff-inventory',   label: 'Staff\nInventory',   icon: 'badge',        gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { id: 'kitchen-report',    label: 'Kitchen\nReport',    icon: 'bar_chart',    gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
];

// ─── Shared Components ────────────────────────────────────────────
const BASE = { maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 };

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

function SaveBtn() {
  return <button style={{ background: '#0891b2', color: 'white', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save</button>;
}

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

function Fab({ onClick }) {
  return (
    <button onClick={onClick} style={{ position: 'fixed', right: 24, bottom: 32, width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#0891b2,#0e7490)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(8,145,178,0.4)', cursor: 'pointer', zIndex: 40 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 24 }}>add</span>
    </button>
  );
}

function ItemRow({ item, idx, total, onQtyChange, clickable, onClick }) {
  return (
    <div onClick={clickable ? onClick : undefined}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: idx < total - 1 ? '1px solid #f1f5f9' : 'none', cursor: clickable ? 'pointer' : 'default', background: clickable ? undefined : 'white' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#0891b2' }}>{item.icon}</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>{item.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onQtyChange && (
          <button onClick={e => { e.stopPropagation(); onQtyChange(-1); }} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>remove</span>
          </button>
        )}
        <div style={{ width: 44, height: 34, border: '1.5px solid #0891b2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>
          {item.qty}
        </div>
        {onQtyChange && (
          <button onClick={e => { e.stopPropagation(); onQtyChange(1); }} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
          </button>
        )}
        {clickable && <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#94a3b8' }}>chevron_right</span>}
      </div>
    </div>
  );
}

// ─── Allotted Inventory (User) ─────────────────────────────────────
function UserAllottedView({ person, onBack }) {
  const [items, setItems] = useState(USER_ALLOTTED.map(i => ({ ...i })));
  const update = (idx, d) => setItems(p => p.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + d) } : it));
  return (
    <div style={BASE}>
      <Header title="Allotted Inventory" onBack={onBack} action={<SaveBtn />} />
      <div style={{ padding: 16 }}>
        <div style={{ background: '#0891b2', borderRadius: 16, padding: '16px', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <img src={person.img} alt={person.name} style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'white', margin: '0 0 4px' }}>{person.name}</p>
            {[{ icon: 'phone', text: person.phone }, { icon: 'bed', text: person.bed }, { icon: 'meeting_room', text: person.room }].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{r.icon}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {items.map((item, idx) => <ItemRow key={item.name} item={item} idx={idx} total={items.length} onQtyChange={d => update(idx, d)} />)}
        </div>
        <Fab />
      </div>
    </div>
  );
}

// ─── Allotted Inventory (Staff) — different items ──────────────────
function StaffAllottedView({ person, onBack }) {
  const [items, setItems] = useState(STAFF_ALLOTTED.map(i => ({ ...i })));
  const update = (idx, d) => setItems(p => p.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + d) } : it));
  return (
    <div style={BASE}>
      <Header title="Allotted Inventory" onBack={onBack} action={<SaveBtn />} />
      <div style={{ padding: 16 }}>
        <div style={{ background: '#0891b2', borderRadius: 16, padding: '16px', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <img src={person.img} alt={person.name} style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'white', margin: '0 0 4px' }}>{person.name}</p>
            {[{ icon: 'badge', text: person.empId }, { icon: 'person', text: person.role }, { icon: 'phone', text: person.phone }].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{r.icon}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {items.map((item, idx) => <ItemRow key={item.name} item={item} idx={idx} total={items.length} onQtyChange={d => update(idx, d)} />)}
        </div>
        <Fab />
      </div>
    </div>
  );
}

// ─── User Inventory ────────────────────────────────────────────────
function UserInventoryView({ onBack }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  if (selected) return <UserAllottedView person={selected} onBack={() => setSelected(null)} />;
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={BASE}>
      <Header title="User List" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search User" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(user => (
            <div key={user.id} onClick={() => setSelected(user)} style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: 12, display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <img src={user.img} alt={user.name} style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', margin: '0 0 6px' }}>{user.name}</p>
                {[{ icon: 'phone', text: user.phone }, { icon: 'bed', text: user.bed }, { icon: 'meeting_room', text: user.room }].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0891b2' }}>{r.icon}</span>
                    <span style={{ fontSize: 13, color: '#475569' }}>{r.text}</span>
                  </div>
                ))}
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
  if (selected) return <StaffAllottedView person={selected} onBack={() => setSelected(null)} />;
  const filtered = STAFF.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={BASE}>
      <Header title="Staff List" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Staff Name" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(staff => (
            <div key={staff.id} onClick={() => setSelected(staff)} style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: 12, display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <img src={staff.img} alt={staff.name} style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', margin: '0 0 6px' }}>{staff.name}</p>
                {[{ icon: 'badge', text: staff.empId }, { icon: 'person', text: staff.role }, { icon: 'phone', text: staff.phone }].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0891b2' }}>{r.icon}</span>
                    <span style={{ fontSize: 13, color: '#475569' }}>{r.text}</span>
                  </div>
                ))}
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
  const update = (idx, d) => setItems(p => p.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + d) } : it));
  const filtered = items.filter(it => it.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={BASE}>
      <Header title="PG Inventory" onBack={onBack} action={<SaveBtn />} />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Product" />
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {filtered.map((item, idx) => <ItemRow key={item.name} item={item} idx={idx} total={filtered.length} onQtyChange={d => update(items.indexOf(item), d)} />)}
        </div>
        <Fab />
      </div>
    </div>
  );
}

// ─── Bed Inventory (from Room click on Bed row) ────────────────────
function BedInventoryView({ onBack }) {
  return (
    <div style={BASE}>
      <Header title="Bed Inventory" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {BED_INVENTORY.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < BED_INVENTORY.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#0891b2' }}>bed</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0891b2' }}>{row.room}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{row.beds} Bed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Room Detail Inventory ─────────────────────────────────────────
function RoomDetailView({ room, onBack }) {
  const [items, setItems] = useState(ROOM_ITEMS.map(i => ({ ...i })));
  const [showBed, setShowBed] = useState(false);
  const update = (idx, d) => setItems(p => p.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + d) } : it));
  if (showBed) return <BedInventoryView onBack={() => setShowBed(false)} />;
  return (
    <div style={BASE}>
      <Header title={room.roomNo} onBack={onBack} action={<SaveBtn />} />
      <div style={{ padding: 16 }}>
        <div style={{ background: '#0891b2', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
          <img src={room.img} alt={room.name} style={{ width: '100%', height: 140, objectFit: 'cover', opacity: 0.8 }} />
          <div style={{ padding: '12px 16px' }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'white', margin: '0 0 2px' }}>{room.name}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: '0 0 2px' }}>{room.type}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>meeting_room</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{room.roomNo}</span>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {items.map((item, idx) => (
            <ItemRow key={item.name} item={item} idx={idx} total={items.length}
              onQtyChange={d => update(idx, d)}
              clickable={item.clickable}
              onClick={() => item.clickable && setShowBed(true)}
            />
          ))}
        </div>
        <Fab />
      </div>
    </div>
  );
}

// ─── Room Inventory List ───────────────────────────────────────────
function RoomInventoryView({ onBack }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  if (selected) return <RoomDetailView room={selected} onBack={() => setSelected(null)} />;
  const filtered = ROOMS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase()) || r.roomNo.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={BASE}>
      <Header title="Room List" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Room" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(room => (
            <div key={room.id} onClick={() => setSelected(room)} style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <img src={room.img} alt={room.name} style={{ width: 100, height: 90, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ padding: '12px 14px', flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 2px' }}>{room.name}</p>
                <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 4px' }}>{room.type}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0891b2' }}>meeting_room</span>
                  <span style={{ fontSize: 13, color: '#475569' }}>{room.roomNo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Kitchen Inventory ─────────────────────────────────────────────
function KitchenInventoryView({ onBack }) {
  const [tab, setTab] = useState('hard');
  const [hardItems, setHardItems] = useState(KITCHEN_HARD.map(i => ({ ...i })));
  const [softItems, setSoftItems] = useState(KITCHEN_SOFT.map(i => ({ ...i })));
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-02-02');

  const updateHard = (idx, d) => setHardItems(p => p.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + d) } : it));
  const updateSoftQty = (idx, d) => setSoftItems(p => p.map((it, i) => i === idx ? { ...it, qty: Math.max(0, it.qty + d) } : it));
  const updateSoftUnit = (idx, unit) => setSoftItems(p => p.map((it, i) => i === idx ? { ...it, unit } : it));

  const fmtDate = (d) => { const dt = new Date(d); return dt.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }); };

  return (
    <div style={BASE}>
      <Header title="Kitchen Inventory" onBack={onBack} action={<SaveBtn />} />
      <div style={{ padding: 16 }}>
        {/* Tab toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[{ id: 'hard', label: 'Hard Inventory', icon: 'kitchen' }, { id: 'soft', label: 'Soft Inventory', icon: 'inventory_2' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '14px 8px', borderRadius: 12, cursor: 'pointer', border: tab === t.id ? '2px solid #0891b2' : '1.5px solid #e2e8f0',
              background: tab === t.id ? '#ecfeff' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: tab === t.id ? '#0891b2' : '#94a3b8' }}>{t.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: tab === t.id ? '#0891b2' : '#64748b' }}>{t.label}</span>
            </button>
          ))}
        </div>

        {tab === 'soft' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[{ label: 'From', val: fromDate, set: setFromDate }, { label: 'To', val: toDate, set: setToDate }].map(f => (
              <label key={f.label} style={{ display: 'block', background: 'white', border: '1.5px solid #0891b2', borderRadius: 10, padding: '10px 12px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 18 }}>calendar_month</span>
                  <div>
                    <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>{f.label} Date</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0891b2', margin: 0 }}>{fmtDate(f.val)}</p>
                  </div>
                </div>
                <input type="date" value={f.val} onChange={e => f.set(e.target.value)} style={{ display: 'none' }} />
              </label>
            ))}
          </div>
        )}

        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {tab === 'hard' ? hardItems.map((item, idx) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: idx < hardItems.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', flex: 1 }}>{item.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateHard(idx, -1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>remove</span>
                </button>
                <div style={{ width: 44, height: 34, border: '1.5px solid #0891b2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{item.qty}</div>
                <button onClick={() => updateHard(idx, 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #0891b2', background: 'white', color: '#0891b2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
                </button>
              </div>
            </div>
          )) : softItems.map((item, idx) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: idx < softItems.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', flex: 1 }}>{item.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 44, height: 34, border: '1.5px solid #0891b2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{item.qty}</div>
                <select value={item.unit} onChange={e => updateSoftUnit(idx, e.target.value)}
                  style={{ border: '1.5px solid #0891b2', borderRadius: 8, padding: '6px 4px', fontSize: 13, fontWeight: 600, color: '#0891b2', background: 'white', outline: 'none', cursor: 'pointer' }}>
                  <option>Kg</option><option>Gm</option><option>L</option><option>Ml</option><option>Pcs</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <Fab />
      </div>
    </div>
  );
}

// ─── Kitchen Report ────────────────────────────────────────────────
function KitchenReportView({ onBack }) {
  const [fromDate, setFromDate] = useState('2025-02-02');
  const [toDate, setToDate] = useState('2025-02-02');
  const [selectedMonth, setSelectedMonth] = useState(null);

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  if (selectedMonth) return (
    <div style={BASE}>
      <Header title="Kitchen Report" onBack={() => setSelectedMonth(null)} />
      <div style={{ padding: 16 }}>
        <div style={{ background: 'white', border: '1.5px solid #0891b2', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#0891b2', margin: 0 }}>Total Amount</p>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>₹ 2,000,000</p>
        </div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {KITCHEN_TRANSACTIONS.map((tx, i) => (
            <div key={i} style={{ padding: '13px 16px', borderBottom: i < KITCHEN_TRANSACTIONS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#0891b2' }}>kitchen</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{tx.item}</span>
                </div>
                <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 14, color: '#0f172a' }}>₹ {tx.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 26 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#94a3b8' }}>calendar_month</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{tx.date}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#059669' }}>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={BASE}>
      <Header title="Kitchen Report" onBack={onBack} />
      <div style={{ padding: 16 }}>
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
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>₹ 2,000,000</p>
        </div>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {KITCHEN_REPORT_MONTHLY.map((row, i) => (
            <div key={i} onClick={() => setSelectedMonth(row)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < KITCHEN_REPORT_MONTHLY.length - 1 ? '1px solid #f1f5f9' : 'none', cursor: 'pointer' }}>
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

// ─── Main Inventory Page ───────────────────────────────────────────
export default function Inventory() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null);
  const [search, setSearch] = useState('');

  const handleModule = (id) => { setActiveModule(id); setSearch(''); };

  if (activeModule === 'user-inventory')    return <UserInventoryView    onBack={() => setActiveModule(null)} />;
  if (activeModule === 'staff-inventory')   return <StaffInventoryView   onBack={() => setActiveModule(null)} />;
  if (activeModule === 'pg-inventory')      return <PGInventoryView      onBack={() => setActiveModule(null)} />;
  if (activeModule === 'room-inventory')    return <RoomInventoryView    onBack={() => setActiveModule(null)} />;
  if (activeModule === 'kitchen-inventory') return <KitchenInventoryView onBack={() => setActiveModule(null)} />;
  if (activeModule === 'kitchen-report')    return <KitchenReportView    onBack={() => setActiveModule(null)} />;

  const visible = MODULES.filter(m => m.label.toLowerCase().replace('\n', ' ').includes(search.toLowerCase()));

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
          {visible.map(mod => (
            <button key={mod.id} onClick={() => handleModule(mod.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 8px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}>
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
