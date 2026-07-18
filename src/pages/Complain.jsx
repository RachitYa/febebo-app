import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cyan = '#0891b2';

const MOCK_COMPLAINTS = [
  { id: 1, tenant: 'Rahul Rastogi', room: '103', phone: '+91 9876543210', title: 'Washing Machine Not Working', desc: 'The washing machine on 2nd floor has been broken for 3 days. Very inconvenient.', date: '28 Jun 2025', status: 'Active', priority: 'High' },
  { id: 2, tenant: 'Amit Sachdeva', room: '103', phone: '+91 9988776655', title: 'Water Leakage in Bathroom', desc: 'There is a water leakage near the sink in the attached bathroom. The floor is always wet.', date: '26 Jun 2025', status: 'Pending', priority: 'Medium' },
  { id: 3, tenant: 'Ravi Kumar', room: '102', phone: '+91 9111223344', title: 'WiFi Not Working', desc: 'Internet has been down since yesterday evening. Need it for work.', date: '24 Jun 2025', status: 'Closed', priority: 'Low' },
  { id: 4, tenant: 'Sneha Kapoor', room: '108', phone: '+91 9444556677', title: 'Room Heater Not Functional', desc: 'Room heater stopped working. Nights are very cold.', date: '27 Jun 2025', status: 'Active', priority: 'High' },
  { id: 5, tenant: 'Priya Sharma', room: '202', phone: '+91 9666778899', title: 'Cockroach Problem', desc: 'Cockroaches seen in the kitchen area near sink. Need pest control.', date: '25 Jun 2025', status: 'Pending', priority: 'High' },
];

const STATUS_CONFIG = {
  Active:  { bg: '#fff1f2', text: '#e11d48', border: '#fecaca', icon: 'error' },
  Pending: { bg: '#fffbeb', text: '#d97706', border: '#fde68a', icon: 'schedule' },
  Closed:  { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0', icon: 'task_alt' },
};

const PRIORITY_CONFIG = {
  High:   { color: '#e11d48', bg: '#fff1f2' },
  Medium: { color: '#d97706', bg: '#fffbeb' },
  Low:    { color: '#059669', bg: '#ecfdf5' },
};

export default function Complain() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);
  const [activeTab, setActiveTab] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const TABS = ['All', 'Active', 'Pending', 'Closed'];
  const filtered = activeTab === 'All' ? complaints : complaints.filter(c => c.status === activeTab);

  const counts = {
    All: complaints.length,
    Active: complaints.filter(c => c.status === 'Active').length,
    Pending: complaints.filter(c => c.status === 'Pending').length,
    Closed: complaints.filter(c => c.status === 'Closed').length,
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk', sans-serif", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0c1a2e, #0f2847)', padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 64 }}>
          <button onClick={() => navigate('/admin-dashboard')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'white' }}>Complaints</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{counts.Active} active · {counts.Pending} pending</p>
          </div>
          <div style={{ background: '#fff1f2', borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#e11d48' }}>error</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#e11d48' }}>{counts.Active}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: '8px 4px', border: 'none', borderRadius: 10, background: activeTab === tab ? 'rgba(255,255,255,0.18)' : 'transparent', color: activeTab === tab ? 'white' : '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              {tab}
              <span style={{ display: 'block', fontSize: 16, fontWeight: 900, color: activeTab === tab ? '#38bdf8' : '#475569' }}>{counts[tab]}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {filtered.map(comp => {
          const sc = STATUS_CONFIG[comp.status];
          const pc = PRIORITY_CONFIG[comp.priority];
          const isExpanded = expanded === comp.id;
          return (
            <div key={comp.id} onClick={() => setExpanded(isExpanded ? null : comp.id)}
              style={{ background: 'white', borderRadius: 16, border: `1px solid ${sc.border}`, marginBottom: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer', borderLeft: `4px solid ${sc.text}` }}>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a', flex: 1, paddingRight: 8 }}>{comp.title}</p>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: pc.bg, color: pc.color }}>{comp.priority}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: sc.bg, color: sc.text, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>{sc.icon}</span>
                      {comp.status}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{comp.tenant}</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                  <span style={{ fontSize: 12, color: '#64748b' }}>Room {comp.room}</span>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#cbd5e1' }} />
                  <span style={{ fontSize: 12, color: '#64748b' }}>{comp.date}</span>
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '0 16px 14px', borderTop: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: 13, color: '#475569', margin: '12px 0' }}>{comp.desc}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${comp.phone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#ecfeff', color: cyan, border: '1px solid #a5f3fc', borderRadius: 10, padding: '9px', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                      Call Tenant
                    </a>
                    {comp.status !== 'Closed' && (
                      <>
                        {comp.status === 'Active' && (
                          <button onClick={e => { e.stopPropagation(); setComplaints(prev => prev.map(c => c.id === comp.id ? { ...c, status: 'Pending' } : c)); }}
                            style={{ flex: 1, background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', borderRadius: 10, padding: '9px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Assign Staff
                          </button>
                        )}
                        <button onClick={e => { e.stopPropagation(); setComplaints(prev => prev.map(c => c.id === comp.id ? { ...c, status: 'Closed' } : c)); }}
                          style={{ flex: 1, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: 10, padding: '9px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          Mark Resolved
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 60, color: '#94a3b8' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#e2e8f0' }}>task_alt</span>
            <p style={{ fontSize: 15, fontWeight: 600 }}>No complaints here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
