import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const C = {
  primary: '#0891b2',
  primaryDark: '#0e7490',
  primaryBg: '#ecfeff',
  bg: '#f8fafc',
  white: '#ffffff',
  text: '#0f172a',
  textSub: '#334155',
  muted: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  successBg: '#ecfdf5',
  warn: '#f59e0b',
  warnBg: '#fffbeb',
  danger: '#ef4444',
  dangerBg: '#fef2f2',
  indigo: '#6366f1',
  indigoBg: '#eeef2f6',
  purple: '#8b5cf6',
  purpleBg: '#f3e8ff',
};

// ─── Dummy Data ─────────────────────────────────────────────────────────────
const STAFF_PROFILES = [
  { id: 's1', name: 'Ramesh Yadav', role: 'Cook', avatar: '👨‍🍳', dept: 'Kitchen & Mess', phone: '+91 98765 43210', initials: 'RY', color: '#8b5cf6' },
  { id: 's2', name: 'Lakshmi B.', role: 'Cleaner', avatar: '🧹', dept: 'Housekeeping', phone: '+91 98765 43214', initials: 'LB', color: '#06b6d4' },
  { id: 's3', name: 'Dinesh Patel', role: 'Maintenance', avatar: '🛠️', dept: 'Plumbing & Electric', phone: '+91 98765 43218', initials: 'DP', color: '#dc2626' },
  { id: 's4', name: 'Vikram Sharma', role: 'Purchase Manager', avatar: '🛒', dept: 'Store & Inventory', phone: '+91 98765 43222', initials: 'VS', color: '#64748b' },
];

const INITIAL_STUDENTS_LIST = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: [
    'Arjun Mehta', 'Priya Sharma', 'Ravi Kumar', 'Sneha Kapoor', 'Karan Singh',
    'Mohan Lal', 'Ananya Gupta', 'Rohit Verma', 'Pooja Rani', 'Deepak Rathi',
    'Vikram Das', 'Neha Singh', 'Amit Kumar', 'Suresh Patel', 'Divya Joshi',
    'Rahul Sharma', 'Swati Roy', 'Aman Verma', 'Kavya Nair', 'Manoj Kumar',
    'Ritu Singh', 'Alok Verma', 'Megha Roy', 'Varun Sharma', 'Sangeeta Kumari',
    'Gaurav Malhotra', 'Preeti Mishra', 'Sunil Kumar', 'Nisha Agarwal', 'Vikas Yaduvanshi',
    'Tanya Sen', 'Harsh Jain', 'Rashi Garg', 'Tarun Bhatia', 'Monika Shah',
    'Abhinav Pandey', 'Simran Kaur', 'Pankaj Bansal', 'Kirti Saxena', 'Nikhil Chawla'
  ][i % 40],
  room: `${101 + Math.floor(i / 3)}`,
  bed: `Bed ${(i % 3) + 1}`,
  phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
  eatenBreakfast: i % 2 === 0,
  eatenLunch: i % 3 === 0,
  eatenDinner: false,
}));

const INITIAL_CLEANING_SLOTS = [
  { id: 1, room: '101', student: 'Arjun Mehta', slot: '10:00 AM - 11:00 AM', type: 'Full Room Cleaning', status: 'Cleaned' },
  { id: 2, room: '102', student: 'Priya Sharma', slot: '11:00 AM - 12:00 PM', type: 'Dusting & Mopping', status: 'Pending' },
  { id: 3, room: '105', student: 'Ankit Kumar', slot: '02:00 PM - 03:00 PM', type: 'Bathroom Sanitize', status: 'Pending' },
  { id: 4, room: '202', student: 'Sneha Kapoor', slot: '04:00 PM - 05:00 PM', type: 'Full Room Cleaning', status: 'Pending' },
  { id: 5, room: '205', student: 'Rahul Verma', slot: '05:30 PM - 06:30 PM', type: 'Dusting & Mopping', status: 'Pending' },
];

const INITIAL_TICKETS = [
  { id: 1, room: '108', issue: 'Water leakage in bathroom sink tap', priority: 'High', status: 'Pending', student: 'Sneha Kapoor', date: 'Today 09:30 AM' },
  { id: 2, room: '201', issue: 'AC remote battery check & filter cleaning', priority: 'Normal', status: 'In Progress', student: 'Karan Singh', date: 'Today 10:15 AM' },
  { id: 3, room: '305', issue: 'Geyser main switch sparking & trip issue', priority: 'High', status: 'Pending', student: 'Ravi Kumar', date: 'Yesterday 04:00 PM' },
];

