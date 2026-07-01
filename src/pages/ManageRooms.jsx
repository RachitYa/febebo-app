import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ROOM_TYPES = ['Single Bed', 'Double Bed', 'Triple Bed', 'Four Sharing'];
const FACILITIES = ['AC', 'WiFi', 'Attached Washroom', 'Hot Water', 'Balcony', 'TV', 'Fridge', 'Study Table', 'Chair', 'Wardrobe', 'Bed', 'Mattress', 'Geyser'];
const INVENTORY_OPTIONS = ['Mattress', 'Pillow', 'Bedsheet', 'Bucket', 'Chair', 'Table'];

const MOCK_ROOMS = [
  { id: 1, name: 'Sachin Kumar', roomNo: '15', bed: '1', type: 'Single Room', status: 'occupied' },
  { id: 2, name: 'Vacated Seat', roomNo: '15', bed: '1', type: 'Single Room', status: 'vacated' },
  { id: 3, name: 'Sachin Kumar', roomNo: '15', bed: '1', type: 'Single Room', status: 'occupied' },
  { id: 4, name: 'Vacated Seat', roomNo: '15', bed: '1', type: 'Single Room', status: 'vacated' },
  { id: 5, name: 'Rahul Verma', roomNo: '20', bed: '2', type: 'Double Bed', status: 'occupied' },
];

export default function ManageRooms() {
  const navigate = useNavigate();
  const [view, setView] = useState('listing'); // 'listing' | 'add'
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'complete' | 'pending'
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [showFacilityDrop, setShowFacilityDrop] = useState(false);
  const [showInventoryDrop, setShowInventoryDrop] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);

  const totalSeats = 100;
  const runningSeats = 60;
  const vacatedSeats = 40;

  const filteredRooms = MOCK_ROOMS.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.roomNo.includes(search);
    if (filter === 'complete') return matchSearch && r.status === 'occupied';
    if (filter === 'pending') return matchSearch && r.status === 'vacated';
    return matchSearch;
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const toggleFacility = (f) => setSelectedFacilities(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleInventory = (f) => setSelectedInventory(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  // ── ADD ROOM VIEW ──
  if (view === 'add') {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 80 }}>
        <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => { setView('listing'); setImagePreview(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <p style={{ fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>Add Room</p>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ padding: '16px' }}>
          <form onSubmit={(e) => { e.preventDefault(); setView('listing'); setImagePreview(null); }}>
            {/* Room Name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Room Name</label>
              <input placeholder="Entry of Room" style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            {/* Room Number */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Room Number <span style={{ color: '#e11d48' }}>*</span></label>
              <input placeholder="Enter Room Number" required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            {/* Room Type */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Select Room Type <span style={{ color: '#e11d48' }}>*</span></label>
              <select required style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', outline: 'none', boxSizing: 'border-box', appearance: 'auto' }}>
                {ROOM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Facility - multi-select dropdown */}
            <div style={{ marginBottom: 16, position: 'relative' }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Facility <span style={{ color: '#e11d48' }}>*</span></label>
              <div onClick={() => setShowFacilityDrop(!showFacilityDrop)} style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', cursor: 'pointer', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: selectedFacilities.length ? '#0f172a' : '#94a3b8' }}>{selectedFacilities.length ? `${selectedFacilities.length} Selected` : 'Select'}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#64748b' }}>expand_more</span>
              </div>
              {showFacilityDrop && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 20, maxHeight: 200, overflowY: 'auto' }}>
                  {FACILITIES.map(f => (
                    <div key={f} onClick={() => toggleFacility(f)} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f1f5f9', background: selectedFacilities.includes(f) ? '#ecfeff' : 'white' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: selectedFacilities.includes(f) ? '#0891b2' : '#cbd5e1' }}>{selectedFacilities.includes(f) ? 'check_box' : 'check_box_outline_blank'}</span>
                      <span style={{ fontSize: 14, color: '#0f172a' }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inventory - multi-select dropdown */}
            <div style={{ marginBottom: 16, position: 'relative' }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Inventory <span style={{ color: '#e11d48' }}>*</span></label>
              <div onClick={() => setShowInventoryDrop(!showInventoryDrop)} style={{ width: '100%', padding: '12px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', cursor: 'pointer', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: selectedInventory.length ? '#0f172a' : '#94a3b8' }}>{selectedInventory.length ? `${selectedInventory.length} Selected` : 'Select'}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#64748b' }}>expand_more</span>
              </div>
              {showInventoryDrop && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 20, maxHeight: 200, overflowY: 'auto' }}>
                  {INVENTORY_OPTIONS.map(f => (
                    <div key={f} onClick={() => toggleInventory(f)} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #f1f5f9', background: selectedInventory.includes(f) ? '#ecfeff' : 'white' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: selectedInventory.includes(f) ? '#0891b2' : '#cbd5e1' }}>{selectedInventory.includes(f) ? 'check_box' : 'check_box_outline_blank'}</span>
                      <span style={{ fontSize: 14, color: '#0f172a' }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Upload Room Image <span style={{ color: '#e11d48' }}>*</span></label>
              <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} style={{ display: 'none' }} />
              <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #0891b2', borderRadius: 12, padding: imagePreview ? 0 : '32px 16px', textAlign: 'center', cursor: 'pointer', background: '#f8fafc', overflow: 'hidden', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Room" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                ) : (
                  <div>
                    <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#94a3b8', display: 'block', marginBottom: 8 }}>cloud_upload</span>
                    <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>Tap here to upload file</p>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button type="submit" style={{ width: '100%', padding: '16px', background: '#0891b2', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', position: 'sticky', bottom: 16 }}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── ROOM LISTING VIEW ──
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate('/admin-dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#0891b2' }}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <p style={{ fontWeight: 700, fontSize: 20, color: '#0891b2', margin: 0, flex: 1, textAlign: 'center' }}>Room Listing</p>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ padding: '16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#0891b2', fontSize: 20, pointerEvents: 'none' }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Room" style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12, border: '1.5px solid #0891b2', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', background: 'white', color: '#1e293b', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Total Seat', value: totalSeats, color: '#0891b2', border: '#0891b2' },
            { label: 'Running Seat', value: runningSeats, color: '#64748b', border: '#e2e8f0' },
            { label: 'Vacated Seat', value: vacatedSeats, color: '#0891b2', border: '#e2e8f0' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', border: `1.5px solid ${s.border}`, borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 4px', fontWeight: 500 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: s.color, margin: 0, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Action Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Add Room', icon: 'add_home', action: () => setView('add') },
            { label: 'Complete\nRoom', icon: 'home', action: () => setFilter(filter === 'complete' ? 'all' : 'complete') },
            { label: 'Pending\nRoom', icon: 'search', action: () => setFilter(filter === 'pending' ? 'all' : 'pending') },
          ].map((pill, i) => (
            <button key={i} onClick={pill.action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '14px 8px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#0891b2', fontSize: 22 }}>{pill.icon}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{pill.label}</span>
            </button>
          ))}
        </div>

        {/* Room Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredRooms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 8 }}>search_off</span>
              No rooms found
            </div>
          ) : (
            filteredRooms.map(room => (
              <div key={room.id} style={{ background: 'white', borderRadius: 12, padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <p style={{ fontWeight: 600, fontSize: 16, color: room.status === 'vacated' ? '#0891b2' : '#0f172a', margin: 0 }}>{room.name}</p>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{room.type}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>door_front</span>
                    Room No: <strong>{room.roomNo}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#334155' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#38bdf8', fontWeight: 300 }}>bed</span>
                    Bed No: <strong>{room.bed}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
