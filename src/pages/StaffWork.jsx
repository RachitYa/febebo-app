import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Colour palette ──────────────────────────────────────────────────────────
const C = {
  bg: '#f1f5f9',
  white: 'white',
  primary: '#0891b2',
  primaryLight: '#ecfeff',
  primaryBorder: '#a5f3fc',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  success: '#16a34a',
  successBg: '#dcfce7',
  warn: '#d97706',
  warnBg: '#fef3c7',
  danger: '#e11d48',
  dangerBg: '#fee2e2',
  purple: '#7c3aed',
  purpleBg: '#ede9fe',
  indigo: '#4f46e5',
  indigoBg: '#e0e7ff',
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const ROLES = [
  { id: 'hr',        label: 'HR',               icon: 'manage_accounts',  color: '#0891b2', bg: '#ecfeff',  category: 'A' },
  { id: 'manager',   label: 'Manager',           icon: 'supervisor_account', color: '#7c3aed', bg: '#ede9fe',  category: 'A' },
  { id: 'sales',     label: 'Sales Manager',     icon: 'query_stats',       color: '#059669', bg: '#d1fae5',  category: 'A' },
  { id: 'purchase',  label: 'Purchase Manager',  icon: 'shopping_bag',      color: '#d97706', bg: '#fef3c7',  category: 'D' },
  { id: 'cook',      label: 'Cook',              icon: 'restaurant',        color: '#e11d48', bg: '#fee2e2',  category: 'B_cook' },
  { id: 'cleaner',   label: 'Cleaner',           icon: 'mop',               color: '#0e7490', bg: '#cffafe',  category: 'B_clean' },
  { id: 'helper',    label: 'Helper',            icon: 'handyman',          color: '#92400e', bg: '#fef3c7',  category: 'A' },
  { id: 'plumber',   label: 'Plumber',           icon: 'plumbing',          color: '#1d4ed8', bg: '#dbeafe',  category: 'C' },
  { id: 'electrician', label: 'Electrician',     icon: 'electric_bolt',     color: '#b45309', bg: '#fef9c3',  category: 'C' },
  { id: 'carpenter', label: 'Carpenter',         icon: 'carpenter',         color: '#065f46', bg: '#d1fae5',  category: 'C' },
  { id: 'ro',        label: 'RO Waterboy',       icon: 'water_drop',        color: '#0369a1', bg: '#e0f2fe',  category: 'C' },
];

const STAFF_MEMBERS = {
  hr:         [{ id: 'h1', name: 'Priya Mishra',    joined: 'Jan 2024', phone: '9876543210' }],
  manager:    [{ id: 'm1', name: 'Vikram Sharma',   joined: 'Mar 2023', phone: '9123456789' }],
  sales:      [{ id: 's1', name: 'Anita Rao',       joined: 'Jul 2023', phone: '9988776655' }],
  purchase:   [{ id: 'p1', name: 'Rajan Verma',     joined: 'Feb 2024', phone: '9090909090' }],
  cook:       [{ id: 'c1', name: 'Ramesh Yadav',    joined: 'Jun 2022', phone: '9871234560' }, { id: 'c2', name: 'Sunita Devi', joined: 'Nov 2023', phone: '9812345670' }],
  cleaner:    [{ id: 'cl1', name: 'Mohan Das',       joined: 'Apr 2023', phone: '9933221100' }, { id: 'cl2', name: 'Lakshmi B.', joined: 'Sep 2023', phone: '9900112233' }],
  helper:     [{ id: 'he1', name: 'Suresh Kumar',    joined: 'Jan 2023', phone: '9777888999' }],
  plumber:    [{ id: 'pl1', name: 'Dinesh Patel',    joined: 'May 2022', phone: '9444555666' }],
  electrician:[{ id: 'el1', name: 'Raj Electricals', joined: 'Oct 2023', phone: '9333444555' }],
  carpenter:  [{ id: 'ca1', name: 'Balram Singh',    joined: 'Aug 2022', phone: '9222333444' }],
  ro:         [{ id: 'r1', name: 'Anil Gupta',       joined: 'Dec 2023', phone: '9111222333' }],
};

// Category A: Timeline logs
const TIMELINE_LOGS = {
  h1: [
    { id: 1, date: '2026-07-11', time: '10:30 AM', text: 'Interviewed 2 candidates for Cook position. Shortlisted 1.', pinned: true },
    { id: 2, date: '2026-07-10', time: '03:00 PM', text: 'Completed onboarding paperwork for new helper Suresh Kumar.', pinned: false },
    { id: 3, date: '2026-07-09', time: '11:00 AM', text: 'Salary processed for all staff for June 2026.', pinned: false },
    { id: 4, date: '2026-07-07', time: '02:15 PM', text: 'Posted job listing for Electrician on Naukri. Awaiting responses.', pinned: false },
  ],
  m1: [
    { id: 1, date: '2026-07-11', time: '09:00 AM', text: 'Reviewed daily occupancy — 28/32 rooms occupied (87.5%). One tenant left today.', pinned: true },
    { id: 2, date: '2026-07-10', time: '06:00 PM', text: 'Conducted evening inspection of floors 1 & 2. All rooms clean.', pinned: false },
    { id: 3, date: '2026-07-09', time: '10:00 AM', text: 'Resolved dispute between tenants in Room 104 and 105. Issue: noise during night hours.', pinned: false },
  ],
  s1: [
    { id: 1, date: '2026-07-11', time: '11:00 AM', text: 'Handled 5 enquiries. 2 converted to site visits tomorrow.', pinned: true },
    { id: 2, date: '2026-07-10', time: '04:30 PM', text: 'Follow-up call with Riya Sharma — she needs double occupancy room. Quoted ₹6,500/month.', pinned: false },
    { id: 3, date: '2026-07-08', time: '01:00 PM', text: 'Updated listing on NoBroker and MagicBricks with new photos.', pinned: false },
  ],
  he1: [
    { id: 1, date: '2026-07-11', time: '08:30 AM', text: 'Helped move furniture from Room 201 to 203 for new tenant.', pinned: false },
    { id: 2, date: '2026-07-10', time: '12:00 PM', text: 'Grocery run completed. Bought vegetables, oil, and spices for kitchen.', pinned: false },
    { id: 3, date: '2026-07-09', time: '03:00 PM', text: 'Assisted Ramesh (Cook) with dish washing after lunch.', pinned: false },
  ],
};

// Category B: Cook
const COOK_DATA = {
  c1: {
    todayMenu: { breakfast: 'Poha + Chai', lunch: 'Dal Tadka, Jeera Rice, Roti', dinner: 'Rajma, Rice, Sabzi' },
    rating: 4.2,
    totalReviews: 38,
    reviews: [
      { id: 1, tenant: 'Ravi Gupta', room: '102', date: '2026-07-11', rating: 5, text: 'Lunch was amazing today! Dal was perfect.' },
      { id: 2, tenant: 'Priya S.', room: '204', date: '2026-07-11', rating: 3, text: 'Dinner sabzi was a bit bland today.' },
      { id: 3, tenant: 'Anil K.', room: '301', date: '2026-07-10', rating: 4, text: 'Breakfast poha was good. More quantity please!' },
      { id: 4, tenant: 'Sneha R.', room: '105', date: '2026-07-10', rating: 5, text: 'Everything was great. Keep it up!' },
    ],
  },
  c2: {
    todayMenu: { breakfast: 'Upma + Coffee', lunch: 'Chole, Bhature, Salad', dinner: 'Mix Veg, Dal, Roti' },
    rating: 3.9,
    totalReviews: 21,
    reviews: [
      { id: 1, tenant: 'Mohit J.', room: '107', date: '2026-07-11', rating: 4, text: 'Nice variety today.' },
      { id: 2, tenant: 'Diya P.', room: '208', date: '2026-07-10', rating: 3, text: 'Chole was too spicy for me.' },
    ],
  },
};

// Category B: Cleaner
const CLEANER_DATA = {
  cl1: {
    assignedRooms: [
      { room: '101', cleanedAt: '08:15 AM', studentStatus: 'Approved', studentName: 'Ravi Gupta' },
      { room: '102', cleanedAt: '09:00 AM', studentStatus: 'Rejected', studentName: 'Priya S.', rejectionNote: 'Bathroom not cleaned properly' },
      { room: '103', cleanedAt: '09:45 AM', studentStatus: 'Pending', studentName: 'Anil K.' },
      { room: '104', cleanedAt: '10:30 AM', studentStatus: 'Approved', studentName: 'Sneha R.' },
    ],
  },
  cl2: {
    assignedRooms: [
      { room: '201', cleanedAt: '08:30 AM', studentStatus: 'Approved', studentName: 'Mohit J.' },
      { room: '202', cleanedAt: '09:15 AM', studentStatus: 'Pending', studentName: 'Diya P.' },
      { room: '203', cleanedAt: '10:00 AM', studentStatus: 'Rejected', studentName: 'Rahul V.', rejectionNote: 'Floor still wet and dusty' },
    ],
  },
};

// Category C: Tickets
const TICKET_DATA = {
  pl1: [
    { id: 1, issue: 'Leaking tap in bathroom', room: '104', date: '2026-07-11', status: 'In Progress', priority: 'High', note: 'Ordered new washer' },
    { id: 2, issue: 'Drainage blocked', room: '202', date: '2026-07-10', status: 'Resolved', priority: 'High', note: 'Cleared blockage, all good now' },
    { id: 3, issue: 'WC flush not working', room: '301', date: '2026-07-09', status: 'Pending', priority: 'Medium', note: '' },
  ],
  el1: [
    { id: 1, issue: 'Fan speed fluctuating', room: '205', date: '2026-07-11', status: 'Pending', priority: 'Medium', note: '' },
    { id: 2, issue: 'Switch board sparking', room: '103', date: '2026-07-10', status: 'Resolved', priority: 'High', note: 'Replaced faulty switch' },
    { id: 3, issue: 'Power socket not working', room: '308', date: '2026-07-08', status: 'In Progress', priority: 'Medium', note: 'Coming with tools tomorrow' },
  ],
  ca1: [
    { id: 1, issue: 'Cupboard door hinge broken', room: '107', date: '2026-07-11', status: 'Pending', priority: 'Low', note: '' },
    { id: 2, issue: 'Study table leg cracked', room: '201', date: '2026-07-09', status: 'Resolved', priority: 'Medium', note: 'Fixed with new leg' },
  ],
  r1: [
    { id: 1, issue: 'RO filter change due', room: 'Common Area (G)', date: '2026-07-11', status: 'Pending', priority: 'High', note: '' },
    { id: 2, issue: 'Water dispenser leaking', room: 'Common Area (1F)', date: '2026-07-10', status: 'Resolved', priority: 'Medium', note: 'Replaced seal' },
    { id: 3, issue: 'TDS levels high', room: 'Common Area (2F)', date: '2026-07-08', status: 'In Progress', priority: 'High', note: 'Ordered new membrane filter' },
  ],
};

// Category D: Purchase Log
const PURCHASE_LOG = {
  p1: [
    { id: 1, date: '2026-07-11', item: 'Basmati Rice', qty: 25, unit: 'kg', rate: 65, total: 1625, vendor: 'Sharma Traders', category: 'Grocery' },
    { id: 2, date: '2026-07-10', item: 'Cooking Oil', qty: 10, unit: 'litre', rate: 120, total: 1200, vendor: 'Sharma Traders', category: 'Grocery' },
    { id: 3, date: '2026-07-09', item: 'Cleaning Liquid', qty: 5, unit: 'litre', rate: 85, total: 425, vendor: 'Clean Depot', category: 'Cleaning' },
    { id: 4, date: '2026-07-08', item: 'Toilet Paper (bulk)', qty: 50, unit: 'piece', rate: 12, total: 600, vendor: 'Clean Depot', category: 'Cleaning' },
    { id: 5, date: '2026-07-07', item: 'Onions', qty: 15, unit: 'kg', rate: 30, total: 450, vendor: 'Vegetable Mandi', category: 'Grocery' },
  ],
};

// ─── Helper Components ────────────────────────────────────────────────────────
const Header = ({ title, onBack }) => (
  <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 20 }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, display: 'flex' }}>
      <span className="material-symbols-outlined">arrow_back</span>
    </button>
    <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: C.text, margin: 0, flex: 1, textAlign: 'center' }}>{title}</p>
    <div style={{ width: 32 }} />
  </div>
);

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className="material-symbols-outlined" style={{ fontSize: 16, color: i <= Math.round(rating) ? '#f59e0b' : '#e2e8f0' }}>star</span>
    );
  }
  return <div style={{ display: 'flex', gap: 1 }}>{stars}</div>;
};

