import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── App-consistent design tokens ─────────────────────────────────────────────
const C = {
  bg:         '#f1f5f9',
  white:      '#ffffff',
  primary:    '#0891b2',
  primaryDark:'#0e7490',
  primaryBg:  '#ecfeff',
  primaryBdr: '#a5f3fc',
  text:       '#0f172a',
  textSub:    '#334155',
  muted:      '#64748b',
  border:     '#e2e8f0',
  success:    '#059669',
  successBg:  '#ecfdf5',
  warn:       '#d97706',
  warnBg:     '#fffbeb',
  danger:     '#e11d48',
  dangerBg:   '#fff1f2',
  indigo:     '#4f46e5',
  indigoBg:   '#eef2ff',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ROLES = [
  { id: 'hr',          label: 'HR',              icon: 'manage_accounts',    category: 'A'       },
  { id: 'manager',     label: 'Manager',          icon: 'supervisor_account', category: 'A'       },
  { id: 'sales',       label: 'Sales Manager',    icon: 'query_stats',        category: 'A'       },
  { id: 'purchase',    label: 'Purchase Manager', icon: 'shopping_bag',       category: 'D'       },
  { id: 'cook',        label: 'Cook',             icon: 'restaurant',         category: 'B_cook'  },
  { id: 'cleaner',     label: 'Cleaner',          icon: 'mop',                category: 'B_clean' },
  { id: 'helper',      label: 'Helper',           icon: 'handyman',           category: 'A'       },
  { id: 'plumber',     label: 'Plumber',          icon: 'plumbing',           category: 'C'       },
  { id: 'electrician', label: 'Electrician',      icon: 'electric_bolt',      category: 'C'       },
  { id: 'carpenter',   label: 'Carpenter',        icon: 'carpenter',          category: 'C'       },
];

const STAFF_MEMBERS = {
  hr:          [{ id: 'h1',  name: 'Priya Mishra',     joined: 'Jan 2024', phone: '9876543210' }],
  manager:     [{ id: 'm1',  name: 'Vikram Sharma',    joined: 'Mar 2023', phone: '9123456789' }],
  sales:       [{ id: 's1',  name: 'Anita Rao',        joined: 'Jul 2023', phone: '9988776655' }],
  purchase:    [{ id: 'p1',  name: 'Rajan Verma',      joined: 'Feb 2024', phone: '9090909090' }],
  cook:        [{ id: 'c1',  name: 'Ramesh Yadav',     joined: 'Jun 2022', phone: '9871234560' }, { id: 'c2', name: 'Sunita Devi', joined: 'Nov 2023', phone: '9812345670' }],
  cleaner:     [{ id: 'cl1', name: 'Mohan Das',        joined: 'Apr 2023', phone: '9933221100' }, { id: 'cl2', name: 'Lakshmi B.', joined: 'Sep 2023', phone: '9900112233' }],
  helper:      [{ id: 'he1', name: 'Suresh Kumar',     joined: 'Jan 2023', phone: '9777888999' }],
  plumber:     [{ id: 'pl1', name: 'Dinesh Patel',     joined: 'May 2022', phone: '9444555666' }],
  electrician: [{ id: 'el1', name: 'Raj Electricals',  joined: 'Oct 2023', phone: '9333444555' }],
  carpenter:   [{ id: 'ca1', name: 'Balram Singh',     joined: 'Aug 2022', phone: '9222333444' }],
};

const TIMELINE_LOGS = {
  h1:  [
    { id: 1, date: '2026-07-11', time: '10:30 AM', text: 'Interviewed 2 candidates for Cook position. Shortlisted 1.', pinned: true },
    { id: 2, date: '2026-07-10', time: '03:00 PM', text: 'Completed onboarding paperwork for new helper Suresh Kumar.', pinned: false },
    { id: 3, date: '2026-07-09', time: '11:00 AM', text: 'Salary processed for all staff for June 2026.', pinned: false },
    { id: 4, date: '2026-07-07', time: '02:15 PM', text: 'Posted job listing for Electrician on Naukri.', pinned: false },
  ],
  m1:  [
    { id: 1, date: '2026-07-11', time: '09:00 AM', text: 'Reviewed daily occupancy — 28/32 rooms occupied (87.5%). One tenant left today.', pinned: true },
    { id: 2, date: '2026-07-10', time: '06:00 PM', text: 'Conducted evening inspection of floors 1 & 2. All rooms clean.', pinned: false },
    { id: 3, date: '2026-07-09', time: '10:00 AM', text: 'Resolved dispute between tenants in Room 104 and 105.', pinned: false },
  ],
  s1:  [
    { id: 1, date: '2026-07-11', time: '11:00 AM', text: 'Handled 5 enquiries. 2 converted to site visits tomorrow.', pinned: true },
    { id: 2, date: '2026-07-10', time: '04:30 PM', text: 'Follow-up call with Riya Sharma — double occupancy, quoted ₹6,500/month.', pinned: false },
    { id: 3, date: '2026-07-08', time: '01:00 PM', text: 'Updated listing on NoBroker and MagicBricks with new photos.', pinned: false },
  ],
  he1: [
    { id: 1, date: '2026-07-11', time: '08:30 AM', text: 'Helped move furniture from Room 201 to 203 for new tenant.', pinned: false },
    { id: 2, date: '2026-07-10', time: '12:00 PM', text: 'Grocery run — vegetables, oil, spices for kitchen.', pinned: false },
    { id: 3, date: '2026-07-09', time: '03:00 PM', text: 'Assisted Cook with dish washing after lunch.', pinned: false },
  ],
};

const COOK_DATA = {
  c1: {
    todayMenu: { breakfast: 'Poha + Chai', lunch: 'Dal Tadka, Jeera Rice, Roti', dinner: 'Rajma, Rice, Sabzi' },
    rating: 4.2, totalReviews: 38,
    reviews: [
      { id: 1, tenant: 'Ravi Gupta', room: '102', date: '2026-07-11', rating: 5, text: 'Lunch was amazing today! Dal was perfect.' },
      { id: 2, tenant: 'Priya S.',   room: '204', date: '2026-07-11', rating: 3, text: 'Dinner sabzi was a bit bland today.' },
      { id: 3, tenant: 'Anil K.',    room: '301', date: '2026-07-10', rating: 4, text: 'Breakfast poha was good. More quantity please!' },
      { id: 4, tenant: 'Sneha R.',   room: '105', date: '2026-07-10', rating: 5, text: 'Everything was great. Keep it up!' },
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

const COOK_DAY_STATS = {
  c1: [
    { date: '2026-07-11', eaten: 45, extraPlates: [{ by: 'Ravi (102)', count: 2 }], ingredients: '10kg Rice, 2L Oil, 3kg Dal', packed: 5, lateFood: 3 },
    { date: '2026-07-10', eaten: 42, extraPlates: [{ by: 'Sneha (105)', count: 1 }], ingredients: '8kg Atta, 5kg Potato, 2kg Poha', packed: 2, lateFood: 1 },
  ],
  c2: [
    { date: '2026-07-11', eaten: 30, extraPlates: [], ingredients: '5kg Rice, 1L Oil, 2kg Mix Veg', packed: 0, lateFood: 0 },
  ]
};

const EXTRA_GUEST_FOOD = [
  { id: 1, student: 'Ravi Gupta', room: '102', date: '2026-07-11', count: 2, amount: 100, status: 'Paid', mode: 'UPI' },
  { id: 2, student: 'Sneha R.', room: '105', date: '2026-07-10', count: 1, amount: 50, status: 'Pending', mode: '' },
  { id: 3, student: 'Mohit J.', room: '107', date: '2026-07-09', count: 3, amount: 150, status: 'Pending', mode: '' },
];

const CLEANER_DATA = {
  cl1: { assignedRooms: [
    { room: '101', cleanedAt: '08:15 AM', studentStatus: 'Approved', studentName: 'Ravi Gupta' },
    { room: '102', cleanedAt: '09:00 AM', studentStatus: 'Rejected', studentName: 'Priya S.',  rejectionNote: 'Bathroom not cleaned properly' },
    { room: '103', cleanedAt: '09:45 AM', studentStatus: 'Pending',  studentName: 'Anil K.' },
    { room: '104', cleanedAt: '10:30 AM', studentStatus: 'Approved', studentName: 'Sneha R.' },
  ]},
  cl2: { assignedRooms: [
    { room: '201', cleanedAt: '08:30 AM', studentStatus: 'Approved', studentName: 'Mohit J.' },
    { room: '202', cleanedAt: '09:15 AM', studentStatus: 'Pending',  studentName: 'Diya P.' },
    { room: '203', cleanedAt: '10:00 AM', studentStatus: 'Rejected', studentName: 'Rahul V.', rejectionNote: 'Floor still wet and dusty' },
  ]},
};

const CLEANER_STATS = {
  daily: { total: 8, breakdown: { full: 4, dusting: 2, bathroom: 2 } },
  weekly: { total: 45, breakdown: { full: 20, dusting: 15, bathroom: 10 } },
  monthly: { total: 180, breakdown: { full: 80, dusting: 60, bathroom: 40 } },
};

const TICKET_DATA = {
  pl1: [
    { id: 1, issue: 'Leaking tap in bathroom',   room: '104', date: '2026-07-11', status: 'In Progress', priority: 'High',   note: 'Ordered new washer' },
    { id: 2, issue: 'Drainage blocked',           room: '202', date: '2026-07-10', status: 'Resolved',    priority: 'High',   note: 'Cleared blockage, all good now' },
    { id: 3, issue: 'WC flush not working',       room: '301', date: '2026-07-09', status: 'Pending',     priority: 'Medium', note: '' },
  ],
  el1: [
    { id: 1, issue: 'Fan speed fluctuating',      room: '205', date: '2026-07-11', status: 'Pending',     priority: 'Medium', note: '' },
    { id: 2, issue: 'Switch board sparking',      room: '103', date: '2026-07-10', status: 'Resolved',    priority: 'High',   note: 'Replaced faulty switch' },
    { id: 3, issue: 'Power socket not working',   room: '308', date: '2026-07-08', status: 'In Progress', priority: 'Medium', note: 'Coming with tools tomorrow' },
  ],
  ca1: [
    { id: 1, issue: 'Cupboard door hinge broken', room: '107', date: '2026-07-11', status: 'Pending',     priority: 'Low',    note: '' },
    { id: 2, issue: 'Study table leg cracked',    room: '201', date: '2026-07-09', status: 'Resolved',    priority: 'Medium', note: 'Fixed with new leg' },
  ],
};

const PURCHASE_LOG = {
  p1: [
    { id: 1, date: '2026-07-11', item: 'Basmati Rice',        qty: 25, unit: 'kg',    rate: 65,  total: 1625, vendor: 'Sharma Traders',  category: 'Grocery'  },
    { id: 2, date: '2026-07-10', item: 'Cooking Oil',         qty: 10, unit: 'litre', rate: 120, total: 1200, vendor: 'Sharma Traders',  category: 'Grocery'  },
    { id: 3, date: '2026-07-09', item: 'Cleaning Liquid',     qty: 5,  unit: 'litre', rate: 85,  total: 425,  vendor: 'Clean Depot',     category: 'Cleaning' },
    { id: 4, date: '2026-07-08', item: 'Toilet Paper (bulk)', qty: 50, unit: 'piece', rate: 12,  total: 600,  vendor: 'Clean Depot',     category: 'Cleaning' },
    { id: 5, date: '2026-07-07', item: 'Onions',              qty: 15, unit: 'kg',    rate: 30,  total: 450,  vendor: 'Vegetable Mandi', category: 'Grocery'  },
  ],
};

const STAFF_INFO = {
  default: {
    attendance: { inTime: '08:00 AM', outTime: '06:00 PM', log: ['08:05 AM - Checked In', '01:00 PM - Lunch Break', '02:00 PM - Resumed', '06:10 PM - Checked Out'] },
    salary: { monthly: 15000, deductions: 500, net: 14500, status: 'Pending', mode: 'Cash' },
    inventory: ['Uniform', 'ID Card', 'Master Keys']
  }
};

// ─── SHARED UI ─────────────────────────────────────────────────────────────────

const TopBar = ({ title, subtitle, onBack }) => (
  <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 20 }}>
    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, display: 'flex', alignItems: 'center', padding: 0 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back_ios_new</span>
    </button>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0, lineHeight: 1.2 }}>{title}</p>
      {subtitle && <p style={{ fontSize: 13, color: C.muted, margin: 0, marginTop: 2 }}>{subtitle}</p>}
    </div>
  </div>
);

