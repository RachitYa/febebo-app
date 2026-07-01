import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_STAFF = [
  { id: 1, name: 'Sachin Kumar', empId: '#1234567', role: 'House Keeping', email: 'sachin@gmail.com', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=150&fit=crop' },
  { id: 2, name: 'Sachin Kumar', empId: '#1234567', role: 'House Keeping', email: 'sachin@gmail.com', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=150&fit=crop' },
  { id: 3, name: 'Sachin Kumar', empId: '#1234567', role: 'House Keeping', email: 'sachin@gmail.com', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=150&fit=crop' },
  { id: 4, name: 'Sachin Kumar', empId: '#1234567', role: 'House Keeping', email: 'sachin@gmail.com', phone: '+91 9234567681', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=150&fit=crop' },
];

export default function ManageStaff() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', empId: '', role: '', email: '', phone: '' });

  const filteredStaff = MOCK_STAFF.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.empId.includes(search) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddStaff = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    setNewStaff({ name: '', empId: '', role: '', email: '', phone: '' });
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/admin-dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <p style={{ fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>Staff Listing</p>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ padding: '16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Staff Name" style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Tab Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { id: 'list', label: 'Staff\nList', icon: 'group' },
            { id: 'incomplete', label: 'Incomplete\nProfile', icon: 'person_off' },
            { id: 'attendance', label: 'Staff\nAttendance', icon: 'fingerprint' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'attendance') { navigate('/staff-attendance'); return; }
                setActiveTab(tab.id);
              }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                background: activeTab === tab.id ? '#ecfeff' : 'white',
                border: activeTab === tab.id ? '1.5px solid #0891b2' : '1px solid #e2e8f0',
                borderRadius: 12, padding: '14px 8px', cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 22 }}>{tab.icon}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Staff Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredStaff.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 8 }}>search_off</span>
              No staff found
            </div>
          ) : (
            filteredStaff.map(s => (
              <div key={s.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px', display: 'flex', gap: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <img src={s.img} alt={s.name} style={{ width: 100, height: 120, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                  <p style={{ fontWeight: 600, fontSize: 16, color: '#000', margin: 0 }}>{s.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>badge</span> {s.empId}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>person</span> {s.role}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>mail</span> {s.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#000', fontSize: 13 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>phone_in_talk</span> {s.phone}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button onClick={() => setShowAddModal(true)} style={{ position: 'fixed', right: 20, bottom: 24, width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#0891b2,#0e7490)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(8,145,178,0.4)', cursor: 'pointer', zIndex: 40 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>add</span>
      </button>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '20px 20px 0 0', padding: '24px 20px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 18, color: '#0f172a', margin: 0 }}>Add Staff</p>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddStaff}>
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter full name', required: true },
                { label: 'Employee ID', key: 'empId', type: 'text', placeholder: '#1234567', required: true },
                { label: 'Role', key: 'role', type: 'text', placeholder: 'e.g. House Keeping', required: true },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com', required: false },
                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+91 XXXXXXXXXX', required: true },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                    {field.label} {field.required && <span style={{ color: '#e11d48' }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={newStaff[field.key]}
                    onChange={(e) => setNewStaff(prev => ({ ...prev, [field.key]: e.target.value }))}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <button type="submit" style={{ width: '100%', padding: '16px', background: '#0891b2', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
                Save Staff
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
