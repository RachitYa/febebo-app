import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, UserPlus, User, UserMinus, Contact, Phone, CalendarDays, Plus } from 'lucide-react';

export default function ManageTenants() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming User');
  const [search, setSearch] = useState('');

  const TABS = [
    { id: 'Upcoming User', label: 'Upcoming\nUser', icon: <UserPlus size={24} /> },
    { id: 'Current User', label: 'Current\nUser', icon: <User size={24} /> },
    { id: 'On Notice Period', label: 'On Notice\nPeriod', icon: <UserMinus size={24} /> },
  ];

  const MOCK_USERS = [
    { id: 1, name: 'Rajeev Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
    { id: 2, name: 'Ravi Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
    { id: 3, name: 'Ravi Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop' },
    { id: 4, name: 'Ravi Kumar', studentId: '#1234567', phone: '+91 9234567681', date: '25 Feb 2025', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  ];

  return (
    <div className="app-container" style={{ backgroundColor: '#f8fafc', paddingBottom: '80px', minHeight: '100vh', position: 'relative' }}>
      <div className="top-nav" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'white' }}>
        <div className="flex items-center gap-4" style={{ width: '100%' }}>
          <button className="icon-btn" onClick={() => navigate('/admin-dashboard')} style={{ color: 'var(--primary)' }}>
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="nav-title" style={{ color: 'var(--primary)', flex: 1, textAlign: 'center', marginRight: '40px', fontSize: '1.25rem', fontWeight: '600' }}>User</div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        
        {/* Search */}
        <div className="input-group mb-4" style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--primary)' }}>
              <Search size={20} />
            </span>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search User" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid var(--primary)', backgroundColor: 'white', color: 'var(--text-main)', fontSize: '1rem', padding: '10px 10px 10px 40px' }}
            />
          </div>
        </div>

        {/* Tabs Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '12px',
          marginBottom: '20px'
        }}>
          {TABS.map(tab => (
            <div 
              key={tab.id} 
              className="card"
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: 0,
                textAlign: 'center',
                padding: '16px 8px',
                border: activeTab === tab.id ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                borderRadius: '12px',
                backgroundColor: 'white'
              }}
            >
              <div style={{ 
                width: '56px', 
                height: '28px', 
                borderRadius: '16px', 
                backgroundColor: 'rgba(14, 165, 233, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                {tab.icon}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-main)', whiteSpace: 'pre-line', lineHeight: '1.2' }}>{tab.label}</span>
            </div>
          ))}
        </div>

        {/* User Cards List */}
        <div>
          {MOCK_USERS.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
            <div key={user.id} className="card" style={{ 
              display: 'flex', 
              gap: '16px', 
              padding: '12px', 
              marginBottom: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '8px', 
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img src={user.image} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#000', marginBottom: '2px' }}>{user.name}</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000', fontSize: '0.875rem' }}>
                  <Contact size={16} style={{ color: 'var(--primary)' }} />
                  <span>{user.studentId}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000', fontSize: '0.875rem' }}>
                  <Phone size={16} style={{ color: 'var(--primary)' }} />
                  <span>{user.phone}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000', fontSize: '0.875rem' }}>
                  <CalendarDays size={16} style={{ color: 'var(--primary)' }} />
                  <span>{user.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100
        }}>
          <Plus size={32} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}
