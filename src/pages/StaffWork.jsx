import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_TASKS = [
  {
    id: 1, date: '19/02/2025', status: 'Pending',
    title: 'Work: Washing Machine',
    description: 'Washing Machine is not working. Someone come and checked but it still not working.',
    assignee: 'Sachin Kumar (House Keeping)',
  },
  {
    id: 2, date: '18/02/2025', status: 'Complete',
    title: 'Work: Room 102 Cleaning',
    description: 'Regular deep cleaning required before new tenant moves in.',
    assignee: 'Ravi Kumar',
  },
  {
    id: 3, date: '17/02/2025', status: 'Pending',
    title: 'Work: Plumbing Fix Room 204',
    description: 'Bathroom tap is leaking and needs immediate repair.',
    assignee: 'Amit Singh (Maintenance)',
  },
  {
    id: 4, date: '16/02/2025', status: 'Follow Up',
    title: 'Work: Electrician Visit',
    description: 'Electrician visited but needs to come back with replacement parts.',
    assignee: 'Rajeev Kumar',
  },
  {
    id: 5, date: '15/02/2025', status: 'Complete',
    title: 'Work: Room 301 Painting',
    description: 'Walls repainted before new tenant move-in.',
    assignee: 'Ravi Kumar',
  },
  {
    id: 6, date: '14/02/2025', status: 'Pending',
    title: 'Work: WiFi Router Reset',
    description: 'WiFi router on 2nd floor stopped working. Needs reset/replacement.',
    assignee: 'Sachin Kumar (House Keeping)',
  },
];

const STATUS_STYLES = {
  Pending: { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', border: 'var(--warning)' },
  Complete: { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: 'var(--success)' },
  'Follow Up': { bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: '#6366f1' },
};

export default function StaffWork() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const TABS = [
    { id: 'All', count: MOCK_TASKS.length },
    { id: 'Follow Up', count: MOCK_TASKS.filter(t => t.status === 'Follow Up').length },
    { id: 'Complete', count: MOCK_TASKS.filter(t => t.status === 'Complete').length },
    { id: 'Pending', count: MOCK_TASKS.filter(t => t.status === 'Pending').length },
  ];

  const filteredTasks = activeTab === 'All'
    ? MOCK_TASKS
    : MOCK_TASKS.filter(t => t.status === activeTab);

  return (
    <div className="app-container">
      <div className="top-nav">
        <div className="flex items-center gap-4">
          <button className="icon-btn" onClick={() => navigate('/admin-dashboard')}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
          <div className="nav-title">Staff Work</div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        
        {/* Tabs */}
        <div className="flex justify-between items-center mb-6" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          {TABS.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                minWidth: '70px'
              }}
            >
              <div style={{ 
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-main)', 
                fontWeight: activeTab === tab.id ? '600' : '400',
                fontSize: '0.875rem'
              }}>
                {tab.id}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)' 
              }}>
                {tab.count}
              </div>
            </div>
          ))}
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 8, display: 'block', opacity: 0.4 }}>task_alt</span>
            No tasks found for this filter.
          </div>
        )}

        {filteredTasks.map(task => {
          const style = STATUS_STYLES[task.status] || STATUS_STYLES.Pending;
          return (
            <div key={task.id} className="card" style={{ borderLeft: `4px solid ${style.border}` }}>
              <div className="flex justify-between items-start mb-2">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{task.date}</div>
                <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: style.bg, color: style.color, borderRadius: 'var(--radius-md)' }}>
                  {task.status}
                </span>
              </div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{task.title}</div>
              <p style={{ fontSize: '0.875rem' }}>{task.description}</p>
              <div className="flex items-center gap-2 mt-3" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  {task.status === 'Complete' ? 'check_circle' : 'schedule'}
                </span>
                {task.status === 'Complete' ? 'Completed by' : 'Assigned to'}: {task.assignee}
              </div>
            </div>
          );
        })}

        {/* Floating Action Button */}
        <button style={{
          position: 'fixed',
          bottom: '80px',
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
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>add</span>
        </button>

      </div>
    </div>
  );
}
