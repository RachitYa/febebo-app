import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = { backgroundColor: '#f8fafc', minHeight: '100vh', position: 'relative', paddingBottom: 80, fontFamily: "'Hanken Grotesk', sans-serif" };
const cyan = '#0ea5e9';

// ─── MOCK DATA ──────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, name: 'Rajeev Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', type: 'Upcoming User', room: 15, bed: 3 },
  { id: 2, name: 'Ravi Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', type: 'Current User', room: 12, bed: 1 },
  { id: 3, name: 'Ravi Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop', type: 'On Notice Period', room: 10, bed: 2 },
  { id: 4, name: 'Ravi Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', type: 'Upcoming User', room: 14, bed: 1 },
];

const AMENITIES = ['AC', 'Fridge', 'Washing Machine', 'Study Table', 'Cooler', 'Geyser'];

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

// ─── ACCORDION COMPONENT ──────────────────────────────────
function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: 'white', borderRadius: 12, marginBottom: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 22 }}>{icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{title}</span>
        </div>
        <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 20, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>arrow_drop_down</span>
      </button>
      {open && <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f1f5f9' }}>{children}</div>}
    </div>
  );
}

// ─── MAIN COMPONENT: MANAGE TENANTS ───────────────────────
export default function ManageTenants() {
  const navigate = useNavigate();
  // Navigation State: 'list' | 'add' | 'details' | 'history' | 'receipt'
  const [view, setView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);

  const goBack = () => {
    if (view === 'list') navigate('/admin-dashboard');
    else if (view === 'add' || view === 'details') setView('list');
    else if (view === 'history' || view === 'receipt') setView('details');
  };

  const openDetails = (u) => { setSelectedUser(u); setView('details'); };

  return (
    <div style={BASE}>
      {view === 'list' && <UserListView onBack={goBack} onAdd={() => setView('add')} onSelect={openDetails} />}
      {view === 'add' && <AddUserView onBack={goBack} />}
      {view === 'details' && <UserDetailsView user={selectedUser} onBack={goBack} onReceipt={() => setView('receipt')} onHistory={() => setView('history')} />}
      {view === 'history' && <PaymentHistoryView onBack={goBack} />}
      {view === 'receipt' && <ReceiptView onBack={goBack} />}
    </div>
  );
}

// ─── VIEW 1: USER LIST ────────────────────────────────────
function UserListView({ onBack, onAdd, onSelect }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Upcoming User');

  const TABS = [
    { id: 'Upcoming User', label: 'Upcoming\nUser', icon: 'person_add' },
    { id: 'Current User', label: 'Current\nUser', icon: 'person' },
    { id: 'On Notice Period', label: 'On Notice\nPeriod', icon: 'person_remove' },
  ];

  return (
    <>
      <Header title="User" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: 12, color: cyan, fontSize: 20 }}>search</span>
          <input type="text" placeholder="Search Product" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: 8, border: `1px solid ${cyan}`, fontSize: 14, outline: 'none' }} />
        </div>

        {/* Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, border: tab === t.id ? `1.5px solid ${cyan}` : '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(14,165,233,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 22 }}>{t.icon}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#334155', whiteSpace: 'pre-line', textAlign: 'center', lineHeight: 1.2 }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_USERS.filter(u => u.type === tab && u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
            <div key={u.id} onClick={() => onSelect(u)} style={{ background: 'white', borderRadius: 12, padding: 12, display: 'flex', gap: 12, border: '1px solid #f1f5f9', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <img src={u.image} alt={u.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', margin: 0 }}>{u.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>badge</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{u.studentId}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>call</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{u.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>calendar_month</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{u.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAB */}
        <button onClick={onAdd} style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: '50%', background: cyan, color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(14,165,233,0.4)', cursor: 'pointer', zIndex: 10 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add</span>
        </button>
      </div>
    </>
  );
}

