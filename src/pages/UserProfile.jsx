import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BASE = { backgroundColor: '#f8fafc', minHeight: '100vh', position: 'relative', paddingBottom: 80, fontFamily: "'Hanken Grotesk', sans-serif" };
const cyan = '#0ea5e9';

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

// ─── VIEW 3: USER DETAILS ─────────────────────────────────
function UserDetailsView({ user, onBack, onReceipt, onHistory }) {
  // Generate consistent dummy data based on user id or name length to make it look dynamic
  const rent = user?.rent || 10000;
  const token = user?.token || 5000;
  const pending = user?.pending || 5000;

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
          <img src={user?.image || user?.img || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'} alt={user?.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: 18, color: '#0f172a' }}>{user?.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>badge</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.studentId || '#1234567'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>call</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.phone || '+91 9234567681'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: cyan }}>calendar_month</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{user?.date || '25 Feb 2025'}</span>
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
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: {user?.room || '15'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Bed Number</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: {user?.bed || '3'}</span>
          </div>
        </Accordion>

        <Accordion title="Inventory Allotted" icon="inventory_2" />
        <Accordion title="User Status" icon="how_to_reg" />
        <Accordion title="Meter Unit Details" icon="electric_meter" />
        
        <Accordion title="Token Amount" icon="payments" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Amount</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: ₹ {token.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Received by</span>
            <span style={{ fontSize: 13, color: cyan, fontWeight: 600 }}>: Manager</span>
          </div>
        </Accordion>

        <Accordion title="Pending Amount" icon="history">
          <div style={{ textAlign: 'right', padding: '8px 0' }}>
            <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>₹ {pending.toLocaleString()}</span>
          </div>
        </Accordion>

        <Accordion title="Rent / Security Amount" icon="bed" defaultOpen={true}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(14,165,233,0.05)', borderRadius: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#475569' }}>Rent Of Bed:</span>
            <span style={{ fontSize: 13, color: '#0f172a', fontWeight: 700 }}>₹{rent.toLocaleString()}/month</span>
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
                 <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>-{token.toLocaleString()}</p>
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
function ReceiptView({ user, onBack }) {
  const token = user?.token || 10000;
  const pending = user?.pending || 5000;

  return (
    <>
      <Header title="Paid Successfully" onBack={onBack} center={false} />
      <div style={{ padding: '24px 20px' }}>
         <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', padding: '24px 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 4px' }}>Amount</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>₹ {token.toLocaleString()}</span>
              <span className="material-symbols-outlined" style={{ background: '#16a34a', color: 'white', borderRadius: '50%', fontSize: 16, padding: 2 }}>check</span>
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 24px' }}>Paid via Cash</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '20px 0' }}>
               <div>
                 <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>To</p>
                 <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>Ravi Kumar <span style={{ fontSize: 11, fontWeight: 500, color: '#94a3b8' }}>Manager</span></p>
                 <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Payment: Cash</p>
               </div>
               <div>
                 <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>From</p>
                 <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{user?.name || 'Rajeev Kumar'}</p>
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
                 <span style={{ fontSize: 16, color: '#0f172a', fontWeight: 700 }}>₹ {token.toLocaleString()}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>Pending</span>
                 <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 700 }}>₹ {pending.toLocaleString()}</span>
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
  const user = location.state?.user || {
    id: 'unknown',
    name: 'Unknown User',
    phone: '+91 0000000000',
    room: 'N/A',
    bed: 'N/A',
    rent: 0,
    token: 0,
    pending: 0
  };

  const [view, setView] = useState('details'); // 'details' | 'history' | 'receipt'

  const goBack = () => {
    if (view === 'details') {
      navigate(-1); // Goes back to wherever they came from (ManageRooms, ManageTenants, etc.)
    } else {
      setView('details');
    }
  };

  return (
    <div style={BASE}>
      {view === 'details' && <UserDetailsView user={user} onBack={goBack} onReceipt={() => setView('receipt')} onHistory={() => setView('history')} />}
      {view === 'history' && <PaymentHistoryView onBack={goBack} />}
      {view === 'receipt' && <ReceiptView user={user} onBack={goBack} />}
    </div>
  );
}