const INITIAL_ASSIGNED_TASKS = [
  { id: 101, title: 'Daily Floor 2 Mopping & Sanitization', type: 'Regular', status: 'In Progress', note: 'Clean corridor before 10:30 AM', duration: 'Daily Routine', assignedDate: '2026-07-22' },
  { id: 102, title: 'Deep Clean Overhead Water Tank', type: 'Special', status: 'Pending', note: 'Use chlorine scrub on inner walls', duration: '2 Days', assignedDate: '2026-07-22' },
];

// ─── Main Staff App Component ───────────────────────────────────────────────
export default function StaffApp() {
  const navigate = useNavigate();
  const [activeStaff, setActiveStaff] = useState(STAFF_PROFILES[0]);
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockInTime] = useState('08:30 AM');

  // Cook State
  const [students, setStudents] = useState(INITIAL_STUDENTS_LIST);
  const [selectedMealTab, setSelectedMealTab] = useState('Breakfast');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [bMeal, setBMeal] = useState('Breakfast');
  const [bTarget, setBTarget] = useState('All Students');
  const [bMsg, setBMsg] = useState('Food is ready! Fresh hot meals served in mess hall.');

  // Cleaner State
  const [cleaningSlots, setCleaningSlots] = useState(INITIAL_CLEANING_SLOTS);
  const [assignedTasks, setAssignedTasks] = useState(INITIAL_ASSIGNED_TASKS);

  // Ticket State
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  // Demand Modal State
  const [showDemandModal, setShowDemandModal] = useState(false);
  const [demandItem, setDemandItem] = useState('');
  const [demandQty, setDemandQty] = useState('');
  const [demandVendor, setDemandVendor] = useState('The Local Market');
  const [demandNote, setDemandNote] = useState('');
  const [mySubmittedDemands, setMySubmittedDemands] = useState([
    { id: 1, item: 'Basmati Rice 25kg', qty: '2 Bags', vendor: 'The Local Market', date: '2026-07-22', status: 'Pending Admin Approval' },
    { id: 2, item: 'Floor Cleaner & Sanitizer', qty: '5L', vendor: 'Sunil Traders', date: '2026-07-20', status: 'Approved & Sent to Vendor' },
  ]);

  const handleToggleEaten = (studentId, meal) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const key = meal === 'Breakfast' ? 'eatenBreakfast' : meal === 'Lunch' ? 'eatenLunch' : 'eatenDinner';
        return { ...s, [key]: !s[key] };
      }
      return s;
    }));
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    setShowBroadcastModal(false);
    alert(`📢 Broadcast sent successfully to ${bTarget} for ${bMeal}!`);
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setAssignedTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleTicketStatusChange = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const handleSlotStatusChange = (slotId, newStatus) => {
    setCleaningSlots(prev => prev.map(s => s.id === slotId ? { ...s, status: newStatus } : s));
  };

  const handleSubmitDemand = (e) => {
    e.preventDefault();
    if (!demandItem.trim()) return;
    const newEntry = {
      id: Date.now(),
      item: demandItem.trim(),
      qty: demandQty || '1 Unit',
      vendor: demandVendor,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Admin Approval',
      note: demandNote
    };
    setMySubmittedDemands(prev => [newEntry, ...prev]);
    setDemandItem('');
    setDemandQty('');
    setDemandNote('');
    setShowDemandModal(false);
    alert(`Requisition for "${newEntry.item}" sent to Admin successfully!`);
  };

  const eatenCount = students.filter(s => {
    if (selectedMealTab === 'Breakfast') return s.eatenBreakfast;
    if (selectedMealTab === 'Lunch') return s.eatenLunch;
    return s.eatenDinner;
  }).length;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: C.bg, fontFamily: "'Hanken Grotesk', sans-serif", paddingBottom: 50 }}>
      
      {/* ── Dark Header ─────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #0c1a2e, #0f2847)', padding: '0 16px 20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 64 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Febebo Staff App 📱</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Live Staff Portal & Operations</p>
          </div>
          <button onClick={() => setShowDemandModal(true)} style={{ background: C.primary, color: 'white', border: 'none', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>post_add</span>
            + Demand
          </button>
        </div>

        {/* Staff Switcher */}
        <p style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, margin: '6px 0 8px' }}>Select Staff Profile</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {STAFF_PROFILES.map(staff => {
            const active = activeStaff.id === staff.id;
            return (
              <button key={staff.id} onClick={() => setActiveStaff(staff)}
                style={{ whiteSpace: 'nowrap', padding: '8px 12px', borderRadius: 20, border: active ? `1.5px solid ${C.primary}` : '1px solid rgba(255,255,255,0.15)', background: active ? C.primary : 'rgba(255,255,255,0.08)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s', fontFamily: 'inherit' }}>
                <span>{staff.avatar}</span>
                <span>{staff.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Staff Info Banner */}
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 14, marginTop: 14, border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{activeStaff.name}</span>
              <span style={{ fontSize: 11, background: C.primary, color: 'white', padding: '2px 8px', borderRadius: 10, fontWeight: 800 }}>{activeStaff.role}</span>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Dept: {activeStaff.dept} · {activeStaff.phone}</p>
          </div>
          <button onClick={() => setIsClockedIn(!isClockedIn)}
            style={{ padding: '8px 12px', borderRadius: 10, border: 'none', background: isClockedIn ? C.successBg : C.dangerBg, color: isClockedIn ? C.success : C.danger, fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
            {isClockedIn ? `In: ${clockInTime} ✅` : 'Clock In ⏱️'}
          </button>
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* ── 1. COOK STAFF VIEW ────────────────────────────────────────── */}
        {activeStaff.role === 'Cook' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            {/* Food Ready Broadcast Button */}
            <button onClick={() => setShowBroadcastModal(true)}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', border: 'none', borderRadius: 16, fontSize: 15, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(16,185,129,0.3)', fontFamily: 'inherit' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>campaign</span>
              Broadcast "Food is Ready!" to Students 📢
            </button>

            {/* Daily Headcount Summary */}
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: '0 0 12px' }}>📊 Today's Mess Headcount</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { meal: 'Breakfast', count: 40, icon: 'coffee' },
                  { meal: 'Lunch', count: 38, icon: 'lunch_dining' },
                  { meal: 'Dinner', count: 42, icon: 'dinner_dining' },
                ].map(m => (
                  <div key={m.meal} onClick={() => setSelectedMealTab(m.meal)}
                    style={{ background: selectedMealTab === m.meal ? C.primaryBg : C.bg, border: `1px solid ${selectedMealTab === m.meal ? C.primary : C.border}`, borderRadius: 12, padding: 10, textAlign: 'center', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: selectedMealTab === m.meal ? C.primary : C.muted }}>{m.icon}</span>
                    <p style={{ fontSize: 18, fontWeight: 900, color: C.text, margin: '2px 0 0' }}>{m.count}</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: selectedMealTab === m.meal ? C.primary : C.muted, margin: 0 }}>{m.meal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Dine-In Attendance List */}
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: 0 }}>Dine-In Roster ({selectedMealTab})</h3>
                  <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>{eatenCount} of {students.length} students eaten</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, background: C.successBg, color: C.success, padding: '4px 10px', borderRadius: 20 }}>
                  {Math.round((eatenCount / students.length) * 100)}% Marked
                </span>
              </div>

              <div style={{ maxHeight: 360, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 4 }}>
                {students.map(s => {
                  const isEaten = selectedMealTab === 'Breakfast' ? s.eatenBreakfast : selectedMealTab === 'Lunch' ? s.eatenLunch : s.eatenDinner;
                  return (
                    <div key={s.id} style={{ background: isEaten ? C.successBg : C.bg, border: `1px solid ${isEaten ? '#a7f3d0' : C.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.15s' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{s.name}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.primary, background: C.primaryBg, padding: '2px 6px', borderRadius: 6 }}>Rm {s.room}</span>
                        </div>
                        <p style={{ fontSize: 11, color: C.muted, margin: '2px 0 0' }}>{s.bed}</p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <a href={`tel:${s.phone}`} style={{ textDecoration: 'none', background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.primary }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                        </a>
                        <button onClick={() => handleToggleEaten(s.id, selectedMealTab)}
                          style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: isEaten ? C.success : C.white, color: isEaten ? 'white' : C.textSub, fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', border: isEaten ? 'none' : `1px solid ${C.border}` }}>
                          {isEaten ? 'Eaten ✅' : 'Mark Eaten'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ── 2. CLEANER STAFF VIEW ────────────────────────────────────── */}
        {activeStaff.role === 'Cleaner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            {/* Admin Assigned Tasks */}
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 12px' }}>📋 My Assigned Cleaning Tasks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {assignedTasks.map(t => (
                  <div key={t.id} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: t.type === 'Special' ? C.purpleBg : C.primaryBg, color: t.type === 'Special' ? C.purple : C.primary, textTransform: 'uppercase' }}>{t.type} Work</span>
                        <h4 style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: '4px 0 0' }}>{t.title}</h4>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 20, background: t.status === 'Completed' ? C.successBg : t.status === 'In Progress' ? C.indigoBg : C.warnBg, color: t.status === 'Completed' ? C.success : t.status === 'In Progress' ? C.indigo : C.warn }}>
                        {t.status}
                      </span>
                    </div>

                    {t.note && <p style={{ fontSize: 12, color: C.textSub, margin: '6px 0', background: C.white, padding: '8px 10px', borderRadius: 8, border: `1px solid ${C.border}` }}>📌 {t.note}</p>}
                    
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      {t.status === 'Pending' && (
                        <button onClick={() => handleTaskStatusChange(t.id, 'In Progress')} style={{ flex: 1, padding: '9px', background: C.indigoBg, border: `1px solid ${C.indigo}`, borderRadius: 8, color: C.indigo, fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Start Work ⏳
                        </button>
                      )}
                      {t.status !== 'Completed' && (
                        <button onClick={() => handleTaskStatusChange(t.id, 'Completed')} style={{ flex: 1, padding: '9px', background: C.success, border: 'none', borderRadius: 8, color: 'white', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Mark Completed ✅
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Preferred Cleaning Time Slots */}
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: 0 }}>Student Cleaning Time Slots</h3>
                  <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>Allotted time preferences by students</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, background: C.primaryBg, color: C.primary, padding: '3px 8px', borderRadius: 20 }}>
                  {cleaningSlots.length} Rooms
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cleaningSlots.map(slot => (
                  <div key={slot.id} style={{ background: slot.status === 'Cleaned' ? C.successBg : C.bg, border: `1px solid ${slot.status === 'Cleaned' ? '#a7f3d0' : C.border}`, borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: C.text }}>Rm {slot.room}</span>
                        <span style={{ fontSize: 12, color: C.textSub, fontWeight: 600 }}>({slot.student})</span>
                      </div>
                      <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>
                        ⏰ <b>{slot.slot}</b> · {slot.type}
                      </p>
                    </div>

                    {slot.status === 'Cleaned' ? (
                      <span style={{ fontSize: 12, fontWeight: 800, color: C.success }}>Cleaned ✅</span>
                    ) : (
                      <button onClick={() => handleSlotStatusChange(slot.id, 'Cleaned')}
                        style={{ padding: '7px 12px', background: C.primary, color: 'white', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Mark Cleaned
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── 3. MAINTENANCE / TICKET STAFF VIEW ────────────────────────── */}
        {activeStaff.role === 'Maintenance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: 0 }}>🛠️ Repair Tickets Queue</h3>
                  <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>Assigned room maintenance complaints</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, background: C.warnBg, color: C.warn, padding: '3px 8px', borderRadius: 20 }}>
                  {tickets.filter(t => t.status !== 'Resolved').length} Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tickets.map(t => (
                  <div key={t.id} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: C.primary, background: C.primaryBg, padding: '2px 8px', borderRadius: 6, display: 'inline-block', marginBottom: 4 }}>
                          Room {t.room} · {t.student}
                        </span>
                        <h4 style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: 0 }}>{t.issue}</h4>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 12, background: t.priority === 'High' ? C.dangerBg : C.bg, color: t.priority === 'High' ? C.danger : C.muted }}>
                        {t.priority}
                      </span>
                    </div>

                    <p style={{ fontSize: 11, color: C.muted, margin: '4px 0 10px' }}>Reported: {t.date}</p>

                    <div style={{ display: 'flex', gap: 8 }}>
                      {t.status === 'Pending' && (
                        <button onClick={() => handleTicketStatusChange(t.id, 'In Progress')} style={{ flex: 1, padding: '9px', background: C.indigoBg, border: `1px solid ${C.indigo}`, borderRadius: 8, color: C.indigo, fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Start Repair 🛠️
                        </button>
                      )}
                      {t.status !== 'Resolved' ? (
                        <button onClick={() => handleTicketStatusChange(t.id, 'Resolved')} style={{ flex: 1, padding: '9px', background: C.success, border: 'none', borderRadius: 8, color: 'white', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Mark Resolved ✅
                        </button>
                      ) : (
                        <span style={{ fontSize: 13, fontWeight: 800, color: C.success }}>Resolved ✅</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── 4. PURCHASE MANAGER STAFF VIEW ────────────────────────────── */}
        {activeStaff.role === 'Purchase Manager' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, margin: '0 0 12px' }}>📦 Pending Approved Requisitions</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { id: 1, item: 'Basmati Rice 25kg', qty: '2 Bags', vendor: 'The Local Market', price: '₹2,400', date: 'Today' },
                  { id: 2, item: 'Mustard Oil 5L', qty: '1 Can', vendor: 'Shree Traders', price: '₹650', date: 'Today' },
                ].map(p => (
                  <div key={p.id} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 800, color: C.text, margin: 0 }}>{p.item}</h4>
                      <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>Qty: {p.qty} · Vendor: {p.vendor}</p>
                    </div>
                    <button onClick={() => alert(`Marked ${p.item} as Purchased & Delivered!`)}
                      style={{ padding: '7px 12px', background: C.primary, color: 'white', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Delivered 🚚
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── Submitted Item Demands History ───────────────────────────── */}
        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, marginTop: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: C.text, margin: 0 }}>📋 My Item Requisitions to Admin</h3>
            <button onClick={() => setShowDemandModal(true)} style={{ background: C.primaryBg, color: C.primary, border: `1px solid ${C.primary}`, borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              + New Demand
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mySubmittedDemands.map(d => (
              <div key={d.id} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: C.text, margin: 0 }}>{d.item}</h4>
                  <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>Qty: <b>{d.qty}</b> · Preferred: {d.vendor}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 20, background: d.status.includes('Approved') ? C.successBg : '#fffbeb', color: d.status.includes('Approved') ? C.success : '#d97706' }}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Submit Requisition Demand Modal ─────────────────────────────── */}
      {showDemandModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: '100%', maxWidth: 420, background: C.white, borderRadius: 20, padding: 22, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Demand Item / Supplies</h3>
                <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>Request needed items from Admin</p>
              </div>
              <button onClick={() => setShowDemandModal(false)} style={{ background: 'none', border: 'none', fontSize: 24, color: C.muted, cursor: 'pointer', padding: 0 }}>&times;</button>
            </div>

            <form onSubmit={handleSubmitDemand} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Item Description *</label>
                <input required value={demandItem} onChange={e => setDemandItem(e.target.value)} placeholder="e.g. Basmati Rice 25kg or Floor Cleaner 5L" style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Quantity</label>
                  <input value={demandQty} onChange={e => setDemandQty(e.target.value)} placeholder="e.g. 2 Bags / 5L" style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Preferred Vendor</label>
                  <select value={demandVendor} onChange={e => setDemandVendor(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, boxSizing: 'border-box' }}>
                    <option value="The Local Market">The Local Market</option>
                    <option value="Shree Traders">Shree Traders</option>
                    <option value="Daily Harvest Store">Daily Harvest Store</option>
                    <option value="Sharma Mandi">Sharma Mandi</option>
                    <option value="Sunil Traders">Sunil Traders</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Note / Urgency</label>
                <input value={demandNote} onChange={e => setDemandNote(e.target.value)} placeholder="e.g. Needed for dinner preparation" style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button type="button" onClick={() => setShowDemandModal(false)} style={{ flex: 1, padding: 12, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, color: C.textSub, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: 12, background: C.primary, color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Submit Demand 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Broadcast Modal ─────────────────────────────────────────────── */}
      {showBroadcastModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: '100%', maxWidth: 420, background: C.white, borderRadius: 20, padding: 22, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: 0 }}>Broadcast "Food is Ready!"</h3>
                <p style={{ fontSize: 12, color: C.muted, margin: '2px 0 0' }}>Send meal announcement to students</p>
              </div>
              <button onClick={() => setShowBroadcastModal(false)} style={{ background: 'none', border: 'none', fontSize: 24, color: C.muted, cursor: 'pointer', padding: 0 }}>&times;</button>
            </div>

            <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Select Meal</label>
                <select value={bMeal} onChange={e => setBMeal(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white }}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Target Audience</label>
                <select value={bTarget} onChange={e => setBTarget(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white }}>
                  <option value="All Students">All Students</option>
                  <option value="Floor 1 Students">Floor 1 Students</option>
                  <option value="Floor 2 Students">Floor 2 Students</option>
                  <option value="Floor 3 Students">Floor 3 Students</option>
                  <option value="Packed Tiffin Requesters">Packed Tiffin Requesters</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase' }}>Message</label>
                <textarea value={bMsg} onChange={e => setBMsg(e.target.value)} rows={3} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', background: C.white, boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button type="button" onClick={() => setShowBroadcastModal(false)} style={{ flex: 1, padding: 12, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, color: C.textSub, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: 12, background: C.success, color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>Broadcast Now 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