// ─── VIEW 2: ADD USER ─────────────────────────────────────
function AddUserView({ onBack }) {
  const [career, setCareer] = useState('student'); // student | working
  const [payment, setPayment] = useState('cash'); // cash | online
  const fileInputRef = useRef(null);

  const Label = ({ children, req }) => <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>{children} {req && <span style={{ color: '#ef4444' }}>*</span>}</label>;
  const Input = ({ placeholder, type = 'text' }) => <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${cyan}`, fontSize: 14, marginBottom: 16, outline: 'none' }} />;

  const handleUploadClick = () => fileInputRef.current?.click();

  return (
    <>
      <Header title="Add User" onBack={onBack} />
      <div style={{ padding: '20px 16px' }}>
        <Label req>Name</Label><Input placeholder="Enter User Name" />
        <Label req>Mobile Number</Label><Input placeholder="Enter Mobile Number" type="tel" />
        <Label req>Email Id</Label><Input placeholder="Enter Email Id" type="email" />

        <Label req>Upload User Image</Label>
        <div onClick={handleUploadClick} style={{ border: `1.5px dashed ${cyan}`, borderRadius: 12, padding: '24px 16px', textAlign: 'center', background: 'white', marginBottom: 16, cursor: 'pointer' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
          <span style={{ fontSize: 13, color: '#94a3b8' }}>Tap here to upload image</span>
          <span className="material-symbols-outlined" style={{ display: 'block', marginTop: 8, color: '#94a3b8' }}>cloud_upload</span>
        </div>

        <Label req>Father Name</Label><Input placeholder="Enter Father Name" />
        <Label req>Father Mobile Number</Label><Input placeholder="Enter Mobile Number" type="tel" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><Label req>Bed Number</Label><Input placeholder="Enter Bed Number" /></div>
          <div><Label req>Room Number</Label><Input placeholder="Enter Room Number" /></div>
        </div>

        <Label req>Amenities</Label>
        <select style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${cyan}`, fontSize: 14, marginBottom: 16, outline: 'none', background: 'white', color: '#94a3b8' }}>
          <option>Select Amenities</option>
          {AMENITIES.map(a => <option key={a}>{a}</option>)}
        </select>

        <Label req>Career Status</Label>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setCareer('student')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${cyan}`, background: career === 'student' ? 'rgba(14,165,233,0.1)' : 'white', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `4px solid ${career === 'student' ? cyan : '#e2e8f0'}`, background: 'white' }} />
            <span style={{ fontSize: 14, color: '#334155' }}>Student</span>
          </button>
          <button onClick={() => setCareer('working')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${cyan}`, background: career === 'working' ? 'rgba(14,165,233,0.1)' : 'white', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `4px solid ${career === 'working' ? cyan : '#e2e8f0'}`, background: 'white' }} />
            <span style={{ fontSize: 14, color: '#334155' }}>Working</span>
          </button>
        </div>

        {career === 'working' ? (
          <>
            <Label req>Company Name</Label><Input placeholder="Enter Company Name" />
            <Label req>Company Address</Label><Input placeholder="Enter Company Address" />
          </>
        ) : (
          <>
            <Label req>College Name</Label><Input placeholder="Enter College Name" />
            <Label req>College Address</Label><Input placeholder="Enter College Address" />
          </>
        )}

        <Label req>Upload ID Card Image</Label>
        <div onClick={handleUploadClick} style={{ border: `1.5px dashed ${cyan}`, borderRadius: 12, padding: '24px 16px', textAlign: 'center', background: 'white', marginBottom: 16, cursor: 'pointer' }}>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>Tap here to upload Front & Back File</span>
          <span className="material-symbols-outlined" style={{ display: 'block', marginTop: 8, color: '#94a3b8' }}>cloud_upload</span>
        </div>

        <Label req>Token Amount</Label><Input placeholder="Enter Token Amount" type="number" />
        <Label req>Pending Amount</Label><Input placeholder="Enter Pending Amount" type="number" />

        <Label req>Payment Mode</Label>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setPayment('cash')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${cyan}`, background: payment === 'cash' ? 'rgba(14,165,233,0.1)' : 'white', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `4px solid ${payment === 'cash' ? cyan : '#e2e8f0'}`, background: 'white' }} />
            <span style={{ fontSize: 14, color: '#334155' }}>CASH</span>
          </button>
          <button onClick={() => setPayment('online')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${cyan}`, background: payment === 'online' ? 'rgba(14,165,233,0.1)' : 'white', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `4px solid ${payment === 'online' ? cyan : '#e2e8f0'}`, background: 'white' }} />
            <span style={{ fontSize: 14, color: '#334155' }}>ONLINE</span>
          </button>
        </div>

        <Label req>Meter Unit</Label><Input placeholder="1000 Unit" />
        
        <Label req>Complete Address</Label>
        <Input placeholder="Enter City Name" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Input placeholder="Street No." />
          <Input placeholder="Pincode" />
        </div>
        <Input placeholder="Full Address" />

        <button onClick={onBack} style={{ width: '100%', padding: '16px', borderRadius: 8, background: cyan, color: 'white', fontWeight: 700, fontSize: 15, border: 'none', marginTop: 10, cursor: 'pointer' }}>
          Save & Next
        </button>
      </div>
    </>
  );
}

