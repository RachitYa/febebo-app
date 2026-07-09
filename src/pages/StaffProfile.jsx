import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// ─── Header ─────────────────────────────────────────────────────────
function Header({ onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', background: '#0891b2', position: 'sticky', top: 0, zIndex: 50 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'white', position: 'relative', zIndex: 10 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 24, fontWeight: 300 }}>arrow_back_ios_new</span>
      </button>
      <h1 style={{ flex: 1, textAlign: 'center', margin: '0 0 0 -24px', fontSize: 18, fontWeight: 700, color: 'white' }}>Staff Details</h1>
      <div style={{ position: 'relative', zIndex: 10, background: 'white', color: '#0891b2', padding: '4px 10px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: 13, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        4.3 <span className="material-symbols-outlined" style={{ fontSize: 14 }}>star</span>
      </div>
    </div>
  );
}

// ─── Accordion Component ─────────────────────────────────────────────
function Accordion({ icon, title, children, defaultOpen = false, actionIcon = null }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 12, overflow: 'hidden' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer', gap: 12 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: '#ecfeff', color: '#0891b2' }}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <p style={{ flex: 1, margin: 0, fontWeight: 600, fontSize: 15, color: '#0f172a' }}>{title}</p>
        
        {actionIcon && (
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{actionIcon}</span>
          </div>
        )}
        
        <span className="material-symbols-outlined" style={{ color: '#0891b2', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          arrow_drop_down
        </span>
      </div>
      {isOpen && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px dashed #e2e8f0', paddingTop: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Simple Info Row ─────────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 10px 1fr', marginBottom: 12, fontSize: 14 }}>
      <span style={{ color: '#475569' }}>{label}</span>
      <span style={{ color: '#94a3b8' }}>:</span>
      <span style={{ color: '#0891b2', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ─── Main Staff Profile Page ─────────────────────────────────────────
export default function StaffProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const staff = location.state?.staff || {
    name: 'Sachin Kumar',
    empId: '#1234567',
    role: 'House Keeping',
    email: 'sachin@gmail.com',
    phone: '+91 9234567681',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=150&fit=crop'
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Hanken Grotesk',sans-serif", paddingBottom: 80 }}>
      {/* Dynamic Header background to match Figma */}
      <div style={{ height: 100, background: '#0891b2', position: 'absolute', left: 0, right: 0, zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header onBack={() => navigate(-1)} />

        <div style={{ padding: '16px' }}>
          {/* Top Profile Card */}
          <div style={{ background: 'white', borderRadius: 16, padding: '16px', display: 'flex', gap: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: 24 }}>
            <img src={staff.img} alt={staff.name} style={{ width: 110, height: 130, borderRadius: 12, objectFit: 'cover' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
              <p style={{ fontWeight: 700, fontSize: 18, color: '#0f172a', margin: '0 0 4px' }}>{staff.name}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#38bdf8' }}>badge</span> {staff.empId}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#38bdf8' }}>person</span> {staff.role}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#38bdf8' }}>mail</span> {staff.email || 'sachin@gmail.com'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#38bdf8' }}>call</span> {staff.phone}
              </div>
            </div>
          </div>

          {/* Details Accordions */}
          <Accordion icon="person" title="Personal Details" />
          <Accordion icon="diversity_3" title="Parents Details" />
          
          <Accordion icon="family_restroom" title="Relative Details" defaultOpen={true}>
            <InfoRow label="Name" value="Anil Kumar" />
            <InfoRow label="Number" value="+91 9876543232" />
            <InfoRow label="Relation" value="Brother" />
            <InfoRow label="Address" value="New Ashok Nagar Delhi" />
          </Accordion>

          <Accordion icon="work" title="Work Experience" />
          
          <Accordion icon="badge" title="Visitor Details" actionIcon="edit">
            <p style={{ margin: 0, fontSize: 14, color: '#64748b', fontStyle: 'italic' }}>No recent visitors</p>
          </Accordion>
          
          <Accordion icon="home_work" title="Amenities" />
          <Accordion icon="lock" title="Password" />

          {/* Police Verification Row (Not an accordion) */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 12, display: 'flex', alignItems: 'center', padding: '16px', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: '#ecfeff', color: '#0891b2' }}>
              <span className="material-symbols-outlined">local_police</span>
            </div>
            <p style={{ flex: 1, margin: 0, fontWeight: 600, fontSize: 15, color: '#0f172a' }}>Police Verification</p>
            <div style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 700 }}>
              Verified
            </div>
          </div>

          {/* Document Section */}
          <div style={{ marginTop: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Document</p>
              <div style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 700 }}>
                Verified
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              {/* Mock Aadhaar Card Image */}
              <div style={{ flexShrink: 0, width: 200, height: 125, background: '#f1f5f9', borderRadius: 12, border: '1px solid #cbd5e1', overflow: 'hidden', backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#94a3b8' }}>id_card</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginTop: 4 }}>ID Card Front</span>
                </div>
              </div>
              
              {/* Mock PAN Card Image */}
              <div style={{ flexShrink: 0, width: 200, height: 125, background: '#f1f5f9', borderRadius: 12, border: '1px solid #cbd5e1', overflow: 'hidden' }}>
                 <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#94a3b8' }}>credit_card</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginTop: 4 }}>ID Card Back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dummy Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', zIndex: 50, boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.05)' }}>
        {[
          { icon: 'home', label: 'Home', active: false },
          { icon: 'support_agent', label: 'Help', active: false },
          { icon: 'thumb_up', label: 'Review', active: false },
          { icon: 'person', label: 'My Profile', active: true },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', color: item.active ? '#0891b2' : '#94a3b8' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{item.icon}</span>
            <span style={{ fontSize: 11, fontWeight: item.active ? 700 : 500 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
