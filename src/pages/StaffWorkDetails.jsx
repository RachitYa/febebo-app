import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function StaffWorkDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const staff = location.state?.staff || { name: 'Unknown' };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Hanken Grotesk',sans-serif" }}>
      <div style={{ background: '#0ea5e9', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'white' }}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <p style={{ fontWeight: 700, fontSize: 18, color: 'white', margin: 0, flex: 1, textAlign: 'center' }}>Work Details</p>
        <div style={{ width: 24 }} />
      </div>
      <div style={{ padding: 20, textAlign: 'center', marginTop: 40 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#cbd5e1', marginBottom: 16 }}>construction</span>
        <h2 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: 20 }}>Work Features Coming Soon</h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: 15, lineHeight: 1.5 }}>
          This dedicated work view for <strong>{staff.name}</strong> ({staff.role}) will contain specific features related to their role, as discussed later.
        </p>
      </div>
    </div>
  );
}