const StatusBadge = ({ status }) => {
  const map = {
    'Resolved': { bg: C.successBg, color: C.success },
    'Approved': { bg: C.successBg, color: C.success },
    'In Progress': { bg: C.indigoBg, color: C.indigo },
    'Pending': { bg: C.warnBg, color: C.warn },
    'Rejected': { bg: C.dangerBg, color: C.danger },
    'High': { bg: C.dangerBg, color: C.danger },
    'Medium': { bg: C.warnBg, color: C.warn },
    'Low': { bg: '#f1f5f9', color: C.muted },
  };
  const s = map[status] || { bg: '#f1f5f9', color: C.muted };
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: s.bg, color: s.color }}>{status}</span>;
};

// ─── Category A: Timeline View ────────────────────────────────────────────────
function TimelineView({ staffId, staffName, role, onBack }) {
  const [newNote, setNewNote] = useState('');
  const logs = TIMELINE_LOGS[staffId] || [];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 80 }}>
      <Header title={`${staffName} — Work Log`} onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Summary card */}
        <div style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)', borderRadius: 16, padding: 20, marginBottom: 20, color: 'white' }}>
          <p style={{ fontSize: 12, opacity: 0.8, margin: '0 0 4px' }}>{role}</p>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>{staffName}</p>
          <p style={{ fontSize: 13, opacity: 0.9, margin: 0 }}>{logs.length} updates logged</p>
        </div>

        {/* Admin reply box */}
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 10px' }}>📝 Add Admin Note</p>
          <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Type a note or instruction for this staff member..."
            style={{ width: '100%', minHeight: 80, padding: '10px 12px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box', color: C.text }} />
          <button
            onClick={() => setNewNote('')}
            style={{ marginTop: 8, padding: '8px 20px', background: C.primary, border: 'none', borderRadius: 10, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Send Note
          </button>
        </div>

        <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 12 }}>Recent Activity</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {logs.map(log => (
            <div key={log.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${log.pinned ? C.primaryBorder : C.border}`, padding: 16, position: 'relative' }}>
              {log.pinned && (
                <div style={{ position: 'absolute', top: 12, right: 12, background: C.primaryLight, borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700, color: C.primary, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12 }}>push_pin</span> Pinned
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: C.muted }}>schedule</span>
                <span style={{ fontSize: 12, color: C.muted }}>{log.date} · {log.time}</span>
              </div>
              <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.6 }}>{log.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category B: Cook View ────────────────────────────────────────────────────
function CookView({ staffId, staffName, onBack }) {
  const data = COOK_DATA[staffId];
  if (!data) return <div style={{ padding: 32, textAlign: 'center', color: C.muted }}>No data found.</div>;

  const { todayMenu, rating, totalReviews, reviews } = data;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — Cook`} onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Rating Summary */}
        <div style={{ background: 'linear-gradient(135deg,#e11d48,#be123c)', borderRadius: 16, padding: 20, marginBottom: 20, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, opacity: 0.8, margin: '0 0 4px' }}>Average Food Rating</p>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 800, margin: '0 0 4px' }}>{rating}</p>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined" style={{ fontSize: 16, color: i <= Math.round(rating) ? '#fde68a' : 'rgba(255,255,255,0.3)' }}>star</span>
              ))}
            </div>
            <p style={{ fontSize: 12, opacity: 0.7, margin: '6px 0 0' }}>{totalReviews} reviews</p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 64, opacity: 0.15 }}>restaurant</span>
        </div>

        {/* Today's Menu */}
        <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 10 }}>Today's Menu</p>
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden', marginBottom: 20 }}>
          {[
            { meal: 'Breakfast', icon: 'free_breakfast', item: todayMenu.breakfast },
            { meal: 'Lunch', icon: 'lunch_dining', item: todayMenu.lunch },
            { meal: 'Dinner', icon: 'dinner_dining', item: todayMenu.dinner },
          ].map((m, i, arr) => (
            <div key={m.meal} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ background: '#fff1f2', borderRadius: 10, padding: 8, display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#e11d48' }}>{m.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: 11, color: C.muted, margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.meal}</p>
                <p style={{ fontSize: 14, color: C.text, fontWeight: 600, margin: '2px 0 0' }}>{m.item}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 10 }}>Student Reviews</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {reviews.map(r => (
            <div key={r.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>{r.tenant} <span style={{ color: C.muted, fontWeight: 400, fontSize: 12 }}>Room {r.room}</span></p>
                  <StarRating rating={r.rating} />
                </div>
                <span style={{ fontSize: 12, color: C.muted }}>{r.date}</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 }}>"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category B: Cleaner View ─────────────────────────────────────────────────
function CleanerView({ staffId, staffName, onBack }) {
  const data = CLEANER_DATA[staffId];
  const [rooms, setRooms] = useState(data ? data.assignedRooms : []);

  const overrideStatus = (roomNum, newStatus) => {
    setRooms(prev => prev.map(r => r.room === roomNum ? { ...r, studentStatus: newStatus } : r));
  };

  const counts = {
    Approved: rooms.filter(r => r.studentStatus === 'Approved').length,
    Pending: rooms.filter(r => r.studentStatus === 'Pending').length,
    Rejected: rooms.filter(r => r.studentStatus === 'Rejected').length,
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — Cleaning`} onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Approved', count: counts.Approved, bg: C.successBg, color: C.success },
            { label: 'Pending', count: counts.Pending, bg: C.warnBg, color: C.warn },
            { label: 'Rejected', count: counts.Rejected, bg: C.dangerBg, color: C.danger },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: s.color, margin: '0 0 2px' }}>{s.count}</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: s.color, margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 10 }}>Room Status Board — Today</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rooms.map(r => (
            <div key={r.room} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, background: C.primaryLight, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: C.primary }}>door_front</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>Room {r.room}</p>
                    <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>{r.studentName}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: r.studentStatus === 'Rejected' ? 8 : 0 }}>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 8, padding: '8px 10px' }}>
                  <p style={{ fontSize: 10, color: C.muted, margin: '0 0 2px', fontWeight: 600 }}>STAFF</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: C.success }}>check_circle</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Cleaned {r.cleanedAt}</span>
                  </div>
                </div>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 8, padding: '8px 10px' }}>
                  <p style={{ fontSize: 10, color: C.muted, margin: '0 0 2px', fontWeight: 600 }}>STUDENT</p>
                  <StatusBadge status={r.studentStatus} />
                </div>
              </div>
              {r.studentStatus === 'Rejected' && (
                <div style={{ background: C.dangerBg, borderRadius: 8, padding: '8px 10px', marginBottom: 10 }}>
                  <p style={{ fontSize: 12, color: C.danger, margin: 0 }}>❌ {r.rejectionNote}</p>
                </div>
              )}
              {/* Admin Override */}
              {r.studentStatus !== 'Approved' && (
                <button onClick={() => overrideStatus(r.room, 'Approved')}
                  style={{ width: '100%', padding: '8px', background: C.successBg, border: `1px solid ${C.success}`, borderRadius: 8, color: C.success, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ✅ Admin Override — Mark as Approved
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category C: Ticket View ──────────────────────────────────────────────────
function TicketView({ staffId, staffName, role, onBack }) {
  const [tickets, setTickets] = useState(TICKET_DATA[staffId] || []);
  const [filter, setFilter] = useState('All');

  const updateStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);
  const counts = { All: tickets.length, Pending: tickets.filter(t => t.status === 'Pending').length, 'In Progress': tickets.filter(t => t.status === 'In Progress').length, Resolved: tickets.filter(t => t.status === 'Resolved').length };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — ${role}`} onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Pending', count: counts.Pending, bg: C.warnBg, color: C.warn },
            { label: 'In Progress', count: counts['In Progress'], bg: C.indigoBg, color: C.indigo },
            { label: 'Resolved', count: counts.Resolved, bg: C.successBg, color: C.success },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: s.color, margin: '0 0 2px' }}>{s.count}</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: s.color, margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: filter === f ? 'none' : `1px solid ${C.border}`, background: filter === f ? C.primary : C.white, color: filter === f ? 'white' : C.muted, transition: 'all 0.2s' }}>
              {f} {counts[f] !== undefined ? `(${counts[f]})` : ''}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(t => (
            <div key={t.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1, paddingRight: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>{t.issue}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: C.muted }}>Room {t.room}</span>
                    <span style={{ fontSize: 11, color: C.muted }}>·</span>
                    <span style={{ fontSize: 12, color: C.muted }}>{t.date}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'flex-end' }}>
                  <StatusBadge status={t.status} />
                  <StatusBadge status={t.priority} />
                </div>
              </div>
              {t.note && (
                <div style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 10px', marginBottom: 10 }}>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>📌 {t.note}</p>
                </div>
              )}
              {/* Admin Actions */}
              {t.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {t.status === 'Pending' && (
                    <button onClick={() => updateStatus(t.id, 'In Progress')}
                      style={{ flex: 1, padding: '7px', background: C.indigoBg, border: `1px solid ${C.indigo}`, borderRadius: 8, color: C.indigo, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Mark In Progress
                    </button>
                  )}
                  <button onClick={() => updateStatus(t.id, 'Resolved')}
                    style={{ flex: 1, padding: '7px', background: C.successBg, border: `1px solid ${C.success}`, borderRadius: 8, color: C.success, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Mark Resolved ✅
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category D: Purchase Manager View ───────────────────────────────────────
function PurchaseManagerView({ staffId, staffName, onBack }) {
  const logs = PURCHASE_LOG[staffId] || [];
  const totalSpent = logs.reduce((s, l) => s + l.total, 0);
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(logs.map(l => l.category))];
  const filtered = filter === 'All' ? logs : logs.filter(l => l.category === filter);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — Purchases`} onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Total */}
        <div style={{ background: 'linear-gradient(135deg,#d97706,#92400e)', borderRadius: 16, padding: 20, marginBottom: 20, color: 'white' }}>
          <p style={{ fontSize: 12, opacity: 0.8, margin: '0 0 4px' }}>Total Spent (Recent)</p>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, margin: '0 0 4px' }}>₹ {totalSpent.toLocaleString('en-IN')}</p>
          <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>{logs.length} purchases logged</p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: filter === cat ? 'none' : `1px solid ${C.border}`, background: filter === cat ? C.primary : C.white, color: filter === cat ? 'white' : C.muted, transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          {filtered.map((log, i) => (
            <div key={log.id} style={{ padding: '14px 16px', borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>{log.item}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px' }}>{log.vendor}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: C.muted }}>{log.date}</span>
                    <span style={{ fontSize: 11, background: C.warnBg, color: C.warn, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{log.category}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 15, color: C.text, margin: '0 0 4px' }}>₹{log.total.toLocaleString('en-IN')}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{log.qty} {log.unit} × ₹{log.rate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Staff Member List ────────────────────────────────────────────────────────
function StaffMemberList({ role, onBack, onSelectStaff }) {
  const members = STAFF_MEMBERS[role.id] || [];
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={role.label} onBack={onBack} />
      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 12 }}>{members.length} staff member{members.length !== 1 ? 's' : ''}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {members.map(m => (
            <div key={m.id} onClick={() => onSelectStaff(m)} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: role.color }}>{role.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Since {m.joined} · {m.phone}</p>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#cbd5e1', fontSize: 20 }}>chevron_right</span>
            </div>
          ))}
          {members.length === 0 && (
            <div style={{ background: C.white, borderRadius: 14, padding: '32px 16px', textAlign: 'center', color: C.muted, border: `1px solid ${C.border}` }}>
              <span className="material-symbols-outlined" style={{ fontSize: 40, display: 'block', marginBottom: 8, opacity: 0.4 }}>person_off</span>
              No staff assigned to this role yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Role Grid ───────────────────────────────────────────────────────────
export default function StaffWork() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Drill-down: Work Dashboard
  if (selectedRole && selectedStaff) {
    const cat = selectedRole.category;
    const commonProps = {
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      onBack: () => setSelectedStaff(null),
    };
    if (cat === 'A') return <TimelineView {...commonProps} role={selectedRole.label} />;
    if (cat === 'B_cook') return <CookView {...commonProps} />;
    if (cat === 'B_clean') return <CleanerView {...commonProps} />;
    if (cat === 'C') return <TicketView {...commonProps} role={selectedRole.label} />;
    if (cat === 'D') return <PurchaseManagerView {...commonProps} />;
  }

  // Drill-down: Staff member list
  if (selectedRole) {
    return (
      <StaffMemberList
        role={selectedRole}
        onBack={() => setSelectedRole(null)}
        onSelectStaff={(staff) => setSelectedStaff(staff)}
      />
    );
  }

  // Role Grid
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, display: 'flex' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: C.text, margin: 0, flex: 1, textAlign: 'center' }}>Staff Work</p>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginBottom: 16 }}>Select a role to view work activity</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {ROLES.map(role => {
            const count = (STAFF_MEMBERS[role.id] || []).length;
            return (
              <div key={role.id} onClick={() => setSelectedRole(role)}
                style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 18, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, color: role.color }}>{role.icon}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>{role.label}</p>
                <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{count} member{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
