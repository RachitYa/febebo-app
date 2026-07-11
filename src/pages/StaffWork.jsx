import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  bg:          '#0f1117',
  card:        '#1a1d27',
  cardBorder:  '#2a2d3a',
  surface:     '#22253a',
  text:        '#f1f5f9',
  textSub:     '#94a3b8',
  textMuted:   '#64748b',
  white:       '#ffffff',

  // Accent palette
  blue:     '#38bdf8',
  blueDark: '#0284c7',
  blueBg:   'rgba(56,189,248,0.1)',

  green:     '#34d399',
  greenDark: '#059669',
  greenBg:   'rgba(52,211,153,0.12)',

  red:     '#f87171',
  redDark: '#e11d48',
  redBg:   'rgba(248,113,113,0.12)',

  amber:     '#fbbf24',
  amberDark: '#d97706',
  amberBg:   'rgba(251,191,36,0.12)',

  purple:     '#a78bfa',
  purpleDark: '#7c3aed',
  purpleBg:   'rgba(167,139,250,0.12)',

  indigo:     '#818cf8',
  indigoDark: '#4f46e5',
  indigoBg:   'rgba(129,140,248,0.12)',

  teal:     '#2dd4bf',
  tealDark: '#0891b2',
  tealBg:   'rgba(45,212,191,0.12)',
};

// ─────────────────────────────────────────────────────────────────────────────
// DUMMY DATA
// ─────────────────────────────────────────────────────────────────────────────
const ROLES = [
  { id: 'hr',          label: 'HR',              icon: 'manage_accounts',    accent: T.blue,   accentDark: T.blueDark,   bg: T.blueBg,   category: 'A',       grad: 'linear-gradient(135deg,#0284c7,#0369a1)' },
  { id: 'manager',     label: 'Manager',          icon: 'supervisor_account', accent: T.purple, accentDark: T.purpleDark, bg: T.purpleBg, category: 'A',       grad: 'linear-gradient(135deg,#7c3aed,#6d28d9)' },
  { id: 'sales',       label: 'Sales Manager',    icon: 'query_stats',        accent: T.green,  accentDark: T.greenDark,  bg: T.greenBg,  category: 'A',       grad: 'linear-gradient(135deg,#059669,#047857)' },
  { id: 'purchase',    label: 'Purchase Manager', icon: 'shopping_bag',       accent: T.teal,   accentDark: T.tealDark,   bg: T.tealBg,   category: 'D',       grad: 'linear-gradient(135deg,#0891b2,#0e7490)' },
  { id: 'cook',        label: 'Cook',             icon: 'restaurant',         accent: T.red,    accentDark: T.redDark,    bg: T.redBg,    category: 'B_cook',  grad: 'linear-gradient(135deg,#e11d48,#be123c)' },
  { id: 'cleaner',     label: 'Cleaner',          icon: 'mop',                accent: T.teal,   accentDark: T.tealDark,   bg: T.tealBg,   category: 'B_clean', grad: 'linear-gradient(135deg,#0891b2,#0e7490)' },
  { id: 'helper',      label: 'Helper',           icon: 'handyman',           accent: T.amber,  accentDark: T.amberDark,  bg: T.amberBg,  category: 'A',       grad: 'linear-gradient(135deg,#d97706,#b45309)' },
  { id: 'plumber',     label: 'Plumber',          icon: 'plumbing',           accent: T.indigo, accentDark: T.indigoDark, bg: T.indigoBg, category: 'C',       grad: 'linear-gradient(135deg,#4f46e5,#4338ca)' },
  { id: 'electrician', label: 'Electrician',      icon: 'electric_bolt',      accent: T.amber,  accentDark: T.amberDark,  bg: T.amberBg,  category: 'C',       grad: 'linear-gradient(135deg,#d97706,#b45309)' },
  { id: 'carpenter',   label: 'Carpenter',        icon: 'carpenter',          accent: T.green,  accentDark: T.greenDark,  bg: T.greenBg,  category: 'C',       grad: 'linear-gradient(135deg,#059669,#047857)' },
  { id: 'ro',          label: 'RO Waterboy',      icon: 'water_drop',         accent: T.blue,   accentDark: T.blueDark,   bg: T.blueBg,   category: 'C',       grad: 'linear-gradient(135deg,#0284c7,#0369a1)' },
];

