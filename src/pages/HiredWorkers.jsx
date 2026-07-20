import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cyan = '#0891b2';

const MOCK_HIRED_WORKERS = [
  { 
    id: 1, name: 'Dinesh Patel', role: 'Plumber', rating: 4.8, 
    review: 'Fixed the leaking pipe in room 102 quickly and cleanly. Highly recommend.', 
    phone: '+91 9876543210', charges: '₹500 / visit', workDone: 'Pipe Leakage Fix', 
    isVisible: true, img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=100&h=100&fit=crop&crop=face'
  },
  { 
    id: 2, name: 'Suresh Kumar', role: 'Electrician', rating: 4.2, 
    review: 'Replaced the main breaker. Was a bit late but did good work.', 
    phone: '+91 9988776655', charges: '₹400 / visit + parts', workDone: 'Breaker Replacement', 
    isVisible: true, img: null
  },
  { 
    id: 3, name: 'Ramesh Yadav', role: 'Cook', rating: 4.9, 
    review: 'Excellent North Indian food, very hygienic.', 
    phone: '+91 9111223344', charges: '₹12,000 / month', workDone: 'Monthly Catering', 
    isVisible: true, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
  },
  { 
    id: 4, name: 'Kishore Singh', role: 'Carpenter', rating: 3.5, 
    review: 'Fixed the broken bed but left a mess behind.', 
    phone: '+91 9444556677', charges: '₹800 / task', workDone: 'Bed Repair', 
    isVisible: false, img: null
  },
  { 
    id: 5, name: 'Mohan Das', role: 'Cleaner', rating: 4.5, 
    review: 'Very punctual and thorough with deep cleaning.', 
    phone: '+91 9666778899', charges: '₹300 / day', workDone: 'Deep Cleaning', 
    isVisible: true, img: null
  },
];

export default function HiredWorkers() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState(MOCK_HIRED_WORKERS);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const toggleVisibility = (id) => {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, isVisible: !w.isVisible } : w));
  };

  const roles = ['All', ...new Set(MOCK_HIRED_WORKERS.map(w => w.role))];

  const filteredWorkers = workers.filter(w => {
    if (filterRole !== 'All' && w.role !== filterRole) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Hanken Grotesk', sans-serif", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0c1a2e, #0f2847)', padding: '0 16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 64 }}>
          <button onClick={() => navigate('/admin-dashboard')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'white' }}>Hired Workers</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Shared worker pool for PG Owners</p>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#64748b' }}>search</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search workers..."
            style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>

        {/* Roles Filter */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {roles.map(role => (
            <button key={role} onClick={() => setFilterRole(role)}
              style={{ padding: '6px 12px', border: 'none', borderRadius: 20, background: filterRole === role ? cyan : 'rgba(255,255,255,0.1)', color: filterRole === role ? 'white' : '#cbd5e1', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              {role}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {filteredWorkers.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#e2e8f0' }}>engineering</span>
            <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 600 }}>No workers found.</p>
          </div>
        )}

        {filteredWorkers.map(w => (
          <div key={w.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {w.img ? (
                  <img src={w.img} alt={w.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 800, fontSize: 18 }}>
                    {w.name.substring(0,2).toUpperCase()}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 2px', fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{w.name}</h3>
                      <span style={{ display: 'inline-block', background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
                        {w.role}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fef9c3', padding: '4px 8px', borderRadius: 8 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#ca8a04' }}>star</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#ca8a04' }}>{w.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#94a3b8' }}>task_alt</span>
                  <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>{w.workDone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#94a3b8' }}>payments</span>
                  <span style={{ fontSize: 14, color: '#475569', fontWeight: 700 }}>{w.charges}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#94a3b8', marginTop: 2 }}>rate_review</span>
                  <span style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', lineHeight: 1.4 }}>"{w.review}"</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href={`tel:${w.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                Call Worker
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: w.isVisible ? '#0891b2' : '#94a3b8' }}>
                  {w.isVisible ? 'Visible to Owners' : 'Hidden'}
                </span>
                <button onClick={() => toggleVisibility(w.id)}
                  style={{ width: 44, height: 24, borderRadius: 12, background: w.isVisible ? cyan : '#cbd5e1', border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: w.isVisible ? 23 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
