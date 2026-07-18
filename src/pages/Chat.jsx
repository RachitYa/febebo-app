import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cyan = '#0891b2';

const CONTACTS = [
  { id: 'admin', name: 'Admin (You)', role: 'admin', avatar: '👑', color: '#0891b2', initials: 'AD' },
  // Students
  { id: 'u1', name: 'Arjun Mehta', role: 'student', room: '101', avatar: null, initials: 'AM', color: '#6366f1' },
  { id: 'u2', name: 'Priya Sharma', role: 'student', room: '202', avatar: null, initials: 'PS', color: '#f43f5e' },
  { id: 'u3', name: 'Ravi Kumar', role: 'student', room: '305', avatar: null, initials: 'RK', color: '#10b981' },
  { id: 'u4', name: 'Sneha Kapoor', role: 'student', room: '108', avatar: null, initials: 'SK', color: '#f59e0b' },
  // Staff
  { id: 's1', name: 'Ramesh Yadav', role: 'staff', dept: 'Cook', avatar: null, initials: 'RY', color: '#8b5cf6' },
  { id: 's2', name: 'Mohan Das', role: 'staff', dept: 'Cleaner', avatar: null, initials: 'MD', color: '#06b6d4' },
  { id: 's3', name: 'Vikram Sharma', role: 'staff', dept: 'Manager', avatar: null, initials: 'VS', color: '#64748b' },
  { id: 's4', name: 'Dinesh Patel', role: 'staff', dept: 'Plumber', avatar: null, initials: 'DP', color: '#dc2626' },
];

const INITIAL_MESSAGES = {
  u1: [
    { id: 1, from: 'u1', text: 'Hello admin, my room heater is not working.', time: '10:05 AM', date: '2026-07-18' },
    { id: 2, from: 'admin', text: "I'll send the electrician today. Please be available after 3 PM.", time: '10:12 AM', date: '2026-07-18' },
    { id: 3, from: 'u1', text: 'Sure, thank you!', time: '10:13 AM', date: '2026-07-18' },
  ],
  u2: [
    { id: 1, from: 'u2', text: 'Sir, when is the rent due this month?', time: '09:30 AM', date: '2026-07-17' },
    { id: 2, from: 'admin', text: '5th of every month. You have ₹2,500 pending.', time: '09:35 AM', date: '2026-07-17' },
  ],
  s1: [
    { id: 1, from: 's1', text: 'Breakfast is ready sir. Poha + Chai today.', time: '08:00 AM', date: '2026-07-18' },
    { id: 2, from: 'admin', text: 'Great, noted. Please add less oil tomorrow.', time: '08:15 AM', date: '2026-07-18' },
  ],
  s2: [
    { id: 1, from: 'admin', text: 'Mohan, please clean Room 203 today extra.', time: '09:00 AM', date: '2026-07-18' },
    { id: 2, from: 's2', text: 'Yes sir, will do it by 11 AM.', time: '09:05 AM', date: '2026-07-18' },
  ],
  u3: [], u4: [], s3: [], s4: [],
};

const GROUP_MESSAGES = {
  broadcast: [
    { id: 1, from: 'admin', text: 'Reminder: Rent is due by 5th. Please pay on time.', time: '10:00 AM', date: '2026-07-18' },
    { id: 2, from: 'u1', text: "I'll pay today!", time: '10:05 AM', date: '2026-07-18' },
  ],
  staff_group: [
    { id: 1, from: 'admin', text: 'All staff meeting at 6 PM today in common area.', time: '08:30 AM', date: '2026-07-18' },
    { id: 2, from: 's1', text: 'Noted sir.', time: '08:35 AM', date: '2026-07-18' },
    { id: 3, from: 's3', text: 'Will be there.', time: '08:40 AM', date: '2026-07-18' },
  ],
};

const GROUPS = [
  { id: 'broadcast', name: 'All Residents', icon: 'campaign', color: '#0891b2', desc: 'Announcements to all' },
  { id: 'staff_group', name: 'Staff Group', icon: 'groups', color: '#8b5cf6', desc: 'All staff members' },
];