const STAFF_MEMBERS = {
  hr:          [{ id: 'h1',  name: 'Priya Mishra',     joined: 'Jan 2024', phone: '9876543210' }],
  manager:     [{ id: 'm1',  name: 'Vikram Sharma',    joined: 'Mar 2023', phone: '9123456789' }],
  sales:       [{ id: 's1',  name: 'Anita Rao',        joined: 'Jul 2023', phone: '9988776655' }],
  purchase:    [{ id: 'p1',  name: 'Rajan Verma',      joined: 'Feb 2024', phone: '9090909090' }],
  cook:        [{ id: 'c1',  name: 'Ramesh Yadav',     joined: 'Jun 2022', phone: '9871234560' }, { id: 'c2', name: 'Sunita Devi',    joined: 'Nov 2023', phone: '9812345670' }],
  cleaner:     [{ id: 'cl1', name: 'Mohan Das',        joined: 'Apr 2023', phone: '9933221100' }, { id: 'cl2', name: 'Lakshmi B.',   joined: 'Sep 2023', phone: '9900112233' }],
  helper:      [{ id: 'he1', name: 'Suresh Kumar',     joined: 'Jan 2023', phone: '9777888999' }],
  plumber:     [{ id: 'pl1', name: 'Dinesh Patel',     joined: 'May 2022', phone: '9444555666' }],
  electrician: [{ id: 'el1', name: 'Raj Electricals',  joined: 'Oct 2023', phone: '9333444555' }],
  carpenter:   [{ id: 'ca1', name: 'Balram Singh',     joined: 'Aug 2022', phone: '9222333444' }],
  ro:          [{ id: 'r1',  name: 'Anil Gupta',       joined: 'Dec 2023', phone: '9111222333' }],
};

const TIMELINE_LOGS = {
  h1:  [
    { id: 1, date: '2026-07-11', time: '10:30 AM', text: 'Interviewed 2 candidates for Cook position. Shortlisted 1.', pinned: true },
    { id: 2, date: '2026-07-10', time: '03:00 PM', text: 'Completed onboarding paperwork for new helper Suresh Kumar.', pinned: false },
    { id: 3, date: '2026-07-09', time: '11:00 AM', text: 'Salary processed for all staff for June 2026.', pinned: false },
    { id: 4, date: '2026-07-07', time: '02:15 PM', text: 'Posted job listing for Electrician on Naukri. Awaiting responses.', pinned: false },
  ],
  m1:  [
    { id: 1, date: '2026-07-11', time: '09:00 AM', text: 'Reviewed daily occupancy — 28/32 rooms occupied (87.5%). One tenant left today.', pinned: true },
    { id: 2, date: '2026-07-10', time: '06:00 PM', text: 'Conducted evening inspection of floors 1 & 2. All rooms clean.', pinned: false },
    { id: 3, date: '2026-07-09', time: '10:00 AM', text: 'Resolved dispute between tenants in Room 104 and 105. Noise issue.', pinned: false },
  ],
  s1:  [
    { id: 1, date: '2026-07-11', time: '11:00 AM', text: 'Handled 5 enquiries. 2 converted to site visits tomorrow.', pinned: true },
    { id: 2, date: '2026-07-10', time: '04:30 PM', text: 'Follow-up call with Riya Sharma — double occupancy room. Quoted ₹6,500/month.', pinned: false },
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
    rating: 4.2, totalReviews: 38,
    reviews: [
      { id: 1, tenant: 'Ravi Gupta',  room: '102', date: '2026-07-11', rating: 5, text: 'Lunch was amazing today! Dal was perfect.' },
      { id: 2, tenant: 'Priya S.',    room: '204', date: '2026-07-11', rating: 3, text: 'Dinner sabzi was a bit bland today.' },
      { id: 3, tenant: 'Anil K.',     room: '301', date: '2026-07-10', rating: 4, text: 'Breakfast poha was good. More quantity please!' },
      { id: 4, tenant: 'Sneha R.',    room: '105', date: '2026-07-10', rating: 5, text: 'Everything was great. Keep it up!' },
    ],
  },
  c2: {
    todayMenu: { breakfast: 'Upma + Coffee', lunch: 'Chole, Bhature, Salad', dinner: 'Mix Veg, Dal, Roti' },
    rating: 3.9, totalReviews: 21,
    reviews: [
      { id: 1, tenant: 'Mohit J.', room: '107', date: '2026-07-11', rating: 4, text: 'Nice variety today.' },
      { id: 2, tenant: 'Diya P.',  room: '208', date: '2026-07-10', rating: 3, text: 'Chole was too spicy for me.' },
    ],
  },
};

