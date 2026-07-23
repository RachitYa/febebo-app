import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const cyan = '#0891b2';

const Field = ({ icon, placeholder, type = 'text', value, onChange, disabled, maxLength }) => (
  <div style={{ position: 'relative', marginBottom: 16 }}>
    <span className="material-symbols-outlined" style={{
      position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
      color: cyan, fontSize: 20, pointerEvents: 'none'
    }}>{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
      style={{
        width: '100%', padding: '14px 14px 14px 44px',
        border: `1.5px solid ${disabled ? '#e2e8f0' : cyan}`,
        borderRadius: 12, fontSize: 15, fontFamily: "'Hanken Grotesk',sans-serif",
        background: disabled ? '#f8fafc' : 'white', color: '#1e293b',
        outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
      }}
    />
  </div>
);

const STAFF_ROLES = [
  { id: 'Cook', label: '👨‍🍳 Cook / Kitchen Staff', icon: 'restaurant', color: '#8b5cf6' },
  { id: 'Cleaner', label: '🧹 Cleaner / Housekeeping', icon: 'mop', color: '#06b6d4' },
  { id: 'Maintenance', label: '🛠️ Maintenance / Technician', icon: 'build', color: '#ef4444' },
  { id: 'Purchase Manager', label: '🛒 Purchase / Store Manager', icon: 'shopping_bag', color: '#64748b' },
  { id: 'Security Guard', label: '🛡️ Security / Gate Guard', icon: 'security', color: '#059669' },
];

export default function Login() {
  const [loginType, setLoginType] = useState('staff'); // 'admin' or 'staff'
  const [isLogin, setIsLogin] = useState(true);

  // Admin state
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');

  // Staff state
  const [staffUsername, setStaffUsername] = useState('ramesh_cook');
  const [staffPasskey, setStaffPasskey] = useState('123456');
  const [selectedRole, setSelectedRole] = useState('Cook');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminSendOTP = (e) => {
    e.preventDefault();
    if (mobile.replace(/\D/g, '').length === 10) {
      setOtpSent(true);
      setOtp('1234'); // prefill OTP for demo
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleAdminVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      login(mobile, 'admin', { name: signUpName || 'Admin Owner' });
      navigate('/admin-dashboard');
    } else {
      alert('Invalid OTP. Use 1234');
    }
  };

  const handleStaffLoginSubmit = (e) => {
    e.preventDefault();
    if (!staffUsername.trim() || !staffPasskey.trim()) {
      alert('Please enter your Staff Username & Passkey');
      return;
    }

    const nameMap = {
      'Cook': 'Ramesh Yadav',
      'Cleaner': 'Lakshmi B.',
      'Maintenance': 'Dinesh Patel',
      'Purchase Manager': 'Vikram Sharma',
      'Security Guard': 'Bahadur Singh'
    };

    login(staffUsername, 'staff', {
      staffRole: selectedRole,
      name: nameMap[selectedRole] || staffUsername
    });
    navigate('/staff-app');
  };

  const handleQuickStaffLogin = (role, name, username) => {
    setSelectedRole(role);
    setStaffUsername(username);
    setStaffPasskey('123456');
    login(username, 'staff', {
      staffRole: role,
      name: name
    });
    navigate('/staff-app');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setMobile('');
    setOtp('');
    setSignUpName('');
    setSignUpEmail('');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(160deg, #ecfeff 0%, #f0f9ff 40%, #e0f2fe 100%)',
      fontFamily: "'Hanken Grotesk',sans-serif", padding: '0 0 40px'
    }}>
      {/* Top branding */}
      <div style={{ textAlign: 'center', padding: '40px 24px 20px' }}>
        <div style={{
          width: 68, height: 68, borderRadius: 20,
          background: 'linear-gradient(135deg, #0891b2, #0e7490)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px', boxShadow: '0 12px 32px rgba(8,145,178,0.3)'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 36 }}>apartment</span>
        </div>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800,
          fontSize: 30, color: cyan, margin: '0 0 4px', letterSpacing: -1
        }}>febebo</h1>
        <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
          PG Management & Staff Work Portal
        </p>
      </div>

      {/* Main Container Card */}
      <div style={{
        margin: '0 20px', background: 'white',
        borderRadius: 24, padding: '24px 20px',
        boxShadow: '0 8px 40px rgba(8,145,178,0.1)',
        border: '1px solid rgba(8,145,178,0.1)'
      }}>

        {/* Portal Switch Tabs */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 14, padding: 4, marginBottom: 20 }}>
          <button
            type="button"
            onClick={() => setLoginType('staff')}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10, border: 'none',
              background: loginType === 'staff' ? cyan : 'transparent',
              color: loginType === 'staff' ? 'white' : '#64748b',
              fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>badge</span>
            Staff Member Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType('admin')}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 10, border: 'none',
              background: loginType === 'admin' ? cyan : 'transparent',
              color: loginType === 'admin' ? 'white' : '#64748b',
              fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>admin_panel_settings</span>
            Admin Login
          </button>
        </div>

        {/* STAFF APP LOGIN FORM */}
        {loginType === 'staff' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ecfeff', borderRadius: 12, padding: '12px 14px', marginBottom: 18, border: '1px solid #a5f3fc' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0891b2,#0e7490)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 20 }}>passkey</span>
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 14, color: '#0f172a', margin: 0 }}>Staff App Portal</p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Log in with Passkey & Role</p>
              </div>
            </div>

            <form onSubmit={handleStaffLoginSubmit}>
              {/* Role Selection Dropdown */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>Select Your Staff Role</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: cyan, fontSize: 20, pointerEvents: 'none' }}>work</span>
                  <select
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                    style={{
                      width: '100%', padding: '14px 14px 14px 44px',
                      border: `1.5px solid ${cyan}`, borderRadius: 12, fontSize: 15,
                      fontFamily: "'Hanken Grotesk',sans-serif", background: 'white',
                      color: '#1e293b', outline: 'none', boxSizing: 'border-box', fontWeight: 600
                    }}>
                    {STAFF_ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Username Field */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>Staff Username or ID</label>
                <Field
                  icon="person"
                  placeholder="e.g. ramesh_cook or phone number"
                  value={staffUsername}
                  onChange={e => setStaffUsername(e.target.value)}
                />
              </div>

              {/* Passkey Field */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase' }}>Staff Passkey / PIN</label>
                <Field
                  icon="key"
                  type="password"
                  placeholder="Enter 6-digit staff passkey"
                  value={staffPasskey}
                  onChange={e => setStaffPasskey(e.target.value)}
                />
              </div>

              <button type="submit" style={{
                width: '100%', padding: '16px', borderRadius: 14,
                background: 'linear-gradient(135deg, #0891b2, #0e7490)',
                color: 'white', border: 'none', fontSize: 16, fontWeight: 800,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 8px 20px rgba(8,145,178,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>login</span>
                Sign In to Staff App
              </button>
            </form>

            {/* Quick Demo Staff Login presets */}
            <div style={{ marginTop: 22, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 10px', textAlign: 'center' }}>
                ⚡ Quick Demo Login As (1-Click)
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <button type="button" onClick={() => handleQuickStaffLogin('Cook', 'Ramesh Yadav', 'ramesh_cook')} style={{ background: '#f3e8ff', border: '1px solid #c084fc', borderRadius: 10, padding: '8px 10px', fontSize: 12, fontWeight: 800, color: '#7e22ce', cursor: 'pointer', textAlign: 'left' }}>
                  👨‍🍳 Cook (Ramesh)
                </button>
                <button type="button" onClick={() => handleQuickStaffLogin('Cleaner', 'Lakshmi B.', 'lakshmi_clean')} style={{ background: '#ecfeff', border: '1px solid #67e8f9', borderRadius: 10, padding: '8px 10px', fontSize: 12, fontWeight: 800, color: '#0e7490', cursor: 'pointer', textAlign: 'left' }}>
                  🧹 Cleaner (Lakshmi)
                </button>
                <button type="button" onClick={() => handleQuickStaffLogin('Maintenance', 'Dinesh Patel', 'dinesh_tech')} style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 10, padding: '8px 10px', fontSize: 12, fontWeight: 800, color: '#b91c1c', cursor: 'pointer', textAlign: 'left' }}>
                  🛠️ Maintenance (Dinesh)
                </button>
                <button type="button" onClick={() => handleQuickStaffLogin('Purchase Manager', 'Vikram Sharma', 'vikram_store')} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 10, padding: '8px 10px', fontSize: 12, fontWeight: 800, color: '#334155', cursor: 'pointer', textAlign: 'left' }}>
                  🛒 Store (Vikram)
                </button>
                <button type="button" onClick={() => handleQuickStaffLogin('Security Guard', 'Bahadur Singh', 'bahadur_sec')} style={{ gridColumn: 'span 2', background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 10, padding: '8px 10px', fontSize: 12, fontWeight: 800, color: '#047857', cursor: 'pointer', textAlign: 'center' }}>
                  🛡️ Security Guard (Bahadur Singh)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN LOGIN FORM */}
        {loginType === 'admin' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ecfeff', borderRadius: 12, padding: '12px 16px', marginBottom: 20, border: '1px solid #a5f3fc' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0891b2,#0e7490)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 20 }}>admin_panel_settings</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: 0 }}>Admin Access</p>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>PG Owner Portal</p>
              </div>
            </div>

            {!isLogin && (
              <>
                <Field icon="person" placeholder="Full Name" value={signUpName} onChange={e => setSignUpName(e.target.value)} />
                <Field icon="mail" type="email" placeholder="Email Address" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
              </>
            )}

            <div style={{ marginBottom: 4 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Mobile Number</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flexShrink: 0, padding: '14px 12px', border: `1.5px solid ${cyan}`, borderRadius: 12, background: '#ecfeff', fontSize: 14, fontWeight: 700, color: cyan }}>
                  +91
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: cyan, fontSize: 20, pointerEvents: 'none' }}>smartphone</span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    disabled={otpSent}
                    maxLength={10}
                    style={{
                      width: '100%', padding: '14px 14px 14px 44px',
                      border: `1.5px solid ${otpSent ? '#e2e8f0' : cyan}`,
                      borderRadius: 12, fontSize: 15, fontFamily: "'Hanken Grotesk',sans-serif",
                      background: otpSent ? '#f8fafc' : 'white', color: '#1e293b',
                      outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '6px 0 16px' }}>{mobile.length}/10 digits</p>
            </div>

            {otpSent && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Enter OTP</label>
                  <button type="button" onClick={() => { setOtpSent(false); setOtp(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: cyan, fontWeight: 600 }}>
                    Change Number
                  </button>
                </div>
                <Field icon="lock" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
                <p style={{ fontSize: 12, color: '#059669', marginTop: -10, marginBottom: 16, fontWeight: 600 }}>
                  ✓ OTP sent to +91 {mobile} (pre-filled as 1234)
                </p>
              </div>
            )}

            {!otpSent ? (
              <button type="button" onClick={handleAdminSendOTP} style={{
                width: '100%', padding: '16px', borderRadius: 14,
                background: 'linear-gradient(135deg, #0891b2, #0e7490)',
                color: 'white', border: 'none', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 8px 20px rgba(8,145,178,0.3)'
              }}>
                Send OTP
              </button>
            ) : (
              <button type="button" onClick={handleAdminVerifyOTP} style={{
                width: '100%', padding: '16px', borderRadius: 14,
                background: 'linear-gradient(135deg, #0891b2, #0e7490)',
                color: 'white', border: 'none', fontSize: 16, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 8px 20px rgba(8,145,178,0.3)'
              }}>
                Verify OTP & {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            )}

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <span style={{ fontSize: 14, color: '#64748b' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button type="button" onClick={switchMode} style={{ background: 'none', border: 'none', color: cyan, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        )}

      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 24, padding: '0 24px' }}>
        Demo Passkey for Staff: <strong style={{ color: cyan }}>123456</strong> · Admin OTP: <strong style={{ color: cyan }}>1234</strong>
      </p>
    </div>
  );
}
