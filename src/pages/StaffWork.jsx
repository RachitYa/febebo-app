import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Colour palette ──────────────────────────────────────────────────────────
const C = {
  bg: '#f8fafc', // Softer white-gray
  white: '#ffffff',
  primary: '#0284c7', // deeper blue
  primaryLight: '#e0f2fe',
  primaryBorder: '#bae6fd',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  success: '#059669',
  successBg: '#d1fae5',
  warn: '#d97706',
  warnBg: '#fef3c7',
  danger: '#e11d48',
  dangerBg: '#ffe4e6',
  purple: '#7c3aed',
  purpleBg: '#ede9fe',
  indigo: '#4f46e5',
  indigoBg: '#e0e7ff',
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const ROLES = [
  { id: 'hr',        label: 'HR',               icon: 'manage_accounts',  color: '#0284c7', bg: '#e0f2fe',  category: 'A' },
  { id: 'manager',   label: 'Manager',           icon: 'supervisor_account', color: '#7c3aed', bg: '#ede9fe',  category: 'A' },
  { id: 'sales',     label: 'Sales Manager',     icon: 'query_stats',       color: '#059669', bg: '#d1fae5',  category: 'A' },
  { id: 'purchase',  label: 'Purchase Manager',  icon: 'shopping_bag',      color: '#d97706', bg: '#fef3c7',  category: 'D' },
  { id: 'cook',      label: 'Cook',              icon: 'restaurant',        color: '#e11d48', bg: '#ffe4e6',  category: 'B_cook' },
  { id: 'cleaner',   label: 'Cleaner',           icon: 'mop',               color: '#0891b2', bg: '#cffafe',  category: 'B_clean' },
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
const Header = ({ title, onBack, bgGrad = 'linear-gradient(135deg, #0f172a, #1e293b)' }) => (
  <div style={{ background: bgGrad, padding: '20px', display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%' }}>
      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
    </button>
    <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 22, color: 'white', margin: 0, flex: 1, letterSpacing: 0.5 }}>{title}</p>
    <div style={{ width: 40 }} />
  </div>
);

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className="material-symbols-outlined" style={{ fontSize: 22, color: i <= Math.round(rating) ? '#f59e0b' : '#e2e8f0' }}>star</span>
    );
  }
  return <div style={{ display: 'flex', gap: 4 }}>{stars}</div>;
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
  return <span style={{ fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: s.bg, color: s.color, letterSpacing: 0.3 }}>{status}</span>;
};

