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

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (mobile.replace(/\D/g, '').length === 10) {
      setOtpSent(true);
      setOtp('1234'); // prefill OTP for demo
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      login(mobile, 'admin');
      navigate('/');
    } else {
      alert('Invalid OTP. Use 1234');
    }
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
      <div style={{ textAlign: 'center', padding: '52px 24px 28px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: 'linear-gradient(135deg, #0891b2, #0e7490)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', boxShadow: '0 12px 32px rgba(8,145,178,0.3)'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 36 }}>apartment</span>
        </div>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800,
          fontSize: 32, color: cyan, margin: '0 0 6px', letterSpacing: -1
        }}>febebo</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
          {isLogin ? 'Admin Portal — Sign in to continue.' : 'Create your admin account.'}
        </p>
      </div>

      {/* Card */}
      <div style={{
        margin: '0 20px', background: 'white',
        borderRadius: 24, padding: '28px 24px',
        boxShadow: '0 8px 40px rgba(8,145,178,0.1)',
        border: '1px solid rgba(8,145,178,0.1)'
      }}>
        {/* Admin badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ecfeff', borderRadius: 12, padding: '12px 16px', marginBottom: 20, border: '1px solid #a5f3fc' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0891b2,#0e7490)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 20 }}>admin_panel_settings</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', margin: 0 }}>Admin Access</p>
            <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>PG Management Portal</p>
          </div>
        </div>

        {/* Sign Up extra fields */}
        {!isLogin && (
          <>
            <Field icon="person" placeholder="Full Name" value={signUpName} onChange={e => setSignUpName(e.target.value)} />
            <Field icon="mail" type="email" placeholder="Email Address" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
          </>
        )}

        {/* Mobile — 10 digit only */}
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

        {/* OTP */}
        {otpSent && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Enter OTP</label>
              <button onClick={() => { setOtpSent(false); setOtp(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: cyan, fontWeight: 600 }}>
                Change Number
              </button>
            </div>
            <Field icon="lock" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
            <p style={{ fontSize: 12, color: '#059669', marginTop: -10, marginBottom: 16, fontWeight: 600 }}>
              ✓ OTP sent to +91 {mobile} (pre-filled for demo)
            </p>
          </div>
        )}

        {/* Submit Button */}
        {!otpSent ? (
          <button onClick={handleSendOTP} style={{
            width: '100%', padding: '16px', borderRadius: 14,
            background: 'linear-gradient(135deg, #0891b2, #0e7490)',
            color: 'white', border: 'none', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 8px 20px rgba(8,145,178,0.3)'
          }}>
            Send OTP
          </button>
        ) : (
          <button onClick={handleVerifyOTP} style={{
            width: '100%', padding: '16px', borderRadius: 14,
            background: 'linear-gradient(135deg, #0891b2, #0e7490)',
            color: 'white', border: 'none', fontSize: 16, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 8px 20px rgba(8,145,178,0.3)'
          }}>
            Verify OTP & {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        )}

        {/* Switch */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{ fontSize: 14, color: '#64748b' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button onClick={switchMode} style={{ background: 'none', border: 'none', color: cyan, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 24, padding: '0 24px' }}>
        Demo: Enter any 10-digit number. OTP auto-fills as <strong style={{ color: cyan }}>1234</strong>
      </p>
    </div>
  );
}
