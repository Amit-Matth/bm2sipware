'use client';

import {useState} from 'react';

export default function Login() {
  const [p, setP] = useState('');
  const [e, setE] = useState('');

  return (
    <div className="wrap" style={{padding: '48px 16px'}}>
      <form
        className="form"
        style={{
          maxWidth: 380,
          margin: '40px auto',
          background: '#fff',
          padding: 32,
          borderRadius: 20,
          border: '1px solid var(--line)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
        }}
        onSubmit={async ev => {
          ev.preventDefault();
          const r = await fetch('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({password: p})
          });
          r.ok ? (location.href = '/admin') : setE('Wrong password');
        }}
      >
        <h1 style={{fontSize: '1.8rem', textAlign: 'center', marginBottom: 6}}>Admin Login</h1>
        <p style={{color: 'var(--mute)', fontSize: '0.9rem', textAlign: 'center', marginBottom: 20}}>
          Enter password to access store panel
        </p>

        <input
          type="password"
          required
          placeholder="Password"
          value={p}
          onChange={x => setP(x.target.value)}
          style={{padding: 12, borderRadius: 12}}
        />

        {e && <p className="err" style={{fontSize: '0.88rem', margin: '4px 0'}}>{e}</p>}

        <button className="btn" style={{width: '100%', marginTop: 8}}>
          Sign in to Admin &rarr;
        </button>
      </form>
    </div>
  );
}