const CLEANER_DATA = {
  cl1: { assignedRooms: [
    { room: '101', cleanedAt: '08:15 AM', studentStatus: 'Approved',  studentName: 'Ravi Gupta' },
    { room: '102', cleanedAt: '09:00 AM', studentStatus: 'Rejected',  studentName: 'Priya S.',   rejectionNote: 'Bathroom not cleaned properly' },
    { room: '103', cleanedAt: '09:45 AM', studentStatus: 'Pending',   studentName: 'Anil K.' },
    { room: '104', cleanedAt: '10:30 AM', studentStatus: 'Approved',  studentName: 'Sneha R.' },
  ]},
  cl2: { assignedRooms: [
    { room: '201', cleanedAt: '08:30 AM', studentStatus: 'Approved',  studentName: 'Mohit J.' },
    { room: '202', cleanedAt: '09:15 AM', studentStatus: 'Pending',   studentName: 'Diya P.' },
    { room: '203', cleanedAt: '10:00 AM', studentStatus: 'Rejected',  studentName: 'Rahul V.',   rejectionNote: 'Floor still wet and dusty' },
  ]},
};

const TICKET_DATA = {
  pl1: [
    { id: 1, issue: 'Leaking tap in bathroom',    room: '104', date: '2026-07-11', status: 'In Progress', priority: 'High',   note: 'Ordered new washer' },
    { id: 2, issue: 'Drainage blocked',            room: '202', date: '2026-07-10', status: 'Resolved',    priority: 'High',   note: 'Cleared blockage, all good now' },
    { id: 3, issue: 'WC flush not working',        room: '301', date: '2026-07-09', status: 'Pending',     priority: 'Medium', note: '' },
  ],
  el1: [
    { id: 1, issue: 'Fan speed fluctuating',       room: '205', date: '2026-07-11', status: 'Pending',     priority: 'Medium', note: '' },
    { id: 2, issue: 'Switch board sparking',       room: '103', date: '2026-07-10', status: 'Resolved',    priority: 'High',   note: 'Replaced faulty switch' },
    { id: 3, issue: 'Power socket not working',    room: '308', date: '2026-07-08', status: 'In Progress', priority: 'Medium', note: 'Coming with tools tomorrow' },
  ],
  ca1: [
    { id: 1, issue: 'Cupboard door hinge broken',  room: '107', date: '2026-07-11', status: 'Pending',     priority: 'Low',    note: '' },
    { id: 2, issue: 'Study table leg cracked',     room: '201', date: '2026-07-09', status: 'Resolved',    priority: 'Medium', note: 'Fixed with new leg' },
  ],
  r1: [
    { id: 1, issue: 'RO filter change due',        room: 'Common (G)',  date: '2026-07-11', status: 'Pending',     priority: 'High',   note: '' },
    { id: 2, issue: 'Water dispenser leaking',     room: 'Common (1F)', date: '2026-07-10', status: 'Resolved',    priority: 'Medium', note: 'Replaced seal' },
    { id: 3, issue: 'TDS levels high',             room: 'Common (2F)', date: '2026-07-08', status: 'In Progress', priority: 'High',   note: 'Ordered new membrane filter' },
  ],
};

