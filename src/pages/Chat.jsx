import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cyan = '#0891b2';

const CONTACTS = [
  { id: 'admin', name: 'Admin (You)', role: 'admin', avatar: '👑', color: '#0891b2', initials: 'AD' },
  { id: 'u1', name: 'Arjun Mehta',   role: 'student', room: '101', initials: 'AM', color: '#6366f1' },
  { id: 'u2', name: 'Priya Sharma',  role: 'student', room: '202', initials: 'PS', color: '#f43f5e' },
  { id: 'u3', name: 'Ravi Kumar',    role: 'student', room: '305', initials: 'RK', color: '#10b981' },
  { id: 'u4', name: 'Sneha Kapoor',  role: 'student', room: '108', initials: 'SK', color: '#f59e0b' },
  { id: 's1', name: 'Ramesh Yadav',  role: 'staff', dept: 'Cook',    initials: 'RY', color: '#8b5cf6' },
  { id: 's2', name: 'Mohan Das',     role: 'staff', dept: 'Cleaner', initials: 'MD', color: '#06b6d4' },
  { id: 's3', name: 'Vikram Sharma', role: 'staff', dept: 'Manager', initials: 'VS', color: '#64748b' },
  { id: 's4', name: 'Dinesh Patel',  role: 'staff', dept: 'Plumber', initials: 'DP', color: '#dc2626' },
];

const INITIAL_MESSAGES = {
  u1: [
    { id: 1, from: 'u1',   type: 'text', text: 'Hello admin, my room heater is not working.', time: '10:05 AM', date: '2026-07-18' },
    { id: 2, from: 'admin',type: 'text', text: "I'll send the electrician today. Please be available after 3 PM.", time: '10:12 AM', date: '2026-07-18' },
    { id: 3, from: 'u1',   type: 'text', text: 'Sure, thank you!', time: '10:13 AM', date: '2026-07-18' },
  ],
  u2: [
    { id: 1, from: 'u2',   type: 'text', text: 'Sir, when is the rent due this month?', time: '09:30 AM', date: '2026-07-17' },
    { id: 2, from: 'admin',type: 'text', text: '5th of every month. You have ₹2,500 pending.', time: '09:35 AM', date: '2026-07-17' },
  ],
  s1: [
    { id: 1, from: 's1',   type: 'text', text: 'Breakfast is ready sir. Poha + Chai today.', time: '08:00 AM', date: '2026-07-18' },
    { id: 2, from: 'admin',type: 'text', text: 'Great, noted. Please add less oil tomorrow.', time: '08:15 AM', date: '2026-07-18' },
    { id: 3, from: 's1',   type: 'image', url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', text: 'Today\'s breakfast', time: '08:20 AM', date: '2026-07-18' },
  ],
  s2: [
    { id: 1, from: 'admin',type: 'text', text: 'Mohan, please clean Room 203 today extra.', time: '09:00 AM', date: '2026-07-18' },
    { id: 2, from: 's2',   type: 'text', text: 'Yes sir, will do it by 11 AM.', time: '09:05 AM', date: '2026-07-18' },
  ],
  u3: [], u4: [], s3: [], s4: [],
};

const GROUP_MESSAGES = {
  broadcast: [
    { id: 1, from: 'admin', type: 'text', text: 'Reminder: Rent is due by 5th. Please pay on time.', time: '10:00 AM', date: '2026-07-18' },
    { id: 2, from: 'u1',   type: 'text', text: "I'll pay today!", time: '10:05 AM', date: '2026-07-18' },
  ],
  staff_group: [
    { id: 1, from: 'admin', type: 'text', text: 'All staff meeting at 6 PM today in common area.', time: '08:30 AM', date: '2026-07-18' },
    { id: 2, from: 's1',   type: 'text', text: 'Noted sir.', time: '08:35 AM', date: '2026-07-18' },
    { id: 3, from: 's3',   type: 'text', text: 'Will be there.', time: '08:40 AM', date: '2026-07-18' },
  ],
};