// ─── VIEW 3: USER DETAILS ─────────────────────────────────
function UserDetailsView({ user, onBack, onReceipt, onHistory }) {
  return (
    <>
      {/* Dark Header */}
      <Header title="User Details" onBack={onBack} center={true} dark={true} action={
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'white', padding: '4px 8px', borderRadius: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: cyan }}>4.3</span>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>star</span>
        </div>
      }/>

      <div style={{ background: cyan, padding: '0 16px 24px', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, display: 'flex', gap: 16, alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <img src={user?.image} alt={user?.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: 18, color: '#0f172a' }}>{user?.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>badge</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.studentId}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>call</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>calendar_month</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <Accordion title="Personal Details" icon="person_outline" />
        <Accordion title="Parents Details" icon="family_restroom" />
        <Accordion title="Date of Joining" icon="event" />
        
        <Accordion title="Room Details" icon="meeting_room" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Room Number</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: {user?.room}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Bed Number</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: {user?.bed}</span>
          </div>
        </Accordion>

        <Accordion title="Inventory Allotted" icon="inventory_2" />
        <Accordion title="User Status" icon="how_to_reg" />
        <Accordion title="Meter Unit Details" icon="electric_meter" />
        
        <Accordion title="Token Amount" icon="payments" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Amount</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: ₹ 5,000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Received by</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: Manager</span>
          </div>
        </Accordion>

        <Accordion title="Pending Amount" icon="history">
          <div style={{ textAlign: 'right', padding: '8px 0' }}>
            <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>₹ 5,000</span>
          </div>
        </Accordion>

        <Accordion title="Rent / Security Amount" icon="bed" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(14,165,233,0.05)', borderRadius: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#475569' }}>Rent Of Bed:</span>
            <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>₹10,000/month</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(14,165,233,0.05)', borderRadius: 8 }}>
            <span style={{ fontSize: 12, color: '#475569' }}>Security Amount:</span>
            <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>₹3,000</span>
          </div>
        </Accordion>

        <Accordion title="Visitor Details" icon="badge" defaultOpen={true}>
           <div style={{ position: 'relative' }}>
             <span className="material-symbols-outlined" style={{ position: 'absolute', right: 0, top: 0, background: cyan, color: 'white', borderRadius: '50%', padding: 6, fontSize: 16 }}>edit</span>
             <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, fontSize: 13, color: '#64748b' }}>
                <span>Name</span><span style={{ color: cyan, fontWeight: 600 }}>: Anil Kumar</span>
                <span>Number</span><span style={{ color: cyan, fontWeight: 600 }}>: +91 9876543232</span>
                <span>Religion</span><span style={{ color: cyan, fontWeight: 600 }}>: Hindu</span>
                <span>Address</span><span style={{ color: cyan, fontWeight: 600 }}>: New Ashok Nagar Delhi</span>
             </div>
           </div>
        </Accordion>

        <Accordion title="Police Verification" icon="local_police" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 12 }}>Verified</span>
          </div>
        </Accordion>

        <Accordion title="Document" icon="description" defaultOpen={true}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
             <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 600 }}>ID Proof</span>
             <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 12 }}>Verified</span>
           </div>
           <div style={{ display: 'flex', gap: 12 }}>
             <div style={{ flex: 1, height: 80, background: '#e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
               <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=120&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="ID Front" />
             </div>
             <div style={{ flex: 1, height: 80, background: '#e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
               <img src="https://images.unsplash.com/photo-1621570275815-188b3f81e351?w=200&h=120&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="ID Back" />
             </div>
           </div>
        </Accordion>

        {/* Payment History Teaser */}
        <p style={{ fontSize: 14, fontWeight: 700, color: '#334155', margin: '24px 0 12px' }}>Payment History</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2].map(i => (
            <div key={i} onClick={onReceipt} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '12px 16px', borderRadius: 12, border: '1px solid #e2e8f0', cursor: 'pointer' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                 <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 18, transform: 'rotate(-45deg)' }}>arrow_upward</span>
                 </div>
                 <div>
                   <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: '0 0 2px' }}>Febebo PG</p>
                   <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Sent 05/02/2025 , 08:22 PM</p>
                 </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>-5,000</p>
                 <p style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, margin: 0 }}>Paid</p>
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
  const [tab, setTab] = useState('list'); // list | food | laundry | complain
  
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
            <p style={{ fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Filter By</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              <div style={{ border: `1px dashed ${cyan}`, borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                 <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 18 }}>calendar_month</span>
                 <div><p style={{ fontSize: 9, color: '#94a3b8', margin: 0 }}>From Date</p><p style={{ fontSize: 12, color: cyan, fontWeight: 600, margin: 0 }}>2 Feb 2025</p></div>
              </div>
              <div style={{ border: `1px dashed ${cyan}`, borderRadius: 8, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                 <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 18 }}>calendar_month</span>
                 <div><p style={{ fontSize: 9, color: '#94a3b8', margin: 0 }}>To Date</p><p style={{ fontSize: 12, color: cyan, fontWeight: 600, margin: 0 }}>2 Feb 2025</p></div>
              </div>
            </div>
            
            {/* Months List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['January', 'February', 'March', 'April', 'May', 'June'].map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'white', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="material-symbols-outlined" style={{ color: cyan }}>calendar_today</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{m} 2025</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>₹25,000</span>
                </div>
              ))}
            </div>
            <button onClick={() => setTab('food')} style={{ width: '100%', padding: '14px', background: 'white', border: `1px solid ${cyan}`, color: cyan, fontWeight: 700, borderRadius: 12, marginTop: 16, cursor: 'pointer' }}>Switch to History</button>
          </>
        ) : (
          <>
            {/* History Tabs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ width: 80, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, border: tab === t.id ? `1.5px solid ${cyan}` : '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
                   <span className="material-symbols-outlined" style={{ color: cyan, fontSize: 28 }}>{t.icon}</span>
                   <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{t.label}</span>
                </button>
              ))}
            </div>

            {/* History List */}
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
                      <>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#334155', margin: '0 0 4px' }}>Issue: Washing Machine</p>
                        <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>Washing Machine is not working. Someone come and checked but it still not working</p>
                      </>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 6 }}>
                             <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>payments</span> Payment Mode: Cash
                          </p>
                          <p style={{ fontSize: 12, color: '#64748b', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                             <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>person</span> Received By: Naresh (Manager)
                          </p>
                        </div>
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

// ─── VIEW 5: PAID SUCCESSFULLY (RECEIPT) ──────────────────
function ReceiptView({ onBack }) {
  return (
    <>
      <Header title="Paid Successfully" onBack={onBack} center={false} />
      <div style={{ padding: '24px 20px' }}>
         <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', padding: '24px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 4px' }}>Amount</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>₹ 10,000</span>
              <span className="material-symbols-outlined" style={{ background: '#16a34a', color: 'white', borderRadius: '50%', fontSize: 16, padding: 2 }}>check</span>
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 24px' }}>Rupees Ten Thousand Only</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '20px 0' }}>
               <div>
                 <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>To</p>
                 <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>Ravi Kumar <span style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8' }}>Manager</span></p>
                 <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Payment: Cash</p>
               </div>
               <div>
                 <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>From</p>
                 <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>Rajeev Kumar</p>
                 <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Payment: Cash</p>
                 <p style={{ fontSize: 11, color: '#94a3b8', margin: '4px 0 0' }}>Paid at 08:51 AM, 12 Feb 2025</p>
               </div>
            </div>

            <div style={{ padding: '20px 0', borderBottom: '1px dashed #cbd5e1' }}>
               {[
                 { label: 'Amenities', val: '1,000' },
                 { label: 'Food Charge', val: '2,500' },
                 { label: 'Meter Unit', val: '1,000' },
                 { label: 'Laundry', val: '1,500' },
                 { label: 'House Keeping', val: '1,000' },
                 { label: 'Other Charges', val: '3,000' },
               ].map((item, i) => (
                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                   <span style={{ fontSize: 13, color: '#475569' }}>{item.label} :</span>
                   <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 600 }}>₹ {item.val}</span>
                 </div>
               ))}
            </div>

            <div style={{ paddingTop: 20 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                 <span style={{ fontSize: 16, color: '#0f172a', fontWeight: 700 }}>Total</span>
                 <span style={{ fontSize: 16, color: '#0f172a', fontWeight: 700 }}>₹ 10,000</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>Pending</span>
                 <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>₹ 5,000</span>
               </div>
            </div>
         </div>
      </div>
    </>
  );
}
