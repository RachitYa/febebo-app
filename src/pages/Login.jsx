import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Smartphone, Lock, UserPlus } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState('admin');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      setOtpSent(true);
      // Simulate sending OTP
      alert('Dummy OTP is 1234');
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      login(mobile, role);
      navigate('/');
    } else {
      alert('Invalid OTP. Use 1234');
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px' }}>
      <div className="text-center mb-4">
        <h1 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '8px' }}>febebo</h1>
        <p>{isLogin ? 'Welcome back!' : 'Create a new account'}</p>
      </div>

      <div className="card">
        <h2 className="text-center mb-4">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        
        {/* Role Selector for Dummy Auth */}
        <div className="input-group">
          <label className="input-label">Select Role (For Testing)</label>
          <select 
            className="input-field" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin (PG Owner)</option>
            <option value="staff">Staff (Manager)</option>
            <option value="customer">Customer (Student)</option>
          </select>
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <label className="input-label">Name</label>
              <input type="text" className="input-field" placeholder="Enter your name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Email ID</label>
              <input type="email" className="input-field" placeholder="Enter your email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
            </div>
          </>
        )}

        <div className="input-group">
          <label className="input-label">Mobile Number *</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }}>
              <Smartphone size={20} />
            </span>
            <input 
              type="tel" 
              className="input-field" 
              placeholder="+91 - 1234567890" 
              style={{ paddingLeft: '40px' }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={otpSent}
            />
          </div>
        </div>

        {otpSent && (
          <div className="input-group">
            <label className="input-label">Enter OTP *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }}>
                <Lock size={20} />
              </span>
              <input 
                type="text" 
                className="input-field" 
                placeholder="1234" 
                style={{ paddingLeft: '40px' }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
        )}

        {!otpSent ? (
          <button className="btn-primary mt-4" onClick={handleSendOTP}>
            Send OTP
          </button>
        ) : (
          <button className="btn-primary mt-4" onClick={handleVerifyOTP}>
            Verify OTP & {isLogin ? 'Login' : 'Sign Up'}
          </button>
        )}

        <div className="text-center mt-4">
          <p style={{ fontSize: '0.875rem' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              className="text-primary" 
              style={{ cursor: 'pointer', fontWeight: '500' }}
              onClick={() => {
                setIsLogin(!isLogin);
                setOtpSent(false);
              }}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