const PURCHASE_LOG = {
  p1: [
    { id: 1, date: '2026-07-11', item: 'Basmati Rice',         qty: 25, unit: 'kg',    rate: 65,  total: 1625, vendor: 'Sharma Traders',   category: 'Grocery'  },
    { id: 2, date: '2026-07-10', item: 'Cooking Oil',          qty: 10, unit: 'litre', rate: 120, total: 1200, vendor: 'Sharma Traders',   category: 'Grocery'  },
    { id: 3, date: '2026-07-09', item: 'Cleaning Liquid',      qty: 5,  unit: 'litre', rate: 85,  total: 425,  vendor: 'Clean Depot',      category: 'Cleaning' },
    { id: 4, date: '2026-07-08', item: 'Toilet Paper (bulk)',  qty: 50, unit: 'piece', rate: 12,  total: 600,  vendor: 'Clean Depot',      category: 'Cleaning' },
    { id: 5, date: '2026-07-07', item: 'Onions',               qty: 15, unit: 'kg',    rate: 30,  total: 450,  vendor: 'Vegetable Mandi',  category: 'Grocery'  },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const Page = ({ children }) => (
  <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: T.bg, fontFamily: "'Hanken Grotesk', sans-serif", paddingBottom: 40 }}>
    {children}
  </div>
);

const TopBar = ({ title, onBack, grad }) => (
  <div style={{ background: grad || 'linear-gradient(135deg,#1a1d27,#22253a)', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 30 }}>
    <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
    </button>
    <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0, flex: 1, letterSpacing: 0.2 }}>{title}</p>
  </div>
);

const Pill = ({ label, color, bg }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 99, background: bg || 'rgba(255,255,255,0.08)', color: color || T.textSub, letterSpacing: 0.4 }}>
    {label}
  </span>
);

const statusStyle = (s) => ({
  Approved:    { color: T.green,  bg: T.greenBg  },
  Resolved:    { color: T.green,  bg: T.greenBg  },
  'In Progress':{ color: T.indigo, bg: T.indigoBg },
  Pending:     { color: T.amber,  bg: T.amberBg  },
  Rejected:    { color: T.red,    bg: T.redBg    },
  High:        { color: T.red,    bg: T.redBg    },
  Medium:      { color: T.amber,  bg: T.amberBg  },
  Low:         { color: T.textSub, bg: 'rgba(148,163,184,0.1)' },
}[s] || { color: T.textSub, bg: 'rgba(255,255,255,0.06)' });

const StatusChip = ({ label }) => {
  const { color, bg } = statusStyle(label);
  return <Pill label={label} color={color} bg={bg} />;
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 20, padding: 20, ...style }}>
    {children}
  </div>
);

const SectionLabel = ({ text }) => (
  <p style={{ fontSize: 13, fontWeight: 700, color: T.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1 }}>{text}</p>
);