const GROUPS = [
  { id: 'broadcast',   name: 'All Residents', icon: 'campaign', color: '#0891b2', desc: 'Announcements to all' },
  { id: 'staff_group', name: 'Staff Group',   icon: 'groups',   color: '#8b5cf6', desc: 'All staff members' },
];

// ─── Message bubble renderer ────────────────────────────────────────
function MessageBubble({ msg, isMe }) {
  const [imgOpen, setImgOpen] = useState(false);
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  if (msg.type === 'image') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
        <div onClick={() => setImgOpen(true)} style={{ cursor: 'pointer', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', overflow: 'hidden', maxWidth: 220, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <img src={msg.url} alt={msg.text || 'Image'} style={{ width: '100%', display: 'block', maxHeight: 200, objectFit: 'cover' }} />
          {msg.text && <div style={{ background: isMe ? cyan : 'white', padding: '6px 10px', fontSize: 12, color: isMe ? 'white' : '#475569' }}>{msg.text}</div>}
        </div>
        <p style={{ margin: '3px 4px 0', fontSize: 10, color: '#94a3b8' }}>{msg.time}</p>
        {imgOpen && (
          <div onClick={() => setImgOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={msg.url} alt="" style={{ maxWidth: '90%', maxHeight: '85vh', borderRadius: 12 }} />
          </div>
        )}
      </div>
    );
  }

  if (msg.type === 'video') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
        <div style={{ borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', overflow: 'hidden', maxWidth: 240, background: '#1e293b', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <video src={msg.url} controls style={{ width: '100%', display: 'block', maxHeight: 180 }} />
          {msg.text && <div style={{ padding: '6px 10px', fontSize: 12, color: 'white' }}>{msg.text}</div>}
        </div>
        <p style={{ margin: '3px 4px 0', fontSize: 10, color: '#94a3b8' }}>{msg.time}</p>
      </div>
    );
  }

  if (msg.type === 'file') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
        <a href={msg.url || '#'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <div style={{ background: isMe ? cyan : 'white', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', maxWidth: 240 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: isMe ? 'rgba(255,255,255,0.2)' : '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: isMe ? 'white' : cyan }}>description</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: isMe ? 'white' : '#0f172a' }}>{msg.fileName || 'Document'}</p>
              <p style={{ margin: 0, fontSize: 11, color: isMe ? 'rgba(255,255,255,0.7)' : '#64748b' }}>{msg.fileSize || 'File'}</p>
            </div>
          </div>
        </a>
        <p style={{ margin: '3px 4px 0', fontSize: 10, color: '#94a3b8' }}>{msg.time}</p>
      </div>
    );
  }

  if (msg.type === 'location') {
    const mapUrl = `https://www.google.com/maps?q=${msg.lat},${msg.lng}`;
    const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${msg.lat},${msg.lng}&zoom=15&size=300x160&markers=${msg.lat},${msg.lng}&key=DEMO`;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
        <a href={mapUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <div style={{ borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', overflow: 'hidden', width: 220, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
            {/* Placeholder map tile */}
            <div style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 24px), repeating-linear-gradient(90deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 24px)' }} />
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ef4444', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', position: 'relative', zIndex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'white' }}>location_on</span>
              </div>
            </div>
            <div style={{ background: isMe ? cyan : 'white', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: isMe ? 'white' : cyan }}>location_on</span>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: isMe ? 'white' : '#0f172a' }}>{msg.label || 'Location'}</p>
                <p style={{ margin: 0, fontSize: 10, color: isMe ? 'rgba(255,255,255,0.7)' : '#64748b' }}>Tap to open in Maps</p>
              </div>
            </div>
          </div>
        </a>
        <p style={{ margin: '3px 4px 0', fontSize: 10, color: '#94a3b8' }}>{msg.time}</p>
      </div>
    );
  }

  // Default text
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
      <div style={{ background: isMe ? cyan : 'white', color: isMe ? 'white' : '#0f172a', padding: '10px 14px', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', maxWidth: 280 }}>
        {msg.text}
      </div>
      <p style={{ margin: '3px 4px 0', fontSize: 10, color: '#94a3b8' }}>{msg.time}</p>
    </div>
  );
}

// ─── Attachment Menu ────────────────────────────────────────────────
function AttachMenu({ onSendImage, onSendVideo, onSendFile, onSendLocation, onClose }) {
  const imgRef   = useRef(null);
  const videoRef = useRef(null);
  const fileRef  = useRef(null);

  const ITEMS = [
    { icon: 'photo_camera',  label: 'Photo',    color: '#0891b2', bg: '#ecfeff',  action: () => imgRef.current?.click() },
    { icon: 'videocam',      label: 'Video',    color: '#8b5cf6', bg: '#f5f3ff',  action: () => videoRef.current?.click() },
    { icon: 'attach_file',   label: 'File',     color: '#f59e0b', bg: '#fffbeb',  action: () => fileRef.current?.click() },
    { icon: 'location_on',   label: 'Location', color: '#10b981', bg: '#ecfdf5',  action: onSendLocation },
  ];

  const handleImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onSendImage(url, file.name);
    onClose();
  };

  const handleVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onSendVideo(url, file.name);
    onClose();
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const size = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / 1024 / 1024).toFixed(1)} MB`;
    onSendFile(url, file.name, size);
    onClose();
  };

  return (
    <>
      {/* hidden inputs */}
      <input ref={imgRef}   type="file" accept="image/*"         style={{ display: 'none' }} onChange={handleImg} />
      <input ref={videoRef} type="file" accept="video/*"         style={{ display: 'none' }} onChange={handleVideo} />
      <input ref={fileRef}  type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip" style={{ display: 'none' }} onChange={handleFile} />

      {/* slide-up panel */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} onClick={onClose} />
      <div style={{ position: 'fixed', bottom: 68, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: 448, background: 'white', borderRadius: 20, padding: 16, boxShadow: '0 -4px 32px rgba(0,0,0,0.12)', zIndex: 60, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
        {ITEMS.map(it => (
          <button key={it.label} onClick={() => { it.action(); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: it.color }}>{it.icon}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', fontFamily: "'Hanken Grotesk', sans-serif" }}>{it.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ─── Chat Input Bar ─────────────────────────────────────────────────
function ChatInputBar({ inputText, setInputText, onSend, onSendImage, onSendVideo, onSendFile, onSendLocation }) {
  const [showAttach, setShowAttach] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: 'white', borderTop: '1px solid #e2e8f0', padding: '8px 12px', boxSizing: 'border-box', zIndex: 40 }}>
      {showAttach && (
        <AttachMenu
          onSendImage={onSendImage}
          onSendVideo={onSendVideo}
          onSendFile={onSendFile}
          onSendLocation={() => { onSendLocation(); setShowAttach(false); }}
          onClose={() => setShowAttach(false)}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setShowAttach(v => !v)}
          style={{ width: 40, height: 40, borderRadius: '50%', background: showAttach ? cyan : '#f1f5f9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: showAttach ? 'white' : '#64748b' }}>
            {showAttach ? 'close' : 'attach_file'}
          </span>
        </button>
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSend()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px 16px', borderRadius: 24, border: '1.5px solid #e2e8f0', outline: 'none', fontSize: 14, background: '#f8fafc', fontFamily: 'inherit' }}
        />
        <button onClick={onSend}
          style={{ width: 42, height: 42, borderRadius: '50%', background: cyan, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(8,145,178,0.3)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'white' }}>send</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────
export default function Chat() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [activeContact, setActiveContact] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [groupMessages, setGroupMessages] = useState(GROUP_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, groupMessages, activeContact, activeGroup]);

  const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const today = () => new Date().toISOString().split('T')[0];

  const pushMsg = (msg) => {
    if (activeGroup) {
      setGroupMessages(prev => ({ ...prev, [activeGroup.id]: [...(prev[activeGroup.id] || []), msg] }));
    } else if (activeContact) {
      setMessages(prev => ({ ...prev, [activeContact.id]: [...(prev[activeContact.id] || []), msg] }));
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    pushMsg({ id: Date.now(), from: 'admin', type: 'text', text: inputText.trim(), time: now(), date: today() });
    setInputText('');
  };

  const sendImage = (url, name) => {
    pushMsg({ id: Date.now(), from: 'admin', type: 'image', url, text: name, time: now(), date: today() });
  };

  const sendVideo = (url, name) => {
    pushMsg({ id: Date.now(), from: 'admin', type: 'video', url, text: name, time: now(), date: today() });
  };

  const sendFile = (url, fileName, fileSize) => {
    pushMsg({ id: Date.now(), from: 'admin', type: 'file', url, fileName, fileSize, time: now(), date: today() });
  };

  const sendLocation = () => {
    if (!navigator.geolocation) {
      // Fallback: use Febebo PG address
      pushMsg({ id: Date.now(), from: 'admin', type: 'location', lat: 28.6139, lng: 77.2090, label: 'Current Location', time: now(), date: today() });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        pushMsg({ id: Date.now(), from: 'admin', type: 'location', lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'My Location', time: now(), date: today() });
      },
      () => {
        pushMsg({ id: Date.now(), from: 'admin', type: 'location', lat: 28.6139, lng: 77.2090, label: 'PG Location (Demo)', time: now(), date: today() });
      }
    );
  };

  const getLastMsg = (contactId) => {
    const msgs = messages[contactId] || [];
    return msgs[msgs.length - 1];
  };

  const lastMsgPreview = (msg) => {
    if (!msg) return 'No messages yet';
    const prefix = msg.from === 'admin' ? 'You: ' : '';
    if (msg.type === 'image')    return prefix + '📷 Photo';
    if (msg.type === 'video')    return prefix + '🎥 Video';
    if (msg.type === 'file')     return prefix + `📎 ${msg.fileName || 'File'}`;
    if (msg.type === 'location') return prefix + '📍 Location';
    return prefix + msg.text;
  };

  const filteredContacts = CONTACTS.filter(c => {
    if (c.id === 'admin') return false;
    if (filter === 'student' && c.role !== 'student') return false;
    if (filter === 'staff'   && c.role !== 'staff')   return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getContact = (id) => CONTACTS.find(c => c.id === id);

  // ── Individual Chat View ──────────────────────────────────────────
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
          {msgs.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'admin' ? 'flex-end' : 'flex-start' }}>
              <MessageBubble msg={msg} isMe={msg.from === 'admin'} />
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <ChatInputBar
          inputText={inputText} setInputText={setInputText}
          onSend={sendMessage}
          onSendImage={sendImage} onSendVideo={sendVideo}
          onSendFile={sendFile} onSendLocation={sendLocation}
        />
      </div>
    );
  }

  // ── Group Chat View ───────────────────────────────────────────────
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
                  <MessageBubble msg={msg} isMe={isMe} />
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <ChatInputBar
          inputText={inputText} setInputText={setInputText}
          onSend={sendMessage}
          onSendImage={sendImage} onSendVideo={sendVideo}
          onSendFile={sendFile} onSendLocation={sendLocation}
        />
      </div>
    );
  }

  // ── Contact List ──────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0c1a2e, #0f2847)', padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 64 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back_ios_new</span>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'white' }}>Messages</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Photos · Videos · Files · Location</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#38bdf8' }}>mark_chat_unread</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>3</span>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#64748b' }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search people..."
            style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
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
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', borderBottom: i < filteredContacts.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.15s' }}>
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
                      {lastMsgPreview(lastMsg)}
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
