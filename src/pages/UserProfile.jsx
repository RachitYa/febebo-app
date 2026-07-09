import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BASE = { backgroundColor: '#f8fafc', minHeight: '100vh', position: 'relative', paddingBottom: 80, fontFamily: "'Hanken Grotesk', sans-serif" };
const cyan = '#0ea5e9';

// ─── SHARED DUMMY DATA ────────────────────────────────────
const ROOMS_DATA = [
  { id: 1, roomNo: '15', name: 'Staircase Front', type: 'Double Bed Room', beds: 2, status: 'occupied', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=220&fit=crop', residentIds: [1, 5] },
  { id: 2, roomNo: '16', name: 'Staircase Front', type: 'Triple Bed Room', beds: 3, status: 'occupied', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=220&fit=crop', residentIds: [2] },
  { id: 3, roomNo: '17', name: 'Staircase Front', type: 'Four Bed Room',   beds: 4, status: 'occupied', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=220&fit=crop', residentIds: [3] },
  { id: 4, roomNo: '18', name: 'Staircase Front', type: 'Double Bed Room', beds: 2, status: 'occupied', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=220&fit=crop', residentIds: [4] },
];

const USER_PROFILES = {
  1: { name: 'Rajeev Kumar', dob: '12 Aug 1999', email: 'rajeev.kumar@gmail.com', aadhar: '2345 6789 0123', address: '22, MG Road, Lajpat Nagar, New Delhi - 110024', college: 'Delhi University', careerStatus: 'Student', fatherName: 'Suresh Kumar', fatherPhone: '+91 9988776655', motherName: 'Anita Kumar', motherPhone: '+91 9988776644', joiningDate: '25 Feb 2025', tentativeLeaving: '24 Feb 2026', roomNo: 15, bedNo: 3, rent: 10000, token: 5000, pending: 5000, securityAmt: 3000, meterUnit: 1240, meterRatePerUnit: 8, },
  2: { name: 'Ravi Kumar', dob: '5 Mar 2000', email: 'ravi.kumar@gmail.com', aadhar: '3456 7890 1234', address: '45, Nehru Place, South Delhi - 110019', college: 'IIT Delhi', careerStatus: 'Student', fatherName: 'Rajesh Kumar', fatherPhone: '+91 9876543210', motherName: 'Sunita Kumar', motherPhone: '+91 9876543200', joiningDate: '1 Jan 2025', tentativeLeaving: '31 Dec 2025', roomNo: 16, bedNo: 1, rent: 9500, token: 4000, pending: 0, securityAmt: 3000, meterUnit: 980, meterRatePerUnit: 8, },
  3: { name: 'Priya Sharma', dob: '22 Nov 1998', email: 'priya.sharma@gmail.com', aadhar: '4567 8901 2345', address: '7, Connaught Place, New Delhi - 110001', college: null, careerStatus: 'Working', companyName: 'TechSoft India Pvt. Ltd.', companyAddress: 'Sector 62, Noida, UP', fatherName: 'Dinesh Sharma', fatherPhone: '+91 9123456789', motherName: 'Kavita Sharma', motherPhone: '+91 9123456780', joiningDate: '10 Mar 2025', tentativeLeaving: '9 Mar 2026', roomNo: 12, bedNo: 2, rent: 11000, token: 6000, pending: 2500, securityAmt: 3000, meterUnit: 1520, meterRatePerUnit: 8, },
  4: { name: 'Amit Verma', dob: '8 Jul 2001', email: 'amit.verma@gmail.com', aadhar: '5678 9012 3456', address: '33, Rohini Sector 4, New Delhi - 110085', college: 'Jamia Millia Islamia', careerStatus: 'Student', fatherName: 'Vikas Verma', fatherPhone: '+91 9012345678', motherName: 'Rekha Verma', motherPhone: '+91 9012345670', joiningDate: '15 Apr 2025', tentativeLeaving: '14 Apr 2026', roomNo: 17, bedNo: 1, rent: 8500, token: 3500, pending: 3500, securityAmt: 2500, meterUnit: 820, meterRatePerUnit: 8, },
  5: { name: 'Sneha Kapoor', dob: '14 Feb 2000', email: 'sneha.kapoor@gmail.com', aadhar: '6789 0123 4567', address: '9, Vasant Kunj, New Delhi - 110070', college: null, careerStatus: 'Working', companyName: 'Infosys BPM Ltd.', companyAddress: 'Cyber City, Gurugram', fatherName: 'Arun Kapoor', fatherPhone: '+91 8901234567', motherName: 'Meena Kapoor', motherPhone: '+91 8901234560', joiningDate: '1 Jun 2025', tentativeLeaving: '31 May 2026', roomNo: 18, bedNo: 3, rent: 10500, token: 5500, pending: 1000, securityAmt: 3000, meterUnit: 1100, meterRatePerUnit: 8, },
};

const DEFAULT_PROFILE = USER_PROFILES[1];

const USER_INVENTORY = [
  { name: 'Bed',      icon: 'bed',               qty: 1, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop', exchanges: [] },
  { name: 'Mattress', icon: 'airline_seat_flat', qty: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop', exchanges: [{ date: '1 Jun 2025', note: 'Sagging issue' }] },
  { name: 'Bedsheet', icon: 'layers',            qty: 2, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop', exchanges: [{ date: '5 Jul 2025', note: 'Wear & tear' }, { date: '10 Jan 2025', note: 'Stain' }] },
  { name: 'Pillow',   icon: 'weekend',           qty: 4, img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=400&fit=crop', exchanges: [{ date: '8 Jul 2025', note: 'Old one torn' }] },
  { name: 'Chair',    icon: 'chair',             qty: 2, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop', exchanges: [] },
  { name: 'Almirah',  icon: 'door_sliding',      qty: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop', exchanges: [] },
  { name: 'Kettle',   icon: 'coffee_maker',      qty: 1, img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&h=400&fit=crop', exchanges: [] },
  { name: 'Table',    icon: 'table_restaurant',  qty: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop', exchanges: [] },
];

const METER_HISTORY = [
  { month: 'June 2025',     units: 220, rate: 8, paid: true },
  { month: 'May 2025',      units: 198, rate: 8, paid: true },
  { month: 'April 2025',    units: 175, rate: 8, paid: true },
  { month: 'March 2025',    units: 210, rate: 8, paid: true },
  { month: 'February 2025', units: 165, rate: 8, paid: false },
  { month: 'January 2025',  units: 252, rate: 8, paid: false },
];

// ─── REUSABLE HEADER ──────────────────────────────────────
function Header({ title, onBack, action, center = true, dark = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', background: dark ? cyan : 'white', borderBottom: dark ? 'none' : '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: dark ? 'white' : cyan }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, fontWeight: 300 }}>arrow_back_ios_new</span>
      </button>
      <h1 style={{ flex: 1, textAlign: center ? 'center' : 'left', margin: center ? '0 0 0 -24px' : '0 0 0 16px', fontSize: 18, fontWeight: 700, color: dark ? 'white' : cyan }}>{title}</h1>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── INFO ROW ─────────────────────────────────────────────
function InfoRow({ label, value, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: last ? 'none' : '1px solid #f1f5f9' }}>
      <span style={{ fontSize: 13, color: '#64748b', minWidth: 120 }}>{label}</span>
      <span style={{ fontSize: 13, color: cyan, fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
    </div>
  );
}

// ─── ACCORDION ────────────────────────────────────────────
function Accordion({ title, icon, children, defaultOpen = false, onHeaderClick, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  const handleClick = () => {
    if (onHeaderClick) { onHeaderClick(); return; }
    setOpen(!open);
  };
  return (
    <div style={{ background: 'white', borderRadius: 12, marginBottom: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <button onClick={handleClick} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 22 }}>{icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{title}</span>
          {badge && <span style={{ background: '#fef9c3', color: '#ca8a04', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{badge}</span>}
        </div>
        <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 20, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          {onHeaderClick ? 'chevron_right' : 'arrow_drop_down'}
        </span>
      </button>
      {!onHeaderClick && open && <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f1f5f9' }}>{children}</div>}
    </div>
  );
}

// ─── SUB-VIEW: INVENTORY DETAIL ───────────────────────────
function InventoryDetailView({ user, onBack }) {
  const name = user?.name || 'User';
  return (
    <>
      <Header title="Allotted Inventory" onBack={onBack} center={false} />
      <div style={{ padding: 16 }}>
        <div style={{ background: cyan, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <img src={user?.image || user?.img || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop'} alt={name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)' }} />
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: 'white', fontSize: 15 }}>{name}</p>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Room {user?.room || '15'} · Bed {user?.bed || '3'}</p>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {USER_INVENTORY.map((item, idx) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: idx < USER_INVENTORY.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: cyan }}>{item.icon}</span>
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', margin: '0 0 2px' }}>{item.name}</p>
                  {item.exchanges.length > 0 && <p style={{ fontSize: 11, color: '#ca8a04', margin: 0, fontWeight: 600 }}>↕ {item.exchanges.length} exchange{item.exchanges.length > 1 ? 's' : ''}</p>}
                </div>
              </div>
              <span style={{ background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: 14, padding: '4px 10px', borderRadius: 8 }}>×{item.qty}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── SUB-VIEW: METER HISTORY ──────────────────────────────
function MeterHistoryView({ profile, onBack }) {
  const totalUnpaidUnits = METER_HISTORY.filter(m => !m.paid).reduce((s, m) => s + m.units, 0);
  const totalUnpaidAmt = totalUnpaidUnits * (profile?.meterRatePerUnit || 8);
  return (
    <>
      <Header title="Meter Consumption" onBack={onBack} center={false} />
      <div style={{ padding: 16 }}>
        {/* Summary pill */}
        {totalUnpaidAmt > 0 && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: '#ef4444', fontSize: 20 }}>warning</span>
              <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>Pending Meter Bill</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#ef4444' }}>₹{totalUnpaidAmt.toLocaleString()}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {METER_HISTORY.map((m, i) => {
            const amount = m.units * m.rate;
            return (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '14px 16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{m.month}</span>
                  <span style={{ background: m.paid ? '#dcfce7' : '#fef2f2', color: m.paid ? '#16a34a' : '#ef4444', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10 }}>{m.paid ? '✓ Paid' : '✗ Unpaid'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748b' }}>
                  <span>Units Used: <b style={{ color: '#0f172a' }}>{m.units} kWh</b></span>
                  <span>@ ₹{m.rate}/unit = <b style={{ color: cyan }}>₹{amount.toLocaleString()}</b></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── SUB-VIEW: ROOM DETAILS REDIRECT ─────────────────────
// This view shows a mini-preview of the room and lets user navigate to ManageRooms
function RoomPreviewView({ profile, user, onBack }) {
  const navigate = useNavigate();
  const room = ROOMS_DATA.find(r => r.roomNo === String(profile?.roomNo || user?.room));
  return (
    <>
      <Header title={`Room No. ${profile?.roomNo || user?.room}`} onBack={onBack} center={false} />
      <div style={{ padding: 16 }}>
        {room && (
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: 16 }}>
            <img src={room.img} alt={room.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', margin: '0 0 2px' }}>{room.name}</p>
                  <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{room.type} · {room.beds} beds</p>
                </div>
                <span style={{ background: room.status === 'occupied' ? '#dcfce7' : '#f1f5f9', color: room.status === 'occupied' ? '#059669' : '#64748b', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>{room.status === 'occupied' ? 'Occupied' : 'Vacated'}</span>
              </div>
              <button onClick={() => navigate('/manage-rooms')} style={{ width: '100%', padding: '12px', background: cyan, color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                View Full Room Details →
              </button>
            </div>
          </div>
        )}
        <div style={{ background: 'white', borderRadius: 12, padding: '14px 16px', border: '1px solid #e2e8f0' }}>
          <InfoRow label="Room Number" value={`Room ${profile?.roomNo || user?.room}`} />
          <InfoRow label="Bed Number" value={`Bed ${profile?.bedNo || user?.bed}`} />
          <InfoRow label="Room Type" value={room?.type || 'Double Bed'} />
          <InfoRow label="Status" value={room?.status === 'occupied' ? 'Occupied' : 'Available'} last />
        </div>
      </div>
    </>
  );
}

// ─── MAIN DETAILS VIEW ────────────────────────────────────
function UserDetailsView({ user, onBack, onReceipt, onHistory, subView, setSubView }) {
  // Look up the rich profile by user.id, fallback to DEFAULT
  const profile = USER_PROFILES[user?.id] || DEFAULT_PROFILE;
  const rent = profile.rent;
  const token = profile.token;
  const pending = profile.pending;
  const currentMonthUnits = METER_HISTORY[0]?.units || 220;
  const currentMonthAmt = currentMonthUnits * profile.meterRatePerUnit;
  const unpaidMonths = METER_HISTORY.filter(m => !m.paid).length;

  if (subView === 'inventory') return <InventoryDetailView user={user} onBack={() => setSubView(null)} />;
  if (subView === 'meter') return <MeterHistoryView profile={profile} onBack={() => setSubView(null)} />;
  if (subView === 'room') return <RoomPreviewView profile={profile} user={user} onBack={() => setSubView(null)} />;

  return (
    <>
      <Header title="User Details" onBack={onBack} center={true} dark={true} action={
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'white', padding: '4px 8px', borderRadius: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: cyan }}>4.3</span>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>star</span>
        </div>
      }/>

      <div style={{ background: cyan, padding: '0 16px 24px', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src={user?.image || user?.img || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'} alt={profile.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: 18, color: '#0f172a' }}>{profile.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>badge</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.studentId || '#' + String(1234560 + (user?.id || 1))}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>call</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.phone || '+91 9234567681'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>calendar_month</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{profile.joiningDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* ── Personal Details ── */}
        <Accordion title="Personal Details" icon="person_outline" defaultOpen={false}>
          <InfoRow label="Full Name" value={profile.name} />
          <InfoRow label="Date of Birth" value={profile.dob} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Aadhar No." value={profile.aadhar} />
          <InfoRow label="Career" value={profile.careerStatus} />
          {profile.careerStatus === 'Student'
            ? <InfoRow label="College" value={profile.college} />
            : <InfoRow label="Company" value={profile.companyName} />
          }
          <InfoRow label="Address" value={profile.address} last />
        </Accordion>

        {/* ── Parents Details ── */}
        <Accordion title="Parents Details" icon="family_restroom" defaultOpen={false}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Father</p>
          <InfoRow label="Name" value={profile.fatherName} />
          <InfoRow label="Mobile" value={profile.fatherPhone} />
          <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', margin: '12px 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>Mother</p>
          <InfoRow label="Name" value={profile.motherName} />
          <InfoRow label="Mobile" value={profile.motherPhone} last />
        </Accordion>

        {/* ── Date of Joining ── */}
        <Accordion title="Date of Joining" icon="event" defaultOpen={false}>
          <InfoRow label="Joining Date" value={profile.joiningDate} />
          <InfoRow label="Tentative Leaving" value={profile.tentativeLeaving} last />
        </Accordion>

        {/* ── Room Details — CLICKABLE ── */}
        <Accordion title="Room Details" icon="meeting_room" defaultOpen={true}>
          <InfoRow label="Room Number" value={`Room ${profile.roomNo}`} />
          <InfoRow label="Bed Number" value={`Bed ${profile.bedNo}`} />
          <div style={{ marginTop: 12 }}>
            <button onClick={() => setSubView('room')} style={{ width: '100%', padding: '10px', background: 'rgba(14,165,233,0.08)', border: `1px solid ${cyan}`, color: cyan, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>meeting_room</span>
              View Room Details
            </button>
          </div>
        </Accordion>

        {/* ── Inventory Allotted — CLICKABLE ── */}
        <Accordion title="Inventory Allotted" icon="inventory_2" onHeaderClick={() => setSubView('inventory')}>
          {/* Content shown via subView */}
        </Accordion>

        {/* ── User Status ── */}
        <Accordion title="User Status" icon="how_to_reg" defaultOpen={false}>
          <InfoRow label="Status" value="Active" />
          <InfoRow label="Notice Period" value="Not Issued" last />
        </Accordion>

        {/* ── Meter Unit Details — CLICKABLE to history ── */}
        <Accordion title="Meter Unit Details" icon="electric_meter" defaultOpen={true}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, background: '#ecfeff', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 4px' }}>This Month (June)</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: cyan, margin: '0 0 2px' }}>{currentMonthUnits} kWh</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', margin: 0 }}>₹{currentMonthAmt.toLocaleString()}</p>
            </div>
            <div style={{ flex: 1, background: unpaidMonths > 0 ? '#fef2f2' : '#f0fdf4', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 4px' }}>Total Pending</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: unpaidMonths > 0 ? '#ef4444' : '#16a34a', margin: '0 0 2px' }}>{unpaidMonths}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', margin: 0 }}>Month{unpaidMonths !== 1 ? 's' : ''} Unpaid</p>
            </div>
          </div>
          <button onClick={() => setSubView('meter')} style={{ width: '100%', padding: '10px', background: 'rgba(14,165,233,0.08)', border: `1px solid ${cyan}`, color: cyan, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>bar_chart</span>
            View Monthly Consumption
          </button>
        </Accordion>

        {/* ── Token Amount ── */}
        <Accordion title="Token Amount" icon="payments" defaultOpen={false}>
          <InfoRow label="Amount" value={`₹ ${token.toLocaleString()}`} />
          <InfoRow label="Received by" value="Manager" last />
        </Accordion>

        {/* ── Pending Amount ── */}
        <Accordion title="Pending Amount" icon="history" defaultOpen={false}>
          <div style={{ textAlign: 'right', padding: '8px 0' }}>
            <span style={{ fontSize: 18, color: pending > 0 ? '#ef4444' : '#16a34a', fontWeight: 800 }}>
              {pending > 0 ? `₹ ${pending.toLocaleString()}` : '✓ All Clear'}
            </span>
          </div>
        </Accordion>

        {/* ── Rent / Security ── */}
        <Accordion title="Rent / Security Amount" icon="bed" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(14,165,233,0.05)', borderRadius: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#475569' }}>Rent Of Bed:</span>
            <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>₹{rent.toLocaleString()}/month</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(14,165,233,0.05)', borderRadius: 8 }}>
            <span style={{ fontSize: 12, color: '#475569' }}>Security Amount:</span>
            <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>₹{profile.securityAmt.toLocaleString()}</span>
          </div>
        </Accordion>

        {/* ── Visitor Details ── */}
        <Accordion title="Visitor Details" icon="badge" defaultOpen={false}>
          <div style={{ position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', right: 0, top: 0, background: cyan, color: 'white', borderRadius: '50%', padding: 6, fontSize: 16 }}>edit</span>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, fontSize: 13, color: '#64748b' }}>
              <span>Name</span><span style={{ color: cyan, fontWeight: 600 }}>: {profile.fatherName}</span>
              <span>Number</span><span style={{ color: cyan, fontWeight: 600 }}>: {profile.fatherPhone}</span>
              <span>Religion</span><span style={{ color: cyan, fontWeight: 600 }}>: Hindu</span>
              <span>Address</span><span style={{ color: cyan, fontWeight: 600 }}>: {profile.address.split(',').slice(0,2).join(',')}</span>
            </div>
          </div>
        </Accordion>

        {/* ── Police Verification ── */}
        <Accordion title="Police Verification" icon="local_police" defaultOpen={false}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 12 }}>Verified</span>
          </div>
        </Accordion>

        {/* ── Document ── */}
        <Accordion title="Document" icon="description" defaultOpen={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 600 }}>ID Proof (Aadhar)</span>
            <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 12 }}>Verified</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, height: 80, background: '#e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=120&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="ID Front" />
            </div>
            <div style={{ flex: 1, height: 80, background: '#e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1621570275815-188b3f81e351?w=200&h=120&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="ID Back" />
            </div>
          </div>
        </Accordion>

        {/* ── Payment History Teaser ── */}
        <p style={{ fontSize: 14, fontWeight: 700, color: '#334155', margin: '24px 0 12px' }}>Payment History</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'June 2025', amount: 10000, date: '05/06/2025' },
            { label: 'May 2025', amount: 9500, date: '04/05/2025' },
          ].map((p, i) => (
            <div key={i} onClick={onReceipt} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 18, transform: 'rotate(-45deg)' }}>arrow_upward</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: '0 0 2px' }}>{p.label}</p>
                  <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Sent {p.date}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>₹{p.amount.toLocaleString()}</p>
                <p style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, margin: 0 }}>Paid</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onHistory} style={{ width: '100%', padding: '14px', background: 'white', border: `1px solid ${cyan}`, color: cyan, fontWeight: 700, borderRadius: 12, marginTop: 12, cursor: 'pointer' }}>View All History</button>
      </div>
    </>
  );
}

// ─── VIEW 4: PAYMENT HISTORY & LIST ───────────────────────
function PaymentHistoryView({ onBack }) {
  const [tab, setTab] = useState('list');
  const TABS = [
    { id: 'food', label: 'Food', icon: 'restaurant' },
    { id: 'laundry', label: 'Laundry', icon: 'local_laundry_service' },
    { id: 'complain', label: 'Complain', icon: 'report_problem' }
  ];
  return (
    <>
      <Header title={tab === 'list' ? "Monthly Payment List" : "History"} onBack={onBack} center={false} />
      <div style={{ padding: 16 }}>
        {tab === 'list' ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              <div style={{ border: `1px dashed ${cyan}`, borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 18 }}>calendar_month</span>
                <div><p style={{ fontSize: 9, color: '#94a3b8', margin: 0 }}>From Date</p><p style={{ fontSize: 12, color: cyan, fontWeight: 600, margin: 0 }}>2 Feb 2025</p></div>
              </div>
              <div style={{ border: `1px dashed ${cyan}`, borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 18 }}>calendar_month</span>
                <div><p style={{ fontSize: 9, color: '#94a3b8', margin: 0 }}>To Date</p><p style={{ fontSize: 12, color: cyan, fontWeight: 600, margin: 0 }}>30 Jun 2025</p></div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { m: 'June 2025', amt: 10000, paid: true }, { m: 'May 2025', amt: 9500, paid: true },
                { m: 'April 2025', amt: 10200, paid: true }, { m: 'March 2025', amt: 9800, paid: false },
                { m: 'February 2025', amt: 9000, paid: false },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'white', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="material-symbols-outlined" style={{ color: cyan }}>calendar_today</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{r.m}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>₹{r.amt.toLocaleString()}</p>
                    <span style={{ fontSize: 11, fontWeight: 700, color: r.paid ? '#16a34a' : '#ef4444' }}>{r.paid ? '✓ Paid' : '✗ Pending'}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setTab('food')} style={{ width: '100%', padding: '14px', background: 'white', border: `1px solid ${cyan}`, color: cyan, fontWeight: 700, borderRadius: 12, marginTop: 16, cursor: 'pointer' }}>Switch to History</button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ width: 80, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, border: tab === t.id ? `1.5px solid ${cyan}` : '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 28 }}>{t.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#64748b' }}>calendar_today</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>21 January 2025</span>
                    </div>
                    {tab === 'complain' && <span style={{ color: i === 1 ? '#ef4444' : '#16a34a', fontSize: 12, fontWeight: 600 }}>{i === 1 ? 'Pending' : 'Complete'}</span>}
                  </div>
                  {tab === 'complain' ? (
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>Issue: Washing Machine not working.</p>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Payment Mode: Cash · Received By: Manager</p>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>₹ 5,000</p>
                        <p style={{ fontSize: 11, color: '#16a34a', fontWeight: 600, margin: 0 }}>Paid</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setTab('list')} style={{ width: '100%', padding: '14px', background: 'white', border: `1px solid ${cyan}`, color: cyan, fontWeight: 700, borderRadius: 12, marginTop: 16, cursor: 'pointer' }}>Back to Monthly List</button>
          </>
        )}
      </div>
    </>
  );
}

// ─── VIEW 5: RECEIPT ──────────────────────────────────────
function ReceiptView({ user, onBack }) {
  const profile = USER_PROFILES[user?.id] || DEFAULT_PROFILE;
  return (
    <>
      <Header title="Paid Successfully" onBack={onBack} center={false} />
      <div style={{ padding: '24px 20px' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', padding: '24px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 4px' }}>Amount</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>₹ {profile.rent.toLocaleString()}</span>
            <span className="material-symbols-outlined" style={{ background: '#16a34a', color: 'white', borderRadius: '50%', fontSize: 16, padding: 2 }}>check</span>
          </div>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 24px' }}>Paid via Cash</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '20px 0' }}>
            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>To</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>Manager <span style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8' }}>Febebo PG</span></p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>From</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{profile.name}</p>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '4px 0 0' }}>Room {profile.roomNo} · Bed {profile.bedNo}</p>
            </div>
          </div>
          <div style={{ padding: '20px 0', borderBottom: '1px dashed #cbd5e1' }}>
            {[
              { label: 'Rent', val: profile.rent - 2000 },
              { label: 'Food Charge', val: 1000 },
              { label: 'Meter Unit', val: Math.round(METER_HISTORY[0].units * profile.meterRatePerUnit) },
              { label: 'Laundry', val: 500 },
              { label: 'Other Charges', val: 500 },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#475569' }}>{item.label} :</span>
                <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 600 }}>₹ {item.val.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 16, color: '#0f172a', fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 16, color: '#0f172a', fontWeight: 700 }}>₹ {profile.rent.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: profile.pending > 0 ? '#ef4444' : '#16a34a', fontWeight: 700 }}>Pending</span>
              <span style={{ fontSize: 14, color: profile.pending > 0 ? '#ef4444' : '#16a34a', fontWeight: 700 }}>{profile.pending > 0 ? `₹ ${profile.pending.toLocaleString()}` : 'None'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN CONTROLLER ──────────────────────────────────────
export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || { id: 1, name: 'Rajeev Kumar', phone: '+91 9234567681', room: 15, bed: 3 };
  const [view, setView] = useState('details'); // 'details' | 'history' | 'receipt'
  const [subView, setSubView] = useState(null); // 'inventory' | 'meter' | 'room'

  const goBack = () => {
    // Priority: close subView first, then go up a view level, then navigate away
    if (subView) { setSubView(null); return; }
    if (view !== 'details') { setView('details'); return; }
    navigate(-1);
  };

  return (
    <div style={BASE}>
      {view === 'details' && <UserDetailsView user={user} onBack={goBack} onReceipt={() => setView('receipt')} onHistory={() => setView('history')} subView={subView} setSubView={setSubView} />}
      {view === 'history' && <PaymentHistoryView onBack={goBack} />}
      {view === 'receipt' && <ReceiptView user={user} onBack={goBack} />}
    </div>
  );
}