const StatTile = ({ label, value, color, bg }) => (
  <div style={{ flex: 1, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: '16px 12px', textAlign: 'center' }}>
    <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 800, color: color, margin: '0 0 4px' }}>{value}</p>
    <p style={{ fontSize: 12, fontWeight: 700, color: color, margin: 0, opacity: 0.8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE VIEW  (HR / Manager / Sales / Helper)
// ─────────────────────────────────────────────────────────────────────────────
export function TimelineView({ staffId, staffName, role, onBack }) {
  const [note, setNote] = useState('');
  const logs = TIMELINE_LOGS[staffId] || Object.values(TIMELINE_LOGS)[0] || [];

  return (
    <Page>
      <TopBar title={staffName} onBack={onBack} grad="linear-gradient(135deg,#0f172a,#1e293b)" />

      <div style={{ padding: '20px 20px 0' }}>
        {/* Profile banner */}
        <div style={{ background: 'linear-gradient(135deg,#1e2d4a,#1a2235)', border: `1px solid ${T.cardBorder}`, borderRadius: 20, padding: 20, marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: T.blueBg, border: `2px solid ${T.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 28, color: T.blue }}>person</span>
          </div>
          <div>
            <p style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{staffName}</p>
            <Pill label={role} color={T.blue} bg={T.blueBg} />
          </div>
        </div>

        {/* Note box */}
        <Card style={{ marginBottom: 20 }}>
          <SectionLabel text="Leave an instruction" />
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="Type a message or task for this staff member…"
            style={{ width: '100%', minHeight: 88, background: T.surface, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: 14, fontSize: 15, fontFamily: 'inherit', color: T.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
          <button onClick={() => setNote('')}
            style={{ marginTop: 12, width: '100%', padding: '14px 0', background: T.blueDark, border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(2,132,199,0.35)' }}>
            Send Note
          </button>
        </Card>

        <SectionLabel text="Recent activity" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {logs.map(log => (
            <div key={log.id} style={{ background: log.pinned ? 'linear-gradient(135deg,#1a2d4a,#1a1d27)' : T.card, border: `1px solid ${log.pinned ? T.blue : T.cardBorder}`, borderRadius: 18, padding: 18, position: 'relative' }}>
              {log.pinned && (
                <div style={{ position: 'absolute', top: 14, right: 14 }}>
                  <Pill label="📌 Pinned" color={T.blue} bg={T.blueBg} />
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: T.textMuted }}>schedule</span>
                <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 600 }}>{log.date} · {log.time}</span>
              </div>
              <p style={{ fontSize: 16, color: T.text, margin: 0, lineHeight: 1.65, fontWeight: 500 }}>{log.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COOK VIEW
// ─────────────────────────────────────────────────────────────────────────────
export function CookView({ staffId, staffName, onBack }) {
  const data = COOK_DATA[staffId] || Object.values(COOK_DATA)[0];
  if (!data) return <Page><p style={{ color: T.textSub, padding: 32, textAlign: 'center' }}>No data.</p></Page>;
  const { todayMenu, rating, totalReviews, reviews } = data;

  return (
    <Page>
      <TopBar title={staffName} onBack={onBack} grad="linear-gradient(135deg,#9f1239,#e11d48)" />

      <div style={{ padding: '20px 20px 0' }}>
        {/* Rating hero */}
        <div style={{ background: 'linear-gradient(135deg,#3b0a1a,#1f0511)', border: '1px solid #5b1a2a', borderRadius: 24, padding: 24, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Overall Rating</p>
            <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 52, fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: -2 }}>
              {rating}<span style={{ fontSize: 22, color: '#f87171', fontWeight: 600 }}>/5</span>
            </p>
            <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined" style={{ fontSize: 20, color: i <= Math.round(rating) ? '#fde68a' : 'rgba(255,255,255,0.15)' }}>star</span>
              ))}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, fontWeight: 600 }}>{totalReviews} student reviews</p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 90, color: 'rgba(248,113,113,0.12)' }}>restaurant</span>
        </div>

        {/* Menu */}
        <SectionLabel text="Today's menu" />
        <Card style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}>
          {[
            { meal: 'Breakfast', icon: 'free_breakfast', item: todayMenu.breakfast },
            { meal: 'Lunch',     icon: 'lunch_dining',   item: todayMenu.lunch     },
            { meal: 'Dinner',    icon: 'dinner_dining',  item: todayMenu.dinner    },
          ].map((m, i, arr) => (
            <div key={m.meal} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < arr.length - 1 ? `1px solid ${T.cardBorder}` : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: T.redBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: T.red }}>{m.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: T.red, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 0.6 }}>{m.meal}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: 0 }}>{m.item}</p>
              </div>
            </div>
          ))}
        </Card>

        {/* Reviews */}
        <SectionLabel text="Recent feedback" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {reviews.map(r => (
            <Card key={r.id} style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{r.tenant} <span style={{ color: T.textMuted, fontWeight: 500, fontSize: 14 }}>Rm {r.room}</span></p>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="material-symbols-outlined" style={{ fontSize: 16, color: i <= r.rating ? '#fbbf24' : 'rgba(255,255,255,0.1)' }}>star</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 600 }}>{r.date}</span>
              </div>
              <p style={{ fontSize: 15, color: T.textSub, margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>"{r.text}"</p>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLEANER VIEW
// ─────────────────────────────────────────────────────────────────────────────
export function CleanerView({ staffId, staffName, onBack }) {
  const data = CLEANER_DATA[staffId] || Object.values(CLEANER_DATA)[0];
  const [rooms, setRooms] = useState(data ? data.assignedRooms : []);

  const override = (roomNum) => {
    setRooms(prev => prev.map(r => r.room === roomNum ? { ...r, studentStatus: 'Approved' } : r));
  };

  const cnt = { A: rooms.filter(r => r.studentStatus === 'Approved').length, P: rooms.filter(r => r.studentStatus === 'Pending').length, R: rooms.filter(r => r.studentStatus === 'Rejected').length };

  return (
    <Page>
      <TopBar title={staffName} onBack={onBack} grad="linear-gradient(135deg,#0e7490,#0891b2)" />
      <div style={{ padding: '20px 20px 0' }}>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <StatTile label="Approved" value={cnt.A} color={T.green} />
          <StatTile label="Pending"  value={cnt.P} color={T.amber} />
          <StatTile label="Rejected" value={cnt.R} color={T.red}   />
        </div>

        <SectionLabel text="Today's rooms" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          {rooms.map(r => {
            const ss = statusStyle(r.studentStatus);
            return (
              <Card key={r.room} style={{ padding: 18 }}>
                {/* Room header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: T.tealBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 22, color: T.teal }}>door_front</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 18, fontWeight: 800, color: T.text, margin: 0 }}>Room {r.room}</p>
                      <p style={{ fontSize: 14, color: T.textMuted, margin: '3px 0 0', fontWeight: 500 }}>{r.studentName}</p>
                    </div>
                  </div>
                  <StatusChip label={r.studentStatus} />
                </div>

                {/* Info row */}
                <div style={{ display: 'flex', gap: 10, marginBottom: r.studentStatus === 'Rejected' ? 12 : 0 }}>
                  <div style={{ flex: 1, background: T.surface, borderRadius: 12, padding: '12px 14px' }}>
                    <p style={{ fontSize: 11, color: T.textMuted, margin: '0 0 5px', fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>Cleaned At</p>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: T.green }}>check_circle</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{r.cleanedAt}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, background: T.surface, borderRadius: 12, padding: '12px 14px' }}>
                    <p style={{ fontSize: 11, color: T.textMuted, margin: '0 0 5px', fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>Student</p>
                    <StatusChip label={r.studentStatus} />
                  </div>
                </div>

                {r.studentStatus === 'Rejected' && (
                  <div style={{ background: T.redBg, border: `1px solid rgba(248,113,113,0.25)`, borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
                    <p style={{ fontSize: 14, color: T.red, margin: 0, fontWeight: 600 }}>❌ {r.rejectionNote}</p>
                  </div>
                )}

                {r.studentStatus !== 'Approved' && (
                  <button onClick={() => override(r.room)}
                    style={{ marginTop: 4, width: '100%', padding: '12px', background: T.greenBg, border: `1.5px solid ${T.green}`, borderRadius: 12, color: T.green, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                    ✅ Override — Mark Approved
                  </button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKET VIEW  (Plumber / Electrician / Carpenter / RO)
// ─────────────────────────────────────────────────────────────────────────────
export function TicketView({ staffId, staffName, role, onBack }) {
  const [tickets, setTickets] = useState(TICKET_DATA[staffId] || Object.values(TICKET_DATA)[0] || []);
  const [filter, setFilter] = useState('All');

  const update = (id, status) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  const tabs = ['All', 'Pending', 'In Progress', 'Resolved'];
  const cnt = { All: tickets.length, Pending: tickets.filter(t => t.status === 'Pending').length, 'In Progress': tickets.filter(t => t.status === 'In Progress').length, Resolved: tickets.filter(t => t.status === 'Resolved').length };
  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

  return (
    <Page>
      <TopBar title={staffName} onBack={onBack} grad="linear-gradient(135deg,#312e81,#4f46e5)" />
      <div style={{ padding: '20px 20px 0' }}>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <StatTile label="Pending"  value={cnt.Pending}        color={T.amber} />
          <StatTile label="Active"   value={cnt['In Progress']} color={T.indigo} />
          <StatTile label="Done"     value={cnt.Resolved}       color={T.green} />
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {tabs.map(t => {
            const active = t === filter;
            return (
              <button key={t} onClick={() => setFilter(t)}
                style={{ whiteSpace: 'nowrap', padding: '9px 18px', borderRadius: 99, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit', border: active ? 'none' : `1px solid ${T.cardBorder}`, background: active ? T.indigoDark : 'transparent', color: active ? '#fff' : T.textSub, boxShadow: active ? '0 4px 14px rgba(79,70,229,0.35)' : 'none' }}>
                {t} ({cnt[t] ?? 0})
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          {filtered.map(t => {
            const ps = statusStyle(t.priority);
            const ss = statusStyle(t.status);
            return (
              <Card key={t.id} style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <p style={{ fontSize: 17, fontWeight: 800, color: T.text, margin: 0, lineHeight: 1.4, flex: 1 }}>{t.issue}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
                    <StatusChip label={t.status} />
                    <StatusChip label={t.priority} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: t.note ? 12 : 0 }}>
                  <Pill label={`Rm ${t.room}`} color={T.indigo} bg={T.indigoBg} />
                  <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 500 }}>{t.date}</span>
                </div>
                {t.note && (
                  <div style={{ background: T.surface, borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
                    <p style={{ fontSize: 14, color: T.textSub, margin: 0 }}>📌 {t.note}</p>
                  </div>
                )}
                {t.status !== 'Resolved' && (
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    {t.status === 'Pending' && (
                      <button onClick={() => update(t.id, 'In Progress')}
                        style={{ flex: 1, padding: '11px', background: T.indigoBg, border: `1.5px solid ${T.indigo}`, borderRadius: 12, color: T.indigo, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Start Progress
                      </button>
                    )}
                    <button onClick={() => update(t.id, 'Resolved')}
                      style={{ flex: 1, padding: '11px', background: T.greenBg, border: `1.5px solid ${T.green}`, borderRadius: 12, color: T.green, fontWeight: 800, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Mark Done ✅
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PURCHASE MANAGER VIEW
// ─────────────────────────────────────────────────────────────────────────────
export function PurchaseManagerView({ staffId, staffName, onBack }) {
  const logs = PURCHASE_LOG[staffId] || Object.values(PURCHASE_LOG)[0] || [];
  const total = logs.reduce((s, l) => s + l.total, 0);
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(logs.map(l => l.category))];
  const filtered = filter === 'All' ? logs : logs.filter(l => l.category === filter);

  return (
    <Page>
      <TopBar title={staffName} onBack={onBack} grad="linear-gradient(135deg,#134e4a,#0f766e)" />
      <div style={{ padding: '20px 20px 0' }}>

        {/* Spend hero */}
        <div style={{ background: 'linear-gradient(135deg,#0d3b37,#0a2e2b)', border: '1px solid #1a5f5a', borderRadius: 24, padding: 24, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Total Spent this Week</p>
          <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 44, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: -2 }}>
            ₹ {total.toLocaleString('en-IN')}
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0, fontWeight: 600 }}>{logs.length} purchases logged</p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {cats.map(c => {
            const active = c === filter;
            return (
              <button key={c} onClick={() => setFilter(c)}
                style={{ whiteSpace: 'nowrap', padding: '9px 18px', borderRadius: 99, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: active ? 'none' : `1px solid ${T.cardBorder}`, background: active ? T.tealDark : 'transparent', color: active ? '#fff' : T.textSub, boxShadow: active ? '0 4px 14px rgba(8,145,178,0.4)' : 'none', transition: 'all .2s' }}>
                {c}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
          {filtered.map((log, i) => (
            <div key={log.id} style={{ padding: '16px 20px', borderBottom: i < filtered.length - 1 ? `1px solid ${T.cardBorder}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <p style={{ fontSize: 17, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{log.item}</p>
                  <p style={{ fontSize: 14, color: T.textMuted, margin: '0 0 8px', fontWeight: 500 }}>{log.vendor}</p>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: T.textMuted, fontWeight: 600 }}>{log.date}</span>
                    <Pill label={log.category} color={T.teal} bg={T.tealBg} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>₹{log.total.toLocaleString('en-IN')}</p>
                  <p style={{ fontSize: 13, color: T.textMuted, margin: 0, fontWeight: 500 }}>{log.qty} {log.unit} × ₹{log.rate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAFF MEMBER LIST
// ─────────────────────────────────────────────────────────────────────────────
function StaffMemberList({ role, onBack, onSelect }) {
  const members = STAFF_MEMBERS[role.id] || [];
  return (
    <Page>
      <TopBar title={role.label} onBack={onBack} grad={role.grad} />
      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel text={`${members.length} member${members.length !== 1 ? 's' : ''}`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {members.map(m => (
            <div key={m.id} onClick={() => onSelect(m)}
              style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: role.bg || T.blueBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 26, color: role.accent }}>{role.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{m.name}</p>
                  <p style={{ fontSize: 14, color: T.textMuted, margin: 0, fontWeight: 500 }}>Since {m.joined} · {m.phone}</p>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: T.textMuted, fontSize: 22 }}>chevron_right</span>
            </div>
          ))}
          {members.length === 0 && (
            <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: '48px 20px', textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: T.textMuted, display: 'block', marginBottom: 12 }}>person_off</span>
              <p style={{ fontSize: 16, fontWeight: 600, color: T.textSub, margin: 0 }}>No staff assigned yet.</p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROLE GRID  (entry point)
// ─────────────────────────────────────────────────────────────────────────────
export default function StaffWork() {
  const navigate = useNavigate();
  const [selRole,  setSelRole]  = useState(null);
  const [selStaff, setSelStaff] = useState(null);

  if (selRole && selStaff) {
    const p = { staffId: selStaff.id, staffName: selStaff.name, role: selRole.label, onBack: () => setSelStaff(null) };
    const cat = selRole.category;
    if (cat === 'A')       return <TimelineView {...p} />;
    if (cat === 'B_cook')  return <CookView {...p} />;
    if (cat === 'B_clean') return <CleanerView {...p} />;
    if (cat === 'C')       return <TicketView {...p} />;
    if (cat === 'D')       return <PurchaseManagerView {...p} />;
  }

  if (selRole) {
    return <StaffMemberList role={selRole} onBack={() => setSelRole(null)} onSelect={m => setSelStaff(m)} />;
  }

  return (
    <Page>
      <TopBar title="Staff Work" onBack={() => navigate(-1)} grad="linear-gradient(135deg,#0f1117,#1a1d27)" />

      <div style={{ padding: '20px 20px 0' }}>
        <SectionLabel text="Select a role" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          {ROLES.map(role => {
            const count = (STAFF_MEMBERS[role.id] || []).length;
            return (
              <div key={role.id} onClick={() => setSelRole(role)}
                style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 20, padding: 20, cursor: 'pointer', transition: 'transform 0.15s', position: 'relative', overflow: 'hidden' }}>
                {/* Accent top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: role.grad }} />
                <div style={{ width: 48, height: 48, borderRadius: 14, background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, color: role.accent }}>{role.icon}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>{role.label}</p>
                <p style={{ fontSize: 13, color: T.textMuted, margin: 0, fontWeight: 600 }}>{count} member{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
}