// ─── Category A: Timeline View ────────────────────────────────────────────────
export function TimelineView({ staffId, staffName, role, onBack }) {
  const [newNote, setNewNote] = useState('');
  const logs = TIMELINE_LOGS[staffId] || Object.values(TIMELINE_LOGS)[0] || [];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 80 }}>
      <Header title="Activity Timeline" onBack={onBack} bgGrad="linear-gradient(135deg, #0284c7, #0369a1)" />
      <div style={{ padding: 20 }}>
        {/* Summary card */}
        <div style={{ background: C.white, borderRadius: 20, padding: 20, marginBottom: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 32 }}>person</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, margin: '0 0 4px', color: C.text }}>{staffName}</p>
            <p style={{ fontSize: 15, color: C.primary, margin: 0, fontWeight: 600 }}>{role}</p>
          </div>
        </div>

        {/* Admin reply box */}
        <div style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: 20, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>📝 Leave an Instruction</p>
          <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Type a message for this staff member..."
            style={{ width: '100%', minHeight: 90, padding: '14px', border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box', color: C.text, backgroundColor: '#f8fafc' }} />
          <button
            onClick={() => setNewNote('')}
            style={{ marginTop: 12, width: '100%', padding: '14px', background: C.primary, border: 'none', borderRadius: 12, color: 'white', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(2,132,199,0.3)' }}>
            Send Note
          </button>
        </div>

        <p style={{ fontSize: 16, fontWeight: 700, color: C.muted, marginBottom: 16, paddingLeft: 4 }}>Recent Activity</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {logs.map(log => (
            <div key={log.id} style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${log.pinned ? C.primaryBorder : C.border}`, padding: 20, position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              {log.pinned && (
                <div style={{ position: 'absolute', top: 16, right: 16, background: C.primaryLight, borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: C.primary, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>push_pin</span> Pinned
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: C.primary }}>schedule</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>{log.date} at {log.time}</span>
              </div>
              <p style={{ fontSize: 16, color: C.text, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{log.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category B: Cook View ────────────────────────────────────────────────────
export function CookView({ staffId, staffName, onBack }) {
  const data = COOK_DATA[staffId] || Object.values(COOK_DATA)[0];
  if (!data) return <div style={{ padding: 32, textAlign: 'center', color: C.muted }}>No data found.</div>;

  const { todayMenu, rating, totalReviews, reviews } = data;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — Kitchen`} onBack={onBack} bgGrad="linear-gradient(135deg, #e11d48, #be123c)" />
      <div style={{ padding: 20 }}>
        {/* Rating Summary */}
        <div style={{ background: 'linear-gradient(135deg,#e11d48,#9f1239)', borderRadius: 24, padding: 24, marginBottom: 24, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 24px rgba(225,29,72,0.3)' }}>
          <div>
            <p style={{ fontSize: 15, opacity: 0.9, margin: '0 0 6px', fontWeight: 600 }}>Overall Food Rating</p>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 48, fontWeight: 800, margin: '0 0 8px', letterSpacing: -1 }}>{rating}<span style={{fontSize: 24, opacity: 0.7}}>/5</span></p>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined" style={{ fontSize: 20, color: i <= Math.round(rating) ? '#fde68a' : 'rgba(255,255,255,0.2)' }}>star</span>
              ))}
            </div>
            <p style={{ fontSize: 14, opacity: 0.8, margin: '8px 0 0', fontWeight: 600 }}>{totalReviews} student reviews</p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 80, opacity: 0.15 }}>restaurant</span>
        </div>

        {/* Today's Menu */}
        <p style={{ fontSize: 16, fontWeight: 700, color: C.muted, marginBottom: 16, paddingLeft: 4 }}>Today's Menu</p>
        <div style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, overflow: 'hidden', marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          {[
            { meal: 'Breakfast', icon: 'free_breakfast', item: todayMenu.breakfast },
            { meal: 'Lunch', icon: 'lunch_dining', item: todayMenu.lunch },
            { meal: 'Dinner', icon: 'dinner_dining', item: todayMenu.dinner },
          ].map((m, i, arr) => (
            <div key={m.meal} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < arr.length - 1 ? `1.5px solid ${C.border}` : 'none' }}>
              <div style={{ background: '#ffe4e6', borderRadius: 12, padding: 12, display: 'flex' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#e11d48' }}>{m.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: 13, color: '#e11d48', margin: 0, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.meal}</p>
                <p style={{ fontSize: 17, color: C.text, fontWeight: 700, margin: '4px 0 0' }}>{m.item}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <p style={{ fontSize: 16, fontWeight: 700, color: C.muted, marginBottom: 16, paddingLeft: 4 }}>Recent Feedback</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {reviews.map(r => (
            <div key={r.id} style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 4px' }}>{r.tenant} <span style={{ color: C.muted, fontWeight: 500, fontSize: 14 }}>— Room {r.room}</span></p>
                  <StarRating rating={r.rating} />
                </div>
                <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{r.date}</span>
              </div>
              <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.5 }}>"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category B: Cleaner View ─────────────────────────────────────────────────
export function CleanerView({ staffId, staffName, onBack }) {
  const data = CLEANER_DATA[staffId] || Object.values(CLEANER_DATA)[0];
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
      <Header title={`${staffName} — Cleaning`} onBack={onBack} bgGrad="linear-gradient(135deg, #0284c7, #0369a1)" />
      <div style={{ padding: 20 }}>
        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Approved', count: counts.Approved, bg: C.successBg, color: C.success },
            { label: 'Pending', count: counts.Pending, bg: C.warnBg, color: C.warn },
            { label: 'Rejected', count: counts.Rejected, bg: C.dangerBg, color: C.danger },
          ].map(s => (
            <div key={s.label} style={{ background: C.white, borderRadius: 16, border: `2px solid ${s.bg}`, padding: '16px 8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, color: s.color, margin: '0 0 4px' }}>{s.count}</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: s.color, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 16, fontWeight: 700, color: C.muted, marginBottom: 16, paddingLeft: 4 }}>Today's Room Status</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {rooms.map(r => (
            <div key={r.room} style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, background: C.primaryLight, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24, color: C.primary }}>door_front</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Room {r.room}</p>
                    <p style={{ fontSize: 14, color: C.muted, margin: '4px 0 0', fontWeight: 500 }}>Tenant: {r.studentName}</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: r.studentStatus === 'Rejected' ? 12 : 0 }}>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 12, color: C.muted, margin: '0 0 6px', fontWeight: 800, letterSpacing: 0.5 }}>STAFF STATUS</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: C.success }}>check_circle</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{r.cleanedAt}</span>
                  </div>
                </div>
                <div style={{ flex: 1, background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 12, color: C.muted, margin: '0 0 6px', fontWeight: 800, letterSpacing: 0.5 }}>STUDENT STATUS</p>
                  <StatusBadge status={r.studentStatus} />
                </div>
              </div>
              {r.studentStatus === 'Rejected' && (
                <div style={{ background: C.dangerBg, borderRadius: 12, padding: '12px 16px', marginBottom: 12, border: `1px solid #fda4af` }}>
                  <p style={{ fontSize: 14, color: C.danger, margin: 0, fontWeight: 600 }}>❌ Issue: {r.rejectionNote}</p>
                </div>
              )}
              {/* Admin Override */}
              {r.studentStatus !== 'Approved' && (
                <button onClick={() => overrideStatus(r.room, 'Approved')}
                  style={{ width: '100%', padding: '14px', background: C.successBg, border: `1.5px solid ${C.success}`, borderRadius: 12, color: C.success, fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
                  ✅ Override to Approved
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
export function TicketView({ staffId, staffName, role, onBack }) {
  const [tickets, setTickets] = useState(TICKET_DATA[staffId] || Object.values(TICKET_DATA)[0] || []);
  const [filter, setFilter] = useState('All');

  const updateStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);
  const counts = { All: tickets.length, Pending: tickets.filter(t => t.status === 'Pending').length, 'In Progress': tickets.filter(t => t.status === 'In Progress').length, Resolved: tickets.filter(t => t.status === 'Resolved').length };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — ${role}`} onBack={onBack} bgGrad="linear-gradient(135deg, #4f46e5, #3730a3)" />
      <div style={{ padding: 20 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Pending', count: counts.Pending, bg: C.warnBg, color: C.warn },
            { label: 'In Progress', count: counts['In Progress'], bg: C.indigoBg, color: C.indigo },
            { label: 'Resolved', count: counts.Resolved, bg: C.successBg, color: C.success },
          ].map(s => (
            <div key={s.label} style={{ background: C.white, borderRadius: 16, border: `2px solid ${s.bg}`, padding: '16px 8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 32, fontWeight: 800, color: s.color, margin: '0 0 4px' }}>{s.count}</p>
              <p style={{ fontSize: 12, fontWeight: 800, color: s.color, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 8 }}>
          {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer', border: filter === f ? 'none' : `1.5px solid ${C.border}`, background: filter === f ? C.indigo : C.white, color: filter === f ? 'white' : C.muted, transition: 'all 0.2s', boxShadow: filter === f ? '0 4px 12px rgba(79,70,229,0.3)' : 'none' }}>
              {f} {counts[f] !== undefined ? `(${counts[f]})` : ''}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(t => (
            <div key={t.id} style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <p style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: '0 0 6px', lineHeight: 1.4 }}>{t.issue}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 14, color: C.indigo, fontWeight: 700, background: C.indigoBg, padding: '2px 8px', borderRadius: 6 }}>Room {t.room}</span>
                    <span style={{ fontSize: 14, color: C.muted, fontWeight: 500 }}>{t.date}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'flex-end' }}>
                  <StatusBadge status={t.status} />
                  <StatusBadge status={t.priority} />
                </div>
              </div>
              {t.note && (
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: '12px 14px', marginBottom: 16, border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 14, color: C.muted, margin: 0, fontWeight: 500 }}>📌 {t.note}</p>
                </div>
              )}
              {/* Admin Actions */}
              {t.status !== 'Resolved' && (
                <div style={{ display: 'flex', gap: 12 }}>
                  {t.status === 'Pending' && (
                    <button onClick={() => updateStatus(t.id, 'In Progress')}
                      style={{ flex: 1, padding: '12px', background: C.indigoBg, border: `1.5px solid ${C.indigo}`, borderRadius: 12, color: C.indigo, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Mark In Progress
                    </button>
                  )}
                  <button onClick={() => updateStatus(t.id, 'Resolved')}
                    style={{ flex: 1, padding: '12px', background: C.successBg, border: `1.5px solid ${C.success}`, borderRadius: 12, color: C.success, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
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
export function PurchaseManagerView({ staffId, staffName, onBack }) {
  const logs = PURCHASE_LOG[staffId] || Object.values(PURCHASE_LOG)[0] || [];
  const totalSpent = logs.reduce((s, l) => s + l.total, 0);
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(logs.map(l => l.category))];
  const filtered = filter === 'All' ? logs : logs.filter(l => l.category === filter);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      <Header title={`${staffName} — Purchases`} onBack={onBack} bgGrad="linear-gradient(135deg, #d97706, #92400e)" />
      <div style={{ padding: 20 }}>
        {/* Total */}
        <div style={{ background: 'linear-gradient(135deg,#d97706,#b45309)', borderRadius: 24, padding: 24, marginBottom: 24, color: 'white', boxShadow: '0 8px 24px rgba(217,119,6,0.3)' }}>
          <p style={{ fontSize: 15, opacity: 0.9, margin: '0 0 6px', fontWeight: 600 }}>Total Spent (Recent)</p>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 44, fontWeight: 800, margin: '0 0 8px', letterSpacing: -1 }}>₹ {totalSpent.toLocaleString('en-IN')}</p>
          <p style={{ fontSize: 14, opacity: 0.8, margin: 0, fontWeight: 500 }}>{logs.length} purchases logged this week</p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 8 }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: 24, fontSize: 15, fontWeight: 700, cursor: 'pointer', border: filter === cat ? 'none' : `1.5px solid ${C.border}`, background: filter === cat ? '#d97706' : C.white, color: filter === cat ? 'white' : C.muted, transition: 'all 0.2s', boxShadow: filter === cat ? '0 4px 12px rgba(217,119,6,0.3)' : 'none' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          {filtered.map((log, i) => (
            <div key={log.id} style={{ padding: '16px 20px', borderBottom: i < filtered.length - 1 ? `1.5px solid ${C.border}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: '0 0 6px' }}>{log.item}</p>
                  <p style={{ fontSize: 14, color: C.muted, margin: '0 0 8px', fontWeight: 500 }}>{log.vendor}</p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{log.date}</span>
                    <span style={{ fontSize: 12, background: C.warnBg, color: C.warn, padding: '4px 10px', borderRadius: 20, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>{log.category}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 18, color: C.text, margin: '0 0 6px' }}>₹{log.total.toLocaleString('en-IN')}</p>
                  <p style={{ fontSize: 14, color: C.muted, margin: 0, fontWeight: 600 }}>{log.qty} {log.unit} × ₹{log.rate}</p>
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
      <Header title={role.label} onBack={onBack} bgGrad={role.color} />
      <div style={{ padding: 20 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: C.muted, marginBottom: 16 }}>{members.length} staff member{members.length !== 1 ? 's' : ''}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {members.map(m => (
            <div key={m.id} onClick={() => onSelectStaff(m)} style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: role.color }}>{role.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: '0 0 4px' }}>{m.name}</p>
                  <p style={{ fontSize: 14, color: C.muted, margin: 0, fontWeight: 500 }}>Since {m.joined} · {m.phone}</p>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: '#cbd5e1', fontSize: 24 }}>chevron_right</span>
            </div>
          ))}
          {members.length === 0 && (
            <div style={{ background: C.white, borderRadius: 16, padding: '40px 20px', textAlign: 'center', color: C.muted, border: `1.5px solid ${C.border}` }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12, opacity: 0.4 }}>person_off</span>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>No staff assigned to this role yet.</p>
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
      role: selectedRole.label,
      onBack: () => setSelectedStaff(null),
    };
    if (cat === 'A') return <TimelineView {...commonProps} />;
    if (cat === 'B_cook') return <CookView {...commonProps} />;
    if (cat === 'B_clean') return <CleanerView {...commonProps} />;
    if (cat === 'C') return <TicketView {...commonProps} />;
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
      <Header title="Staff Work" onBack={() => navigate(-1)} bgGrad="linear-gradient(135deg, #0f172a, #1e293b)" />

      <div style={{ padding: 20 }}>
        <p style={{ fontSize: 15, color: C.muted, fontWeight: 700, marginBottom: 20 }}>Select a role to view work activity</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {ROLES.map(role => {
            const count = (STAFF_MEMBERS[role.id] || []).length;
            return (
              <div key={role.id} onClick={() => setSelectedRole(role)}
                style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: 20, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: role.color }}>{role.icon}</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 6px' }}>{role.label}</p>
                <p style={{ fontSize: 14, color: C.muted, margin: 0, fontWeight: 600 }}>{count} member{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