const TopTabs = ({ tabs, activeTab, setActiveTab }) => (
  <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: C.white, overflowX: 'auto', padding: '0 16px' }}>
    {tabs.map(t => (
      <button key={t} onClick={() => setActiveTab(t)}
        style={{ flex: 1, whiteSpace: 'nowrap', padding: '14px 16px', border: 'none', background: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                 borderBottom: activeTab === t ? `2px solid ${C.primary}` : '2px solid transparent',
                 color: activeTab === t ? C.primary : C.muted, transition: 'all 0.2s', fontFamily: 'inherit' }}>
        {t}
      </button>
    ))}
  </div>
);

function GenericStaffInfo({ staffId }) {
  const info = STAFF_INFO[staffId] || STAFF_INFO.default;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <SectionTitle text="Attendance & Timing" />
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>In-Time</p>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: C.text }}>{info.attendance.inTime}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>Out-Time</p>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: C.text }}>{info.attendance.outTime}</p>
            </div>
          </div>
          <div style={{ background: C.bg, padding: 14, borderRadius: 10, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: C.text, margin: '0 0 8px', textTransform: 'uppercase' }}>Daily Log</p>
            {info.attendance.log.map((l, i) => (
              <p key={i} style={{ fontSize: 14, color: C.textSub, margin: '0 0 6px', fontWeight: 600 }}>• {l}</p>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <SectionTitle text="Salary Details" />
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>Monthly Salary</p>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: C.text }}>₹{info.salary.monthly}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>Deductions</p>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: C.danger }}>-₹{info.salary.deductions}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>Net Pay</p>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: C.success }}>₹{info.salary.net}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: C.muted, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>Status / Mode</p>
              <p style={{ fontSize: 15, fontWeight: 800, margin: 0, color: C.text }}>
                {info.salary.status} <span style={{ color: C.muted, fontSize: 13 }}>({info.salary.mode})</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <SectionTitle text="Assigned Inventory" />
        <Card>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {info.inventory.map((item, i) => (
              <span key={i} style={{ background: C.primaryBg, color: C.primary, padding: '6px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, border: `1px solid ${C.primaryBdr}` }}>{item}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

const statusMap = {
  Approved:     { color: C.success, bg: C.successBg },
  Resolved:     { color: C.success, bg: C.successBg },
  'In Progress':{ color: C.indigo,  bg: C.indigoBg  },
  Pending:      { color: C.warn,    bg: C.warnBg    },
  Rejected:     { color: C.danger,  bg: C.dangerBg  },
  High:         { color: C.danger,  bg: C.dangerBg  },
  Medium:       { color: C.warn,    bg: C.warnBg    },
  Low:          { color: C.muted,   bg: '#f1f5f9'   },
};

const Chip = ({ label }) => {
  const s = statusMap[label] || { color: C.muted, bg: '#f1f5f9' };
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: s.bg, color: s.color, letterSpacing: 0.3, display: 'inline-block' }}>
      {label}
    </span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ text }) => (
  <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', margin: '24px 0 12px 0' }}>{text}</p>
);

const StatRow = ({ items }) => (
  <div style={{ display: 'flex', gap: 12 }}>
    {items.map(s => (
      <div key={s.label} style={{ flex: 1, background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
        <p style={{ fontSize: 28, fontWeight: 800, color: s.color, margin: '0 0 3px', fontFamily: "'Bricolage Grotesque',sans-serif" }}>{s.value}</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: s.color, margin: 0, textTransform: 'uppercase', letterSpacing: 0.4 }}>{s.label}</p>
      </div>
    ))}
  </div>
);

// ─── TIMELINE VIEW  (HR / Manager / Sales / Helper) ──────────────────────────
export function TimelineView({ staffId, staffName, role, onBack }) {
  const [activeTab, setActiveTab] = useState('Work Details');
  const [note, setNote] = useState('');
  const logs = TIMELINE_LOGS[staffId] || Object.values(TIMELINE_LOGS)[0] || [];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      <TopBar title={staffName} subtitle={role} onBack={onBack} />
      <TopTabs tabs={['Work Details', 'Staff Info']} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '0 16px' }}>
        {activeTab === 'Staff Info' ? (
          <GenericStaffInfo staffId={staffId} />
        ) : (
          <>
            {/* Note box */}
            <SectionTitle text="Leave an instruction" />
            <Card>
              <textarea value={note} onChange={e => setNote(e.target.value)}
                placeholder="Type a task or message for this staff member…"
                style={{ width: '100%', minHeight: 80, background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', fontSize: 15, fontFamily: 'inherit', color: C.text, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
              <button onClick={() => setNote('')}
                style={{ marginTop: 12, width: '100%', padding: '13px 0', background: C.primary, border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Send Note
              </button>
            </Card>

            <SectionTitle text="Recent activity" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {logs.map(log => (
                <Card key={log.id} style={{ borderLeft: log.pinned ? `4px solid ${C.primary}` : `1px solid ${C.border}`, padding: 16 }}>
                  {log.pinned && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: C.primary }}>push_pin</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>Pinned</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 15, color: C.muted }}>schedule</span>
                    <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>{log.date} · {log.time}</span>
                  </div>
                  <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.6 }}>{log.text}</p>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── COOK VIEW ────────────────────────────────────────────────────────────────
export function CookView({ staffId, staffName, onBack }) {
  const [activeTab, setActiveTab] = useState('Work Details');
  const [extraFood, setExtraFood] = useState(EXTRA_GUEST_FOOD);
  const [paymentModal, setPaymentModal] = useState(null);

  const handlePayment = (mode) => {
    setExtraFood(prev => prev.map(f => f.id === paymentModal.id ? { ...f, status: 'Paid', mode } : f));
    setPaymentModal(null);
  };

  const data = COOK_DATA[staffId] || Object.values(COOK_DATA)[0];
  if (!data) return null;
  const { todayMenu, rating, totalReviews, reviews } = data;
  const dayStats = COOK_DAY_STATS[staffId] || [];

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      <TopBar title={staffName} subtitle="Cook" onBack={onBack} />
      <TopTabs tabs={['Work Details', 'Extra Guest Food', 'Staff Info']} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '0 16px' }}>
        {activeTab === 'Staff Info' && <GenericStaffInfo staffId={staffId} />}

        {activeTab === 'Extra Guest Food' && (
          <div>
            <SectionTitle text="Extra Guest Food Requests" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {extraFood.map(req => (
                <Card key={req.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: '0 0 4px' }}>{req.student} <span style={{ color: C.muted, fontWeight: 500, fontSize: 13 }}>· Rm {req.room}</span></p>
                      <p style={{ fontSize: 13, color: C.textSub, margin: 0 }}>{req.date} · {req.count} plate{req.count > 1 ? 's' : ''}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 6px' }}>₹{req.amount}</p>
                      {req.status === 'Pending' ? (
                        <button onClick={() => setPaymentModal(req)}
                          style={{ background: C.warnBg, border: `1px solid ${C.warn}`, color: C.warn, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Pay Now
                        </button>
                      ) : (
                        <span style={{ background: C.successBg, color: C.success, borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                          Paid ({req.mode})
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Work Details' && (
          <>
            <SectionTitle text="Overall rating" />
            <Card style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ textAlign: 'center', minWidth: 80 }}>
                <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 44, fontWeight: 900, color: C.text, margin: 0, lineHeight: 1 }}>{rating}</p>
                <p style={{ fontSize: 13, color: C.muted, margin: '4px 0 0', fontWeight: 600 }}>out of 5</p>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: 22, color: i <= Math.round(rating) ? '#f59e0b' : C.border }}>star</span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: C.muted, margin: 0, fontWeight: 600 }}>{totalReviews} student reviews</p>
              </div>
            </Card>

            <SectionTitle text="Day-wise Stats" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dayStats.map((stat, i) => (
                <Card key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: 0 }}>{stat.date}</p>
                    <span style={{ fontSize: 13, color: C.primary, fontWeight: 700, background: C.primaryBg, padding: '2px 8px', borderRadius: 12, border: `1px solid ${C.primaryBdr}` }}>{stat.eaten} people ate</span>
                  </div>
                  <div style={{ background: C.bg, padding: 12, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <p style={{ fontSize: 14, color: C.textSub, margin: 0, lineHeight: 1.4 }}><b>Ingredients Used:</b> {stat.ingredients}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: 14, color: C.textSub, margin: 0 }}><b>Packed Food:</b> {stat.packed}</p>
                      <p style={{ fontSize: 14, color: C.textSub, margin: 0 }}><b>Stored Late:</b> {stat.lateFood}</p>
                    </div>
                    {stat.extraPlates.length > 0 && (
                      <p style={{ fontSize: 14, color: C.textSub, margin: 0, marginTop: 4 }}><b>Extra Plates:</b> {stat.extraPlates.map(e => `${e.by} (${e.count})`).join(', ')}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <SectionTitle text="Today's menu" />
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {[
                { meal: 'Breakfast', icon: 'free_breakfast', item: todayMenu.breakfast },
                { meal: 'Lunch',     icon: 'lunch_dining',   item: todayMenu.lunch },
                { meal: 'Dinner',    icon: 'dinner_dining',  item: todayMenu.dinner },
              ].map((m, i, arr) => (
                <div key={m.meal} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: C.primary }}>{m.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 800, color: C.primary, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.meal}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>{m.item}</p>
                  </div>
                </div>
              ))}
            </Card>

            <SectionTitle text="Student feedback" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {reviews.map(r => (
                <Card key={r.id} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: '0 0 4px' }}>{r.tenant} <span style={{ color: C.muted, fontWeight: 500, fontSize: 13 }}>· Rm {r.room}</span></p>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className="material-symbols-outlined" style={{ fontSize: 15, color: i <= r.rating ? '#f59e0b' : C.border }}>star</span>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: 13, color: C.muted }}>{r.date}</span>
                  </div>
                  <p style={{ fontSize: 14, color: C.textSub, margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>"{r.text}"</p>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Payment Modal */}
      {paymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ width: '100%', maxWidth: 400, background: C.white, borderRadius: 20, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Settle Payment</p>
              <button onClick={() => setPaymentModal(null)} style={{ background: 'none', border: 'none', fontSize: 24, color: C.muted, cursor: 'pointer', padding: 0, lineHeight: 1 }}>&times;</button>
            </div>
            <p style={{ fontSize: 16, color: C.text, marginBottom: 24 }}>Receive <b>₹{paymentModal.amount}</b> from <b>{paymentModal.student}</b>?</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => handlePayment('Cash')} style={{ flex: 1, padding: 14, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 15, fontWeight: 800, color: C.text, cursor: 'pointer', fontFamily: 'inherit' }}>Cash</button>
              <button onClick={() => handlePayment('UPI')} style={{ flex: 1, padding: 14, background: C.primary, border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, color: C.white, cursor: 'pointer', fontFamily: 'inherit' }}>UPI</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CLEANER VIEW ─────────────────────────────────────────────────────────────
export function CleanerView({ staffId, staffName, onBack }) {
  const [activeTab, setActiveTab] = useState('Work Details');
  const [showStats, setShowStats] = useState(false);
  const data = CLEANER_DATA[staffId] || Object.values(CLEANER_DATA)[0];
  const [rooms, setRooms] = useState(data ? data.assignedRooms : []);

  const override = (roomNum) => setRooms(prev => prev.map(r => r.room === roomNum ? { ...r, studentStatus: 'Approved' } : r));

  const cnt = {
    Approved: rooms.filter(r => r.studentStatus === 'Approved').length,
    Pending:  rooms.filter(r => r.studentStatus === 'Pending').length,
    Rejected: rooms.filter(r => r.studentStatus === 'Rejected').length,
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      <TopBar title={staffName} subtitle="Cleaner" onBack={onBack} />
      <TopTabs tabs={['Work Details', 'Staff Info']} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '0 16px' }}>
        {activeTab === 'Staff Info' ? (
          <GenericStaffInfo staffId={staffId} />
        ) : (
          <>
            <SectionTitle text="Today's summary" />
            <div onClick={() => setShowStats(true)} style={{ cursor: 'pointer' }}>
              <StatRow items={[
                { label: 'Approved', value: cnt.Approved, color: C.success },
                { label: 'Pending',  value: cnt.Pending,  color: C.warn    },
                { label: 'Rejected', value: cnt.Rejected, color: C.danger  },
              ]} />
            </div>
            <p style={{ fontSize: 13, color: C.primary, textAlign: 'center', marginTop: 12, cursor: 'pointer', fontWeight: 700 }} onClick={() => setShowStats(true)}>View detailed cleaning stats</p>

            <SectionTitle text="Room status" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {rooms.map(r => (
                <Card key={r.room} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: C.primary }}>door_front</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: 0 }}>Room {r.room}</p>
                        <p style={{ fontSize: 13, color: C.muted, margin: '3px 0 0' }}>{r.studentName}</p>
                      </div>
                    </div>
                    <Chip label={r.studentStatus} />
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginBottom: r.studentStatus === 'Rejected' ? 12 : 0 }}>
                    <div style={{ flex: 1, background: C.bg, borderRadius: 10, padding: '10px 14px', border: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 11, fontWeight: 800, color: C.muted, margin: '0 0 5px', letterSpacing: 0.5, textTransform: 'uppercase' }}>Cleaned At</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 15, color: C.success }}>check_circle</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{r.cleanedAt}</span>
                      </div>
                    </div>
                    <div style={{ flex: 1, background: C.bg, borderRadius: 10, padding: '10px 14px', border: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 11, fontWeight: 800, color: C.muted, margin: '0 0 5px', letterSpacing: 0.5, textTransform: 'uppercase' }}>Student</p>
                      <Chip label={r.studentStatus} />
                    </div>
                  </div>

                  {r.studentStatus === 'Rejected' && (
                    <div style={{ background: C.dangerBg, borderRadius: 10, padding: '10px 14px', marginBottom: 12, border: `1px solid #fecaca` }}>
                      <p style={{ fontSize: 14, color: C.danger, margin: 0, fontWeight: 600 }}>Issue: {r.rejectionNote}</p>
                    </div>
                  )}
                  {r.studentStatus !== 'Approved' && (
                    <button onClick={() => override(r.room)}
                      style={{ width: '100%', padding: '12px', background: C.successBg, border: `1.5px solid ${C.success}`, borderRadius: 10, color: C.success, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>
                      ✅ Override — Mark Approved
                    </button>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Stats Breakdown Modal */}
      {showStats && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ width: '100%', maxWidth: 400, background: C.white, borderRadius: 20, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Cleaning Breakdown</p>
              <button onClick={() => setShowStats(false)} style={{ background: 'none', border: 'none', fontSize: 24, color: C.muted, cursor: 'pointer', padding: 0, lineHeight: 1 }}>&times;</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['daily', 'weekly', 'monthly'].map(period => (
                <div key={period} style={{ background: C.bg, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: '0 0 14px', textTransform: 'capitalize' }}>{period} (Total: {CLEANER_STATS[period].total})</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, textAlign: 'center' }}>
                    <div>
                      <p style={{ fontSize: 20, fontWeight: 800, color: C.primary, margin: 0, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{CLEANER_STATS[period].breakdown.full}</p>
                      <p style={{ fontSize: 12, color: C.muted, fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase' }}>Full Room</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 20, fontWeight: 800, color: C.indigo, margin: 0, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{CLEANER_STATS[period].breakdown.dusting}</p>
                      <p style={{ fontSize: 12, color: C.muted, fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase' }}>Dusting</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 20, fontWeight: 800, color: C.success, margin: 0, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{CLEANER_STATS[period].breakdown.bathroom}</p>
                      <p style={{ fontSize: 12, color: C.muted, fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase' }}>Bathroom</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TICKET VIEW  (Plumber / Electrician / Carpenter) ────────────────────────
export function TicketView({ staffId, staffName, role, onBack }) {
  const [activeTab, setActiveTab] = useState('Work Details');
  const [tickets, setTickets] = useState(TICKET_DATA[staffId] || Object.values(TICKET_DATA)[0] || []);
  const [filter, setFilter] = useState('All');

  const update = (id, status) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  const tabs = ['All', 'Pending', 'In Progress', 'Resolved'];
  const cnt = { All: tickets.length, Pending: tickets.filter(t => t.status === 'Pending').length, 'In Progress': tickets.filter(t => t.status === 'In Progress').length, Resolved: tickets.filter(t => t.status === 'Resolved').length };
  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      <TopBar title={staffName} subtitle={role} onBack={onBack} />
      <TopTabs tabs={['Work Details', 'Staff Info']} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ padding: '0 16px' }}>
        {activeTab === 'Staff Info' ? (
          <GenericStaffInfo staffId={staffId} />
        ) : (
          <>
            <SectionTitle text="Summary" />
            <StatRow items={[
              { label: 'Pending',  value: cnt.Pending,           color: C.warn    },
              { label: 'Active',   value: cnt['In Progress'],    color: C.indigo  },
              { label: 'Done',     value: cnt.Resolved,          color: C.success },
            ]} />

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 8, margin: '20px 0 16px', overflowX: 'auto', paddingBottom: 4 }}>
              {tabs.map(t => {
                const active = t === filter;
                return (
                  <button key={t} onClick={() => setFilter(t)}
                    style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: active ? 'none' : `1px solid ${C.border}`, background: active ? C.primary : C.white, color: active ? '#fff' : C.muted, transition: 'all .15s' }}>
                    {t} ({cnt[t] ?? 0})
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(t => (
                <Card key={t.id} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                    <p style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: 0, lineHeight: 1.4, flex: 1 }}>{t.issue}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end', flexShrink: 0 }}>
                      <Chip label={t.status} />
                      <Chip label={t.priority} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: t.note ? 12 : 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, background: C.primaryBg, padding: '3px 8px', borderRadius: 6 }}>Rm {t.room}</span>
                    <span style={{ fontSize: 13, color: C.muted }}>{t.date}</span>
                  </div>
                  {t.note && (
                    <div style={{ background: C.bg, borderRadius: 8, padding: '10px 12px', border: `1px solid ${C.border}`, marginTop: 10, marginBottom: 4 }}>
                      <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>📌 {t.note}</p>
                    </div>
                  )}
                  {t.status !== 'Resolved' && (
                    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                      {t.status === 'Pending' && (
                        <button onClick={() => update(t.id, 'In Progress')}
                          style={{ flex: 1, padding: '11px', background: C.indigoBg, border: `1.5px solid ${C.indigo}`, borderRadius: 10, color: C.indigo, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Start Progress
                        </button>
                      )}
                      <button onClick={() => update(t.id, 'Resolved')}
                        style={{ flex: 1, padding: '11px', background: C.successBg, border: `1.5px solid ${C.success}`, borderRadius: 10, color: C.success, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Mark Done ✅
                      </button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PURCHASE MANAGER VIEW ────────────────────────────────────────────────────
export function PurchaseManagerView({ staffId, staffName, onBack }) {
  const [activeTab, setActiveTab] = useState('Work Details');
  const logs = PURCHASE_LOG[staffId] || Object.values(PURCHASE_LOG)[0] || [];
  const total = logs.reduce((s, l) => s + l.total, 0);
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(logs.map(l => l.category))];
  const filtered = filter === 'All' ? logs : logs.filter(l => l.category === filter);

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      <TopBar title={staffName} subtitle="Purchase Manager" onBack={onBack} />
      <TopTabs tabs={['Work Details', 'Staff Info']} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ padding: '0 16px' }}>
        {activeTab === 'Staff Info' ? (
          <GenericStaffInfo staffId={staffId} />
        ) : (
          <>
            {/* Spend summary */}
            <SectionTitle text="This week's spend" />
            <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 16, padding: '20px 22px', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 600, margin: '0 0 6px' }}>Total Purchases</p>
                <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: -1 }}>₹ {total.toLocaleString('en-IN')}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{logs.length} entries this week</p>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: 56, color: 'rgba(255,255,255,0.15)' }}>shopping_bag</span>
            </div>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 8, margin: '20px 0 16px', overflowX: 'auto', paddingBottom: 4 }}>
              {cats.map(cat => {
                const active = cat === filter;
                return (
                  <button key={cat} onClick={() => setFilter(cat)}
                    style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', border: active ? 'none' : `1px solid ${C.border}`, background: active ? C.primary : C.white, color: active ? '#fff' : C.muted, transition: 'all .15s' }}>
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Log list */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
              {filtered.map((log, i) => (
                <div key={log.id} style={{ padding: '14px 18px', borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: 12 }}>
                      <p style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 3px' }}>{log.item}</p>
                      <p style={{ fontSize: 13, color: C.muted, margin: '0 0 7px' }}>{log.vendor}</p>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.muted }}>{log.date}</span>
                        <span style={{ fontSize: 12, background: C.primaryBg, color: C.primary, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{log.category}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 800, color: C.text, margin: '0 0 3px' }}>₹{log.total.toLocaleString('en-IN')}</p>
                      <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{log.qty} {log.unit} × ₹{log.rate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── STAFF MEMBER LIST ────────────────────────────────────────────────────────
function StaffMemberList({ role, onBack, onSelect }) {
  const members = STAFF_MEMBERS[role.id] || [];
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      <TopBar title={role.label} subtitle={`${members.length} member${members.length !== 1 ? 's' : ''}`} onBack={onBack} />
      <div style={{ padding: '0 16px' }}>
        <SectionTitle text="Team members" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {members.map(m => (
            <Card key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: 16 }} onClick={() => onSelect(m)}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: C.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24, color: C.primary }}>{role.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 3px' }}>{m.name}</p>
                  <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Since {m.joined} · {m.phone}</p>
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: C.border, fontSize: 22 }}>chevron_right</span>
            </Card>
          ))}
          {members.length === 0 && (
            <Card style={{ padding: '40px 20px', textAlign: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 44, color: C.border, display: 'block', marginBottom: 10 }}>person_off</span>
              <p style={{ fontSize: 15, color: C.muted, margin: 0 }}>No staff assigned yet.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ROLE GRID  (main entry) ──────────────────────────────────────────────────
export default function StaffWork() {
  const navigate = useNavigate();
  const [selRole,  setSelRole]  = useState(null);
  const [selStaff, setSelStaff] = useState(null);

  if (selRole && selStaff) {
    const p   = { staffId: selStaff.id, staffName: selStaff.name, role: selRole.label, onBack: () => setSelStaff(null) };
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
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 20 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, display: 'flex', alignItems: 'center', padding: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back_ios_new</span>
        </button>
        <p style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Staff Work</p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', margin: '20px 0 12px' }}>Select a Role</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {ROLES.map(role => {
            const count = (STAFF_MEMBERS[role.id] || []).length;
            return (
              <div key={role.id} onClick={() => setSelRole(role)}
                style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 22, color: C.primary }}>{role.icon}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: '0 0 3px' }}>{role.label}</p>
                <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>{count} member{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