export default function Chat() {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // list | chat | group_chat
  const [activeContact, setActiveContact] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [groupMessages, setGroupMessages] = useState(GROUP_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // all | student | staff
  const [search, setSearch] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, groupMessages, activeContact, activeGroup]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const msg = { id: Date.now(), from: 'admin', text: inputText.trim(), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), date: new Date().toISOString().split('T')[0] };
    if (activeGroup) {
      setGroupMessages(prev => ({ ...prev, [activeGroup.id]: [...(prev[activeGroup.id] || []), msg] }));
    } else if (activeContact) {
      setMessages(prev => ({ ...prev, [activeContact.id]: [...(prev[activeContact.id] || []), msg] }));
    }
    setInputText('');
  };

  const getLastMsg = (contactId) => {
    const msgs = messages[contactId] || [];
    return msgs[msgs.length - 1];
  };

  const filteredContacts = CONTACTS.filter(c => {
    if (c.id === 'admin') return false;
    if (filter === 'student' && c.role !== 'student') return false;
    if (filter === 'staff' && c.role !== 'staff') return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getContact = (id) => CONTACTS.find(c => c.id === id);

  if (view === 'chat' && activeContact) {
    const msgs = messages[activeContact.id] || [];
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 20 }}>
          <button onClick={() => { setView('list'); setActiveContact(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: cyan }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: activeContact.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>{activeContact.initials}</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{activeContact.name}</p>
            <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>{activeContact.role === 'student' ? `Room ${activeContact.room}` : activeContact.dept}</p>
          </div>
          <a href={`tel:+91${activeContact.phone || '9999999999'}`} style={{ background: '#ecfeff', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer', display: 'flex', color: cyan, textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>call</span>
          </a>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 80 }}>
          {msgs.length === 0 && (
            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 14, marginTop: 60 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#e2e8f0' }}>chat</span>
              <p>No messages yet. Say hello!</p>
            </div>
          )}
          {msgs.map(msg => {
            const isMe = msg.from === 'admin';
            const sender = getContact(msg.from);
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '75%' }}>
                  <div style={{ background: isMe ? cyan : 'white', color: isMe ? 'white' : '#0f172a', padding: '10px 14px', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    {msg.text}
                  </div>
                  <p style={{ margin: '4px 4px 0', fontSize: 10, color: '#94a3b8', textAlign: isMe ? 'right' : 'left' }}>{msg.time}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: 'white', borderTop: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', gap: 10, boxSizing: 'border-box' }}>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={{ flex: 1, padding: '10px 16px', borderRadius: 24, border: '1px solid #e2e8f0', outline: 'none', fontSize: 14, background: '#f8fafc', fontFamily: 'inherit' }}
          />
          <button onClick={sendMessage} style={{ width: 44, height: 44, borderRadius: '50%', background: cyan, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'white' }}>send</span>
          </button>
        </div>
      </div>
    );
  }

  if (view === 'group_chat' && activeGroup) {
    const msgs = groupMessages[activeGroup.id] || [];
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', height: 64, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 20 }}>
          <button onClick={() => { setView('list'); setActiveGroup(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: cyan }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: activeGroup.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'white' }}>{activeGroup.icon}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{activeGroup.name}</p>
            <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>{activeGroup.desc}</p>
          </div>
        </div>

        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 80 }}>
          {msgs.map(msg => {
            const isMe = msg.from === 'admin';
            const sender = getContact(msg.from);
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                {!isMe && sender && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: sender.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{sender.initials}</div>
                )}
                <div style={{ maxWidth: '70%' }}>
                  {!isMe && sender && <p style={{ margin: '0 0 2px 2px', fontSize: 11, color: '#64748b', fontWeight: 600 }}>{sender.name}</p>}
                  <div style={{ background: isMe ? cyan : 'white', color: isMe ? 'white' : '#0f172a', padding: '10px 14px', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    {msg.text}
                  </div>
                  <p style={{ margin: '4px 4px 0', fontSize: 10, color: '#94a3b8', textAlign: isMe ? 'right' : 'left' }}>{msg.time}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: 'white', borderTop: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', gap: 10, boxSizing: 'border-box' }}>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={{ flex: 1, padding: '10px 16px', borderRadius: 24, border: '1px solid #e2e8f0', outline: 'none', fontSize: 14, background: '#f8fafc', fontFamily: 'inherit' }}
          />
          <button onClick={sendMessage} style={{ width: 44, height: 44, borderRadius: '50%', background: cyan, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'white' }}>send</span>
          </button>
        </div>
      </div>
    );
  }

  // Contact list
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #0c1a2e, #0f2847)`, padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 64 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'white' }}>Messages</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Admin Chat System</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#38bdf8' }}>mark_chat_unread</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>3</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#64748b' }}>search</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search people..."
            style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Groups */}
        <p style={{ fontSize: 12, fontWeight: 800, color: '#64748b', letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 10px' }}>Group Chats</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {GROUPS.map(g => (
            <button key={g.id} onClick={() => { setActiveGroup(g); setView('group_chat'); }}
              style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 14, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'white' }}>{g.icon}</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{g.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>{g.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', background: 'white', borderRadius: 12, padding: 4, marginBottom: 14, border: '1px solid #e2e8f0' }}>
          {['all', 'student', 'staff'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ flex: 1, padding: '8px 0', border: 'none', borderRadius: 9, background: filter === f ? cyan : 'transparent', color: filter === f ? 'white' : '#64748b', fontSize: 13, fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s', fontFamily: 'inherit' }}>
              {f === 'all' ? 'All' : f === 'student' ? 'Students' : 'Staff'}
            </button>
          ))}
        </div>

        {/* Contact list */}
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {filteredContacts.map((contact, i) => {
            const lastMsg = getLastMsg(contact.id);
            const unread = (messages[contact.id] || []).filter(m => m.from !== 'admin').length > 0 && i < 2;
            return (
              <div key={contact.id} onClick={() => { setActiveContact(contact); setView('chat'); }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: i < filteredContacts.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.15s' }}
                onTouchStart={e => e.currentTarget.style.background = '#f8fafc'}
                onTouchEnd={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: contact.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{contact.initials}</div>
                  {unread && <div style={{ position: 'absolute', top: 1, right: 1, width: 12, height: 12, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{contact.name}</p>
                    {lastMsg && <span style={{ fontSize: 10, color: '#94a3b8' }}>{lastMsg.time}</span>}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <p style={{ margin: 0, fontSize: 12, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                      {lastMsg ? (lastMsg.from === 'admin' ? `You: ${lastMsg.text}` : lastMsg.text) : 'No messages yet'}
                    </p>
                    <span style={{ fontSize: 11, color: contact.role === 'student' ? '#6366f1' : '#8b5cf6', background: contact.role === 'student' ? '#eef2ff' : '#f5f3ff', padding: '2px 7px', borderRadius: 6, fontWeight: 600 }}>
                      {contact.role === 'student' ? `Rm ${contact.room}` : contact.dept}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredContacts.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No contacts found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
